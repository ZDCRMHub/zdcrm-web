"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSingleCombo,
  SelectTrigger,
  SelectValue,
  Spinner,
} from "@/components/ui";
import { useGetEmployeePerformanceStats } from "../../api";
import { Controller, useForm } from "react-hook-form";
import SelectSingleSimple from "@/components/ui/selectSingleSimple";
import { useGetAllUsers } from "@/app/(dashboard)/admin/employees-role/misc/api";
import React from "react";

export const description = "A multiple bar chart";

function EmployeePerformanceChart() {
  const { control, watch, setValue } = useForm<{
    user_id: string;
    period_type: "weekly" | "monthly";
  }>({
    defaultValues: {
      user_id: "1",
      period_type: "weekly",
    },
  });
  const { data: employees, isLoading: isLoadingEmployees } = useGetAllUsers();
  const { data, isLoading, isFetching } = useGetEmployeePerformanceStats({
    user_id: watch('user_id'),
    period_type: watch('period_type'),
  })
  // Employee Performance Charts
  const chartData = React.useMemo(() => {
    if (!data?.data.stats) return [];
    return data.data.stats.map((stat) => ({
      date: stat.date,
      completed_orders: stat.completed_orders,
      finalized_enquiries: stat.finalized_enquiries,
    }));
  }, [data]);

  const chartConfig = {
    completed_orders: {
      label: "Completed Orders",
    },
    finalized_enquiries: {
      label: "Finalized Enquiries",
    },
  } satisfies ChartConfig;


  return (
    <Card>
      <CardHeader className="flex md:!flex-row items-center justify-between">
        <CardTitle className="text-xl md:text-[1.5rem] font-medium text-[#17181C] flex items-center gap-2">
          Employee Performance
          {isFetching && <Spinner />}
        </CardTitle>
        <div className="flex items-center gap-4 flex-wrap max-w-max">
          <Controller
            name='user_id'
            control={control}
            render={({ field }) => (
              <SelectSingleCombo
                options={employees?.data.map((employee) => ({
                  label: employee.name,
                  value: employee.id.toString(),
                }))}
                isLoadingOptions={isLoadingEmployees}
                placeholder='Select Employee'
                labelKey="label"
                valueKey="value"
                {...field}
                variant="light"
                size="thin"
                containerClass="max-w-[150px]"
              />
            )}
          />
          <Controller
            name='period_type'
            control={control}
            render={({ field }) => (
              <SelectSingleSimple
                {...field}
                onChange={(new_value) => setValue('period_type', new_value as any)}
                value={watch('period_type')}
                labelKey="label"
                valueKey="value"
                options={[
                  { label: 'By week', value: 'weekly' },
                  { label: 'By month', value: 'monthly' }
                ]}
                placeholder='Filter Period'
                variant="light"
                size="thin"
                disabled={isLoading}
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
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={20}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            <Legend
              wrapperStyle={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                bottom: "-15px",
                paddingLeft: "20px",
              }}
              payload={[
                {
                  value: "Finalized Enquiries",
                  type: "circle",
                  id: "finalized_enquiries",
                  color: "#3B54E3",
                },
                {
                  value: "Completed Orders",
                  type: "circle",
                  id: "completed_orders",
                  color: "#FFC600",
                },
              ]}
            />
            <Bar dataKey="finalized_enquiries" fill="#3B54E3" radius={4} name="Finalized Enquiries" />
            <Bar dataKey="completed_orders" fill="#FFC600" radius={4} name="Completed Orders" />
          </BarChart>
        </ChartContainer>
        <CardFooter className="py-4"></CardFooter>
      </CardContent>
    </Card>
  );
}
export default EmployeePerformanceChart;