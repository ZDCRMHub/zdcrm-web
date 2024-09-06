'use client';

import React from 'react';
import Header from '@/app/(dashboard)/report-analytics/misc/components/Header';
import {Button} from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {EnquiryChannelsChart} from '@/app/(dashboard)/report-analytics/misc/components/EnquiryChannelsChart';
import ComparisonModal from '@/app/(dashboard)/report-analytics/misc/components/ComparisonModal';
import {ClientTrackingChart} from '@/app/(dashboard)/report-analytics/misc/components/ClientTrackingChart';
import {TrendsSeasonalitySalesChart} from '@/app/(dashboard)/report-analytics/misc/components/TrendsSeasonalitySalesChart';

const page = () => {
  const branchOptions = ['Zuzu Delights', 'Prestige Flowers'];
  const dateOptions = [
    'Today',
    'Yesterday',
    'Last 7 days',
    'Last 30 days',
    'Custom',
  ];

  const handleBranchChange = (value: string) => {
    console.log('Selected branch:', value);
  };

  const handleDateChange = (value: string) => {
    console.log('Selected date range:', value);
  };

  return (
    <div className='w-full max-w-7xl mx-auto pt-12 px-8'>
      <Header
        title='Conversion Statistics'
        branchOptions={branchOptions}
        dateOptions={dateOptions}
        onBranchChange={handleBranchChange}
        onDateChange={handleDateChange}
      />

      <div className='flex justify-start my-14'>
        <ComparisonModal />
      </div>

      <div className='grid grid-cols-2 gap-10 mb-10'>
        <EnquiryChannelsChart />

        <ClientTrackingChart />

        <TrendsSeasonalitySalesChart />
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
