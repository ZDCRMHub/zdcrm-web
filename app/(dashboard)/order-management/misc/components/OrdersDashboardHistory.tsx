'use client';

import React, { useState } from 'react';
import { ArrowDown2, Calendar, Category2, NotificationStatus, } from 'iconsax-react';
import { Controller, useForm } from 'react-hook-form';
import {
  Search,
  Plus,
  RefreshCcw,
  Check,
  Circle,
} from 'lucide-react';
import { subMonths } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, Input, Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext, RangeDatePicker } from "@/components/ui"
import { LinkButton, Button } from '@/components/ui';
import TabBar from '@/components/TabBar';
import { useGetCategories } from '@/app/(dashboard)/inventory/misc/api';
import { useDebounce } from '@/hooks';
import { ORDER_STATUS_OPTIONS } from '@/constants';

import { useGeTOrders } from '../api';
import OrdersTableHistory from './OrdersTableHistory';
import UniversalFilters from '@/components/UniversalFilters';


const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const monthsAgo = subMonths(new Date(), 20);

export default function OrdersDashboardHistory() {
  const [searchText, setSearchText] = useState("")
  const debouncedSearchText = useDebounce(searchText, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const defaultStatuses = 'COM,CAN'
  const [selectedStatuses, setSelectedStatuses] = useState<string | undefined>(defaultStatuses);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [selectedRep, setSelectedRep] = useState<number | null>(null);
  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState<string | null>(null);

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

  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { data, refetch, isLoading, isFetching, error } = useGeTOrders({
    page: currentPage,
    size: pageSize,
    search: searchText,
    status: selectedStatuses,
    category: selectedCategory,
    start_date: watch('date').from?.toISOString().split('T')[0],
    end_date: watch('date').to ? new Date((watch('date').to as Date).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
    business: selectedBusiness!,
  })

  const handleRefresh = () => {
    refetch();
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };
  const handleStatusChange = (status: string) => {
    setSelectedStatuses(status);
    setCurrentPage(1);
  }

  const isFiltered = debouncedSearchText || selectedCategory || watch('date').from || watch('date').to || selectedStatuses;
  const clearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedStatuses(defaultStatuses);
    setSearchText("");
    setCurrentPage(1);
    setValue('date', {
      from: monthsAgo,
      to: tomorrow,
    });
  }



  return (
    <div className='relative grid grid-rows-[max-content,1fr,max-content] w-full md:w-[95%] max-w-[1792px] mx-auto pb-3 max-h-full'>

      <header className='sticky top-0  pt-6 z-[2] bg-[#FAFAFA]'>
        <section className=' flex justify-between items-center gap-4'>
          <div className='flex items-center gap-2 w-80 grow'>
            <Input
              type='text'
              placeholder='Search (order number, items name, customer name and phone number)'

              className='w-full focus:border min-w-[350px] text-xs !h-10'
              value={searchText}
              onChange={handleSearch}
              rightIcon={<Search className='h-5 w-5 text-[#8B909A]' />}
            />
            <Menubar className='!p-0'>
              <MenubarMenu >
                <MenubarTrigger className="relative flex items-center gap-4 text-xs cursor-pointer text-[#8B909A] !h-10">
                  Filter orders by <ArrowDown2 size={16} />
                  {
                    (selectedCategory || debouncedSearchText || (selectedStatuses && selectedStatuses !== defaultStatuses)) &&
                    <Circle size={10} className='absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full' />
                  }
                </MenubarTrigger>
                <MenubarContent>

                  <MenubarSub>
                    <MenubarSubTrigger className="py-3 flex items-center gap-2">
                      <Calendar size={18} />Date Range
                      {
                        watch('date.from') && watch('date.to') && (watch('date.from')?.getTime() !== monthsAgo.getTime() || watch('date.to')?.getTime() !== tomorrow.getTime()) &&
                        <Circle size={6} className='absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full' />
                      }
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
                    <MenubarSubTrigger className="relative py-3 flex items-center gap-2"><Category2 size={18} />
                      Category
                      {
                        selectedCategory && <Circle size={6} className='absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full' />
                      }
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {
                        categories?.map((category) => (
                          <MenubarItem key={category.id} onClick={() => handleCategoryChange(category.id)}>
                            {
                              selectedCategory === category.id && <Check className='mr-2 h-4 w-4' />
                            }
                            {category.name}
                          </MenubarItem>
                        ))
                      }
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSub>
                    <MenubarSubTrigger className="relative py-3 flex items-center gap-2">
                      <NotificationStatus size={18} />Status
                      {
                        ((selectedStatuses && selectedStatuses !== defaultStatuses)) &&
                        <Circle size={6} className='absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full' />
                      }
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {
                        ORDER_STATUS_OPTIONS.map((status, index) => {
                          return (
                            <React.Fragment key={index}>
                              {
                                (status.value == "CAN" || status.value == "COM") &&
                                <MenubarItem
                                  onClick={() => handleStatusChange(status.value)}
                                >
                                  {
                                    selectedStatuses === status.value && <Check className='mr-2 h-4 w-4' />
                                  }
                                  {status.label}
                                </MenubarItem>
                              }
                            </React.Fragment>
                          )
                        })
                      }
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
          </div>
          <div className='flex items-center gap-2'>
            {
              isFiltered && (
                <Button
                  variant='outline'
                  className='bg-[#FF4D4F] text-[#FF4D4F] bg-opacity-25'
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )
            }

            <Button
              variant='outline'
              className='bg-[#28C76F] text-[#1EA566] bg-opacity-25'
              onClick={handleRefresh}
            >
              <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
            </Button>
          </div>
        </section>
        <div className="text-sm text-gray-600 my-2">
          Showing orders {" "}
          <p className='inline-block font-medium text-black'>
            {selectedStatuses && selectedStatuses !== defaultStatuses && ` with statuses: ${selectedStatuses.split(',').map(s => ORDER_STATUS_OPTIONS.find(o => o.value === s)?.label).join(', ')},`}
            {selectedCategory && ` from category: ${categories?.find(c => c.id === selectedCategory)?.name},`}
            {(watch('date.from')?.getTime() !== monthsAgo.getTime() || watch('date.to')?.getTime() !== tomorrow.getTime()) && ` placed between ${watch('date').from?.toLocaleDateString()} and ${watch('date').to?.toLocaleDateString()}`}
          </p>
        </div>
      </header>


      <section className="flex-grow overflow-auto w-full pt-6 pb-3">
        {debouncedSearchText && <h3 className="mb-4">Search Results</h3>}
        <TabBar tabs={[{ name: 'All Orders', count: data?.count || 0 }]} onTabClick={() => { }} activeTab={'All Orders'} />
        <OrdersTableHistory
          data={data?.data}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
          isFiltered={!!selectedCategory || !!debouncedSearchText || (selectedStatuses && selectedStatuses !== defaultStatuses) || watch('date.from') !== monthsAgo || watch('date.to') !== tomorrow}
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
              {[...Array(data?.number_of_pages || 0)].map((_, index) => (
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
                  className={currentPage === data?.number_of_pages ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data?.number_of_pages || 1))}
                // disabled={currentPage === data?.number_of_pages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <section>
            <div>

            </div>

            <div className="text-sm text-gray-500 w-max shrink-0">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, data?.count || 0)} of {data?.count || 0} entries
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
