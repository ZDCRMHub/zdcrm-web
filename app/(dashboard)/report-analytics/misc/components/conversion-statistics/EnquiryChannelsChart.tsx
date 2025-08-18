"use client";

import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { DateRange } from "react-day-picker";
import { subMonths } from "date-fns";
import { Controller, useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { RangeAndCustomDatePicker, Spinner } from "@/components/ui";

import SelectSingleSimple from "@/components/ui/selectSingleSimple";
import { useGetAllBranches } from '@/app/(dashboard)/admin/businesses/misc/api';
import { useGetEnquiryChannelStats } from "../../api";


const chartConfig = {
  "Email": { label: "Email", color: "#1C1C1C" },
  "WhatsApp": { label: "WhatsApp", color: "#25D366" },
  "Website": { label: "Website", color: "#0095FF" },
  "Store Walk In": { label: "Store Walk-in", color: "#6E81F4" },
  "Instagram": { label: "Instagram", color: "#E1306C" },
  "Phone Call": { label: "Phone Call", color: "#6FC5F5" },
  "Facebook": { label: "Facebook", color: "#4267B2" },
  "Tik Tok": { label: "TikTok", color: "#69C9D0" }
};

const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const monthsAgo = subMonths(new Date(), 1);

function EnquiryChannelsChart() {
  const { data: allBranches, isLoading: isFetchingBranch } = useGetAllBranches();
  const { control, watch, setValue } = useForm<{
    branch?: string;
    date: DateRange;
    period: "today" | "week" | "month" | "year" | "custom";
  }>({
    defaultValues: {
      branch: undefined,
      date: {
        from: monthsAgo,
        to: tomorrow,
      },
      period: 'today',
    },
  });

  const { data, isLoading, isFetching } = useGetEnquiryChannelStats({
    branch: watch('branch') == "all" ? undefined : watch('branch'),
    date_from: watch('date').from?.toISOString().split('T')[0],
    date_to: watch('date').to?.toISOString().split('T')[0],
    period: watch('period'),
  });

  const chartData = data?.data.channels.map(channel => ({
    channel: channel.channel,
    enquiries: channel.total_count,
    converted_enquiries: channel.converted_count
  })) || [];

  return (
    <Card>
      <CardHeader className="flex md:!flex-row items-center justify-between">
        <CardTitle className="text-2xl md:text-[1.7rem] font-medium text-[#17181C] flex items-center gap-2">
          Enquiry Channels
          {isFetching && <Spinner />}
        </CardTitle>
        <div className="flex items-center gap-4 flex-wrap max-w-max">
          <Controller
            name='branch'
            control={control}
            render={({ field }) => (
              <SelectSingleSimple
                {...field}
                onChange={(new_value) => setValue('branch', new_value)}
                value={watch('branch')}
                isLoadingOptions={isFetchingBranch}
                options={[{ label: "All Branches", value: "all" }, ...(allBranches?.data.map(branch => ({ label: branch.name, value: branch.id.toString() })) || [])]}
                labelKey="label"
                valueKey="value"
                placeholder='Filter Branch'
                variant="light"
                size="thin"
              />
            )}
          />
          <RangeAndCustomDatePicker
            className="max-w-max"
            variant="light"
            size="thin"
            onChange={(value) => {
              if (value.dateType === 'custom' && value.from && value.to) {
                setValue('date', { from: value.from, to: value.to });
                setValue('period', 'custom');
              } else {
                setValue('period', value.dateType as "today" | "week" | "month" | "year" | "custom");
              }
            }}
            value={{
              dateType: watch('period'),
              from: watch('date').from,
              to: watch('date').to
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} barSize={15}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.35} stroke="#ccc" />
              <XAxis
                dataKey="channel"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }}
                tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label || value}
              />
              <YAxis tickLine={false} axisLine={false}
                tick={{ fontFamily: "Poppins, sans-serif", fontSize: 12 }}

              />
              <Tooltip />
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
                  fontSize: "15px",
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
              <Bar dataKey="enquiries" name="No. of Enquiries" fill="#34CF56" radius={6} />
              <Bar dataKey="converted_enquiries" name="No. of Converted Enquiries" fill="#194A7A" radius={6} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default EnquiryChannelsChart;

