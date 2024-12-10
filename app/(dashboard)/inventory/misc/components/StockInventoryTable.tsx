"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LinkButton } from "@/components/ui";
import { TStockInventoryItem } from "../types/stock";

interface StockRowProps {
  item: TStockInventoryItem;
}

const StockRow: React.FC<StockRowProps> = ({ item }) => {
  return (
    <>
      {item.variations.map((variation, index) => (
        <TableRow key={`${item.id}-${index}`}>
          {index === 0 && (
            <>
              <TableCell rowSpan={item.variations.length}>
                {item.id}
              </TableCell>
              <TableCell rowSpan={item.variations.length} className="uppercase">
                {item.category.name}
              </TableCell>
              <TableCell rowSpan={item.variations.length}>
                <div className="flex items-center space-x-2">
                  <img
                    src={item.image_one || "/img/cake.png"}
                    alt={item.name}
                    className="h-10 w-10 rounded object-cover text-xs bg-gray-300 lowercase"
                  />
                  <span>{item.name}</span>
                </div>
              </TableCell>
            </>
          )}
          <TableCell>{variation.size || variation.color || variation.flavour}</TableCell>
          <TableCell>
            <div className="grid grid-cols-[1fr,max-content] items-center space-x-2">
              <span>{variation.quantity} In Stock</span>
              {variation.quantity <= 5 ? (
                <div className="relative h-full min-h-6 max-h-16 w-1.5 rounded-full bg-red-100">
                  <div className="absolute h-1/2 bottom-0 min-h-2 max-h-12 w-1.5 rounded-full bg-red-500"></div>
                </div>
              ) : (
                ""
              )}
            </div>
          </TableCell>
          <TableCell>{variation.cost_price}</TableCell>
          <TableCell>{new Date(variation.update_date).toLocaleDateString()}</TableCell>
          <TableCell>
            <LinkButton
              href={`/inventory/details?stock=${item.id}`}
              variant="unstyled"
              className=""
              size="sm"
            >
              {">>"}
            </LinkButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

interface StockInventoryTableProps {
  data?: TStockInventoryItem[];
  isLoading: boolean;
  error: unknown;
}

const StockInventoryTable: React.FC<StockInventoryTableProps> = ({ data, isLoading, error }) => {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!data) return null;

  return (
    <div className="w-full md:w-[95%] max-w-[1792px] px-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stock Item ID</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock Item</TableHead>
            <TableHead>Variation</TableHead>
            <TableHead>Stock Quantity</TableHead>
            <TableHead>Cost Price/Unit</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <StockRow key={item.id} item={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockInventoryTable;

