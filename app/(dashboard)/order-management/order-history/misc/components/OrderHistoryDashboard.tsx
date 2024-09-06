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
import TabBar from '@/components/TabBar';
import OrdersHistoryTable from './OrdersHistoryTable';



export default function OrderHistoryDashboard() {
  const tabs = [
    { name: 'All Orders', count: 450 },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [searchText, setSearchText] = useState("")



  return (
    <div className='max-w-[1440px] mx-auto p-6'>
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
              <SelectValue placeholder="Filter history by" className="text-[0.75rem] text-[#A7A7A7] w-full grow" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Lagos Island</SelectItem>
              <SelectItem value="Processing">Lagos Mainland</SelectItem>
              <SelectItem value="Shipped">Lagos Central</SelectItem>
              <SelectItem value="Delivered">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            className='bg-[#28C76F] text-[#1EA566] bg-opacity-25'>
            <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
          </Button>
        </div>
      </div>

      {
        searchText.trim() !== "" &&
        <h3 className="mb-4">Search Results(9)</h3>
      }
      {
        searchText.trim() === "" ?
          <>
            <Accordion type="single" collapsible className="w-full max-w-[1360px] mt-8" defaultValue='today'>
              <AccordionItem value="today">
                <AccordionTrigger>Today, {format(new Date(), 'dd MMMM yyyy')}</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <OrdersHistoryTable />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tomorrow">
                <AccordionTrigger>TOMORROW</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <OrdersHistoryTable />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="within72Hours">
                <AccordionTrigger>IN 72 HOURS</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <OrdersHistoryTable />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="within7Days">
                <AccordionTrigger>IN 7 DAYS</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <OrdersHistoryTable />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>

          :
          <OrdersHistoryTable />
      }
    </div>
  );
}
