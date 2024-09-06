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
  { location: "Other places", no_of_orders: 6, fill: "#FFC600" },
  { location: "Lagos Central", no_of_orders: 15, fill: "#E51B3F" },
  { location: "Lagos Island", no_of_orders: 28, fill: "#1C1C1C99" },
  { location: "Lagos Mainland", no_of_orders: 10, fill: "#34CF5699" },
]

const chartConfig = {
  no_of_orders: {
    label: "no_of_orders",
  },
  "Lagos Island": {
    label: "Lagos Island",
    color: "#1C1C1C99",
  },
  "Lagos Central": {
    label: "Lagos Central",
    color: "#E51B3F",
  },
  "Lagos Mainland": {
    label: "Lagos Mainland",
    color: "#34CF5699",
  },
  "Other places": {
    label: "Other places",
    color: "#FFC600",
  },
} satisfies ChartConfig

export function OrderDeliveryZoneChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex !flex-row items-center justify-between pb-0">
        <CardTitle >
          Order Delivery Zone
        </CardTitle>


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
      <CardContent className="flex-1 flex pb-0 min-h-[300px]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-h-[280px] max-h-[350px] "
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
              paddingAngle={2}
              cornerRadius={10}
              stroke="white"

              strokeWidth={2}
            />
          </PieChart>
        </ChartContainer>

        <section>

        </section>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total no_of_orders for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
