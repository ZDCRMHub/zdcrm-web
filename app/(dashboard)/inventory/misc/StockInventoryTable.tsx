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
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui";

interface StockVariation {
  name: string;
  quantity: number;
  price: string;
  lastUpdated: string;
}

interface StockItem {
  stockId: string;
  category: string;
  name: string;
  image: string;
  variations: StockVariation[];
}

interface StockRowProps {
  item: StockItem;
}

const StockRow: React.FC<StockRowProps> = ({ item }) => {
  return (
    <>
      {item.variations.map((variation, index) => (
        <TableRow key={`${item.stockId}-${index}`}>
          {index === 0 && (
            <>
              <TableCell rowSpan={item.variations.length}>
                {item.stockId}
              </TableCell>
              <TableCell rowSpan={item.variations.length} className="uppercase">
                {item.category}
              </TableCell>
              <TableCell rowSpan={item.variations.length}>
                <div className="flex items-center space-x-2">
                  <img
                    src={"/img/cake.png"}
                    alt={item.name}
                    className="h-10 w-10 rounded object-cover text-xs bg-gray-300 lowercase"
                  />
                  <span>{item.name}</span>
                </div>
              </TableCell>
            </>
          )}
          <TableCell>{variation.name}</TableCell>
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
          <TableCell>{variation.price}</TableCell>
          <TableCell>{variation.lastUpdated}</TableCell>
          <TableCell>
            {/* ///////  DUMMY ////////// */}
            <LinkButton
              href="/inventory/details?stock=true"
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

const StockInventory = () => {
  const stockItems: StockItem[] = [
    {
      stockId: "PF/LM6765",
      category: "CAKE",
      name: "CHOCOLATE CAKE",
      image: "/img/cake.png",
      variations: [
        {
          name: "6 inches",
          quantity: 3,
          price: "₦30,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
        {
          name: "8 inches",
          quantity: 5,
          price: "₦50,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
        {
          name: "12 inches",
          quantity: 15,
          price: "₦50,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
      ],
    },
    {
      stockId: "PF/LM6765",
      category: "FLOWER",
      name: "ROSES",
      image: "/img/flower.png",
      variations: [
        {
          name: "Red",
          quantity: 3,
          price: "₦30,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
        {
          name: "White",
          quantity: 5,
          price: "₦50,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
        {
          name: "Pink",
          quantity: 15,
          price: "₦50,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
      ],
    },
    {
      stockId: "ZD/LI6765",
      category: "CUPCAKE",
      name: "CUPCAKE",
      image: "/img/cupcake.png",
      variations: [
        {
          name: "Red Velvet",
          quantity: 3,
          price: "₦30,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
        {
          name: "Vanilla",
          quantity: 5,
          price: "₦50,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
        {
          name: "Chocolate",
          quantity: 15,
          price: "₦50,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
      ],
    },
    {
      stockId: "PF/LM6765",
      category: "FLOWER",
      name: "GYPSO",
      image: "/img/flower.png",
      variations: [
        {
          name: "White",
          quantity: 30,
          price: "₦50,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
        {
          name: "Pink",
          quantity: 15,
          price: "₦50,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
        {
          name: "Red",
          quantity: 3,
          price: "₦30,000.00",
          lastUpdated: "Oct. 22nd, 2024",
        },
      ],
    },
  ];

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
          {stockItems.map((item, index) => (
            <StockRow key={index} item={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockInventory;
