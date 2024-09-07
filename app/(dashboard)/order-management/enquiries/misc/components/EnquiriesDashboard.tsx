'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  Plus,
  MoreHorizontal,
  RefreshCcw,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, LinkButton } from '@/components/ui';
import EnquiriesTable from './EnquiriesTable';
import TabBar from '@/components/TabBar';

const enquiries = [
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: [
      'Adeline Faultline Cake',
      'Moet Chandon',
      'Large size teddy',
    ],
    deliveryNotes: 'Call Simisola',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['A stem of chrys', 'Moet Chandon', 'Large size teddy'],
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['Delectable Choco cake', 'Moet Chandon', 'Large size teddy'],
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['Choco Drip Drop 104', 'Moet Chandon', 'Large size teddy'],
    deliveryNotes: 'Call Adeola',
    category: ['C', 'F', 'TB'],
    status: 'STILL DISCUSSING',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: [
      'Adeline Faultline Cake',
      'Moet Chandon',
      'Large size teddy',
    ],
    deliveryNotes: 'Call Simisola',
    category: ['C', 'F', 'TB'],
    status: 'STILL DISCUSSING',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: [
      'Adeline Faultline Cake',
      'Moet Chandon',
      'Large size teddy',
    ],
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
];

const tabs = [
  { name: 'All Enquiries', count: 840 },
  { name: 'In Cart', count: 400 },
  { name: 'Manual Enquiries', count: 450 },
];

export default function EnquiriesDashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [searchText, setSearchText] = useState("")



  return (
    <div className='max-w-7xl mx-auto p-6'>
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
              {/* <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <LinkButton href="./enquiries/new-enquiry" variant='default' className='bg-black text-white'>
            <Plus className='mr-2 h-4 w-4' /> Add Enquiry
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
            <Accordion type="single" collapsible className="w-full max-w-[1360px] mt-8" defaultValue='today'>
              <AccordionItem value="today">
                <AccordionTrigger>Today, {format(new Date(), 'dd MMMM yyyy')}</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <EnquiriesTable />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tomorrow">
                <AccordionTrigger>TOMORROW</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <EnquiriesTable />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="within72Hours">
                <AccordionTrigger>IN 72 HOURS</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <EnquiriesTable />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="within7Days">
                <AccordionTrigger>IN 7 DAYS</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <EnquiriesTable />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>

          :
          <EnquiriesTable />
      }


    </div>
  );
}
