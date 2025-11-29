import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { TOrder } from "../types";

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

  const res = await APIAxios.get('/customer/list-stats/', { params });
  return res.data;
}

export const useGetCustomerHistory = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['customers-list', options],
    placeholderData: keepPreviousData,
    queryFn: () => getCustomers(options),
  });
}

interface APIResponse {
  data: TCustomerHistory[];  
  next_page: string | null;
  previous_page: string | null;
  number_of_pages: number;
  count: number;
}

export interface TCustomerHistory {
  id: number;
  name: string;
  phone: string;
  email: null | string;
  orders_count: number;
  total_amount_spent: string;
  last_order_date: string;
  client_behaviour: string;
  create_date: string;
  update_date: string;
}

