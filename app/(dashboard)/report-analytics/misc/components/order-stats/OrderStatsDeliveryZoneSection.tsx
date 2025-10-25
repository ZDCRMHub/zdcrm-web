"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RangeAndCustomDatePicker, Select, SelectItem, SelectValue, Spinner } from "@/components/ui";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { useGetOrderDeliveryStats } from "../../api/getOrderStatisticsDeliveryZone";
import { useGetAllBranches } from '@/app/(dashboard)/admin/businesses/misc/api';import { DateRange } from "react-day-picker";
import { Controller, useForm } from "react-hook-form";
import { subMonths } from "date-fns";
import { OrderStatsDeliveryZoneChartSkeleton } from "./OrderStatsDeliveryZoneSkeleton";
import SelectSingleSimple from "@/components/ui/selectSingleSimple";
import { SelectBranchCombo } from '@/components/ui';

const chartConfig = {
  order_count: {
    label: "No. of Orders",
    color: "#00E096",
  },
  enquiry_count: {
    label: "Enquiries",
    color: "#0095FF",
  },
} satisfies ChartConfig;

const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const monthsAgo = subMonths(new Date(), 1);

export function OrderStatsDeliveryZoneSection() {
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

  const { data, isLoading, isFetching } = useGetOrderDeliveryStats({
    branch: watch('branch') == "all" ? undefined : watch('branch'),
    date_from: watch('date').from?.toISOString().split('T')[0],
    date_to: watch('date').to?.toISOString().split('T')[0],
    period: watch('period'),
  });

  const chartData = data?.data.delivery_stats || [];

  return (
    <Card className="">
      <CardHeader className="flex md:!flex-row items-center justify-between">
        <CardTitle className="text-xl md:text-[1.5rem] font-medium text-[#17181C] flex items-center gap-2">
          Order Delivery Zones
          {
            isFetching && <Spinner />
          }
        </CardTitle>
        <div className="flex items-center gap-4 flex-wrap max-w-max">
          <Controller
            name='branch'
            control={control}
            render={({ field }) => (
              <SelectBranchCombo
                value={watch('branch')}
                onChange={(new_value) => setValue('branch', new_value)}
                placeholder='Filter Branch'
                variant="light"
                size="thin"
                isLoadingOptions={isFetchingBranch}
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
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="max-h-[400px] w-full h-[90%]"
        >
          {
            isLoading ? (
              <OrderStatsDeliveryZoneChartSkeleton />
            )
              :
              (
                <BarChart data={chartData} barSize={20} className="mb-8">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    strokeOpacity={0.5}
                    stroke="#ccc"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }}
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={20}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 15)}
                    tick={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="enquiry_count"
                    fill={chartConfig.enquiry_count.color}
                    radius={4}
                    name="Enquiries"
                  />
                  <Bar
                    dataKey="order_count"
                    fill={chartConfig.order_count.color}
                    radius={4}
                    name="Orders"
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
                      bottom: "0px",
                      paddingLeft: "20px",
                    }}
                  />
                </BarChart>
              )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default OrderStatsDeliveryZoneSection;

