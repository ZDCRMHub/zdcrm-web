'use client';

import { Controller, useForm } from 'react-hook-form';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Spinner } from '@/components/ui';
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
import SelectSingleSimple from '@/components/ui/selectSingleSimple';

import { useGetClientTrackingStats } from '../../api';
import { useGetAllBranches } from '@/app/(dashboard)/admin/businesses/misc/api';

const chartConfig = {
  new_customers: {
    label: 'New Clients',
    color: 'hsl(var(--chart-1))',
  },
  returning_customers: {
    label: 'Returning Clients',
    color: 'hsl(var(--chart-2))',
  },
};

function ClientTrackingChart() {
  const { control, watch, setValue } = useForm<{
    branch?: string;
  }>({
    defaultValues: {
      branch: undefined,
    },
  });
  const { data: allBranches, isLoading: isFetchingBranch } = useGetAllBranches();
  const { data, isLoading, isFetching } = useGetClientTrackingStats({
    branch: watch('branch') == "all" ? undefined : watch('branch'),
  });

  const chartData = data?.data.monthly_stats || [];

  return (
    <Card>
      <CardHeader className="flex md:!flex-row items-center justify-between">
        <CardTitle className="text-2xl md:text-[1.7rem] font-medium text-[#17181C] flex items-center gap-2">
          ClientTracking
          {isFetching && <Spinner />}
        </CardTitle>
        <div className="flex items-center gap-4 flex-wrap max-w-max">
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

        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}
          className="max-h-[400px] w-full h-[95%]"
        >
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="new_customers"
              stroke="var(--color-new_customers)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="returning_customers"
              stroke="var(--color-returning_customers)"
              strokeWidth={2}
              dot={false}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              wrapperStyle={{
                paddingTop: '20px',
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ClientTrackingChart;
