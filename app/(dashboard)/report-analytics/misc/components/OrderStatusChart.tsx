// // import React from 'react';
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Legend,
// //   Tooltip,
// //   PieLabelRenderProps,
// // } from 'recharts';

// // interface DataItem {
// //   name: string;
// //   value: number;
// //   color: string;
// // }

// // const data: DataItem[] = [
// //   {name: 'Orders Delivered', value: 8, color: 'hsl(var(--chart-1))'},
// //   {name: 'Orders Sorted', value: 8, color: 'hsl(var(--chart-2))'},
// //   {name: 'Sent to Dispatch', value: 8, color: 'hsl(var(--chart-3))'},
// // ];

// // const RADIAN = Math.PI / 180;
// // const renderCustomizedLabel = ({
// //   cx,
// //   cy,
// //   midAngle,
// //   innerRadius,
// //   outerRadius,
// //   percent,
// // }: PieLabelRenderProps) => {
// //   if (
// //     typeof cx !== 'number' ||
// //     typeof cy !== 'number' ||
// //     typeof innerRadius !== 'number' ||
// //     typeof outerRadius !== 'number' ||
// //     typeof midAngle !== 'number' ||
// //     typeof percent !== 'number'
// //   ) {
// //     return null;
// //   }

// //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
// //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
// //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

// //   return (
// //     <text
// //       x={x}
// //       y={y}
// //       fill='white'
// //       textAnchor='middle'
// //       dominantBaseline='central'>
// //       {`${(percent * 100).toFixed(0)}%`}
// //     </text>
// //   );
// // };

// // export const OrderStatusChart = () => {
// //   return (
// //     <div className='h-64 relative'>
// //       <PieChart width={300} height={250} className='flex'>
// //         <Pie
// //           data={data}
// //           cx='50%'
// //           cy='50%'
// //           labelLine={false}
// //           label={renderCustomizedLabel}
// //           outerRadius={80}
// //           fill='#8884d8'
// //           dataKey='value'>
// //           {data.map((entry, index) => (
// //             <Cell key={`cell-${index}`} fill={entry.color} />
// //           ))}
// //         </Pie>
// //         <Tooltip />
// //         <Legend layout='vertical' align='right' verticalAlign='middle' />
// //       </PieChart>
// //     </div>
// //   );
// // };

// // import React from 'react';
// // import {PieChart, Pie, Cell, Legend, ResponsiveContainer} from 'recharts';
// // import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

// // const data = [
// //   {name: 'Orders Delivered', value: 8, color: 'fill-green-500'},
// //   {name: 'Orders Sorted', value: 8, color: 'fill-yellow-400'},
// //   {name: 'Sent to Dispatch', value: 8, color: 'fill-red-400'},
// // ];

// // const RADIAN = Math.PI / 180;
// // const renderCustomizedLabel = ({
// //   cx,
// //   cy,
// //   midAngle,
// //   innerRadius,
// //   outerRadius,
// //   percent,
// //   index,
// // }) => {
// //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
// //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
// //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

// //   return index === 0 ? (
// //     <text
// //       x={cx}
// //       y={cy}
// //       fill='hsl(var(--foreground))'
// //       textAnchor='middle'
// //       dominantBaseline='central'>
// //       <tspan x={cx} dy='-1em' fontSize='24' fontWeight='bold'>
// //         ₦250,000
// //       </tspan>
// //       <tspan x={cx} dy='1.5em' fontSize='14'>
// //         Total
// //       </tspan>
// //     </text>
// //   ) : null;
// // };

// // const CustomLegend = props => {
// //   const {payload} = props;
// //   return (
// //     <ul className='list-none p-0 space-y-2'>
// //       {payload.map((entry, index) => (
// //         <li key={`item-${index}`} className='flex items-center'>
// //           <span
// //             className={`w-3 h-3 rounded-full mr-2 ${entry.payload.color}`}></span>
// //           <span className='mr-2 font-medium'>{entry.value}</span>
// //           <span className='text-muted-foreground'>
// //             {entry.payload.value} Orders
// //           </span>
// //         </li>
// //       ))}
// //     </ul>
// //   );
// // };

// // export default function Component() {
// //   return (
// //     <Card className='w-full max-w-md mx-auto'>
// //       <CardHeader>
// //         <CardTitle className='text-lg font-medium'>Order Status</CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         <div className='h-[300px]'>
// //           <ResponsiveContainer width='100%' height='100%'>
// //             <PieChart>
// //               <Pie
// //                 data={data}
// //                 cx='50%'
// //                 cy='50%'
// //                 labelLine={false}
// //                 label={renderCustomizedLabel}
// //                 outerRadius={100}
// //                 dataKey='value'>
// //                 {data.map((entry, index) => (
// //                   <Cell key={`cell-${index}`} className={entry.color} />
// //                 ))}
// //               </Pie>
// //               <Legend
// //                 content={<CustomLegend />}
// //                 verticalAlign='bottom'
// //                 align='center'
// //               />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// 'use client';

// import * as React from 'react';
// import {TrendingUp} from 'lucide-react';
// import {Label, Pie, PieChart, ResponsiveContainer} from 'recharts';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart';
// import {TrendUp} from '@phosphor-icons/react';

