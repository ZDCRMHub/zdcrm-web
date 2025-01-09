import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const OrderStatsCardSkeleton: React.FC = () => {
  return (
    <Card className='px-6 py-4'>
      <CardHeader className='p-0'>
        <Skeleton className="h-6 w-24" />
      </CardHeader>

      <Separator className="my-2" />

      <div className='flex justify-between items-center mt-5'>
        <div className='flex items-center gap-2.5 mb-1.5'>
          <Skeleton className="h-10 w-10 rounded-[6px]" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
    </Card>
  );
};

export default OrderStatsCardSkeleton;

