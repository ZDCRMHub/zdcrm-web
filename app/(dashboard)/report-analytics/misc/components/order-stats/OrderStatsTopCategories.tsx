'use client'

import React from 'react';
import { useGetTopCategories } from '../../api';
import { Skeleton } from "@/components/ui/skeleton"
import { DateRange } from 'react-day-picker';
import { Controller, useForm } from 'react-hook-form';
import { useGetAllBranches } from '@/app/(dashboard)/admin/businesses/misc/api';
import { subMonths } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, RangeAndCustomDatePicker, Spinner } from '@/components/ui';
import SelectSingleSimple from '@/components/ui/selectSingleSimple';


const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const monthsAgo = subMonths(new Date(), 1);

const OrderStatsTopCategories: React.FC = () => {
  const { data: allBranches, isLoading: isFetchingBranch } = useGetAllBranches();
  const { control, watch, setValue } = useForm<{
    branch?: string;
    date: DateRange;
    period: "today" | "week" | "month" | "year" | "custom";
  }>({
    defaultValues: {
      branch: "all",
      date: {
        from: monthsAgo,
        to: tomorrow,
      },
      period: 'today',
    },
  });

  const { data, isLoading, isFetching } = useGetTopCategories({
    branch: watch('branch') == "all" ? undefined : watch('branch'),
    date_from: watch('date').from?.toISOString().split('T')[0],
    date_to: watch('date').to?.toISOString().split('T')[0],
    period: watch('period'),
  });
  const categories = data?.data || [];
  const skeletonRows = Array(5).fill(null);

  return (
    <Card className='overflow-hidden w-full'>
      <CardHeader className="flex md:!flex-row items-center justify-between p-4 md:p-6">
        <CardTitle className='text-xl md:text-[1.5rem] font-medium text-[#17181C] flex items-center gap-2'>
          Top Categories
          {
            isFetching && <Spinner />
          }
        </CardTitle>

        <CardContent className="flex items-center gap-4 flex-wrap max-w-max">
          <Controller
            name='branch'
            control={control}
            render={({ field }) => (
              <SelectSingleSimple
                {...field}
                onChange={(new_value) => setValue('branch', new_value)}
                value={watch('branch')}
                isLoadingOptions={isFetchingBranch}
                options={[{ label: "All Branches", value: "all" }, ...(allBranches?.data.map(branch => ({ label: branch.name, value: branch.id.toString() })) || [])]}
                labelKey="label"
                valueKey="value"
                placeholder='Filter Branch'
                variant="light"
                size="thin"
              />
            )}
          />
          <RangeAndCustomDatePicker
            className="max-w-max"
            variant="light"
            size="thin"
            onChange={(value) => {
              if (value.dateType === 'custom' && value.from && value.to) {
                setValue('date', { from: value.from, to: value.to });
                setValue('period', 'custom');
              } else {
                setValue('period', value.dateType as "today" | "week" | "month" | "year" | "custom");
              }
            }}
            value={{
              dateType: watch('period'),
              from: watch('date').from,
              to: watch('date').to
            }}
          />
        </CardContent>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className='w-full text-left'>
          <thead>
            <tr className='bg-gray-100 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-3 px-6'>#</th>
              <th className='py-3 px-6'>Category</th>
              <th className='py-3 px-6'>Orders</th>
              <th className='py-3 px-6'>Quantity</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 text-sm font-light'>
            {isLoading ? (
              skeletonRows.map((_, index) => (
                <tr key={index} className='border-b border-gray-200'>
                  <td className='py-3 px-6'><Skeleton className="h-4 w-4" /></td>
                  <td className='py-3 px-6'><Skeleton className="h-4 w-40" /></td>
                  <td className='py-3 px-6'><Skeleton className="h-4 w-20" /></td>
                  <td className='py-3 px-6'>
                    <Skeleton className="h-8 w-24" />
                  </td>
                  <td className='py-3 px-6'><Skeleton className="h-4 w-8" /></td>
                </tr>
              ))
            ) : (
              categories.map((category, index) => (
                <tr
                  key={category.category_id}
                  className='border-b border-gray-200 hover:bg-gray-100'
                >
                  <td className='py-3 px-6 text-center'>{`0${index + 1}`}</td>
                  <td className='py-3 px-6'>{category.category_name}</td>
                  <td className='py-3 px-6'>
                    <div className='bg-blue-100 text-blue-800 text-center rounded-md border border-blue-800 px-2 py-1'>
                      {category.order_count} Orders
                    </div>
                  </td>
                  <td className='py-3 px-6 text-center'>{category.total_quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default OrderStatsTopCategories;

