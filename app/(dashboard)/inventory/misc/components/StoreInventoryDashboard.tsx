"use client";

import React, { useState } from "react";
import { Search, Plus, RefreshCcw } from "lucide-react";
import {
  Input,
  SelectSingleCombo,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui";
import { LinkButton, Button } from "@/components/ui";
import StoreInventoryTable from "./StoreInventoryTable";
import TabBar from "@/components/TabBar";
import { BRANCH_OPTIONS, CATEGORIES_OPTIONS } from "@/constants";
import { useGetCategories, useGetStoreInventory } from "../api";
import { useDebounce } from "@/hooks";
import { useGetAllBranches } from "@/app/(dashboard)/admin/branches/misc/api";
import NewStoreInventorySheet from "./StoreInventoryNew";

export default function StoreInventoryDashboard() {

  const { data: categories, isLoading: categoriesLoading } = useGetCategories();


  const [searchText, setSearchText] = useState("")
  const [sortBy, setSortBy] = useState('All Orders');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();

  const debouncedSearchText = useDebounce(searchText, 300);

  const { data, isLoading, isFetching, error, refetch } = useGetStoreInventory({
    page: currentPage,
    size: pageSize,
    search: debouncedSearchText,
    category: selectedCategory,
  });
  const tabs = [{ name: "All Inventory", count: data?.count || 0 }];
  const [activeTab, setActiveTab] = useState(tabs[0].name);
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

  const clearFilters = () => {
    setSelectedCategory(undefined);
    setSearchText("");
    setCurrentPage(1);
  }



  return (
    <div className="relative flex flex-col gap-4 w-full md:w-[92.5%] max-w-[1792px] mx-auto pb-6 max-h-full">
      <div className="sticky top-0 flex justify-between items-center mb-10 gap-4 pt-6 z-[2]">
        <div className="flex items-center gap-2 w-80 grow">
          <Input
            type="text"
            placeholder="Search (client name, customer rep, phone number)"
            className="w-full focus:border min-w-[350px] text-xs !h-10"
            value={searchText}
            onChange={handleSearch}
            rightIcon={<Search className="h-5 w-5 text-[#8B909A]" />}
          />
{/* 
          <SelectSingleCombo
            name="filterBy"
            options={categories?.map((category) => ({ value: category.id.toString(), label: category.name })) || []}
            isLoadingOptions={categoriesLoading}
            value={selectedCategory?.toString() || ""}
            onChange={(value) => handleCategoryChange(Number(value))}
            valueKey="value"
            labelKey="label"
            placeholder="Filter by branch"
            className="w-32 !h-10 text-[#8B909A] text-xs"
            placeHolderClass="text-[#8B909A] text-xs"
            triggerColor="#8B909A"
          /> */}

        </div>
        <div className='flex items-center gap-2'>
          <NewStoreInventorySheet />

          {
            (selectedCategory || debouncedSearchText) && (
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

      <section>
        {debouncedSearchText && <h3 className="mb-4">Search Results</h3>}
        <TabBar tabs={tabs} onTabClick={setActiveTab} activeTab={activeTab} />
        <StoreInventoryTable data={data?.data} isLoading={isLoading} isFetching={isFetching} error={error} />
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
