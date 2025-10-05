'use client';

import React, { useState } from 'react';
import {
  Search,
  RefreshCcw,
} from 'lucide-react';

import { Input, SelectSingleCombo, Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, RangeAndCustomDatePicker } from "@/components/ui"
import { Button } from '@/components/ui';
import TabBar from '@/components/TabBar';
import { useDebounce } from '@/hooks';
import { useGetAllBranches } from '@/app/(dashboard)/admin/businesses/misc/api';

import ProductsInventoryTable from './ProductsInventoryTable';
import { useGetProductCategories, useGetProductsInventory } from '../api';
import NewProductInventorySheet from './ProductsInventoryNew';
import { useForm } from 'react-hook-form';
import { subMonths } from 'date-fns';
import { DateRange } from 'react-day-picker';



export default function ProductsInventoryDashboard() {
  const { data: branches, isLoading: branchesLoading } = useGetAllBranches();
  const { data: categories, isLoading: categoriesLoading } = useGetProductCategories();


  const [searchText, setSearchText] = useState("")
  const debouncedSearchText = useDebounce(searchText, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedBranch, setSelectedBranch] = useState<number | undefined>();

  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const monthsAgo = subMonths(new Date(), 20);


  const { control, watch, setValue } = useForm<{
    branch?: string;
    date: DateRange;
    period: "today" | "week" | "month" | "year" | "custom";
  }>({
    defaultValues: {
      branch: "all",
      date: {
        from: monthsAgo,
        to: tomorrow,
      },
      period: 'today',
    },
  });

  const { data, isLoading, isFetching, error, refetch } = useGetProductsInventory({
    page: currentPage,
    size: pageSize,
    search: debouncedSearchText,
    category: selectedCategory,
    branch: selectedBranch,
    date_from: watch('date').from?.toISOString().split('T')[0],
    date_to: watch('date').to?.toISOString().split('T')[0],
    period: watch('period'),
  });




  const handleRefresh = () => {
    refetch();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleBranchChange = (branch: number) => {
    setSelectedBranch(branch);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedBranch(undefined);
    setSelectedCategory(undefined);
    setSearchText("");
    setCurrentPage(1);
  }

  return (
    <div className='relative grid grid-rows-[max-content,1fr,max-content] w-full md:w-[95%] max-w-[1792px] mx-auto pb-3 max-h-full'>
      <header className='sticky top-0  pt-6 z-[2] bg-[#FAFAFA]'>
        <div className='sticky top-0 flex justify-between items-center mb-8 gap-4 pt-6 z-[2]'>
          <div className='flex items-center gap-2 w-80 grow'>
            <Input
              type='text'
              placeholder="Search by product name or inventory number"
              className='w-full focus:border min-w-[350px] text-xs !h-10'
              value={searchText}
              onChange={handleSearch}
              rightIcon={<Search className='h-5 w-5 text-[#8B909A]' />}
            />

            <SelectSingleCombo
              name='filterBy'
              options={branches?.data.map((branch) => ({ value: branch.id.toString(), label: branch.name })) || []}
              value={selectedBranch?.toString() || ""}
              onChange={(value) => handleBranchChange(Number(value))}
              valueKey='value'
              labelKey='label'
              isLoadingOptions={branchesLoading}
              placeholder='Filter by branch'
              className='w-32 !h-10 text-[#8B909A] text-xs'
              placeHolderClass='text-[#8B909A] text-xs'
              triggerColor='#8B909A'
              showSelectedValue={false}
            />
            
            <SelectSingleCombo
              name='category-filter'
              options={categories?.map((category) => ({ value: category.id.toString(), label: category.name })) || []}
              isLoadingOptions={categoriesLoading}
              value={selectedCategory?.toString() || ""}
              onChange={(value) => handleCategoryChange(Number(value))}
              valueKey='value'
              labelKey='label'
              placeholder='Sort by'
              className='w-32 !h-10 text-[#8B909A] text-xs'
              placeHolderClass='text-[#8B909A] text-xs'
              triggerColor='#8B909A'
            />
          </div>
          <div className='flex items-center gap-2'>
            <RangeAndCustomDatePicker
              className="max-w-max"
              variant="light"
              size="thin"
              onChange={(value) => {
                if (value.dateType === 'custom' && value.from && value.to) {
                  setValue('date', { from: value.from, to: value.to });
                  setValue('period', 'custom');
                } else {
                  setValue('period', value.dateType as "today" | "week" | "month" | "year" | "custom");
                }
              }}
              value={{
                dateType: watch('period'),
                from: watch('date').from,
                to: watch('date').to
              }}
            />
            <NewProductInventorySheet />
            {
              (selectedBranch || selectedCategory || debouncedSearchText) && (
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
        </div>
      </header>

      <section className="flex-grow overflow-auto w-full pt-6 pb-3">
        {debouncedSearchText && <h3 className="mb-4">Search Results</h3>}
        <TabBar tabs={[{ name: 'All Inventory', count: data?.count || 0 }]} onTabClick={() => { }} activeTab={'All Inventory'} />
        <ProductsInventoryTable
          data={data?.data}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
          refetch={refetch}
        />
      </section>

      <footer className="sticky bottom-0">
        <div className="flex items-center justify-between mt-auto bg-background py-1.5">
          <Pagination className="justify-start bg-background">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? 'disabled' : ''}
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
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data?.number_of_pages || 1))}
                // disabled={currentPage === data?.number_of_pages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-sm text-gray-500 w-max shrink-0">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, data?.count || 0)} of {data?.count || 0} entries
          </div>
        </div>
      </footer>
    </div>
  );
}
