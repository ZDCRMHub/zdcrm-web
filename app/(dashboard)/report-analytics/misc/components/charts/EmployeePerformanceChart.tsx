"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "A multiple bar chart"

const chartData = [
  { day: "Monday", processed: 18600, finalized: 8000 },
  { day: "Tuesday", processed: 60500, finalized: 20000 },
  { day: "Wednesday", processed: 23700, finalized: 12000 },
  { day: "Thursday", processed: 7300, finalized: 19000 },
  { day: "Friday", processed: 20900, finalized: 13000 },
  { day: "Saturday", processed: 21400, finalized: 14000 },
  { day: "Sunday", processed: 21400, finalized: 14000 },
]

const chartConfig = {
  "Total Revenue": {
    label: "Total Revenue",
    color: "##34CF56",
  },
  "finalized": {
    label: "finalized",
    color: "#00E096",
  },
} satisfies ChartConfig

export function EmployeePerformanceChart() {
  return (
    <Card>
      <CardHeader>
      <CardTitle className="text-[#6B7280] font-medium text-lg">Employeee Performance Charts</CardTitle>
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

            <Bar dataKey="processed" fill="#34CF56" radius={4} label="Processed" />
            <Bar dataKey="finalized" fill="#194A7A" radius={4} label="Finalized" />

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
                paddingLeft: '20px',
              }}
              payload={[
                { value: "Processed", type: "circle", id: "processed", color: "#34CF56" },
                { value: "Finalized", type: "circle", id: "finalized", color: "#194A7A" },
              ]}
            />
          </BarChart>
        </ChartContainer>
        <CardFooter className="py-4"></CardFooter>
      </CardContent>
    </Card>
  )
}
