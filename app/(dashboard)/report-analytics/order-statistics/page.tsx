'use client';

import ComparisonModal from '@/app/(dashboard)/report-analytics/misc/components/ComparisonModal';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OrderStatsDeliveryZoneSection, OrderStatsHeaderSection, OrderStatsTopProducts } from '../misc/components/order-stats';



const OrderStatsPage = () => {

  return (
    <div className='w-full md:w-[92.5%] max-w-[1792px] mx-auto pt-12 px-8 xl:px-10'>
     
     <OrderStatsHeaderSection/>

      <div className='flex justify-end mt-14 mb-6'>
        {/* <ComparisonModal /> */}
      </div>

      <div className='flex gap-12 flex-col'>
        <OrderStatsDeliveryZoneSection />
        <OrderStatsTopProducts />
      </div>

      <footer className='flex justify-end mt-24 mb-10 gap-6'>
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
      </footer>
    </div>
  );
};

export default OrderStatsPage;
