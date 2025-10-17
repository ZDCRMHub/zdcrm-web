'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ComparisonModal from '@/app/(dashboard)/report-analytics/misc/components/ComparisonModal';
import { EnquiryChannelsChart, ClientTrackingChart, TrendsSeasonalitySalesChart, EmployeePerformanceChart, ClientBehaviorChart } from '../misc/components/conversion-statistics';

const page = () => {


  return (
    <div className='w-full md:w-[92.5%] max-w-[1792px] mx-auto pt-12 px-8'>
      {/* <Header
        title='Conversion Statistics'
        branchOptions={branchOptions}
        dateOptions={dateOptions}
        onBranchChange={handleBranchChange}
        onDateChange={handleDateChange}
      /> */}

      <div className='flex justify-start my-4'>
        {/* <ComparisonModal /> */}
      </div>

      <div className='grid  2xl:grid-cols-2 gap-10 mb-10'>
        <EnquiryChannelsChart />

        <ClientBehaviorChart />
        
        <ClientTrackingChart />

        <TrendsSeasonalitySalesChart />

        {/* <EmployeePerformanceChart /> */}
      </div>

      <div className='flex justify-end mb-24 gap-6'>
        <Select>
          <SelectTrigger className='w-[153px]'>
            <SelectValue placeholder='Extract File' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='All'>All</SelectItem>
            <SelectItem value='Net Profit'>Net Profit</SelectItem>
            <SelectItem value='Total Revenue'>Total Revenue</SelectItem>
            <SelectItem value='Total Orders'>Total Orders</SelectItem>
          </SelectContent>
        </Select>
        <Button className='bg-amber-400 text-black border border-black px-11'>
          Download
        </Button>
      </div>
    </div>
  );
};

export default page;
