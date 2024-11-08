"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendUp } from "iconsax-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  RangeAndCustomDatePicker,
} from "@/components/ui";
import { TrendingUp } from "lucide-react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

export const description = "A donut chart";

const chartData = [
  { location: "Lagos Island", no_of_orders: 25, enquiries: 16 },
  { location: "Lagos Central", no_of_orders: 15, enquiries: 8 },
  { location: "Lagos Mainland", no_of_orders: 10, enquiries: 15 },
  { location: "Other places", no_of_orders: 6, enquiries: 14 },
];

const chartConfig = {
  no_of_orders: {
    label: "No. of Orders",
  },
  enquiries: {
    label: "Enquiries",
  },
  // "Lagos Island": {
  //   label: "Lagos Island",
  //   color: "#1C1C1C99",
  // },
  // "Lagos Central": {
  //   label: "Lagos Central",
  //   color: "#E51B3F",
  // },
  // "Lagos Mainland": {
  //   label: "Lagos Mainland",
  //   color: "#34CF5699",
  // },
  // "Other places": {
  //   label: "Other places",
  //   color: "#FFC600",
  // },
} satisfies ChartConfig;

export function OrderDeliveryZoneFinance() {
  return (
    <Card className="">
      <CardHeader className="flex !flex-row items-center justify-between pb-0">
        <CardTitle>Order Delivery Zone</CardTitle>
        <Select>
          <SelectTrigger className="w-[150px] bg-transparent">
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="this_week">This Week</SelectItem>
            <SelectItem value="30_days">Last 30 Days</SelectItem>
            <SelectItem value="custom">Custom Date</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="max-h-[400px] w-full h-[90%]"
        >
          <BarChart data={chartData} barSize={20} className="mb-8">
            {/* Grid with a stronger stroke */}
            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.5}
              stroke="#ccc"
            />

            {/* Y-Axis to display tick levels */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }}
            />

            <XAxis
              dataKey="location"
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
              dataKey="enquiries"
              fill="#0095FF"
              radius={4}
              label="Enquiries"
            />
            <Bar
              dataKey="no_of_orders"
              fill="#00E096"
              radius={4}
              label="Orders"
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
                  value: "Total Revenue",
                  type: "circle",
                  id: "revenue",
                  color: "#0095FF",
                },
                {
                  value: "Profit",
                  type: "circle",
                  id: "profit",
                  color: "#00E096",
                },
              ]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="py-4"></CardFooter>
    </Card>
  );
}

export default OrderDeliveryZoneFinance;
