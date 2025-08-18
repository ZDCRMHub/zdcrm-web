"use client";

import { useMemo } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from 'date-fns';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
} from "@/components/ui/chart";
import { Spinner } from "@/components/ui";
import SelectSingleSimple from "@/components/ui/selectSingleSimple";

import { useGetFinancialOverviewStats } from "../../api";
import { useGetAllBranches } from '@/app/(dashboard)/admin/businesses/misc/api';import BarChartSkeleton from "./BarChartSkeleton";

const chartConfig = {
  total_revenue: {
    label: "Total Revenue",
    color: "#00E096",
  },
  net_profit: {
    label: "Net Profit",
    color: "#0095FF",
  },
};

export function FinancialOverviewSection() {
  const { data: allBranches, isLoading: isFetchingBranch } = useGetAllBranches();
  const { control, watch, setValue } = useForm<{
    branch?: string;
    period_type: "weekly" | "monthly";
  }>({
    defaultValues: {
      branch: 'all',
      period_type: 'weekly',
    },
  });

  const { data, isLoading, isFetching } = useGetFinancialOverviewStats({
    branch: watch('branch') == "all" ? undefined : watch('branch'),
    period_type: watch('period_type'),
  });

  const chartData = useMemo(() => {
    if (!data?.data.data) return [];
    return data.data.data.map(item => ({
      ...item,
      total_revenue: parseFloat(item.total_revenue),
      net_profit: parseFloat(item.net_profit),
      formattedDate: watch('period_type') === 'weekly'
        ? `${item.day} (${format(parseISO(item.date!), 'MMM d')})`
        : item.month,
    }));
  }, [data, watch('period_type')]);

  return (
    <Card className="">
      <CardHeader className="flex md:!flex-row items-center justify-between">
        <CardTitle className="text-2xl md:text-[1.7rem] font-medium text-[#17181C] flex items-center gap-2">
          Financial Overview
          {isFetching && <Spinner />}
        </CardTitle>
        <div className="flex items-center gap-4 flex-wrap max-w-max">
          <Controller
            name='period_type'
            control={control}
            render={({ field }) => (
              <SelectSingleSimple
                {...field}
                onChange={(new_value) => setValue('period_type', new_value as "weekly" | "monthly")}
                value={watch('period_type')}
                options={[
                  { label: 'Weekly', value: 'weekly' },
                  { label: 'Monthly', value: 'monthly' }
                ]}
                labelKey="label"
                valueKey="value"
                placeholder='Filter Period'
                variant="light"
                size="thin"
              />
            )}
          />
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
        <ChartContainer
          config={chartConfig}
          className="max-h-[400px] w-full h-[90%]"
        >
          {isLoading ? (
            <BarChartSkeleton />
          ) : (
            <ResponsiveContainer width="100%" height={400}>
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
                  dataKey="formattedDate"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontFamily: "Poppins, sans-serif", fontSize: 11 }}
                  interval={0}
                  tickFormatter={(value) => value}
                  height={60}
                  xAxisId={0}
                  tickSize={20}
                  scale="point"
                  padding={{ left: 20, right: 20 }}
                />
                <Tooltip
                  cursor={false}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-200 rounded shadow">
                          <p className="font-bold">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: N{entry.value?.toLocaleString()}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="total_revenue"
                  fill={chartConfig.total_revenue.color}
                  radius={4}
                  name="Total Revenue"
                />
                <Bar
                  dataKey="net_profit"
                  fill={chartConfig.net_profit.color}
                  radius={4}
                  name="Net Profit"
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
                    bottom: "10px",
                    // paddingLeft: "20px",
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default FinancialOverviewSection;

