import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

interface FetchOptions {
  page?: number;
  size?: number;
  search?: string;
}

const getCustomers = async (options: FetchOptions = {}): Promise<APIResponse> => {
  const params = new URLSearchParams();
 
  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.search) params.append('search', options.search);

  const res = await APIAxios.get('/order/riders-history/', { params });
  return res.data;
}

export const useGetRiderHistory = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['riders-list', options],
    placeholderData: keepPreviousData,
    queryFn: () => getCustomers(options),
  });
}

interface APIResponse {
  data: TRiderHistory[];  
  next_page: string | null;
  previous_page: string | null;
  number_of_pages: number;
  count: number;
}

export interface TRiderHistory {
  id: number;
  name: string;
  phone_number: string;
  email: null;
  orders_delivered: number;
  delivery_platform: string;
  total_delivery_fee: string;
}