"use client";

import React, { useState, useEffect } from "react";
import { Search, RefreshCcw } from 'lucide-react';
import {
  Button,
  Input,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  SelectSingleCombo,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui";
import StockInventoryTable from "./StockInventoryTable";
import TabBar from "@/components/TabBar";
import {
  STOCK_CATEGORIES_OPTIONS,
} from "@/constants";
import { ArrowDown2 } from "iconsax-react";
import { useGetStockInventory } from "../api";
import NewInventorySheet from "./StockInventoryNew";
import { useDebounce } from "@/hooks";

export default function StockInventoryDashboard() {
  const [activeTab, setActiveTab] = useState("All Stock Inventory");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedVariation, setSelectedVariation] = useState<string | undefined>();

  const debouncedSearchText = useDebounce(searchText, 300);

  const { data, isLoading, isFetching, error, refetch } = useGetStockInventory({
    page: currentPage,
    size: pageSize,
    search: debouncedSearchText,
    category: selectedCategory,
    variation: selectedVariation,
  });

  const tabs = [{ name: "All Stock Inventory", count: data?.count || 0 }];

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

  const handleVariationChange = (variation: string) => {
    setSelectedVariation(variation);
    setCurrentPage(1);
  };

  return (
    <div className="relative flex flex-col gap-4 w-full md:w-[92.5%] max-w-[1792px] mx-auto pb-6 max-h-full">
      <div className="sticky top-0 flex justify-between items-center mb-10 gap-4 pt-6 z-[2]">
        <div className="flex items-center gap-2 w-80 grow">
          <Input
            type="text"
            placeholder="Search (stock name, description)"
            className="w-full focus:border min-w-[350px] text-xs !h-10"
            value={searchText}
            onChange={handleSearch}
            rightIcon={<Search className="h-5 w-5 text-[#8B909A]" />}
          />

         
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-4 text-xs cursor-pointer text-[#8B909A]">
                Filter by Category <ArrowDown2 size={16} />
              </MenubarTrigger>
              <MenubarContent>
                {STOCK_CATEGORIES_OPTIONS.map((category) => (
                  <MenubarSub key={category.value}>
                    <MenubarSubTrigger className="py-3 flex items-center gap-2">
                      {category.label}
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {/* {category.variations.map((variation) => ( */}
                        <MenubarItem key={category.value} onClick={() => handleVariationChange(category.value)}>
                          {category.label}
                        </MenubarItem>
                      {/* ))} */}
                    </MenubarSubContent>
                  </MenubarSub>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="flex items-center gap-2">
          <NewInventorySheet />
          <Button
            variant="outline"
            className="bg-[#28C76F] text-[#1EA566] bg-opacity-25"
            onClick={handleRefresh}
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>

      <section>
        {debouncedSearchText && <h3 className="mb-4">Search Results</h3>}
        <TabBar
          tabs={tabs}
          onTabClick={setActiveTab}
          activeTab={activeTab}
        />
        <StockInventoryTable data={data?.data} isLoading={isLoading} isFetching={isFetching} error={error} />
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

