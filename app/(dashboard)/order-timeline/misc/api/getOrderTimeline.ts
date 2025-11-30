import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

interface FetchOptions {
  page?: number;
  size?: number;
  search?: string;
  status?: string;
  date?: string;
}

const fetchActiveOrders = async (options: FetchOptions = {}): Promise<OrderTimelineAPIResponse> => {
  const params = new URLSearchParams();
  const splittedStatuses = options.status?.split(',')
  splittedStatuses && splittedStatuses.forEach(status => {
    params.append('status', status)
  })
  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.search) params.append('search', options.search);
  if (options.date) params.append('date', options.date);

  const res = await APIAxios.get('/order/timeline/', { params });
  return res.data;
}

export const useGeTOrderTimeline = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['order-timeline-list', options],
    placeholderData: keepPreviousData,
    queryFn: () => fetchActiveOrders(options),
  });
}



interface OrderTimelineAPIResponse {
  data: TOrderTimeItem[];
  status: number;
  message: null;
}

export interface TOrderTimeItem {
  id: number;
  order: number;
  order_details: Orderdetails;
  user: User;
  message: string;
  create_date: string;
  other_discussions: Otherdiscussion[];
}

interface Otherdiscussion {
  id: number;
  user: User;
  message: string;
  create_date: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: null;
}

interface Orderdetails {
  order_number: string;
  status: string;
  payment_status: string;
}