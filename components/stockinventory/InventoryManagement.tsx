// 'use client';

// import React from 'react';
// import {Search, RefreshCw, Plus} from 'lucide-react';
// import {Input} from '@/components/ui/input';
// import {Button} from '@/components/ui/button';
// import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
// import {Badge} from '@/components/ui/badge';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';

// const productData = [
//   {
//     id: 1,
//     name: 'CHOCOLATE CAKE',
//     image: '/chocolate-cake.jpg',
//     variants: [
//       {size: '6 Inches', stock: 20, status: 'Low'},
//       {size: '8 Inches', stock: 30, status: 'Low'},
//     ],
//     sold: 3,
//     costPrice: '₦30,450',
//     lastUpdated: 'Feb. 22nd, 2024',
//   },
//   {
//     id: 2,
//     name: 'ROSES',
//     image: '/roses.jpg',
//     variants: [
//       {type: 'Red', stock: 400},
//       {type: 'White', stock: 300},
//       {type: 'Pink', stock: 300},
//     ],
//     sold: 3,
//     costPrice: '₦30,450',
//     lastUpdated: 'Feb. 22nd, 2024',
//   },
//   // Add more product data here...
// ];

// const InventoryManagement = () => {
//   return (
//     <div className='container mx-auto p-4'>
//       <div className='flex justify-between items-center mb-4'>
//         <div className='relative flex-grow max-w-md'>
//           <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500' />
//           <Input placeholder='Search for a product' className='pl-8' />
//         </div>
//         <div className='flex space-x-2'>
//           <Button variant='default'>
//             <Plus className='mr-2 h-4 w-4' /> Add Inventory
//           </Button>
//           <Button
//             variant='outline'
//             className='bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700'>
//             <RefreshCw className='mr-2 h-4 w-4' /> Refresh
//           </Button>
//         </div>
//       </div>

//       <div className='flex mb-4'>
//         <div className='w-1/4 pr-4'>
//           <Card className='mb-4'>
//             <CardHeader>
//               <CardTitle>Stock</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Badge variant='secondary'>Total Stock: 5540</Badge>
//             </CardContent>
//           </Card>

//           <Card className='mb-4'>
//             <CardHeader>
//               <CardTitle>Product Status</CardTitle>
//             </CardHeader>
//             <CardContent className='space-y-2'>
//               <Button variant='outline' className='w-full justify-start'>
//                 All Products (300)
//               </Button>
//               <Button variant='outline' className='w-full justify-start'>
//                 Draft (0)
//               </Button>
//               <Button variant='outline' className='w-full justify-start'>
//                 Private Products (4)
//               </Button>
//               <Button variant='outline' className='w-full justify-start'>
//                 Archived products (146)
//               </Button>
//             </CardContent>
//           </Card>

//           <Card className='mb-4'>
//             <CardHeader>
//               <CardTitle>Sort by</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder='Alphabetical A-Z' />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value='az'>Alphabetical A-Z</SelectItem>
//                   <SelectItem value='za'>Alphabetical Z-A</SelectItem>
//                 </SelectContent>
//               </Select>
//             </CardContent>
//           </Card>

//           <Button variant='outline' className='w-full mb-2'>
//             Branch
//           </Button>
//           <Button variant='outline' className='w-full mb-4'>
//             Item Category
//           </Button>

//           <Card className='mb-4'>
//             <CardHeader>
//               <CardTitle>Price</CardTitle>
//             </CardHeader>
//             <CardContent className='space-y-2'>
//               <Input placeholder='Minimum Price' />
//               <Input placeholder='Maximum Price' />
//               <Button className='w-full'>Apply Filter</Button>
//             </CardContent>
//           </Card>

//           <Button variant='outline' className='w-full'>
//             Reset Filters
//           </Button>
//         </div>

//         <div className='w-3/4'>
//           {productData.map(product => (
//             <Card key={product.id} className='mb-4'>
//               <CardContent className='flex p-4'>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className='w-24 h-24 object-cover rounded mr-4'
//                 />
//                 <div className='flex-grow'>
//                   <h3 className='text-lg font-semibold'>{product.name}</h3>
//                   {product.variants.map((variant, index) => (
//                     <div
//                       key={index}
//                       className='flex justify-between items-center mt-2'>
//                       <span>{variant.size || variant.type}</span>
//                       <span>Stocked Product: {variant.stock} In Stock</span>
//                       {variant.status && (
//                         <Badge variant='destructive'>{variant.status}</Badge>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 <div className='ml-4 text-right'>
//                   <div>Sold: {product.sold} Pieces</div>
//                   <div>Cost Price: {product.costPrice}</div>
//                   <div>Last Updated: {product.lastUpdated}</div>
//                   <Button variant='outline' className='mt-2'>
//                     View
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       <Pagination>
//         <PaginationContent>
//           <PaginationItem>
//             <PaginationPrevious href='#' />
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href='#'>1</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href='#'>2</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href='#'>3</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href='#'>4</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href='#'>5</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationNext href='#' />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     </div>
//   );
// };

// export default InventoryManagement;

'use client';

