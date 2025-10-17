"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown } from "lucide-react";

import { Spinner } from "@/components/ui";
import {
  Card,
  CardContent,
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

export type PaymentStatusDatum = {
  status: string; // label for x-axis
  orders: number; // No. of Orders
  amount: number; // Amount (in base currency units)
};

export type PaymentStatusConversionChartProps = {
  title?: string;
  data?: PaymentStatusDatum[];
  isLoading?: boolean;
  className?: string;
  // Optional currency formatter; default uses Intl.NumberFormat with NGN style
  formatCurrency?: (value: number) => string;
  /** Minimum width allocated per category before horizontal scrolling kicks in (px). */
  minCategoryWidth?: number;
  /** Fixed width of each bar (px). Helps keep bars from thinning out. */
  barSize?: number;
  /** Gap between bars of the same category. */
  barGap?: number;
  /** Gap between categories (groups). */
  barCategoryGap?: number | string;
};

const dummyData: PaymentStatusDatum[] = [
  { status: "Not Paid", orders: 14500, amount: 13500 },
  { status: "Paid (Website Card)", orders: 17500, amount: 12500 },
  { status: "Paid (Naira Transfer)", orders: 6500, amount: 22000 },
  { status: "Paid (USD Transfer)", orders: 16000, amount: 6500 },
  { status: "Paid (PayPal)", orders: 12500, amount: 11500 },
  { status: "Cash (Paid)", orders: 17000, amount: 14000 },
  { status: "Paid (POS)", orders: 21000, amount: 12000 },
  { status: "Part Payment (Cash)", orders: 13000, amount: 7000 },
  { status: "Paid (Bitcoin)", orders: 20500, amount: 11000 },
  { status: "Part Payment (Transfer)", orders: 12000, amount: 11500 },
  { status: "Not Received (Paid)", orders: 21000, amount: 11000 },
];

const chartConfig: ChartConfig = {
  orders: { label: "No. of Orders", color: "hsl(var(--chart-1))" },
  amount: { label: "Amount", color: "hsl(var(--chart-2))" },
};

const defaultCurrency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export default function PaymentStatusConversionChart({
  title = "Payment Status Conversion",
  data,
  isLoading,
  className,
  formatCurrency = (v) => defaultCurrency.format(v),
  minCategoryWidth = 80,
  barSize = 18,
  barGap = 8,
  barCategoryGap = 32,
}: PaymentStatusConversionChartProps) {
  const chartData = data && data.length ? data : dummyData;
  const minWidthPx = Math.max(chartData.length * minCategoryWidth, 640); // ensure a sensible base

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-xl md:text-[1.5rem] font-medium text-[#17181C] flex items-center gap-2">
          {title}
          {isLoading && <Spinner />}
        </CardTitle>
        {/* Simple timeframe selector placeholder like mock */}
        <div className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm text-muted-foreground">
          Today <ChevronDown className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="h-[360px] w-full" style={{ minWidth: `${minWidthPx}px` }}>
              <ResponsiveContainer>
                <BarChart
                  data={chartData}
                  margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
                  barCategoryGap={barCategoryGap}
                  barGap={barGap}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="status"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    height={64}
                    tickMargin={10}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`)}
                  />
                  <ChartTooltip
                    cursor={{ fill: "rgba(0,0,0,0.04)" }}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => String(label)}
                        formatter={(value: unknown, name?: string | number) => {
                          if (name === "amount") return [formatCurrency(Number(value)), "Amount"];
                          if (name === "orders") return [Number(value).toLocaleString(), "No. of Orders"];
                          return [String(value), String(name)];
                        }}
                      />
                    }
                  />

                  <Bar dataKey="orders" barSize={barSize} radius={[4, 4, 0, 0]} fill="var(--color-orders)" />
                  <Bar dataKey="amount" barSize={barSize} radius={[4, 4, 0, 0]} fill="var(--color-amount)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-muted-foreground text-sm">
          Total no of order/Amount made from payment status
        </div>
      </CardFooter>
    </Card>
  );
}
