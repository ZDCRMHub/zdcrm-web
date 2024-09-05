'use client';

import React, { useState } from 'react';
import {
  Search,
  Plus,
  RefreshCcw,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, LinkButton } from '@/components/ui';
import OrdersTable from './OrdersTable';
import TabBar from '@/components/TabBar';



export default function EnquiriesDashboard() {
  const tabs = [
    { name: 'All Orders', count: 450 },
    { name: 'SOA', count: 40 },
    { name: 'Sorted', count: 36 },
    { name: 'Sent to dispatch', count: 18 },
    { name: 'DIS CL', count: 40 },
    { name: 'Delivered', count: 23 },
    { name: 'DEL CL', count: 23 },
    { name: 'Canceled Orders', count: 5 },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [searchText, setSearchText] = useState("")



  return (
    <div className='max-w-7xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-10 gap-4'>
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
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <LinkButton href="./enquiries/new-enquiry" variant='default' className='bg-black text-white'>
            <Plus className='mr-2 h-4 w-4' /> Add Order
          </LinkButton>
          <Button
            variant='outline'
            className='bg-[#28C76F] text-[#1EA566] bg-opacity-25'>
            <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
          </Button>
        </div>
      </div>

      {
        searchText.trim() !== "" &&
        <h3 className="mb-4">Search Results</h3>
      }
      {
        searchText.trim() === "" ?
          <>
            <TabBar tabs={tabs} onTabClick={setActiveTab} activeTab={activeTab} />
            <Accordion type="single" collapsible className="w-full max-w-[1200px] mt-8" defaultValue='today'>
              <AccordionItem value="today">
                <AccordionTrigger>Today, {format(new Date(), 'dd MMMM yyyy')}</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <OrdersTable />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tomorrow">
                <AccordionTrigger>TOMORROW</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <OrdersTable />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="within72Hours">
                <AccordionTrigger>IN 72 HOURS</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <OrdersTable />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="within7Days">
                <AccordionTrigger>IN 7 DAYS</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <OrdersTable />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>

          :
          <OrdersTable />
      }
    </div>
  );
}
