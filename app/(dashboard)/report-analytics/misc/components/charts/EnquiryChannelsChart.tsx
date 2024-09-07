'use client';

import {TrendingUp} from 'lucide-react';
import {Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis} from 'recharts';

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

export const description = 'A bar chart with an active bar';

const chartData = [
  {channel: 'website', enquiries: 187, fill: 'var(--color-website)'},
  {channel: 'instagram', enquiries: 200, fill: 'var(--color-instagram)'},
  {channel: 'favebook', enquiries: 275, fill: 'var(--color-favebook)'},
  {channel: 'google', enquiries: 173, fill: 'var(--color-google)'},
  {channel: 'others', enquiries: 90, fill: 'var(--color-others)'},
];

const chartConfig = {
  enquiries: {
    label: 'Enquiries',
  },
  website: {
    label: 'Website',
    color: '#1C1C1C',
  },
  instagram: {
    label: 'Instagram',
    color: '#0095FF',
  },
  favebook: {
    label: 'Facebook',
    color: '#6E81F4',
  },
  google: {
    label: 'Google',
    color: '#6FC5F5',
  },
  others: {
    label: 'Others',
    color: '#6CB79C',
  },
} satisfies ChartConfig;

export function EnquiryChannelsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#6B7280] font-medium text-lg">Enquiry Channels</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[320px]">
          <BarChart accessibilityLayer data={chartData} barSize={42}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.95} stroke="#ccc" />

            <XAxis
              dataKey='channel'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
             <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }}
            />
             <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey='enquiries'
              strokeWidth={2}
              radius={6}
              activeIndex={2}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
  
      </CardFooter>
    </Card>
  );
}
