'use client';

import {TrendingUp} from 'lucide-react';
import {Bar, BarChart, CartesianGrid, XAxis} from 'recharts';

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
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const description = 'A multiple bar chart';

const chartData = [
  {month: 'January', desktop: 186, mobile: 80},
  {month: 'February', desktop: 305, mobile: 200},
  {month: 'March', desktop: 237, mobile: 120},
  {month: 'April', desktop: 73, mobile: 190},
  {month: 'May', desktop: 209, mobile: 130},
  {month: 'June', desktop: 214, mobile: 140},
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#0095FF',
  },
  mobile: {
    label: 'Mobile',
    color: '#00E096',
  },
} satisfies ChartConfig;

export default function FinancialOverview() {
  return (
    <Card className='mb-[100px]'>
      <CardHeader className='flex justify-between flex-row'>
        <CardTitle>Financial Overview</CardTitle>
        <Select defaultValue='today'>
          <SelectTrigger className='w-[155px] h-8 text-xs'>
            <SelectValue placeholder='Today' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='today'>Today</SelectItem>
            <SelectItem value='week'>This Week</SelectItem>
            <SelectItem value='month'>This Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dashed' />}
            />
            <Bar
              dataKey='desktop'
              fill='var(--color-desktop)'
              radius={4}
              width={24}
              height={300}
            />
            <Bar
              dataKey='mobile'
              fill='var(--color-mobile)'
              radius={4}
              width={200}
              height={300}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
