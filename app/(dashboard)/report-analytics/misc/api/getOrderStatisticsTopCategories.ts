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
  data: ITopCategory[];
  status: number;
  message: null;
}

interface ITopCategory {
  category_id: number;
  category_name: string;
  order_count: number;
  total_quantity: number;
  total_products: number;
}



const getStats = async (options: FetchOptions = {}): Promise<APIResponse> => {
  const params = new URLSearchParams();

  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.branch && options.branch !== "all") params.append('branch', options.branch);
  if (options.period) params.append('period', options.period);
  if (options.date_from) params.append('date_from', options.date_from);
  if (options.date_to) params.append('date_to', options.date_to);

  const res = await APIAxios.get('/order/top-categories/', { params });
  return res.data;
}

export const useGetTopCategories = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['orders-statistics-top-categories', options],
    placeholderData: keepPreviousData,
    queryFn: () => getStats(options),
  });
}


