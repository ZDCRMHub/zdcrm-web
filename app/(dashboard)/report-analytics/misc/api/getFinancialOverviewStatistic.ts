import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

interface FetchOptions {
  page?: number;
  size?: number;
  branch?: string;
  period_type?: "weekly" | "monthly";
}

interface APIResponse {
  data: {
    data: FinancialData[];
  };
  status: number;
  message: null;
}

interface FinancialData {
  month?: string;
  date?: string;
  day?: string;
  total_revenue: string;
  net_profit: string;
}
const getStats = async (options: FetchOptions = {}): Promise<APIResponse> => {
  const params = new URLSearchParams();

  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.branch && options.branch !== "all") params.append('branch', options.branch);
  if (options.period_type) params.append('period_type', options.period_type);

  const res = await APIAxios.get('/order/financial-time-series/', { params });
  return res.data;
}

export const useGetFinancialOverviewStats = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['financial-overview', options],
    placeholderData: keepPreviousData,
    queryFn: () => getStats(options),
  });
}

