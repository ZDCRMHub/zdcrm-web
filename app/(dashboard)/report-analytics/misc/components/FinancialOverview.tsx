"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "A multiple bar chart"

const chartData = [
  { day: "Monday", total_revenue: 18600, profit: 8000 },
  { day: "Tuesday", total_revenue: 30500, profit: 20000 },
  { day: "Wednesday", total_revenue: 23700, profit: 12000 },
  { day: "Thursday", total_revenue: 7300, profit: 19000 },
  { day: "Friday", total_revenue: 20900, profit: 13000 },
  { day: "Saturday", total_revenue: 21400, profit: 14000 },
  { day: "Sunday", total_revenue: 21400, profit: 14000 },
]

const chartConfig = {
  "Total Revenue": {
    label: "Total Revenue",
    color: "#0095FF",
  },
  "Profit": {
    label: "Profit",
    color: "#00E096",
  },
} satisfies ChartConfig

export function FinancialOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[400px] w-full h-[90%]">
          <BarChart data={chartData} barSize={20} className="mb-8">
            {/* Grid with a stronger stroke */}
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} stroke="#ccc" />

            {/* Y-Axis to display tick levels */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }}
            />

            <XAxis
              dataKey="day"
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

            <Bar dataKey="total_revenue" fill="#0095FF" radius={4} label="Total Revenue" />
            <Bar dataKey="profit" fill="#00E096" radius={4} />

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
                // right: '0',
                // top: '',
                // transform: 'translateY(50%)',
                paddingLeft: '20px',
              }}
              payload={[
                { value: "Total Revenue", type: "circle", id: "total_revenue", color: "#0095FF" },
                { value: "Profit", type: "circle", id: "profit", color: "#00E096" },
              ]}
            />
          </BarChart>
        </ChartContainer>
        <CardFooter className="py-4"></CardFooter>
      </CardContent>
    </Card>
  )
}
