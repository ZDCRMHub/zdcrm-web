'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, XAxis } from 'recharts';

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



const chartData = [
  { month: 'January', returning: 186, new: 80 },
  { month: 'February', returning: 305, new: 200 },
  { month: 'March', returning: 237, new: 120 },
  { month: 'April', returning: 73, new: 190 },
  { month: 'May', returning: 209, new: 130 },
  { month: 'June', returning: 214, new: 140 },
  { month: 'July', returning: 214, new: 140 },
  { month: 'August', returning: 214, new: 140 },
  { month: 'September', returning: 314, new: 40 },
  { month: 'October', returning: 200, new: 240 },
  { month: 'November', returning: 400, new: 180 },
  { month: 'December', returning: 250, new: 240 },
];

const chartConfig = {
  returning: {
    label: 'returning',
    color: '#A700FF',
  },
  new: {
    label: 'new',
    color: '#EF4444',
  },
} satisfies ChartConfig;

export function ClientTrackingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#6B7280] font-medium text-lg">Clients Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[320px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey='returning'
              // type='monotone'
              stroke='#EF4444'
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey='new'
              // type='monotone'
              stroke='#A700FF'
              strokeWidth={2}
              dot={false}
            />

<Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              wrapperStyle={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                bottom: "-10px",
                // right: '0',
                // top: '',
                // transform: 'translateY(50%)',
                paddingLeft: "20px",
              }}
              payload={[
                {
                  value: "Returning Clients",
                  type: "circle",
                  id: "enquiries",
                  color: "#EF4444",
                },
                {
                  value: "New Clients",
                  type: "circle",
                  id: "orders",
                  color: "#A700FF",
                },
              ]}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  );
}
