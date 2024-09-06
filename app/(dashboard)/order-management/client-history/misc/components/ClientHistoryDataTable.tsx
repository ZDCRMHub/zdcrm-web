'use client';

import React, { useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import TabBar from '@/components/TabBar';



const generateMockData = (count: number) => {
  const mockData = [];
  for (let i = 0; i < count; i++) {
    mockData.push({
      id: i + 1,
      name: 'Ifetola Adebayo',
      phoneNumber: '08067556644',
      emailAddress: 'ifeadeayo@gmail.com',
      numberOfOrders: 20,
      totalAmountSpent: i % 2 === 0 ? '₦500,000.00' : '₦1,000,000.00',
    });
  }
  return mockData;
};

const data = generateMockData(50);
const tabs = [
  { name: 'All Client History', count: 850 },
];



export function ClientHistoryDataTable() {
  const [searchText, setSearchText] = useState("")
  const [activeTab, setActiveTab] = useState(tabs[0].name);



  return (
    <div className='flex flex-col space-y-4 min-h-[85vh]'>
      <div className='flex justify-between items-center mb-6 gap-4'>
        <div className='flex items-center gap-2 w-80 grow'>
          <Input
            type='text'
            placeholder='Search (client name, customer rep, phone number)'
            className='w-full focus:border min-w-[350px] text-xs !h-10'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            rightIcon={<Search className='h-5 w-5 text-[#8B909A]' />}
          />
          <Select >
            <SelectTrigger className="max-w-[150px] w-full text-[0.75rem]">
              <SelectValue placeholder="Filter enquiries by" className="text-[0.75rem] text-[#A7A7A7] w-full grow" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Started Discussion">Started Discussion</SelectItem>
              <SelectItem value="Still Discussing">Still Discussing</SelectItem>
              <SelectItem value="Finalized Discussion">Finalized Discussion</SelectItem>
              <SelectItem value="Payment Made">Payment Made</SelectItem>
              {/* <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-2'>

          <Button
            variant='outline'
            className='bg-[#28C76F] text-[#1EA566] bg-opacity-25'>
            <RefreshCw className='mr-2 h-4 w-4' /> Refresh
          </Button>
        </div>
      </div>


      <div className='flex items-center space-x-2'>
        <h2 className='text-xl font-semibold text-blue-900'>
          All Client History
        </h2>
        <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm'>
          850
        </span>
      </div>

      <TabBar tabs={tabs} onTabClick={setActiveTab} activeTab={activeTab} />

      <Table containerClassName="!grow " className='h-full'>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Customers Name</TableHead>
            <TableHead className='font-semibold'>Phone Number</TableHead>
            <TableHead className='font-semibold'>Email Address</TableHead>
            <TableHead className='font-semibold'>
              Number of Orders Made
            </TableHead>
            <TableHead className='font-semibold'>
              Total Amount Spent
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, 10).map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{row.emailAddress}</TableCell>
              <TableCell>{row.numberOfOrders}</TableCell>
              <TableCell>{row.totalAmountSpent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className='flex items-center justify-between mt-auto'>
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
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className='text-sm text-gray-500 w-max shrink-0'>
          Showing 1 to 8 of 50 entries
        </div>
      </div>
    </div>
  );
}
