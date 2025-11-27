import { getFinancialStats } from "@/apis/order.api";
import { FinancialFetchOptions } from "@/types/finacialStatistics.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetFinancialReportStats = (options: FinancialFetchOptions = {}) => {
  return useQuery({
    queryKey: ["financial-statistics", options],
    placeholderData: keepPreviousData,
    queryFn: () => getFinancialStats(options),
  });
};
