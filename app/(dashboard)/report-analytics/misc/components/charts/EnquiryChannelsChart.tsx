"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with an active bar";

const chartData = [
  { channel: "website", enquiries: 187, converted_enquiries: 87 },
  { channel: "store_walkin", enquiries: 147, converted_enquiries: 187 },
  { channel: "instagram", enquiries: 200, converted_enquiries: 145 },
  { channel: "favebook", enquiries: 275, converted_enquiries: 250 },
  { channel: "google", enquiries: 173, converted_enquiries: 296 },
  { channel: "tictok", enquiries: 90, converted_enquiries: 158 },
];

const chartConfig = {
  enquiries: {
    label: "No. of Enquiries",
  },
  converted_enquiries: {
    label: "No. of Converted Enquiries",
  },
  website: {
    label: "Website",
    color: "#1C1C1C",
  },
  store_walkin: {
    label: "Store walk-in",
    color: "#1C1C1C",
  },
  instagram: {
    label: "IG",
    color: "#0095FF",
  },
  favebook: {
    label: "Facebook",
    color: "#6E81F4",
  },
  google: {
    label: "Google",
    color: "#6FC5F5",
  },
  tictok: {
    label: "TikTok",
    color: "#6CB79C",
  },
} satisfies ChartConfig;

export function EnquiryChannelsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#6B7280] font-medium text-lg">
          Enquiry Channels
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[320px]">
          <BarChart accessibilityLayer data={chartData} barSize={15}>
            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.95}
              stroke="#ccc"
            />

            <XAxis
              dataKey="channel"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="enquiries"
              fill="#34CF56"
              strokeWidth={2}
              radius={6}
              activeIndex={2}
            />
            <Bar
              dataKey="converted_enquiries"
              fill="#194A7A"
              strokeWidth={2}
              radius={6}
              activeIndex={2}
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
                  value: "No. of Enquiries",
                  type: "circle",
                  id: "enquiries",
                  color: "#34CF56",
                },
                {
                  value: "No. of Converted Enquiries",
                  type: "circle",
                  id: "converted_enquiries",
                  color: "#194A7A",
                },
              ]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
