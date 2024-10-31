'use client';

import React, { useState } from 'react';
import {
  Search,
  Plus,
  RefreshCcw,
} from 'lucide-react';
import { Input, SelectSingleCombo, Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui"
import { LinkButton, Button } from '@/components/ui';
import StoreInventoryTable from './StoreInventoryTable';
import TabBar from '@/components/TabBar';
import { BRANCH_OPTIONS, CATEGORIES_OPTIONS } from '@/constants';



export default function StoreInventoryDashboard() {
  const tabs = [
    { name: 'All Inventory', count: 450 },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [searchText, setSearchText] = useState("")
  const [sortBy, setSortBy] = useState('All Orders')


  return (
    <div className='relative flex flex-col gap-4 w-full md:w-[92.5%] max-w-[1792px] mx-auto pb-6 max-h-full'>
      <div className='sticky top-0 flex justify-between items-center mb-10 gap-4 pt-6 z-[2]'>
        <div className='flex items-center gap-2 w-80 grow'>
          <Input
            type='text'
            placeholder='Search (client name, customer rep, phone number)'
            className='w-full focus:border min-w-[350px] text-xs !h-10'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            rightIcon={<Search className='h-5 w-5 text-[#8B909A]' />}
          />
          
          <SelectSingleCombo
            name='filterBy'
            options={BRANCH_OPTIONS}
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            valueKey='value'
            labelKey='label'
            placeholder='Filter by branch'
            className='w-32 !h-10 text-[#8B909A] text-xs'
            placeHolderClass='text-[#8B909A] text-xs'
            triggerColor='#8B909A'
            showSelectedValue={false}
          />
          <SelectSingleCombo
            name='sortBy'
            options={CATEGORIES_OPTIONS}
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            valueKey='value'
            labelKey='label'
            placeholder='Sort by'
            className='w-32 !h-10 text-[#8B909A] text-xs'
            placeHolderClass='text-[#8B909A] text-xs'
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
              <StoreInventoryTable />

            </>

            :
            <StoreInventoryTable />
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
