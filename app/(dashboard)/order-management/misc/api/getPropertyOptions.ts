import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

interface FetchOptions {
  page?: number;
  size?: number;
}

const fetchActiveOrders = async (options: FetchOptions = {}): Promise<TAPIResponse> => {
  const params = new URLSearchParams();
  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());

  const res = await APIAxios.get('/inventory/property-options/', { params });
  return res.data;
}

export const useGetPropertyOptions = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['property-options-list', options],
    placeholderData: keepPreviousData,
    queryFn: () => fetchActiveOrders(options),
  });
}


interface TAPIResponse {
  data: Datum[];
  next_page: null;
  previous_page: null;
  number_of_pages: number;
  count: number;
}

interface Datum {
  id: number;
  name: string;
  type: string;
  type_display: string;
  cost_price: number;
  selling_price: number;
  is_active: boolean;
  create_date: string;
  update_date: string;
}