// const chartData = [
//   {activity: 'Post', value: 36, fill: '#17BF6B'},
//   {activity: 'Transaction', value: 21, fill: '#D4E366'},
//   {activity: 'Quotation', value: 17, fill: '#ED3333'},
// ];

// const chartConfig = {
//   value: {
//     label: 'Total Activities',
//   },
//   post: {
//     label: 'Post',
//     color: '#17BF6B',
//   },
//   transaction: {
//     label: 'Transaction',
//     color: '#D4E366',
//   },
//   quotation: {
//     label: 'Quotation',
//     color: '#ED3333',
//   },
// } satisfies ChartConfig;

// export function OrderStatusChart() {
//   const totalActivities = React.useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.value, 0);
//   }, []);

//   return (
//     <Card className='flex flex-col'>
//       <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//         <CardTitle className='text-lg font-normal flex items-center gap-3'>
//           <TrendUp size={32} color='#0AC277' />
//           <span>
//             Order Status
//             <p className='text-sm text-muted-foreground'>
//               Total Earnings of the Month
//             </p>
//           </span>
//         </CardTitle>
//         <Select defaultValue='all'>
//           <SelectTrigger className='w-[80px] h-9 text-sm border rounded-md'>
//             <SelectValue placeholder='All' />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value='all'>All</SelectItem>
//             <SelectItem value='30days'>30 days</SelectItem>
//             <SelectItem value='60days'>60 days</SelectItem>
//           </SelectContent>
//         </Select>{' '}
//       </CardHeader>
//       <CardContent className='pb-0 flex items-center'>
//         <ResponsiveContainer width='50%' height={300}>
//           <ChartContainer config={chartConfig}>
//             <PieChart>
//               <ChartTooltip
//                 cursor={false}
//                 content={<ChartTooltipContent hideLabel />}
//               />
//               <Pie
//                 data={chartData}
//                 dataKey='value'
//                 nameKey='activity'
//                 innerRadius={60}
//                 strokeWidth={5}
//                 fill='#8884d8'
//                 label={false}
//               />
//             </PieChart>
//           </ChartContainer>
//         </ResponsiveContainer>
//         <ul className='flex flex-col items-start gap-4'>
//           {chartData.map(item => (
//             <li key={item.activity} className='flex items-center gap-2'>
//               <div
//                 className={`h-3 w-3 rounded-sm ${item.fill}`}
//                 style={{backgroundColor: item.fill}}
//               />
//               <span>{item.activity}</span>
//               <span className='text-custom-gray text-sm'>{`${item.value} %`}</span>
//             </li>
//           ))}
//         </ul>
//       </CardContent>
//     </Card>
//   );
// }

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  PieLabelRenderProps,
} from 'recharts';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {TrendUp} from '@phosphor-icons/react';

const COLORS = ['#4CAF50', '#FFF176', '#EF5350', '#42A5F5'];

interface CustomLabelProps {
  viewBox?: {
    cx: number;
    cy: number;
  };
  value1: string;
  value2: string;
}

const CustomLabel: React.FC<CustomLabelProps> = ({viewBox, value1, value2}) => {
  const {cx, cy} = viewBox || {cx: 0, cy: 0};
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={-10}
        textAnchor='middle'
        fill='#888'
        fontSize={20}
        fontWeight='bold'>
        {value1}
      </text>
      <text x={cx} y={cy} dy={20} textAnchor='middle' fill='#333' fontSize={14}>
        {value2}
      </text>
    </g>
  );
};

interface DataItem {
  name: string;
  value: number;
  unit?: string;
}

interface ReusablePieChartProps {
  title: string;
  subtitle: string;
  data: DataItem[];
  centerLabel: {
    value: string;
    label: string;
  };
  showLegend?: boolean;
  trendup: boolean;
}

const ReusablePieChart: React.FC<ReusablePieChartProps> = ({
  title,
  subtitle,
  data,
  centerLabel,
  showLegend = true,
  trendup,
}) => {
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-base font-normal flex items-center gap-3'>
          {trendup && <TrendUp className='h-4 w-4' />}
          <div>
            <span className='font-semibold'>{title}</span>
            <p className='text-xs text-muted-foreground'>{subtitle}</p>
          </div>
        </CardTitle>
        <Select defaultValue='today'>
          <SelectTrigger className='w-[80px] h-8 text-xs'>
            <SelectValue placeholder='Today' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='today'>Today</SelectItem>
            <SelectItem value='week'>This Week</SelectItem>
            <SelectItem value='month'>This Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='pt-2'>
        <div className='h-[200px] flex items-center justify-between'>
          <ResponsiveContainer width='60%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={50}
                outerRadius={80}
                fill='#8884d8'
                paddingAngle={2}
                dataKey='value'>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {showLegend && (
            <div className='w-[40%]'>
              {data.map((entry, index) => (
                <div key={`legend-${index}`} className='flex items-center mb-2'>
                  <div
                    className='w-3 h-3 mr-2'
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}></div>
                  <span className='text-sm'>{entry.name}</span>
                  <span className='text-sm text-muted-foreground ml-auto'>
                    {entry.value} {entry.unit || 'Orders'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReusablePieChart;
