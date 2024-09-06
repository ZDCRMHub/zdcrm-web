'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui"


export const description = 'A donut chart';

const chartData = [
  { occassion: 'new_year', visitors: 275, fill: '#12B246' },
  { occassion: 'easter', visitors: 200, fill: '#72DEF6' },
  { occassion: 'valentine', visitors: 187, fill: '#E3273E' },
  { occassion: 'christmas', visitors: 173, fill: '#F0933B' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  new_year: {
    label: 'new_year',
    color: '#12B246',
  },
  easter: {
    label: 'easter',
    color: '#72DEF6',
  },
  valentine: {
    label: 'valentine',
    color: '#E3273E',
  },
  christmas: {
    label: 'christmas',
    color: '#F0933B',
  },

} satisfies ChartConfig;

export function TrendsSeasonalitySalesChart() {
  return (
    <Card className='flex flex-col'>
      <CardHeader className="flex !flex-row items-center justify-between pb-0">
        <CardTitle className="text-[#6B7280] font-medium text-lg">
          Trends & Seasonality Sales
        </CardTitle>


        <Select defaultValue='today'>
          <SelectTrigger className='w-max min-w-[120px] h-12 text-xs'>
            <SelectValue placeholder='Today' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='today'>Today</SelectItem>
            <SelectItem value='week'>This Week</SelectItem>
            <SelectItem value='month'>This Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'>
          <PieChart>
            <ChartTooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <ChartTooltipContent>
                      <div className='bg-white p-2 rounded shadow'>
                        <div>{data.season}</div>
                        <div>
                          {data.value} Orders | ₦{data.value * 8000}
                        </div>
                      </div>
                    </ChartTooltipContent>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={chartData}
              dataKey='visitors'
              nameKey='occassion'
              innerRadius={60}
              outerRadius={120}

            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
