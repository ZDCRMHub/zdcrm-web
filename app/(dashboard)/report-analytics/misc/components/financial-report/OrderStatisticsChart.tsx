"use client";

import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Spinner } from "@/components/ui";

export type OrderStatisticsDatum = {
  name: string;
  enquiries: number;
  orders: number;
};

export type OrderStatisticsChartProps = {
  title?: string;
  data?: OrderStatisticsDatum[];
  isLoading?: boolean;
  className?: string;
};

const chartConfig: ChartConfig = {
  enquiries: { label: "Enquiries", color: "#0095FF" },
  orders: { label: "Orders", color: "#00E096" },
};

const dummyData: OrderStatisticsDatum[] = [
  { name: "Lagos Island", enquiries: 14, orders: 12 },
  { name: "Lagos Central", enquiries: 11, orders: 13 },
  { name: "Lagos Mainland", enquiries: 5, orders: 22 },
  { name: "Other Places", enquiries: 16, orders: 6 },
];

export default function OrderStatisticsChart({ title = "Order FInancials", data, isLoading, className }: OrderStatisticsChartProps) {
  const chartData = data && data.length ? data : dummyData;

  return (
    <Card className={className}>
      <CardHeader className="flex md:!flex-row items-center justify-between">
        <CardTitle className="text-xl md:text-[1.5rem] font-medium text-[#17181C] flex items-center gap-2">
          {title}
          {isLoading && <Spinner />}
        </CardTitle>
        <div className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm text-muted-foreground">
          Today
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[360px] w-full h-[90%]">
          {isLoading ? (
            <div className="w-full h-[320px] flex items-center justify-center"> <Spinner /> </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} barCategoryGap="30%" barGap={6}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} stroke="#ccc" />
                <YAxis tickLine={false} axisLine={false} tick={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }} />
                <XAxis dataKey="name" tickLine={false} tickMargin={20} axisLine={false} tickFormatter={(value) => value} tick={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                <Bar dataKey="enquiries" fill={chartConfig.enquiries.color} radius={4} name="Enquiries" />
                <Bar dataKey="orders" fill={chartConfig.orders.color} radius={4} name="Orders" />
                <Legend verticalAlign="bottom" align="center" layout="horizontal" wrapperStyle={{ position: "relative", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", bottom: "0px", paddingLeft: "20px" }} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-muted-foreground text-sm">Total enquiries vs orders per delivery zone</div>
      </CardFooter>
    </Card>
  );
}
