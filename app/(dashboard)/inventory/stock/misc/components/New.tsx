'use client'
import React from 'react';
import { Search, RefreshCw, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import Image from 'next/image';
import { AllProducts } from '@/constants';
import { format } from 'date-fns';

const productData = [
  {
    id: 1,
    name: 'SANARA RED WINE',
    image: '/api/placeholder/100/100',
    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Wines',
    stock: 3,
    variants: [
      { size: '6 Inches', stock: 20, status: 'Low' },
      { size: '8 Inches', stock: 30, status: 'Low' },
    ],
    status: 'Low',
    costPrice: '₦20,450.00',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  {
    id: 2,
    name: 'ROBERTSON CHAPEL SWEET RED WINE',
    image: '/api/placeholder/100/100',
    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Wines',
    stock: 20,
    costPrice: '₦15,000.00',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  // Add more products here
];
const categoriesEnum: { [key: string]: string } = {

  "C": "Cake",
  "W": "Wine",
  "F": "Flower",
  "B": "Bouquet",
  "TB": "Teddy Bear",
}

const ProductsnventoryDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 mt-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search for a product" className="pl-8" />
        </div>
        <div className="flex space-x-2">
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" /> Add Inventory
          </Button>
          <Button
            variant="outline"
            className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>

      <div className="flex mb-4 mt-4">
        <div className="w-1/4 pr-4">
          {/* Filters and sorting options */}
          <Card className="mb-4 p-4">
            <h3 className="text-lg font-semibold mb-2">Filters</h3>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="az">Alphabetical A-Z</SelectItem>
                <SelectItem value="za">Alphabetical Z-A</SelectItem>
              </SelectContent>
            </Select>
            {/* Add more filter options here */}
          </Card>
        </div>

        <div className="w-3/4">
          {
            AllProducts.map((product) => (
              <Card key={product.id} className="mb-4">
                <CardContent className="flex p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded mr-4"
                    width={96}
                    height={96}
                  />
                  <div className="flex-grow">
                    <h3 className="text-sm font-semibold capitalize text-[#194A7A]">{product.name.toUpperCase()}</h3>
                    {/* <p>Brand: {product.}</p> */}
                    <p>Category: {categoriesEnum[product.category as keyof typeof categoriesEnum]}</p>
                    <p>

                      Stocked Product: {Math.floor(Math.random() * 50) + 1} In Stock
                      {/* {product.status && (
                        <Badge variant="destructive" className="ml-2">
                          {product.status}
                        </Badge>
                      )} */}
                    </p>
                  </div>

                  <section className="flex gap-5   ml-4 text-[0.8rem]">
                    <div className="grid grid-cols-3">
                      <div className='grid col-span-3 grid-cols-[subgrid] font-semibold'>
                        <p>Sold</p>
                        <p>Cost Price</p>
                        <p>Last Updated</p>
                      </div>
                      <div className='grid col-span-3 grid-cols-[subgrid]'>
                        <p>4 pieces</p>
                        <p>N78 000</p>
                        <p>Feb 24, 2024</p>
                      </div>
                      <div className='grid col-span-3 grid-cols-[subgrid]'>
                        <p>16 pieces</p>
                        <p>N250 000</p>
                        <p>Feb 24, 2024</p>
                      </div>
                    </div>
                   
                    <Button variant="outline" className="rounded-full" size="sm">
                      View
                    </Button>
                  </section>
                </CardContent>
              </Card>
            ))}

          <Pagination>
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
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ProductsnventoryDashboard;