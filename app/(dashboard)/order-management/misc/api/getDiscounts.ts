import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

interface FetchOptions {
  page?: number;
  size?: number;
}

const fetchActiveOrders = async (options: FetchOptions = {}): Promise<APIResponse> => {
  const params = new URLSearchParams();
  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());

  const res = await APIAxios.get('/order/discounts/', { params });
  return res.data;
}

export const useGDiscounts = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['discounts-list', options],
    placeholderData: keepPreviousData,
    queryFn: () => fetchActiveOrders(options),
  });
}
export interface TDiscount {
  id: number;
  type: string;
  amount: string;
  create_date: string;
  update_date: string;
}
interface APIResponse {
  data: TDiscount[];
  next_page: string | null;
  previous_page: string | null;
  number_of_pages: number;
  count: number;
}

