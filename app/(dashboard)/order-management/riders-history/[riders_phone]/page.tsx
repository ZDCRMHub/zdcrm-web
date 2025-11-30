"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { subMonths } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Controller, useForm } from "react-hook-form";
import { RefreshCcw, Phone, Mail, Calendar, ShoppingBag } from "lucide-react";

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
} from "@/components/ui";
import { APIAxios } from "@/utils/axios";

// Import the existing components
import RiderOrdersTable from "../misc/components/RiderOrdersTable";
import { useGeTOrders, useGetRiderOrders } from "../../misc/api";
import { User } from "iconsax-react";

const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const monthsAgo = subMonths(new Date(), 20);

// Rider details fetch function
const fetchRiderDetails = async (id: string) => {
  const res = await APIAxios.get(`/order/rider-details/${id}`);
  return res.data as APIResponse;
};
interface APIResponse {
  data: Customer[];
  next_page: null;
  previous_page: null;
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
  const riders_phone = params.riders_phone as string;

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

  const {
    data,
    isLoading: isLoadingRiderInfo,
    refetch: refetchRiderData,
    error: riderError,
  } = useGetRiderOrders(riders_phone);
  // Fetch orders for this customer using phone number search
  const {
    data: ordersData,
    refetch: refetchOrders,
    isLoading: isLoadingOrders,
    isFetching: isFetchingOrders,
    error: ordersError,
  } = useGeTOrders({
    page: currentPage,
    size: pageSize,
    search: riders_phone,
    start_date: watch("date").from?.toISOString().split("T")[0],
    end_date: watch("date").to
      ? new Date((watch("date").to as Date).getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
      : undefined,
  });

  const handleRefresh = () => {
    refetchRiderData();
    refetchOrders();
  };

  if (isLoadingRiderInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={40} />
      </div>
    );
  }

  if (riderError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Customer
          </h2>
          <p className="text-gray-600 mb-4">
            Could not load riders details for phone: {riders_phone}
          </p>
          <Button onClick={handleRefresh}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid grid-rows-[max-content,1fr,max-content] w-full md:w-[95%] max-w-[1792px] mx-auto pb-3 max-h-full">
      {/* Customer Details Header */}
      <header className="sticky top-0 pt-6 z-[2] bg-[#FAFAFA]">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Client History</h1>
            <Button
              variant="outline"
              className="bg-[#28C76F] text-[#1EA566] bg-opacity-25"
              onClick={handleRefresh}
            >
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>

          {/* Customer Info Card */}
        
        </div>
      </header>

      {/* Orders Section */}
     

      {/* Pagination Footer */}
      <footer className="sticky bottom-0">
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
