"use client"
import React from "react"
import data from "./data/overview.json"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
/* recharts */
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const OverviewPage: React.FC = () => {
  const {
    summary,
    orderStats,
    financialOverview,
    conversion,
    trafficSource,
    clientBehavior,
    customers,
    inventory,
  } = data

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">All Reports</h2>
        <div className="mt-2 sm:mt-0 flex flex-wrap items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="lagos">Lagos</SelectItem>
              <SelectItem value="yaba">Yaba</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="custom">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Button>Compare</Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((s) => (
          <Card key={s.title} className="min-h-[88px]">
            <CardHeader>
              <CardTitle className="text-sm">{s.title}</CardTitle>
              <hr className="width-[80%]"/>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div
                  className={`text-lg font-bold ${
                    s.title === summary[2].title
                      ? "text-red-500"
                      : s.title === summary[3].title
                      ? "text-green-600"
                      : ""
                  }`}
                >
                  {s.value}
                </div>
                <div className={`text-xs ${s.delta.startsWith("-") ? "text-red-500" : "text-green-600"}`}>
                  {s.delta}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two large charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Order Statistics</CardTitle>
            <div>
              <Select defaultValue="today">
                <SelectTrigger className="">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderStats} barCategoryGap="30%" barGap={6}>
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="enquiries" fill="#3b82f6" maxBarSize={18}/>
                  <Bar dataKey="orders" fill="#10b981" maxBarSize={18}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Financial Overview</CardTitle>
            <div className="ml-auto">
              <Select defaultValue="today">
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialOverview}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" maxBarSize={18}/>
                  <Bar dataKey="profit" fill="#10b981" maxBarSize={18}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle row: conversion map (placeholder) and traffic source */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Conversion Statistics</CardTitle>
            <Button variant="ghost" size="sm">See All</Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <div className="text-2xl font-bold">{conversion.total}</div>
                <div className="text-sm text-muted-foreground">Compared to last month</div>
                <div className="mt-4 space-y-2">
                  {conversion.regions.map((r, idx) => (
                      <div
                        key={r.name}
                        className={`flex items-center justify-between ${idx % 2 !== 1 ? "bg-[#F9FAFB]" : ""} rounded-md px-2 py-1`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                          <div className="text-sm">{r.name}</div>
                        </div>
                        <div className="text-sm">{r.value.toLocaleString()}</div>
                      </div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                {/* Map placeholder - as image or simple SVG. For real app replace with map lib */}
                  <Image
                    src="/map.svg"
                    alt="Sales Location"
                    width={600}
                    height={400}
                    className="object-contain w-full h-full"
                  />
                
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Traffic Source</CardTitle>
            <Button variant="ghost" size="sm">See All</Button>
          </CardHeader>
          <CardContent>
            {/* Custom horizontal progress list to match mock image */}
            <div className="w-full">
              {/* optional targets (use real targets if available) */}
              {(() => {
                const targets: Record<string, number> = {
                  Google: 48345,
                  Instagram: 30000,
                  WhatsApp: 23789,
                  Others: 18959,
                }
                const colors: Record<string, string> = {
                  Google: "bg-emerald-500",
                  Instagram: "bg-amber-400",
                  WhatsApp: "bg-green-500",
                  Others: "bg-blue-500",
                }
                const colorsbg: Record<string, string> = {
                  Google: "bg-emerald-900",
                  Instagram: "bg-amber-900",
                  WhatsApp: "bg-green-900",
                  Others: "bg-blue-900",
                }

                return (
                  <div className="space-y-4">
                    {trafficSource.map((t) => {
                      const target = targets[t.name] ?? (Math.max(...trafficSource.map(s => s.value)) || 1)
                      const pct = Math.min(100, Math.round((t.value / 50000) * 100))
                      const bgpct= Math.min(100, Math.round((target / 5000) * 100))
                      const colorClass = colors[t.name] ?? "bg-slate-600"
                      const bg= colorsbg[t.name]
                      return (
                        <div key={t.name} className="flex flex-col items-center gap-4">
                          <div className="flex flex-row items-center justify-between w-full px-2">
                            <div className="w-28 text-sm text-slate-700">{t.name}</div>
                            <div className="w-36 text-right text-sm text-slate-500">
                            {t.value.toLocaleString()}/{target.toLocaleString()}
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`${bg} h-3 rounded-full transition-all`} style={{width: `${bgpct}%`}}>  
                                <div
                                  className={`${colorClass} h-3 rounded-full transition-all`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      )
                    })}

                    {/* bottom axis ticks */}
                    <div className="mt-4 px-28">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>10k</span>
                        <span>20k</span>
                        <span>30k</span>
                        <span>40k</span>
                        <span>50k</span>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row: client behavior, customers line, inventory */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              <span>
              Client Behavior
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </span>
            </CardTitle>
            <Button variant="ghost" size="sm">See All</Button>
          </CardHeader>
          <CardContent>
            <div className="flex w-full h-40 sm:h-44 flex-row justify-between">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={clientBehavior.data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={4}
                    label={true}
                  >
                    {clientBehavior.data.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-1 w-[50%]">
                {clientBehavior.data.map((d) => (
                  <div key={d.name} className="flex items-center justify-evenly text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                      <div>{d.name}</div>
                    </div>
                    <div>{d.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Customers</CardTitle>
            <Button variant="ghost" size="sm">See All</Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{customers.total}</div>
            <div className="w-full h-40 sm:h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customers.series}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="local" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="international" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Inventory Alert</CardTitle>
            <Button variant="ghost" size="sm">See All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {inventory.map((it) => (
                <div key={it.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: it.color }} />
                    <div className="text-sm">{it.name}</div>
                  </div>
                  <div className="text-sm">{it.qty.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OverviewPage