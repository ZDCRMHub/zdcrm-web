import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { TEnquiry } from "../types";

interface FetchOptions {
  page?: number;
  size?: number;
  search?: string;
  category?: number;
  status?: string;
  start_date?: string;
  end_date?: string;
}

const fetchActiveEmquiries = async (options: FetchOptions = {}): Promise<EnquiriesAPIResponse> => {
  const params = new URLSearchParams();
  const splittedStatuses = options.status?.split(',')
  splittedStatuses && splittedStatuses.forEach(status => {
    params.append('status', status)
  })
  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.search) params.append('search', options.search);
  if (options.category) params.append('category_id', options.category.toString());
  if (options.start_date) params.append('start_date', options.start_date);
  if (options.end_date) params.append('end_date', options.end_date);

  const res = await APIAxios.get('/enquiry/list/', { params });
  return res.data;
}

export const useGetEnquiries = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['active-enquiries', options],
    placeholderData: keepPreviousData,
    queryFn: () => fetchActiveEmquiries(options),
  });
}

interface EnquiriesAPIResponse {
  data: TEnquiry[];
  next_page: null;
  previous_page: null;
  number_of_pages: number;
  count: number;
}

