"use client";

import React, { useState } from "react";
import { Search, Plus, RefreshCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  LinkButton,
} from "@/components/ui";
import TabBar from "@/components/TabBar";
import OrdersHistoryTable from "./OrdersHistoryTable";
import {
  Location,
  ArrowDown2,
  Calendar,
  Category2,
  NotificationStatus,
} from "iconsax-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  RangeAndCustomDatePicker,
  Input,
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui";

export default function OrderHistoryDashboard() {
  const tabs = [{ name: "All Orders", count: 450 }];

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <div className="flex justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-2 w-80 grow">
          <Input
            type="text"
            placeholder="Search (client name, customer rep, phone number)"
            className="w-full focus:border min-w-[350px] text-xs !h-10"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            rightIcon={<Search className="h-5 w-5 text-[#8B909A]" />}
          />
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-4 text-xs cursor-pointer text-[#8B909A]">
                Filter history by <ArrowDown2 size={16} />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2">
                    <Calendar size={18} />
                    Date Range
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <RangeAndCustomDatePicker />
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2">
                    <Category2 size={18} />
                    Category
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Cake</MenubarItem>
                    <MenubarItem>Flower</MenubarItem>
                    <MenubarItem>Teddy Bear</MenubarItem>
                    <MenubarItem>Cup Cake</MenubarItem>
                    <MenubarItem>Vase</MenubarItem>
                    <MenubarItem>Wine</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2">
                    <NotificationStatus size={18} />
                    Status
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Delivered</MenubarItem>
                    <MenubarItem>Cancelled</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2">
                    <Location size={18} />
                    Location
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Lagos Isalnd</MenubarItem>
                    <MenubarItem>Lagos Mainland</MenubarItem>
                    <MenubarItem>Lagos Central</MenubarItem>
                    <MenubarItem>Others</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-[#28C76F] text-[#1EA566] bg-opacity-25"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>

      <section>
      {searchText.trim() !== "" && <h3 className="mb-4">Search Results(9)</h3>}
      {searchText.trim() === "" ? (
          <>
          <TabBar
            tabs={tabs}
            onTabClick={setActiveTab}
            activeTab={activeTab}
          />
          <OrdersHistoryTable />
        </>
      ) : (
        <OrdersHistoryTable />
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
