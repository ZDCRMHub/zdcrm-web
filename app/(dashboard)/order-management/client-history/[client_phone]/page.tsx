"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { subMonths } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Controller, useForm } from "react-hook-form"
import { RefreshCcw, Phone, Mail, Calendar, ShoppingBag } from "lucide-react"

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
} from "@/components/ui"
import { APIAxios } from "@/utils/axios"

// Import the existing components
import ClientOrdersTable from "../misc/components/ClientOrdersTable"
import { useGetOrders } from "../../misc/api"
import { User } from "iconsax-react"

const today = new Date()
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
const monthsAgo = subMonths(new Date(), 20)

// Customer details fetch function
const fetchCustomerDetails = async (phone: string) => {
    const res = await APIAxios.get(`/customer/list-stats/?search=${phone}`)
    return res.data as APIResponse
}
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
    const params = useParams()
    const client_phone = params.client_phone as string

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const { control, watch } = useForm<{
        date: DateRange
    }>({
        defaultValues: {
            date: {
                from: monthsAgo,
                to: tomorrow,
            },
        },
    })

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
    })

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
        start_date: watch("date").from?.toISOString().split("T")[0],
        end_date: watch("date").to
            ? new Date((watch("date").to as Date).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]
            : undefined,
    })

    const handleRefresh = () => {
        refetchCustomer()
        refetchOrders()
    }

    if (isLoadingCustomer) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner size={40} />
            </div>
        )
    }

    if (customerError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Customer</h2>
                    <p className="text-gray-600 mb-4">Could not load customer details for phone: {client_phone}</p>
                    <Button onClick={handleRefresh}>Try Again</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="relative grid grid-rows-[max-content,1fr,max-content] w-full md:w-[95%] max-w-[1792px] mx-auto pb-3 max-h-full">
            {/* Customer Details Header */}
            <header className="sticky top-0 pt-6 z-[2] bg-[#FAFAFA]">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">Client History</h1>
                        <Button variant="outline" className="bg-[#28C76F] text-[#1EA566] bg-opacity-25" onClick={handleRefresh}>
                            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
                        </Button>
                    </div>

                    {/* Customer Info Card */}
                    <Card className="mb-6 max-w-[620px]">

                        <CardContent className="!pt-6">
                            <div className="flex items-stretch gap-4">
                                <div className="flex items-center justify-center h-full min-h-[180px] aspect-square bg-[#F6F6F6] rounded-xl">
                                    <User
                                        className="size-20 text-white"
                                        variant="Bold"
                                    />
                                </div>
                                <section className="grid grid-cols-2 ">
                                    {/* <div className="space-y-2"> */}
                                        <p className="text-[#8388A2]">Client Name</p>
                                        <p className="font-medium">{customerData?.data?.[0]?.name || "N/A"}</p>
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
                                        <p className="font-medium">
                                            {client_phone}
                                        </p>
                                    {/* </div> */}
                                </section>
                            </div>
                            {customerData?.data?.[0]?.email && (
                                <div className="mt-4 pt-4 border-t">
                                    <p className="text-sm text-gray-500 mb-1">Email</p>
                                    <p className="font-medium flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {customerData?.data?.[0]?.email}
                                    </p>
                                </div>
                            )}
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
                            List of Orders Assigned
                        </h2>
                        <div className="text-sm text-gray-600 p-2">
                            <p className="inline-block font-medium text-black">
                                Showing orders for {customerData?.data?.[0]?.name || client_phone}
                                {(watch("date.from")?.getTime() !== monthsAgo.getTime() ||
                                    watch("date.to")?.getTime() !== tomorrow.getTime()) &&
                                    ` placed between ${watch("date").from?.toLocaleDateString()} and ${watch("date").to?.toLocaleDateString()}`}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4 shrink-0">
                        <div className="flex items-center gap-2 shrink-0">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Date Range:</span>
                        </div>
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
                    </div>
                </div>

                <ClientOrdersTable
                    data={ordersData?.data}
                    isLoading={isLoadingOrders}
                    isFetching={isFetchingOrders}
                    error={ordersError}
                    isFiltered={watch("date.from") !== monthsAgo || watch("date.to") !== tomorrow}
                />
            </section>

            {/* Pagination Footer */}
            <footer className="sticky bottom-0">
                <div className="flex items-center justify-between mt-auto py-1.5">
                    <Pagination className="justify-start">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className={currentPage === 1 ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
                                />
                            </PaginationItem>
                            {[...Array(ordersData?.number_of_pages || 0)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={currentPage === index + 1}>
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    className={
                                        currentPage === ordersData?.number_of_pages ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                                    }
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, ordersData?.number_of_pages || 1))}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                    <div className="text-sm text-gray-500 w-max shrink-0">
                        Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, ordersData?.count || 0)} of{" "}
                        {ordersData?.count || 0} entries
                    </div>
                </div>
            </footer>
        </div>
    )
}
