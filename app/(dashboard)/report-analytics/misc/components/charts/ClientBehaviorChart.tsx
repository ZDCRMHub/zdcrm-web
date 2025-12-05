// ClientBehaviorChart.tsx
import { Card } from "@/components/ui";
import InfoIcon from "@/icons/core/InfoIcon";
import Link from "next/link";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import data from "../../../data/overview.json";


type ClientBehaviorItem = {
    name: string;
    value: number;
    percentage: number;
    color: string;
};

type ClientBehaviorProps = {
    clientBehavior: {
        data: ClientBehaviorItem[];
    };
    show_see_all?: boolean;
};

const ClientBehaviorChart: React.FC<ClientBehaviorProps> = ({
    clientBehavior,
    show_see_all = false    ,
}) => {
    const data = clientBehavior.data;

    return (
        <Card className="p-6">
            <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-xl font-semibold font-dm-sans text-slate-900">
                        Client Behavior
                    </h2>
                    <InfoIcon />
                </div>

                {
                    show_see_all && (
                        <Link href="/report-analytics/conversion-statistics" className="font-medium text-[#0CAF60] px-3 py-1 rounded shadow-sm hover:underline">
                            See All
                        </Link>
                    )
                }
            </div>

            <div className="flex w-full flex-row items-center justify-between gap-6">
                {/* Donut chart */}
                <div className="h-[220px] w-[45%]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius='70%'
                                outerRadius="100%"
                                paddingAngle={0}
                                stroke="none"

                            >
                                {data.map((entry, idx) => (
                                    <Cell key={idx} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend + numbers */}
                <div className="w-[55%] space-y-3">
                    {/* Column headers */}
                    <div className="flex items-center justify-end text-sm font-medium text-[#979797]">
                        <span className="w- text-center mr-4 font-dm-sans">No. client</span>
                        <span className="w- text-center font-dm-sans">Percentage</span>
                    </div>

                    {data.map((d) => (
                        <div
                            key={d.name}
                            className="flex items-center justify-between text-xs sm:text-sm py-0.5"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="size-3 rounded-full"
                                    style={{ background: d.color }}
                                />
                                <span className="text-[#718096] text-base font-medium font-dm-sans">{d.name}</span>
                            </div>

                            <div className="flex items-center gap-8 font-extrabold">
                                <span className="w-12 text-center text-slate-900 font-dm-sans">
                                    {d.value}
                                </span>
                                <span className="w-12 text-center text-slate-900 font-dm-sans">
                                    {d.percentage}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default ClientBehaviorChart;
