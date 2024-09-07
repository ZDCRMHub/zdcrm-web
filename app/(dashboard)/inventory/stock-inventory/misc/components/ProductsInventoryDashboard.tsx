'use client'
import React, { useState } from 'react';
import { Search, RefreshCw, RefreshCcw } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { BoxSearch, Clipboard } from 'iconsax-react';
import NewInventorySheet from './NewInventorySheet';

const productData = [
  {
    id: 1,
    name: 'SANARA RED WINE',
    image: "https://www.zuzudelights.com/wp-content/uploads/2024/03/1000246398.jpg",

    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Wines',
    stock: 3,
    status: 'Low',
    costPrice: '₦20,450.00',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  {
    id: 2,
    name: 'ROBERTSON CHAPEL SWEET RED WINE',
    image: "https://www.zuzudelights.com/wp-content/uploads/2024/03/1000246398.jpg",
    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Wines',
    stock: 20,
    costPrice: '₦15,000.00',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  {
    id: 3,
    name: 'SIGNATURE - CUSTOMIZE YOUR CAKE',
    image: "https://www.zuzudelights.com/wp-content/uploads/2022/06/39748.jpg",
    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Cake',
    stock: 15,
    costPrice: '₦50,000.00',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  {
    id: 4,
    name: 'DOM PERIGNON',
    image: "https://www.zuzudelights.com/wp-content/uploads/2024/03/1000246398.jpg",
    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Wines',
    stock: 2,
    status: 'Low',
    costPrice: '₦100,000.00',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  {
    id: 5,
    name: 'LIFE SIZE 120M TEDDY BEAR',
    image: "https://www.zuzudelights.com/wp-content/uploads/2021/10/lifesized.jpg",
    
    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Teddy Bear',
    stock: 12,
    costPrice: '₦80,000.00',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  {
    id: 6,
    name: 'MACALLAN 18 YEAR OLD',
    image: "https://www.zuzudelights.com/wp-content/uploads/2024/03/1000246398.jpg",
    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Wines',
    stock: 5,
    status: 'Low',
    costPrice: '₦120,000.00',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  {
    id: 7,
    name: 'HENNESSY PARADIS',
    image: "https://www.zuzudelights.com/wp-content/uploads/2024/03/1000246398.jpg",
    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Wines',
    stock: 2,
    costPrice: '₦200,000.00',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  {
    id: 8,
    name: 'DOM PERIGNON P2',
    image: "https://www.zuzudelights.com/wp-content/uploads/2024/03/1000246398.jpg",
    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Wines',
    stock: 10,
    costPrice: '₦150,000.00',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  {
    id: 9,
    name: 'LOUIS XIII',
    image: "https://www.zuzudelights.com/wp-content/uploads/2024/03/1000246398.jpg",
    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Wines',
    stock: 7,
    costPrice: '₦300,000.00',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  {
    id: 10,
    name: 'CHATEAU PETRUS',
    image: "https://www.zuzudelights.com/wp-content/uploads/2024/03/1000246398.jpg",
    productId: 'ZD0543',
    brand: 'Zuzu Delight',
    category: 'Wines',
    stock: 1,
    costPrice: '₦500,000.00',
    lastUpdated: 'Feb. 22nd, 2024',
  }
  // Add more products here as per your list
];

const ProductsInventoryDashboard = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="container mx-auto p-4">
      <header className='flex justify-between items-center mb-8 gap-4'>
        <div className='flex items-center gap-2 w-80 grow'>
          <Input
            type='text'
            placeholder='Search stock'
            className='w-full focus:border min-w-[350px] text-xs !h-10'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            rightIcon={<Search className='h-5 w-5 text-[#8B909A]' />}
          />

        </div>
        <div className='flex items-center gap-2'>
          <NewInventorySheet />
          <Button
            variant='outline'
            className='bg-[#28C76F] text-[#1EA566] bg-opacity-25'>
            <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
          </Button>
        </div>
      </header>

      <div className="relative flex mb-4 mt-4">
        <div className="sticky top-0 min-w-[300px] w-1/4 pr-4 h-max">
          <Card className="mb-4 p-4 ">
            <div className=' space-y-10 py-8'>
              <section className="flex flex-col gap-4">
                <Label className='text-text-grey text-[14px]'>Product Status</Label>
                <div className='grid grid-cols-2 gap-1'>
                  <Button
                    variant='outline'
                    className='justify-start font-light text-[10px] text-center p-0'>
                    <span className='mx-auto'>All Products (300)</span>
                  </Button>
                  <Button
                    variant='outline'
                    className='justify-start font-light text-[10px] text-center p-0'>
                    <span className='mx-auto'>Draft (0)</span>
                  </Button>
                  <Button
                    variant='outline'
                    className='justify-start font-light text-[10px] text-center p-0'>
                    <span className='mx-auto'>Private Products (4)</span>
                  </Button>
                  <Button
                    variant='outline'
                    className='justify-start font-light text-[10px] text-center p-0'>
                    <span className='mx-auto'>Archived products (146)</span>
                  </Button>
                </div>
              </section>


              <section className='flex flex-col gap-4'>
                <Select>
                  <Label className='text-text-grey text-[14px] -mb-1'>Sort by</Label>
                  <SelectTrigger className=''>
                    <SelectValue placeholder='Alphabetical A-Z' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="az">Alphabetical A-Z</SelectItem>
                    <SelectItem value="za">Alphabetical Z-A</SelectItem>
                  </SelectContent>
                </Select>

                <Button className='w-full bg-black h-9 flex items-center justify-center gap-2 text-xs'> <BoxSearch variant='Bold' fill="white" /> Branch</Button>
                <Button className='w-full bg-black h-9 flex items-center justify-center gap-2 text-xs'> <Clipboard fill="white" variant='Bold' /> Item Category</Button>
              </section>

              <section>
                <Label className='text-text-grey text-[14px] mb-2'>Price</Label>
                <Input type='number' placeholder='Min' className='w-full min-w-[200px] text-xs !h-10' containerClassName='overflow-hidden rounded-lg mt-5' leftIcon="₦" leftIconContainerClass="h-full w-6 flex items-center justify-center top-0 left-0 bg-blue-100 px-1.5" />
                <Input type='number' placeholder='Max' className='w-full min-w-[200px] text-xs !h-10' containerClassName='overflow-hidden rounded-lg mt-4' leftIcon="₦" leftIconContainerClass="h-full w-6 flex items-center justify-center top-0 left-0 bg-blue-100 px-1.5" />
              </section>
            </div>
          </Card>
        </div>

        <div className="w-3/4">
          {productData.map((product) => (
            <Card key={product.id} className="mb-4 border border-blue-200">
              <CardContent className="flex p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-16 object-cover rounded mr-4"
                  width={86}
                  height={70}
                />


                <section className="flex flex-col flex-grow">
                  <h3 className="text-sm font-semibold capitalize text-[#194A7A]">{product.name.toUpperCase()}</h3>

                  <div className='flex items-center justify-between gap-4 mt-auto'>
                    <p className="flex items-center text-[0.75rem]">Product ID: {product.productId}</p>
                    <p className="flex items-center text-[0.75rem]">Branch: {product.brand}</p>
                    <div className="flex items-center gap-3">
                      <p className="flex flex-col gap-4 text-[0.75rem]">
                        {product.stock} In Stock
                        <span className="flex items-center text-[0.625rem]"><Clipboard variant="Bold" size={17} />Category: {product.category}</span>
                      </p>
                      {product.status && (
                        <div className='relative w-1 2xl:w-1.5 rounded-full h-full min-h-4 xl:min-h-6 overflow-hidden max-h-8 bg-red-100'>
                          <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-red-500' ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                <section className="flex items-center gap-6 ml-8 2xl:ml-8 pl-6 text-[0.75rem] shrink-0 max-xl:hidden border-l">
                  <div className="grid grid-cols-3">
                    <div className='grid col-span-3 grid-cols-[subgrid] font-semibold'>
                      <p>Cost Price</p>
                      <p>Last Updated</p>
                    </div>
                    <div className='grid col-span-3 grid-cols-[subgrid]'>
                      <p>N78 000</p>
                      <p>Feb 24, 2024</p>
                    </div>
                  </div>

                  <Button variant="outline" className="rounded-full border-2 2xl:ml-8" size="sm">
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

export default ProductsInventoryDashboard;