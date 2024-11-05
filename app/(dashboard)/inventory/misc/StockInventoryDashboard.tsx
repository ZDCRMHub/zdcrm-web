"use client";

import React, { useState } from "react";
import { Search, Plus, RefreshCcw } from "lucide-react";
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
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui";
import StockInventoryTable from "./StockInventoryTable";
import TabBar from "@/components/TabBar";
import {
  BRANCH_OPTIONS,
  CATEGORIES_OPTIONS,
  STOCK_CATEGORIES_OPTIONS,
} from "@/constants";
import NewInventorySheet from "../stock-inventory/misc/components/NewInventorySheet";
import { ArrowDown2 } from "iconsax-react";

export default function StockInventoryDashboard() {
  const tabs = [{ name: "All Stock Inventory", count: 450 }];

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("All Orders");

  return (
    <div className="relative flex flex-col gap-4 w-full md:w-[92.5%] max-w-[1792px] mx-auto pb-6 max-h-full">
      <div className="sticky top-0 flex justify-between items-center mb-10 gap-4 pt-6 z-[2]">
        <div className="flex items-center gap-2 w-80 grow">
          <Input
            type="text"
            placeholder="Search (client name, customer rep, phone number)"
            className="w-full focus:border min-w-[350px] text-xs !h-10"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            rightIcon={<Search className="h-5 w-5 text-[#8B909A]" />}
          />

          <SelectSingleCombo
            name="filterBy"
            options={BRANCH_OPTIONS}
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            valueKey="value"
            labelKey="label"
            placeholder="Filter by branch"
            className="w-32 !h-10 text-[#8B909A] text-xs"
            placeHolderClass="text-[#8B909A] text-xs"
            triggerColor="#8B909A"
            showSelectedValue={false}
          />
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-4 text-xs cursor-pointer text-[#8B909A]">
                Filter by Variation <ArrowDown2 size={16} />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2">
                    {/* <Category2 size={18} /> */}
                    Cakes
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>6 inches</MenubarItem>
                    <MenubarItem>8 inches</MenubarItem>
                    <MenubarItem>12 inches</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2">
                    {/* <NotificationStatus size={18} /> */}
                    Cup Cakes
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Red Velvet</MenubarItem>
                    <MenubarItem>Vanilla</MenubarItem>
                    <MenubarItem>Chocolate</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2">
                    {/* <Location size={18} /> */}
                    Flowers
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Red</MenubarItem>
                    <MenubarItem>White</MenubarItem>
                    <MenubarItem>Pink</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="flex items-center gap-2">
          <NewInventorySheet />
          <Button
            variant="outline"
            className="bg-[#28C76F] text-[#1EA566] bg-opacity-25"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>

      <section>
        {searchText.trim() !== "" && <h3 className="mb-4">Search Results</h3>}
        {searchText.trim() === "" ? (
          <>
            <TabBar
              tabs={tabs}
              onTabClick={setActiveTab}
              activeTab={activeTab}
            />
            <StockInventoryTable />
          </>
        ) : (
          <StockInventoryTable />
        )}
      </section>

      <footer className="sticky bottom-0">
        <div className="flex items-center justify-between mt-auto bg-background py-1.5">
          <Pagination className="justify-start bg-background">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-sm text-gray-500 w-max shrink-0">
            Showing 1 to 8 of 50 entries
          </div>
        </div>
      </footer>
    </div>
  );
}
