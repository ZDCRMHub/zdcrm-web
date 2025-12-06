'use client';

import React, { useState } from 'react';
import { Search, Plus, RefreshCcw, Check, } from 'lucide-react';
import { format, subMonths } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Controller, useForm } from 'react-hook-form';
import { ArrowDown2, Calendar, Category2, NotificationStatus, TickCircle } from 'iconsax-react';

import { Button } from '@/components/ui/button';
import { LinkButton } from '@/components/ui';
import TabBar from '@/components/TabBar';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, RangeAndCustomDatePicker, Input, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, SelectSingleCombo, RangeDatePicker } from "@/components/ui"
import { useDebounce } from '@/hooks';
import { useGetCategories } from '@/app/(dashboard)/inventory/misc/api';

import EnquiriesTable from './EnquiriesTable';
import { useGetEnquiries } from '../api';
import UniversalFilters from '@/components/UniversalFilters';


const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const monthsAgo = subMonths(new Date(), 20);

export default function EnquiriesDashboard() {
  const [searchText, setSearchText] = useState("")
  const debouncedSearchText = useDebounce(searchText, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedStatuses, setSelectedStatuses] = useState<string | undefined>('STD,FND');
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
  const { data, refetch, isLoading, isFetching, error } = useGetEnquiries({
    page: currentPage,
    size: pageSize,
    search: searchText,
    status: selectedStatuses,
    category: selectedCategory,
    start_date: watch('date').from?.toISOString().split('T')[0],
    end_date: watch('date').to ? new Date((watch('date').to as Date).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
    sort_by_create_date: true,
    // end_date: watch('date').to?.toISOString().split('T')[0],
    business: selectedBusiness
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

  const clearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedStatuses('STD,FND');
    setSearchText("");
    setCurrentPage(1);
    setValue('date', {
      from: monthsAgo,
      to: tomorrow,
    });

    setSelectedRep(null);
    setSelectedDeliveryZone(null);
    setSelectedDeliveryZone(null);
  }



  return (
    <div className='relative flex flex-col gap-4 w-full md:w-[92.5%] max-w-[1792px] mx-auto pb-6 min-h-full max-h-full'>
      <div className='flex justify-between items-center mb-6 gap-4 pt-4'>
        <div className='flex items-center gap-2 w-80 grow'>
          <Input
            type='text'
            placeholder='Search (client name, customer rep, phone number)'
            className='w-full focus:border min-w-[350px] text-xs !h-10'
            value={searchText}
            onChange={handleSearch}
            rightIcon={<Search className='h-5 w-5 text-[#8B909A]' />}
          />
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-4 text-xs cursor-pointer text-[#8B909A]">Filter enquiries by <ArrowDown2 size={16} /></MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2"><Calendar size={18} />Date Range</MenubarSubTrigger>
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
                  <MenubarSubTrigger className="py-3 flex items-center gap-2"><Category2 size={18} />Category</MenubarSubTrigger>
                  <MenubarSubContent>
                    {
                      categories?.map((category) => (
                        <MenubarItem key={category.id} onClick={() => handleCategoryChange(category.id)}>
                          {category.name}
                        </MenubarItem>
                      ))
                    }
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2">
                    <NotificationStatus size={18} />
                    Status
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={() => handleStatusChange('STD')}>
                      {
                        selectedStatuses == "STD" && <Check className="mr-2 size-4" />
                      }
                      Started Discussion</MenubarItem>
                    <MenubarItem onClick={() => handleStatusChange('FND')}>
                      {
                        selectedStatuses == "FND" && <Check className="mr-2 size-4" />
                      }
                      Finalized Discussion</MenubarItem>
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
            (debouncedSearchText || (selectedStatuses && selectedStatuses !== 'STD,FND')) && (
              <Button
                variant='outline'
                className='bg-[#FF4D4F] text-[#FF4D4F] bg-opacity-25'
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )
          }
          <LinkButton href="./enquiries/new-enquiry" variant='default' className='bg-black text-white'>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </LinkButton>

          <Button
            variant='outline'
            className='bg-[#28C76F]  hover:bg-[#28C76F]  text-[#1EA566] bg-opacity-25 !border-none outline-none'
            onClick={handleRefresh}
          >
            <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
          </Button>
        </div>
      </div>

      <section>
        {debouncedSearchText && <h3 className="mb-4">Search Results</h3>}
        <TabBar tabs={[{ name: 'All Enquiries', count: data?.count || 0 }]} onTabClick={() => { }} activeTab={'All Enquiries'} />
        <EnquiriesTable
          data={data?.data}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
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
