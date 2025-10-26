"use client";

import React, { useState } from "react";
import { Search, RefreshCcw, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

import {
  Input,
  Button,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Spinner,
  SelectBranchCombo,
} from "@/components/ui";

import TabBar from "@/components/TabBar";
import { useDebounce } from "@/hooks";
import { useGetStockInventory } from "../misc/api";
import { useGetAllBranches } from "@/app/(dashboard)/admin/businesses/misc/api";

export default function InventoryAlertPage() {
  const [searchText, setSearchText] = useState("");
  const debounced = useDebounce(searchText, 300);
  const [selectedBranch, setSelectedBranch] = useState<number | undefined>();

  const { data: branches } = useGetAllBranches();

  const { data, isLoading, isFetching, error, refetch } = useGetStockInventory({
    page: 1,
    size: 20,
    search: debounced,
    // branch param name in hook may differ; leave undefined if not supported
  });

  const tabs = [{ name: "All Inventory", count: data?.count || 0 }];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleBranchSelect = (id: number) => {
    setSelectedBranch(id);
    // if your hook accepts a branch param, you may want to refetch with that param
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto pt-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 w-full">
          <Input
            placeholder="Search (item name, inventory number)"
            value={searchText}
            onChange={handleSearch}
            className="min-w-[420px]"
            rightIcon={<Search className="h-4 w-4 text-[#8B909A]" />}
          />

          <div>
            <SelectBranchCombo
            noLabel 
              value={selectedBranch ? String(selectedBranch) : undefined}
              onChange={(v) => handleBranchSelect(Number(v))}
              name="branch-filter"
              variant="inputButton"
              className="text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-[#28C76F] text-[#1EA566] bg-opacity-25" onClick={handleRefresh}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>

      <TabBar tabs={tabs} activeTab={tabs[0].name} onTabClick={() => {}} />

      <div className="mt-6 bg-white rounded-lg border border-solid border-[#F3F4F6] p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Spinner />
          </div>
        ) : error ? (
          <div>Error loading inventory</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Quantity</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((item: any) => {
                const totalQuantity = (item.variations || []).reduce((s: number, v: any) => s + (v.quantity || 0), 0);
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={item.image_one || "/img/product.png"} alt={item.name} className="h-8 w-8 rounded object-cover" />
                        <span className="uppercase">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="uppercase">{item.category?.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span>{totalQuantity} In Stock</span>
                        {totalQuantity <= 5 && (
                          <span className="text-red-500">
                            <AlertTriangle className="h-5 w-5" />
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{item.update_date ? format(item.update_date, "dd, MMM yyyy") : "-"}</TableCell>
                    <TableCell>{/* placeholder for actions */}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
