"use client";

import React from "react";
import ComparisonModal from "@/app/(dashboard)/report-analytics/misc/components/ComparisonModal";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FinancialOverviewSection,
  FinancialStatsHeaderSection,
  PartPaymentTracker,
  PaymentStatusConversionChart,
  OrderStatisticsFIinancialsChart,
} from "../misc/components/financial-report";

const FinancialReportPage = () => {
  return (
    <div className="w-full md:w-[92.5%] max-w-[1792px] mx-auto pt-12 px-8">
      <FinancialStatsHeaderSection />

      <div className="flex justify-end mt-14 mb-8">
        {/* <ComparisonModal /> */}
      </div>

      <div className="grid 2xl:grid-cols-2 gap-10 mb-10">
        <FinancialOverviewSection />
        <OrderStatisticsFIinancialsChart />
      </div>

      <div className="my-8">
        <PaymentStatusConversionChart />
      </div>

      <PartPaymentTracker />

      <div className="flex justify-end my-24 gap-6">
        <Select>
          <SelectTrigger className="w-[153px]">
            <SelectValue placeholder="Extract File" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Financial Overview</SelectItem>
            <SelectItem value="Net Profit">Net Profit</SelectItem>
            <SelectItem value="Total Revenue">Total Revenue</SelectItem>
            <SelectItem value="Total Orders">Total Orders</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-amber-400 text-black border border-black px-11">
          Download
        </Button>
      </div>
    </div>
  );
};

export default FinancialReportPage;
