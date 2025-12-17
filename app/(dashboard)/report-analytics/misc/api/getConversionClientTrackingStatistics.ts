import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


interface FetchOptions {
  page?: number;
  size?: number;
  branch?: string;
}


interface APIResponse {
  data: Data;
  status: number;
  message: null;
}

interface Data {
  monthly_stats: Monthlystat[];
}

interface Monthlystat {
  month: string;
  new_customers: number;
  returning_customers: number;
}

const getStats = async (options: FetchOptions = {}): Promise<APIResponse> => {
  const params = new URLSearchParams();

  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.branch && options.branch !== "all") params.append('branch', options.branch);

  const res = await APIAxios.get('/order/customer-retention/', { params });
  return res.data;
}

export const useGetClientTrackingStats = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['client-tracking-statistics', options],
    placeholderData: keepPreviousData,
    queryFn: () => getStats(options),
  });
}


