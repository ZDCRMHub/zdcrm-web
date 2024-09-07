'use client';

import { TrendingUp } from 'lucide-react';
import { Legend, Pie, PieChart } from 'recharts';

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
  { occassion: 'new_year', orders: 275, fill: '#12B246' },
  { occassion: 'easter', orders: 200, fill: '#72DEF6' },
  { occassion: 'valentine', orders: 187, fill: '#E3273E' },
  { occassion: 'christmas', orders: 173, fill: '#F0933B' },
];

const chartConfig = {
  orders: {
    label: 'orders',
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
            <SelectItem value='today'>This Year</SelectItem>
            <SelectItem value='week'>Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[280px] w-full'>
          <PieChart>
            {/* <ChartTooltip
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
            /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='orders'
              nameKey='occassion'
              innerRadius={60}
              outerRadius={120}

            />
            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              wrapperStyle={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                bottom: '-10px',
                paddingLeft: '20px',
              }}
              payload={[
                { value: "New Year", type: "circle", id: "lagos_island", color: "#12B246" },
                { value: "Easter", type: "circle", id: "lagos_mainland", color: "#72DEF6" },
                { value: "Valentines", type: "circle", id: "lagos_central", color: "#E3273E" },
                { value: "Christmas", type: "circle", id: "others", color: "#FFC600" },
              ]}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>

      </CardFooter>
    </Card>
  );
}
