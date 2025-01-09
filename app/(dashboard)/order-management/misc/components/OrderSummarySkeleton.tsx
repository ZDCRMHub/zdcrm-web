import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const OrderSummarySkeleton: React.FC = () => {
  return (
    <div className='flex flex-col w-full md:w[92.5%] max-w-[1280px] mr-auto p-6 xl:px-12'>
      <div className='flex items-center mb-10'>
        <Skeleton className='h-10 w-10 rounded-full mr-2' />
        <Skeleton className='h-8 w-48' />
      </div>

      <Skeleton className='h-40 w-full mb-10' />

      <div className='grid grid-cols-[1fr,0.5fr] gap-8 mb-10'>
        <div>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className='h-60 w-full mb-4' />
          ))}
          <Skeleton className='h-40 w-full mt-16' />
        </div>

        <div>
          <Skeleton className='h-60 w-full mb-6' />
          <Skeleton className='h-40 w-full' />
        </div>
      </div>

      <div className='flex justify-end gap-4 mb-10'>
        <Skeleton className='h-14 w-32' />
        <Skeleton className='h-14 w-48' />
      </div>
    </div>
  );
};

export default OrderSummarySkeleton;

