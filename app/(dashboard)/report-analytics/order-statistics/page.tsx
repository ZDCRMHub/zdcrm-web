'use client';

import Header from '@/app/(dashboard)/report-analytics/misc/components/Header';
import OrderStatisticsCard from '@/app/(dashboard)/report-analytics/misc/components/charts/OrderStatisticsCard';
import ComparisonModal from '@/app/(dashboard)/report-analytics/misc/components/ComparisonModal';
import TopProductsTable from '@/app/(dashboard)/report-analytics/misc/components/TopProductsTable';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OrderTimeLine } from '@/icons/sidebar';
import { Box, BoxRemove, BoxSearch, I3DCubeScan, Money } from 'iconsax-react';
import { OrderStatusChart } from '../misc/components/charts/OrderStatusChart';
import { OrderDeliveryZoneChart } from '../misc/components/charts/OrderDeliveryZoneChart';

const orderData = [
  { name: 'Orders Delivered', value: 15 },
  { name: 'Orders Sorted', value: 8 },
  { name: 'Sent to Dispatch', value: 8 },
];

const deliveryData = [
  { name: 'Lagos Island', value: 12 },
  { name: 'Lagos Central', value: 15 },
  { name: 'Lagos Mainland', value: 4 },
  { name: 'Other places', value: 14 },
];

const page = () => {
  const branchOptions = ['All Branches', 'Zuzu Delights', 'Prestige Flowers'];
  const dateOptions = [
    'Today',
    'Yesterday',
    'Last 7 days',
    'Last 30 days',
    'Custom',
  ];

  const handleBranchChange = (value: string) => {
    console.log('Selected branch:', value);
    // Add your logic here
  };

  const handleDateChange = (value: string) => {
    console.log('Selected date range:', value);
    // Add your logic here
  };

  return (
    <div className='w-full max-w-7xl mx-auto pt-12 px-8 xl:px-10'>
      <Header
        title='Order Statistics'
        branchOptions={branchOptions}
        dateOptions={dateOptions}
        onBranchChange={handleBranchChange}
        onDateChange={handleDateChange}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4'>
        <OrderStatisticsCard
          header='Total Orders'
          icon={<OrderTimeLine className="text-white" />}
          value='430'
          percentage={34}
          isPositive={true}
          additionalText='From last month'
          iconBg='#22292F'
        />
        <OrderStatisticsCard
          header='Total Revenue'
          icon={<Money className="text-white" />}
          value='₦2,000,000.00'
          percentage={27}
          isPositive={true}
          iconBg='#131253'
        />
        <OrderStatisticsCard
          header='Net Profit'
          icon={<Money className="text-white" />}
          value='₦1,600,600.00'
          percentage={15}
          isPositive={false}
          iconBg='#5B1850'
        />
        <OrderStatisticsCard
          header='Processed Orders'
          icon={<Box />}
          value='430'
          percentage={34}
          isPositive={true}
          additionalText='From last month'
          iconBg='#FFC600'
        />
        <OrderStatisticsCard
          header='Completed Orders'
          icon={<I3DCubeScan className="text-white" />}
          value='430'
          percentage={45}
          isPositive={true}
          additionalText='From last month'
          iconBg='#33860C'
        />
        <OrderStatisticsCard
          header='Canceled Orders'
          icon={<BoxRemove />}
          value='430'
          percentage={15}
          isPositive={false}
          additionalText='From last month'
          iconBg='#FFE7E7'
        />
      </div>

      <div className='flex justify-end my-14'>
        <ComparisonModal />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-y-16 mt-20 mb-10'>
        <OrderStatusChart />
        <OrderDeliveryZoneChart />
        <TopProductsTable />
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
