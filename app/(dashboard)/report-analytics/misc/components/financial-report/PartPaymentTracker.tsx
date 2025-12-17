"use client";

import React from "react";
// no header dropdown for this tracker

import { Spinner } from "@/components/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type PartPaymentTrackerProps = {
  title?: string;
  // Orders
  totalOrders?: number; // total count eligible/target
  processedOrders?: number; // processed count
  // Amounts
  totalPartPaymentAmount?: number; // total part payment amount
  partPaymentPaid?: number; // amount paid so far
  balanceDue?: number; // remaining balance
  // UI
  isLoading?: boolean;
  className?: string;
  formatCurrency?: (value: number) => string;
};

const defaultCurrency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 2,
});

const Track = ({
  color,
  value,
  max,
  height = 8,
  trailColor,
}: {
  color: string;
  value: number;
  max: number;
  height?: number;
  trailColor?: string;
}) => {
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));
  return (
    <div
      className="w-full rounded-full"
      style={{ height, backgroundColor: trailColor ?? "var(--muted)" }}
    >
      <div
        className="rounded-full"
        style={{
          width: `${pct}%`,
          height,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default function PartPaymentTracker({
  title = "Part Payment Tracker",
  totalOrders = 75,
  processedOrders = 20,
  totalPartPaymentAmount = 1000000,
  partPaymentPaid = 700000,
  balanceDue = 300000,
  isLoading,
  className,
  formatCurrency = (v) => defaultCurrency.format(v),
}: PartPaymentTrackerProps) {
  const ordersLeft = Math.max(0, totalOrders - processedOrders);
  const processedPct = Math.max(0, Math.min(100, (processedOrders / (totalOrders || 1)) * 100));

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-start justify-between">
        <CardTitle className="text-xl md:text-[1.5rem] font-medium text-[#17181C] flex items-center gap-2">
          {title}
          {isLoading && <Spinner />}
        </CardTitle>
        {/* Right-side summary: Orders Left + processed pill */}
        <div className="flex flex-col items-end gap-2">
          <span className="text-sm font-semibold text-foreground">{ordersLeft} Orders Left</span>
          <div className="relative h-8 w-48 rounded-lg border border-foreground/60 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-foreground text-background flex items-center px-2 text-xs font-medium whitespace-nowrap"
              style={{ width: `${processedPct}%` }}
            >
              {processedOrders} Orders Processed
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid">
          {/* Orders Row */}
          <div className="grid grid-cols-[220px_1fr_auto] items-center gap-4 py-4">
            <div className="text-base">Part Payment Orders</div>
            <Track color="#111827" value={processedOrders} max={totalOrders} height={6} trailColor="transparent" />
            <div className="text-sm text-muted-foreground whitespace-nowrap">{processedOrders} Orders</div>
          </div>
          <div className="border-t" />

          {/* Amount Row */}
          <div className="grid grid-cols-[220px_1fr_auto] items-center gap-4 py-4">
            <div className="text-base">Part Payment Amount</div>
            <Track color="#3B82F6" value={totalPartPaymentAmount} max={totalPartPaymentAmount} height={8} trailColor="#DBEAFE" />
            <div className="text-sm whitespace-nowrap">
              <span className="inline-flex items-center rounded-full border border-blue-500 text-blue-600 px-3 py-1">
                {formatCurrency(totalPartPaymentAmount)}
              </span>
            </div>
          </div>
          <div className="border-t" />

          {/* Paid Row */}
          <div className="grid grid-cols-[220px_1fr_auto] items-center gap-4 py-4">
            <div className="text-base">Part Payment Paid</div>
            <Track color="#22C55E" value={partPaymentPaid} max={totalPartPaymentAmount} height={8} trailColor="#DCFCE7" />
            <div className="text-sm whitespace-nowrap">
              <span className="inline-flex items-center rounded-full bg-emerald-500 text-white px-3 py-1">
                {formatCurrency(partPaymentPaid)}
              </span>
            </div>
          </div>
          <div className="border-t" />

          {/* Balance Due Row */}
          <div className="grid grid-cols-[220px_1fr_auto] items-center gap-4 py-4">
            <div className="text-base">Balance Due</div>
            <Track color="#EF4444" value={balanceDue} max={totalPartPaymentAmount} height={8} trailColor="#FEE2E2" />
            <div className="text-sm whitespace-nowrap">
              <span className="inline-flex items-center rounded-full bg-red-500 text-white px-3 py-1">
                {formatCurrency(balanceDue)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
