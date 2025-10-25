"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { subMonths } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Controller, useForm } from "react-hook-form";
import {
  RefreshCcw,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  Check,
  Circle,
} from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  RangeDatePicker,
  Spinner,
  Menubar,
  Input,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui";
import { APIAxios } from "@/utils/axios";

// Import the existing components
import ClientOrdersTable from "../misc/components/ClientOrdersTable";
import { useGetOrders } from "../../misc/api";
import {
  ArrowDown2,
  Bag,
  Category2,
  NotificationStatus,
  User,
} from "iconsax-react";
import UniversalFilters from "@/components/UniversalFilters";
import { ORDER_STATUS_OPTIONS } from "@/constants";
import React from "react";
import { useGetCategories } from "@/app/(dashboard)/inventory/misc/api";

const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const monthsAgo = subMonths(new Date(), 20);

// Customer details fetch function
const fetchCustomerDetails = async (phone: string) => {
  const res = await APIAxios.get(`/customer/list-stats/?search=${phone}`);
  return res.data as APIResponse;
};
interface APIResponse {
  data: Customer[];
  next_page: string | null;
  previous_page: string | null;
  number_of_pages: number;
  count: number;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  orders_count: number;
  total_amount_spent: string;
  create_date: string;
  update_date: string;
}
export default function ClientDetailsPage() {
  const params = useParams();
  const client_phone = params.client_phone as string;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { control, watch } = useForm<{
    date: DateRange;
  }>({
    defaultValues: {
      date: {
        from: monthsAgo,
        to: tomorrow,
      },
    },
  });

  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const [selectedStatuses, setSelectedStatuses] = useState<string | undefined>(
    ""
  );
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [selectedRep, setSelectedRep] = useState<number | null>(null);
  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState<
    string | null
  >(null);
  const handleStatusChange = (status: string) => {
    setSelectedStatuses(status);
    setCurrentPage(1);
  };
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // Fetch customer details
  const {
    data: customerData,
    isLoading: isLoadingCustomer,
    error: customerError,
    refetch: refetchCustomer,
  } = useQuery({
    queryKey: ["customer-details", client_phone],
    queryFn: () => fetchCustomerDetails(client_phone),
    enabled: !!client_phone,
  });

  // Fetch orders for this customer using phone number search
  const {
    data: ordersData,
    refetch: refetchOrders,
    isLoading: isLoadingOrders,
    isFetching: isFetchingOrders,
    error: ordersError,
  } = useGetOrders({
    page: currentPage,
    size: pageSize,
    search: client_phone,
    business:selectedBusiness!,
    start_date: watch("date").from?.toISOString().split("T")[0],
    end_date: watch("date").to
      ? new Date((watch("date").to as Date).getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
      : undefined,
  });

  const handleRefresh = () => {
    refetchCustomer();
    refetchOrders();
  };

  if (isLoadingCustomer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={40} />
      </div>
    );
  }

  if (customerError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Customer
          </h2>
          <p className="text-gray-600 mb-4">
            Could not load customer details for phone: {client_phone}
          </p>
          <Button onClick={handleRefresh}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    // <div className="relative grid grid-rows-[max-content,1fr,max-content] w-full md:w-[95%] max-w-[1792px] mx-auto pb-3 max-h-full">
    <div className="relative w-full md:w-[95%] max-w-[1792px] mx-auto pb-3 max-h-full">
      {/* Customer Details Header */}
      <header className="pt-6 z-[2] bg-[#FAFAFA]">
        <div className="mb-6">
          <Card className="mb-4 max-w-[620px]">
            <CardContent className="!pt-6">
              <div className="flex items-stretch gap-4">
                <div className="flex items-center justify-center h-full min-h-[140px] aspect-square bg-[#F6F6F6] rounded-xl">
                  <User className="size-20 text-white" variant="Bold" />
                </div>
                <section className="grid grid-cols-[1fr,1.2fr] ">
                  {/* <div className="space-y-2"> */}
                  <p className="text-[#8388A2]">Client Name</p>
                  <p className="font-medium">
                    {customerData?.data?.[0]?.name || "N/A"}
                  </p>
                  {/* </div> */}
                  {/* <div className="space-y-2"> */}
                  <p className="text-[#8388A2]">Client Behavior</p>
                  <p className="font-medium">{"Returning Customer"}</p>
                  {/* </div> */}
                  {/* <div className="space-y-2"> */}
                  <p className="text-[#8388A2]">No. of Orders</p>
                  <p className="font-medium">{ordersData?.count || 0}</p>
                  {/* </div> */}
                  {/* <div className="space-y-2"> */}
                  <p className="text-[#8388A2]">Phone Number</p>
                  <p className="font-medium">{client_phone}</p>
                  {/* </div> */}

                  {customerData?.data?.[0]?.email && (
                    <>
                      <p className="text-[#8388A2]">Email</p>
                      <p className="font-medium">
                        {/* <Mail className="h-4 w-4" /> */}
                        {customerData?.data?.[0]?.email}
                      </p>
                    </>
                  )}
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </header>

      {/* Orders Section */}
      <section className="flex-grow overflow-auto w-full pt-6 pb-3">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              List of Orders
            </h2>
            <div className="text-sm text-gray-600 p-2">
              <p className="inline-block font-medium text-black">
                Showing orders for{" "}
                {customerData?.data?.[0]?.name || client_phone}
                {(watch("date.from")?.getTime() !== monthsAgo.getTime() ||
                  watch("date.to")?.getTime() !== tomorrow.getTime()) &&
                  ` placed between ${watch(
                    "date"
                  ).from?.toLocaleDateString()} and ${watch(
                    "date"
                  ).to?.toLocaleDateString()}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4 shrink-0">
            <Menubar className="!p-0">
              <MenubarMenu>
                <MenubarTrigger className="relative flex items-center gap-4 text-xs cursor-pointer text-[#8B909A] !h-10">
                  Filter orders by <ArrowDown2 size={16} />
                  {(selectedCategory ||
                    (selectedStatuses && selectedStatuses !== "")) && (
                    <Circle
                      size={10}
                      className="absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full"
                    />
                  )}
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger className="py-3 flex items-center gap-2">
                      <Calendar size={18} />
                      Date Range
                      {watch("date.from") &&
                        watch("date.to") &&
                        (watch("date.from")?.getTime() !==
                          monthsAgo.getTime() ||
                          watch("date.to")?.getTime() !==
                            tomorrow.getTime()) && (
                          <Circle
                            size={6}
                            className="absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full"
                          />
                        )}
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <Controller
                        control={control}
                        name="date"
                        render={({ field: { onChange, value } }) => (
                          <RangeDatePicker
                            className="max-w-[17.1875rem] border border-[#d6d6d6]/50 bg-white px-4 py-3 text-sm"
                            id="dateFilter"
                            placeholder="Select a date range"
                            placeholderClassName="text-[#556575]"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSub>
                    <MenubarSubTrigger className="relative py-3 flex items-center gap-2">
                      <Category2 size={18} />
                      Category
                      {selectedCategory && (
                        <Circle
                          size={6}
                          className="absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full"
                        />
                      )}
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {categories?.map((category) => (
                        <MenubarItem
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}
                        >
                          {selectedCategory === category.id && (
                            <Check className="mr-2 h-4 w-4" />
                          )}
                          {category.name}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSub>
                    <MenubarSubTrigger className="relative py-3 flex items-center gap-2">
                      <NotificationStatus size={18} />
                      Status
                      {selectedStatuses &&
                        selectedStatuses !== "PND,SOA,SOR" && (
                          <Circle
                            size={6}
                            className="absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full"
                          />
                        )}
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {ORDER_STATUS_OPTIONS.map((status, index) => {
                        return (
                          <React.Fragment key={index}>
                            {(status.value == "PND" ||
                              status.value == "SOA" ||
                              status.value == "SOR") && (
                              <MenubarItem
                                onClick={() => handleStatusChange(status.value)}
                              >
                                {selectedStatuses === status.value && (
                                  <Check className="mr-2 h-4 w-4" />
                                )}
                                {status.label}
                              </MenubarItem>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </MenubarSubContent>
                  </MenubarSub>

                  <UniversalFilters
                    selectedBusiness={selectedBusiness}
                    selectedRep={selectedRep}
                    selectedDeliveryZone={selectedDeliveryZone}
                    setSelectedBusiness={setSelectedBusiness}
                    setSelectedRep={setSelectedRep}
                    setSelectedDeliveryZone={setSelectedDeliveryZone}
                  />
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            {/* <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <RangeDatePicker
                  className="max-w-[17.1875rem] border border-[#d6d6d6]/50 bg-white px-4 py-3 text-sm"
                  id="dateFilter"
                  placeholder="Select a date range"
                  placeholderClassName="text-[#556575]"
                  value={value}
                  onChange={onChange}
                />
              )}
            /> */}
          </div>
        </div>

        <ClientOrdersTable
          data={ordersData?.data}
          isLoading={isLoadingOrders}
          isFetching={isFetchingOrders}
          error={ordersError}
          isFiltered={
            watch("date.from") !== monthsAgo || watch("date.to") !== tomorrow
          }
        />
      </section>

      {/* Pagination Footer */}
      <footer className="sticky bottom-0 bg-[#FAFAFA] ">
        <div className="flex items-center justify-between mt-auto py-1.5">
          <Pagination className="justify-start">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={
                    currentPage === 1
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {[...Array(ordersData?.number_of_pages || 0)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className={
                    currentPage === ordersData?.number_of_pages
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, ordersData?.number_of_pages || 1)
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="text-sm text-gray-500 w-max shrink-0">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, ordersData?.count || 0)} of{" "}
            {ordersData?.count || 0} entries
          </div>
        </div>
      </footer>
    </div>
  );
}
