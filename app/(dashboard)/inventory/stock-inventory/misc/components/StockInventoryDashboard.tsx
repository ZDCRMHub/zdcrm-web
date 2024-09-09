'use client'
import React from 'react';
import { Search, RefreshCw, Plus, RefreshCcw } from 'lucide-react';
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
  LinkButton,
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import Image from 'next/image';
import { AllProducts } from '@/constants';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';
import { BoxSearch, Clipboard } from 'iconsax-react';
import NewInventorySheet from './NewInventorySheet';

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

const StockInventoryDashboard = () => {
  const [searchText, setSearchText] = React.useState("");


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
          <Card className="mb-4">
            {/* <h3 className="text-lg font-semibold mb-2">Filters</h3> */}

            <div className=' space-y-10 py-8 px-4'>
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

              <Button className='w-full min-w-[200px] text-xs !h-10 border' variant="light">
                Apply Filters
              </Button>
            </div>


            <Button className='w-full min-w-[200px] text-xs !h-12 rounded-t-none mt-8' variant="light">
              Reset Filters
            </Button>
          </Card>
        </div>

        <div className="w-3/4">
          {
            AllProducts.map((product) => (
              <Card key={product.id} className="mb-5 border-[#47AFFAB2] border">
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

                    <div className='flex items-start gap-4 mt-2'>
                      <p className='text-[0.85rem] text-[#292D32] font-medium'>
                        {
                          ["Sizes", "Types"][Math.floor(Math.random() * 2)]
                        }
                      </p>
                      <div className='grow flex flex-col  gap-4'>
                        {
                          !!product?.variants && product?.variants?.map((variant, index) => (
                            <div className='w-full flex items-center gap-6' key={index}>
                              <span key={variant.size} className='text-xs text-[#292D32] shrink-0 min-w-max'>
                                {variant.size}
                              </span>
                              <div className='grow h-[0.3px] bg-[#194A7A33] w-full hidden 2xl:block'></div>
                              <span className="text-xs shrink-0 min-w-max">
                                {Math.floor(Math.random() * 20) * 10}  In Stock
                              </span>
                            </div>
                          ))
                        }
                      </div>

                    </div>

                  </div>

                  <section className="flex gap-6 ml-8 2xl:ml-14 text-[0.8rem]">
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

                    <LinkButton href="/inventory/details" variant="outline" className="rounded-full border-2 2xl:ml-8" size="sm">
                      View
                    </LinkButton>
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

export default StockInventoryDashboard;