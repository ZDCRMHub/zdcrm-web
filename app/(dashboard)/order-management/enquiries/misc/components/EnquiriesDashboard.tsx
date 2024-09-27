'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  Plus,
  MoreHorizontal,
  RefreshCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, RangeAndCustomDatePicker, Input } from "@/components/ui"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, LinkButton } from '@/components/ui';
import EnquiriesTable from './EnquiriesTable';
import TabBar from '@/components/TabBar';
import { ArrowDown2, Calendar, Category2, NotificationStatus } from 'iconsax-react';

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
  // { name: 'In Cart', count: 400 },
  // { name: 'Manual Enquiries', count: 450 },
];

export default function EnquiriesDashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [searchText, setSearchText] = useState("")



  return (
    <div className='max-w-[1440px] mx-auto p-6'>
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
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-4 text-xs cursor-pointer text-[#8B909A]">Filter enquiries by <ArrowDown2 size={16} /></MenubarTrigger>
              <MenubarContent>

                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2"><Calendar size={18} />Date Range</MenubarSubTrigger>
                  <MenubarSubContent>
                    <RangeAndCustomDatePicker />
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2"><Category2 size={18} />Category</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Cake</MenubarItem>
                    <MenubarItem>Flower</MenubarItem>
                    <MenubarItem>Teddy Bear</MenubarItem>
                    <MenubarItem>Cup Cake</MenubarItem>
                    <MenubarItem>Vase</MenubarItem>
                    <MenubarItem>Wine</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarSub>
                  <MenubarSubTrigger className="py-3 flex items-center gap-2"><NotificationStatus size={18} />Status</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Started Discussion</MenubarItem>
                    <MenubarItem>Still Discussing</MenubarItem>
                    <MenubarItem>Finalized Discussion</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
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
            <EnquiriesTable />

          </>

          :
          <EnquiriesTable />
      }


    </div>
  );
}
