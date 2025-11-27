"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";
import type { FinancialSummary } from "@/types/finacialStatistics.types"; // note your project file name
import { toNumber } from "@/utils/functions";
import OrderStatsCardSkeleton from "./OrderStatsSkeleton";

interface StatsPros {
  stats: FinancialSummary | undefined;
  isLoading: boolean;
};

export default function FinancialSummaryCards({ stats, isLoading }: StatsPros) {
  const totalOrders = toNumber(stats?.total_orders ?? 0);
  const totalRevenue = toNumber(stats?.total_revenue ?? 0);
  const productionCost = toNumber(
    stats?.total_production_cost ?? stats?.total_inventory_cost ?? 0
  );
  const miscExpenses = toNumber(stats?.total_misc_expenses ?? 0);
  const deliveryExpenses = toNumber(stats?.total_delivery_expenses ?? 0);
  const netProfit = toNumber(stats?.net_profit ?? 0);

  const totalExpenses = productionCost + miscExpenses + deliveryExpenses;

  const summary = [
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      delta: undefined,
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue, "NGN"),
      delta: undefined,
    },
    {
      title: "Expenses",
      value: formatCurrency(totalExpenses, "NGN"),
      delta: undefined,
    },
    {
      title: "Net Profit",
      value: formatCurrency(netProfit, "NGN"),
      delta: undefined,
    },
  ];

  return (
    <>
      {
        isLoading ? Array.from({ length: 4 }).map((_, index) => (
          <OrderStatsCardSkeleton key={index} />
        )) :
          <>
            {summary.map((s) => (
              <Card key={s.title} className="min-h-[88px]">
                <CardHeader>
                  <CardTitle className="text-sm">{s.title}</CardTitle>
                  <hr className="w-[80%]" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div
                      className={`text-lg font-bold ${s.title === "Expenses"
                        ? "text-red-500"
                        : s.title === "Net Profit"
                          ? "text-green-600"
                          : ""
                        }`}
                    >
                      {s.value}
                    </div>
                    <div
                      className={`text-xs ${String(s.delta || "").startsWith("-")
                        ? "text-red-500"
                        : "text-green-600"
                        }`}
                    >
                      {s.delta ?? ""}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
      }
    </>
  );
}
