'use client';

import React from 'react';
import {RefreshCw} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
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

// Generate mock data
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

export function ClientHistoryDataTable() {
  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <Input
          placeholder='Search (client name, customer rep, phone number)'
          className='max-w-sm'
        />
        <Button
          variant='outline'
          className='bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700'>
          <RefreshCw className='mr-2 h-4 w-4' /> Refresh
        </Button>
      </div>

      <div className='flex items-center space-x-2'>
        <h2 className='text-xl font-semibold text-blue-900'>
          All Client History
        </h2>
        <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm'>
          850
        </span>
      </div>

      <div className='border rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='font-semibold'>Customer's Name</TableHead>
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
            {data.slice(0, 7).map(row => (
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
      </div>

      <div className='flex items-center justify-between'>
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
        <div className='text-sm text-gray-500'>
          Showing 1 to 8 of 50 entries
        </div>
      </div>
    </div>
  );
}
