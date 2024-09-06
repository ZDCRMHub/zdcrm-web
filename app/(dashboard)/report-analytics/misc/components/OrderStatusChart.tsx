"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendUp } from "iconsax-react"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui"
import { TrendingUp } from "lucide-react"

export const description = "A donut chart"

const chartData = [
  { location: "Orders Delivered", no_of_orders: 28, fill: "#1C1C1C99" },
  { location: "Lagos Central", no_of_orders: 15, fill: "#E51B3F" },
  { location: "Lagos Mainland", no_of_orders: 8, fill: "#34CF5699" },
]

const chartConfig = {
  no_of_orders: {
    label: "no_of_orders",
  },
  "Orders Delivered": {
    label: "Orders Delivered",
    color: "#1C1C1C99",
  },
  "Lagos Central": {
    label: "Orders Sorted",
    color: "#E51B3F",
  },
  "Sent to Dispatch": {
    label: "Lagos Mainland",
    color: "#34CF5699",
  },

} satisfies ChartConfig

export function OrderStatusChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex !flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className='h-6 w-6 text-green-500' />
            Order Status
          </CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>


        <Select defaultValue='today'>
          <SelectTrigger className='w-max min-w-[120px] h-12 text-xs'>
            <SelectValue placeholder='Today' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='today'>Today</SelectItem>
            <SelectItem value='week'>This Week</SelectItem>
            <SelectItem value='month'>This Month</SelectItem>
          </SelectContent>
        </Select>

      </CardHeader>
      <CardContent className="flex-1 flex pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="no_of_orders"
              nameKey="location"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2} // Add space between segments
              cornerRadius={10}
              stroke="white" // Optional: Add a stroke to the segments
              strokeWidth={2} // Optional: Set the stroke width
            />
          </PieChart>
        </ChartContainer>

        <section>

        </section>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      
      </CardFooter>
    </Card>
  )
}
