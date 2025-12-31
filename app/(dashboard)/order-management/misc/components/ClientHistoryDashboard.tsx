"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  RefreshCcw,
  Download,
  Circle,
  Calendar,
  Bike,
  Check,
  User,
} from "lucide-react";
import { subMonths } from "date-fns";

import {
  Input,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  RangeDatePicker,
  Button,
  LinkButton,
  MenubarSub,
  Menubar,
  MenubarMenu,
  MenubarContent,
  MenubarItem,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui";
import TabBar from "@/components/TabBar";
import { useGetCategories } from "@/app/(dashboard)/inventory/misc/api";
import { useDebounce } from "@/hooks";

import { useGetCustomerHistory } from "../api";
import ClientHistoryTable from "./ClientHistoryTable";
import { ArrowDown2 } from "iconsax-react";
import { Controller, useForm } from "react-hook-form";
import { DateRange } from "react-day-picker";
import {
  monthsAgo,
  tomorrow,
} from "../../riders-history/misc/components/RidersHistoryDashboard";
import UniversalFilters from "@/components/UniversalFilters";

export default function ClientHistoryDashboard() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedClientBehaviour, setSelectedClientBehaviour] = useState<
    string | undefined
  >();
  const { control, register, setValue, watch } = useForm<{
    date: DateRange;
  }>({
    defaultValues: {
      date: {
        from: monthsAgo,
        to: tomorrow,
      },
    },
  });

  const {
    data: customers,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useGetCustomerHistory({
    page: currentPage,
    size: pageSize,
    search: searchText,
    client_behaviour: selectedClientBehaviour,
  });

  const clientBehaviours = [
    { id: 1, name: "First Time" },
    { id: 2, name: "Returning" },
    { id: 3, name: "Frequent" },
    { id: 4, name: "Quiet" },
  ];
  
  const handleRefresh = () => {
    refetch();
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchText("");
    setCurrentPage(1);
    setSelectedClientBehaviour(undefined);
    setValue("date", {
      from: monthsAgo,
      to: tomorrow,
    });
  };

  // CSV Download function
  const downloadCSV = () => {
    if (!customers?.data || customers.data.length === 0) {
      alert("No data available to download");
      return;
    }

    // Define CSV headers
    const headers = [
      "Client Name",
      "Phone Number",
      "Email Address",
      "Client Behaviour",
      "Last Order Date",
      "Number of Orders",
      "Total Amount Spent",
      "Created Date",
      "Last Updated",
    ];

    // Convert data to CSV format
    const csvContent = [
      headers.join(","),
      ...customers.data.map((customer) =>
        [
          `"${customer.name}"`,
          `"${customer.phone}"`,
          `"${customer.email}"`,
          `"${customer.client_behaviour}"`,
          `"${new Date(customer.last_order_date).toLocaleDateString()}"`,
          customer.orders_count,
          `"${customer.total_amount_spent}"`,
          `"${new Date(customer.create_date).toLocaleDateString()}"`,
          `"${new Date(customer.update_date).toLocaleDateString()}"`,
        ].join(",")
      ),
    ].join("\n");

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `client-history-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="relative grid grid-rows-[max-content,1fr,max-content] w-full md:w-[95%] max-w-[1792px] mx-auto pb-3 max-h-full">
      <header className="sticky top-0  pt-6 z-[2] bg-[#FAFAFA]">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-80 grow">
            <Input
              type="text"
              placeholder="Search (client name,  phone number)"
              className="w-full focus:border min-w-[350px] text-xs !h-10"
              value={searchText}
              onChange={handleSearch}
              rightIcon={<Search className="h-5 w-5 text-[#8B909A]" />}
            />
            <Menubar className="!p-0">
              <MenubarMenu>
                <MenubarTrigger className="relative flex items-center gap-4 text-xs cursor-pointer text-[#8B909A] !h-10">
                  Filter orders by <ArrowDown2 size={16} />
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
                      <User size={18} />
                      Client Behaviour
                      {selectedClientBehaviour && (
                        <Circle
                          size={6}
                          className="absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full"
                        />
                      )}
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {clientBehaviours?.map((business) => (
                        <MenubarItem
                          key={business.id}
                          onClick={() => setSelectedClientBehaviour(business.name)}
                        >
                          {selectedClientBehaviour === business.name && (
                            <Check className="mr-2 h-4 w-4" />
                          )}
                          {business.name}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <div className="flex items-center gap-2">
            {debouncedSearchText && (
              <Button
                variant="outline"
                className="bg-[#FF4D4F] text-[#FF4D4F] bg-opacity-25"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}

            <Button
              variant="outline"
              className="bg-[#28C76F] text-[#1EA566] bg-opacity-25"
              onClick={handleRefresh}
            >
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>

            <Button
              variant="outline"
              className="bg-[#007ACC] text-[#005299] bg-opacity-25"
              onClick={downloadCSV}
              disabled={!customers?.data || customers.data.length === 0}
            >
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-600 p-2">
          Showing customers{" "}
          <p className="inline-block font-medium text-black"></p>
        </div>
      </header>

      <section className="flex-grow overflow-auto w-full pt-6 pb-3">
        {debouncedSearchText && <h3 className="mb-4">Search Results</h3>}
        <TabBar
          tabs={[{ name: "All Clients", count: customers?.count || 0 }]}
          onTabClick={() => { }}
          activeTab={"All Orders"}
        />
        <ClientHistoryTable
          data={customers?.data}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
          isFiltered={!!debouncedSearchText}
        />
      </section>

      <footer className="sticky bottom-0">
        <div className="flex items-center justify-between mt-auto py-1.5">
          <Pagination className="justify-start ">
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
              {[...Array(customers?.number_of_pages || 0)].map((_, index) => (
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
                    currentPage === customers?.number_of_pages
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, customers?.number_of_pages || 1)
                    )
                  }
                // disabled={currentPage === data?.number_of_pages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <section>
            <div></div>

            <div className="text-sm text-gray-500 w-max shrink-0">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, customers?.count || 0)} of{" "}
              {customers?.count || 0} entries
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
