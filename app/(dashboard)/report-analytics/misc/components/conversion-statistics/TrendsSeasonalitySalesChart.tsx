'use client';

import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Spinner } from "@/components/ui";
import SelectSingleSimple from '@/components/ui/selectSingleSimple';

import { useGetConversionOccassionStats } from '../../api';
import { BarChartSkeleton } from '../financial-report';

const chartConfig = {
  order_count: {
    label: 'Orders',
    color: 'hsl(var(--chart-1))',
  },
  enquiry_count: {
    label: 'Enquiries',
    color: 'hsl(var(--chart-2))',
  },
};

function TrendsSeasonalitySalesChart() {
  const { control, watch, setValue } = useForm<{
    year: "this_year" | "last_year";
  }>({
    defaultValues: {
      year: "this_year",
    },
  });

  const { data, isFetching, isLoading } = useGetConversionOccassionStats({ year: watch('year') });

  const chartData = useMemo(() => {
    if (!data?.data.stats) return [];
    return data.data.stats.map(stat => ({
      occasion: stat.occasion,
      order_count: stat.order_count,
      enquiry_count: stat.enquiry_count,
      total_revenue: parseFloat(stat.total_revenue),
    }));
  }, [data]);
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className='bg-white p-2 rounded shadow'>
          <div className="font-bold">{data.occasion}</div>
          <div>Orders: {data.order_count}</div>
          <div>Enquiries: {data.enquiry_count}</div>
          <div>Revenue: ₦{data.total_revenue.toLocaleString()}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className='flex flex-col'>
      <CardHeader className="flex md:!flex-row items-center justify-between">
        <CardTitle className="text-2xl md:text-[1.7rem] font-medium text-[#17181C] flex items-center gap-2">
          Trends & Seasonality Sales
          {isFetching && <Spinner />}
        </CardTitle>
        <div className="flex items-center gap-4 flex-wrap max-w-max">
          <Controller
            name='year'
            control={control}
            render={({ field }) => (
              <SelectSingleSimple
                {...field}
                onChange={(new_value) => setValue('year', new_value as "this_year" | "last_year")}
                value={watch('year')}
                labelKey="label"
                valueKey="value"
                options={[
                  { label: 'This Year', value: 'this_year' },
                  { label: 'Last Year', value: 'last_year' }
                ]}
                placeholder='Filter Year'
                variant="light"
                size="thin"
              />
            )}
          />
        </div>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto w-full h-[400px]'>
          {
            isLoading ?
              <BarChartSkeleton bars={7} />
              :
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="occasion" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  {/* <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <ChartTooltipContent>
                            <div className='bg-white p-2 rounded shadow'>
                              <div className="font-bold">{data.occasion}</div>
                              <div>Orders: {data.order_count}</div>
                              <div>Enquiries: {data.enquiry_count}</div>
                              <div>Revenue: ₦{data.total_revenue.toLocaleString()}</div>
                            </div>
                          </ChartTooltipContent>
                        );
                      }
                      return null;
                    }}
                  /> */}

                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="order_count" fill="var(--color-order_count)" name="Orders" radius={4} />
                  <Bar yAxisId="right" dataKey="enquiry_count" fill="var(--color-enquiry_count)" name="Enquiries" radius={4} />
                </BarChart>
              </ResponsiveContainer>
          }
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
export default TrendsSeasonalitySalesChart;