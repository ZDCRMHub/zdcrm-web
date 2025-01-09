import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

interface FetchOptions {
  page?: number;
  size?: number;
  user_id: string;
  period_type: "weekly" | "monthly";
}

interface APIResponse {
  data: {
    employee_name: string;
    stats: {
      date: string;
      finalized_enquiries: number;
      completed_orders: number;
    }[];
  };
  status: number;
  message: null;
}

const initialOptions: FetchOptions = {
  user_id: "",
  period_type: "weekly"
}

const getStats = async (options: FetchOptions = initialOptions): Promise<APIResponse> => {
  const params = new URLSearchParams();

  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.user_id) params.append('user_id', options.user_id);
  if (options.period_type) params.append('period_type', options.period_type);

  const res = await APIAxios.get('/order/employee-performance/', { params });
  return res.data;
}

export const useGetEmployeePerformanceStats = (options: FetchOptions = initialOptions) => {
  return useQuery({
    queryKey: ['employee-performance-statistics', options],
    placeholderData: keepPreviousData,
    queryFn: () => getStats(options),
    enabled: !!options.user_id
  });
}

