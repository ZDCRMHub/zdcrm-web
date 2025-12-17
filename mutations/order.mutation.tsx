import { getFinancialStats, getPartPaymentStats, getPaymentStatusStats } from "@/apis/order.api";
import { FetchOptions } from "@/types/apiResponse.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetFinancialReportStats = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ["financial-statistics", options],
    placeholderData: keepPreviousData,
    queryFn: () => getFinancialStats(options),
  });
};

export const useGetPaymentStatusStats = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ["payment-status-statistics", options],
    placeholderData: keepPreviousData,
    queryFn: () => getPaymentStatusStats(options),
  });
}

export const useGetPartPaymentStats = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ["part-payment-statistics", options],
    placeholderData: keepPreviousData,
    queryFn: () => getPartPaymentStats(options),
  });
}