import React from 'react';
import {Search, RefreshCw, Plus} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {Badge} from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Variant =
  | {size: string; stock: number; status?: string}
  | {type: string; stock: number};

interface Product {
  id: number;
  name: string;
  image: string;
  variants: Variant[];
  sold: number;
  costPrice: string;
  lastUpdated: string;
}

const productData: Product[] = [
  {
    id: 1,
    name: 'CHOCOLATE CAKE',
    image: '/img/cake1.png',
    variants: [
      {size: '6 Inches', stock: 20, status: 'Low'},
      {size: '8 Inches', stock: 30, status: 'Low'},
    ],
    sold: 3,
    costPrice: '₦30,450',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  {
    id: 2,
    name: 'ROSES',
    image: '/img/cake2.png',
    variants: [
      {type: 'Red', stock: 400},
      {type: 'White', stock: 300},
      {type: 'Pink', stock: 300},
    ],
    sold: 3,
    costPrice: '₦30,450',
    lastUpdated: 'Feb. 22nd, 2024',
  },
  // ... other product data remains the same
];

const InventoryManagement = () => {
  // ... previous code remains the same

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-4 mt-4'>
        <div className='relative flex-grow max-w-md'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500' />
          <Input placeholder='Search for a product' className='pl-8' />
        </div>
        <div className='flex space-x-2'>
          <Button variant='default'>
            <Plus className='mr-2 h-4 w-4' /> Add Inventory
          </Button>
          <Button
            variant='outline'
            className='bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700'>
            <RefreshCw className='mr-2 h-4 w-4' /> Refresh
          </Button>
        </div>
      </div>

      <div className='flex mb-4 mt-4'>
        <div className='w-1/4 pr-4'>
          <div className='mb-4 flex items-center gap-2'>
            <div>
              <h3>Stock</h3>
            </div>
            <div>
              <Badge
                variant='outline'
                className='p-2 rounded-sm text-sm font-light'>{`Total stock (556)`}</Badge>
            </div>
          </div>

          <Card className='mb-4 py-7 px-4 w-[240px]'>
            <h3 className='text-text-grey text-[14px]'>Product Status</h3>
            <CardContent className='space-y-2 p-0 mt-2'>
              <div className='grid grid-cols-2 gap-1'>
                <Button
                  variant='outline'
                  className='justify-start font-light text-[9px] text-center p-0'>
                  <span className='mx-auto'>All Products (300)</span>
                </Button>
                <Button
                  variant='outline'
                  className='justify-start font-light text-[9px] text-center p-0'>
                  <span className='mx-auto'>Draft (0)</span>
                </Button>
                <Button
                  variant='outline'
                  className='justify-start font-light text-[9px] text-center p-0'>
                  <span className='mx-auto'>Private Products (4)</span>
                </Button>
                <Button
                  variant='outline'
                  className='justify-start font-light text-[9px] text-center p-0'>
                  <span className='mx-auto'>Archived products (146)</span>
                </Button>
              </div>

              <div className='mb-9'>
                <h3 className='text-text-grey text-[14px] mt-4'>Sort by</h3>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Alphabetical A-Z' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='az'>Alphabetical A-Z</SelectItem>
                    <SelectItem value='za'>Alphabetical Z-A</SelectItem>
                  </SelectContent>
                </Select>

                <Button className='w-full mb-2 mt-3'>Branch</Button>
                <Button className='w-full mb-9 mt-3'>Item Category</Button>
              </div>

              <h3 className='text-text-grey text-[14px] mt-9'>Price</h3>
              <Input placeholder='Minimum Price' />
              <Input placeholder='Maximum Price' className='mb-10' />
              <Button className='w-full mt-10' variant='outline'>
                Apply Filter
              </Button>
              <Button variant='outline' className='w-full'>
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className='w-3/4'>
          {productData.map(product => (
            <Card key={product.id} className='mb-4'>
              <CardContent className='flex p-4'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-24 h-24 object-cover rounded mr-4'
                />
                <div className='flex-grow'>
                  <h3 className='text-lg font-semibold'>{product.name}</h3>
                  {product.variants.map((variant, index) => (
                    <div
                      key={index}
                      className='flex justify-between items-center mt-2'>
                      <span>
                        {'size' in variant ? variant.size : variant.type}
                      </span>
                      <span>Stocked Product: {variant.stock} In Stock</span>
                      {'status' in variant && variant.status && (
                        <Badge variant='destructive'>{variant.status}</Badge>
                      )}
                    </div>
                  ))}
                </div>
                <div className='ml-4 text-right flex items-center justify-start gap-3'>
                  <div className='flex flex-col items-start'>
                    <h3 className='font-bold'>Sold:</h3>
                    {product.sold} Pieces
                  </div>
                  <div className='flex flex-col items-start'>
                    <h3 className='font-bold'>Cost Price:</h3>
                    {product.costPrice}
                  </div>
                  <div className='flex flex-col items-start'>
                    <h3 className='font-bold'>Last Updated:</h3>
                    {product.lastUpdated}
                  </div>
                  <Button variant='outline' className='mt-2'>
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
