import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


interface FetchOptions {
  page?: number;
  size?: number;
  branch?: string;
  period?: "today" | "week" | "month" | "year" | "custom";
  date_from?: string;
  date_to?: string;
}

interface APIResponse {
  data: Data;
  status: number;
  message: null;
}

interface Data {
  total_orders: number;
  soa_orders: number;
  sorted_orders: number;
  dispatch_orders: number;
  dis_cl_deliveries: number;
  delivered_deliveries: number;
  cancelled_orders: number;
  pending_payments: number;
}


const fetchActiveOrders = async (options: FetchOptions = {}): Promise<APIResponse> => {
  const params = new URLSearchParams();

  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.branch && options.branch !== "all") params.append('branch', options.branch);
  if (options.period) params.append('period', options.period);
  if (options.date_from) params.append('date_from', options.date_from);
  if (options.date_to) params.append('date_to', options.date_to);

  const res = await APIAxios.get('/order/statistics/', { params });
  return res.data;
}

export const useGetOrderStats = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['orders-statistics', options],
    placeholderData: keepPreviousData,
    queryFn: () => fetchActiveOrders(options),
  });
}


