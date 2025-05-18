import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { TOrder } from "../types";

interface FetchOptions {
  page?: number;
  size?: number;
  search?: string;
  category?: number;
  order_number?: string;
  status?: string;
  payment_status?: string;
  delivery_status?: string;
  start_date?: string;
  end_date?: string;
}

const fetchActiveOrders = async (options: FetchOptions = {}): Promise<EnquiriesAPIResponse> => {
  const params = new URLSearchParams();
  const splittedStatuses = options.status?.split(',')
  splittedStatuses && splittedStatuses.forEach(status => {
    params.append('status', status)
  })
  const splittedDeliveryStatuses = options.delivery_status?.split(',')
  splittedDeliveryStatuses && splittedDeliveryStatuses.forEach(status => {
    params.append('delivery_status', status)
  })
  const splittedPaymentStatuses = options.payment_status?.split(',')
  splittedPaymentStatuses && splittedPaymentStatuses.forEach(status => {
    params.append('payment_status', status)
  })
  
  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.search) params.append('search', options.search);
  if (options.category) params.append('category_id', options.category.toString());
  if (options.order_number) params.append('order_number', options.order_number);
  if (options.start_date) params.append('start_date', options.start_date);
  if (options.end_date) params.append('end_date', options.end_date);

  const res = await APIAxios.get('/order/list/', { params });
  return res.data;
}

export const useGetOrders = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['active-orders-list', options],
    placeholderData: keepPreviousData,
    queryFn: () => fetchActiveOrders(options),
  });
}

interface EnquiriesAPIResponse {
  data: TOrder[];
  next_page: string | null;
  previous_page: string | null;
  number_of_pages: number;
  count: number;
}

