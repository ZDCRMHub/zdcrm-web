'use client';

import React, { useState } from 'react';
import {
  Search,
  Plus,
  RefreshCcw,
} from 'lucide-react';
import { subMonths } from 'date-fns';

import { Input, Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext, RangeDatePicker } from "@/components/ui"
import { LinkButton, Button } from '@/components/ui';
import TabBar from '@/components/TabBar';
import { useGetCategories } from '@/app/(dashboard)/inventory/misc/api';
import { useDebounce } from '@/hooks';

import { useGetCustomerHistory } from '../api';
import ClientHistoryTable from './ClientHistoryTable';



export default function ClientHistoryDashboard() {
  const [searchText, setSearchText] = useState("")
  const debouncedSearchText = useDebounce(searchText, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: customers, isLoading, isFetching, refetch, error } = useGetCustomerHistory({
    page: currentPage,
    size: pageSize,
    search: searchText,
  })

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

  }



  return (
    <div className='relative grid grid-rows-[max-content,1fr,max-content] w-full md:w-[95%] max-w-[1792px] mx-auto pb-3 max-h-full'>
      <header className='sticky top-0  pt-6 z-[2] bg-[#FAFAFA]'>
        <div className="flex justify-between items-center gap-4">
          <div className='flex items-center gap-2 w-80 grow'>
            <Input
              type='text'
              placeholder='Search (client name, customer rep, phone number)'
              className='w-full focus:border min-w-[350px] text-xs !h-10'
              value={searchText}
              onChange={handleSearch}
              rightIcon={<Search className='h-5 w-5 text-[#8B909A]' />}
            />

          </div>
          <div className='flex items-center gap-2'>
            {
              debouncedSearchText && (
                <Button
                  variant='outline'
                  className='bg-[#FF4D4F] text-[#FF4D4F] bg-opacity-25'
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )
            }
            <LinkButton href="./orders/new-order" variant='default' className='bg-black text-white'>
              <Plus className='mr-2 h-4 w-4' /> Add Order
            </LinkButton>
            <Button
              variant='outline'
              className='bg-[#28C76F] text-[#1EA566] bg-opacity-25'
              onClick={handleRefresh}
            >
              <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-600 p-2">
          Showing customers {" "}
          <p className='inline-block font-medium text-black'>
          </p>
        </div>

      </header>

      <section className="flex-grow overflow-auto w-full pt-6 pb-3">
        {debouncedSearchText && <h3 className="mb-4">Search Results</h3>}
        <TabBar tabs={[{ name: 'All Clients', count: customers?.count || 0 }]} onTabClick={() => { }} activeTab={'All Orders'} />
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
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
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
                  className={currentPage === customers?.number_of_pages ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, customers?.number_of_pages || 1))}
                // disabled={currentPage === data?.number_of_pages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <section>
            <div>

            </div>

            <div className="text-sm text-gray-500 w-max shrink-0">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, customers?.count || 0)} of {customers?.count || 0} entries
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
