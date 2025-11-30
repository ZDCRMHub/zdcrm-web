// src/components/InventoryChart.tsx
"use client";
import React, { useMemo } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { alert as AlertShape, BEInventoryItem } from "@/types/inventory.type";
import { pickColor } from "@/utils/functions";

type RenderItem = {
    id: string | number;
    name: string;
    qty: number;
    category?: string;
    branch?: string;
    color: string;
};

type Props = {
    items?: { alerts?: AlertShape[] } | AlertShape[] | BEInventoryItem[] | null;
    title?: string;
    isLoading?: boolean;
    showCount?: number;
};

export const RowSkeleton = () => (
    <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 w-3/4">
            <div className="h-3 w-3 rounded-full bg-gray-200" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-10 bg-gray-200 rounded" />
    </div>
);

export default function InventoryChart({
    items,
    title = "Inventory Alert",
    isLoading = false,
    showCount = 5,
}: Props) {
    const alertsArray: AlertShape[] = useMemo(() => {
        if (!items) return [];
        return (items as any).alerts ?? (Array.isArray(items) ? (items as AlertShape[]) : []);
    }, [items]);

    const renderItems: RenderItem[] = useMemo(() => {
        return alertsArray.map((a, idx) => {
            const id = a.inventory_id ?? `${a.inventory_name ?? "item"}-${idx}`;
            const name = a.inventory_name ?? "Unknown";
            const qty = Number(a.quantity ?? 0) || 0;
            const category = a.category;
            const branch = a.branch;
            const color = pickColor(category ?? name ?? String(idx), idx);
            return { id, name, qty, category, branch, color };
        });
    }, [alertsArray]);

    const visible = renderItems.slice(0, showCount);

    const isEmpty = !isLoading && visible.length === 0;

    return (
        <Card className="p-6 rounded-xl min-h-[200px] max-h-[400px]">
            <div className="flex items-center justify-between">
                <CardTitle className="text-base md:text-[20px] font-semibold">{title}</CardTitle>
                <Link href="/inventory/alert" className="font-medium text-[#0CAF60] px-3 py-1 rounded shadow-sm hover:underline">
                    See All
                </Link>
            </div>

            <div className="mt-6 overflow-y-auto max-h-[320px]">
                {isLoading ? (
                    <ul className="flex flex-col w-full">
                        {Array.from({ length: showCount }).map((_, i) => (
                            <RowSkeleton key={i} />
                        ))}
                    </ul>
                ) : isEmpty ? (
                    <div className="flex justify-center items-center py-10 ">
                        <p className="text-sm text-[#6b7280]">
                            There are no inventory alerts.
                        </p>
                    </div>
                ) : (
                    <ul className="flex flex-col w-full">
                        {visible.map((it, index) => (
                            <li
                                key={it.id}
                                className={cn(
                                    "flex items-center justify-between px-3 py-3 rounded-md",
                                    index % 2 === 0 ? "bg-[#F9FAFB]" : "bg-white"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="inline-block h-3 w-3 rounded-full" style={{ background: it.color }} />
                                    <div className="flex flex-col">
                                        <p className="text-sm text-[#0f172b] font-medium">{it.name}</p>
                                        {(it.category || it.branch) && (
                                            <span className="text-xs text-[#6b7280]">
                                                {it.category ?? ""}{it.category && it.branch ? " • " : ""}{it.branch ?? ""}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <span className="text-sm text-[#5b6b7a]">{it.qty.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Card>
    );
}
