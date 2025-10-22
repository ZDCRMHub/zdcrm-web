"use client";

import React from "react";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Info } from "lucide-react";

import { Spinner } from "@/components/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Data shape for real usage
export type ClientBehaviorDatum = {
  key: "returning" | "frequent" | "quiet" | "first_time" | string;
  label: string;
  value: number; // number of clients
  color?: string; // optional custom color per slice
};

export type ClientBehaviorChartProps = {
  title?: string;
  data?: ClientBehaviorDatum[]; // real data can be passed; falls back to dummy
  isLoading?: boolean;
  className?: string;
};

const dummyData: ClientBehaviorDatum[] = [
  { key: "returning", label: "Returning", value: 25 },
  { key: "frequent", label: "Frequent", value: 16 },
  { key: "quiet", label: "Quiet", value: 12 },
  { key: "first_time", label: "First-time", value: 25 },
];

// Map keys to theme chart colors. You can override via each datum.color.
const chartConfig: ChartConfig = {
  returning: { label: "Returning", color: "hsl(var(--chart-1))" },
  frequent: { label: "Frequent", color: "hsl(var(--chart-2))" },
  quiet: { label: "Quiet", color: "hsl(var(--chart-3))" },
  first_time: { label: "First-time", color: "hsl(var(--chart-4))" },
};

function getColorForKey(key: string, fallback?: string) {
  // Prefer explicit color from datum; then use CSS var set by ChartContainer
  if (fallback) return fallback;
  return `var(--color-${key})`;
}

export default function ClientBehaviorChart({
  title = "Client Behavior",
  data,
  isLoading,
  className,
}: ClientBehaviorChartProps) {
  const chartData = (data && data.length > 0 ? data : dummyData).map((d) => ({
    ...d,
    // provide a computed fill if not provided
    fill: getColorForKey(d.key, d.color),
  }));

  const total = chartData.reduce((acc, cur) => acc + (Number(cur.value) || 0), 0) || 1;

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-xl md:text-[1.5rem] font-medium text-[#17181C] flex items-center gap-2">
          {title}
          <Info className="h-4 w-4 text-muted-foreground" />
          {isLoading && <Spinner />}
        </CardTitle>
        {/* Placeholder for an action chip shown in the mock */}
        <div className="hidden md:block h-8 w-24 rounded-lg bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 items-center">
          {/* Donut chart */}
          <ChartContainer config={chartConfig} className="mx-auto w-full max-w-[320px] md:!min-h-[300px]">
              <ResponsiveContainer className={"md:!min-h-[300px]"}>
                <PieChart>
                  {/* Background track ring */}
                  <Pie
                    data={[{ name: "track", value: 100 }]}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={80}
                    outerRadius={110}
                    stroke="none"
                    isAnimationActive={false}
                  >
                    <Cell fill="#E5E7EB" />
                  </Pie>

                  {/* Colored slices */}
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="label"
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={80}
                    outerRadius={110}
                    stroke="var(--background)"
                    strokeWidth={2}
                    cornerRadius={6}
                  >
                    {chartData.map((entry, idx) => (
                      <Cell key={`slice-${idx}`} fill={entry.fill as string} />
                    ))}
                  </Pie>

                  {/* Tooltip (uses shadcn chart wrapper) */}
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideIndicator />} />
                  {/* Fallback Recharts tooltip for safety */}
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            
          </ChartContainer>

          {/* Legend / Breakdown */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-medium pr-3">
              <span className="sr-only md:not-sr-only">&nbsp;</span>
              <div className="flex items-center gap-12">
                <span>No. client</span>
                <span>Percentage</span>
              </div>
            </div>

            <div className="grid gap-3">
              {chartData.map((item) => {
                const pct = ((Number(item.value) || 0) / total) * 100;
                return (
                  <div key={item.key} className="flex items-center justify-between pr-3">
                    {/* Label with colored dot */}
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.fill as string }}
                      />
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>

                    {/* Counts and Percentage */}
                    <div className="flex items-center gap-12 text-sm">
                      <span className="tabular-nums text-foreground">{item.value}</span>
                      <span className="tabular-nums text-foreground">{pct.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
