'use client';

import React, { useState } from 'react';
import {
  Search,
  Plus,
  RefreshCcw,
} from 'lucide-react';
import { format } from 'date-fns';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, RangeAndCustomDatePicker, Input, SelectSingleCombo, Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, LinkButton, Button } from '@/components/ui';
import OrdersTable from './OrdersTable';
import TabBar from '@/components/TabBar';
import { ArrowDown2, Calendar, Category2, NotificationStatus } from 'iconsax-react';



export default function EnquiriesDashboard() {
  const tabs = [
    { name: 'All Orders', count: 450 },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [searchText, setSearchText] = useState("")
  const [sortBy, setSortBy] = useState('All Orders')


  return (
    <div className='relative flex flex-col gap-4 w-full md:w-[95%] max-w-[1792px] mx-auto pb-6 max-h-full'>
      <div className='sticky top-0 flex justify-between items-center mb-10 gap-4 pt-6 z-[2] bg-background'>
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
              <MenubarTrigger className="flex items-center gap-4 text-xs cursor-pointer text-[#8B909A]">Filter orders by <ArrowDown2 size={16} /></MenubarTrigger>
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

                    <MenubarItem>Payment Made</MenubarItem>
                    <MenubarItem>Sorted</MenubarItem>
                    <MenubarItem>SOA</MenubarItem>
                    <MenubarItem>Sent to Dispatch</MenubarItem>
                    <MenubarItem>DIS CL</MenubarItem>
                    <MenubarItem>Delivered</MenubarItem>
                    <MenubarItem>DEL CL</MenubarItem>
                    <MenubarItem>Cancelled</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <SelectSingleCombo
            name='sortBy'
            options={[
              { value: 'All Orders', label: 'All Orders' },
              { value: 'Payment Made', label: 'Payment Made' },
              { value: 'SOA', label: 'SOA' },
              { value: 'Sorted', label: 'Sorted' },
              { value: 'Sent to Dispatch', label: 'Sent to Dispatch' },
              { value: 'DIS CL', label: 'DIS CL' },
              { value: 'Delivered', label: 'Delivered' },
              { value: 'DEL CL', label: 'DEL CL' },
              { value: 'Cancelled', label: 'Cancelled' },
            ]}
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            valueKey='value'
            labelKey='label'
            placeholder='Sort by'
            className='w-32 !h-10 text-[#8B909A] text-xs'
            triggerColor='#8B909A'
            showSelectedValue={false}
          />
        </div>
        <div className='flex items-center gap-2'>
          <LinkButton href="./orders/new-order" variant='default' className='bg-black text-white'>
            <Plus className='mr-2 h-4 w-4' /> Add Order
          </LinkButton>
          <Button
            variant='outline'
            className='bg-[#28C76F] text-[#1EA566] bg-opacity-25'>
            <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
          </Button>
        </div>
      </div>

      <section>
        {
          searchText.trim() !== "" &&
          <h3 className="mb-4">Search Results</h3>
        }
        {
          searchText.trim() === "" ?
            <>
              <TabBar tabs={tabs} onTabClick={setActiveTab} activeTab={activeTab} />
              <OrdersTable />

            </>

            :
            <OrdersTable />
        }
      </section>

      <footer className='sticky bottom-0'>
        <div className='flex items-center justify-between mt-auto bg-background py-1.5'>
          <Pagination className='justify-start bg-background'>
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
      </footer>

    </div>
  );
}
