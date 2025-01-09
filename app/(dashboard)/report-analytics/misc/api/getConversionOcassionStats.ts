import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


interface FetchOptions {
  page?: number;
  size?: number;
  branch?: string;
  year: "this_year" | "last_year";
}

interface APIResponse {
  data: Data;
  status: number;
  message: null;
}

interface Data {
  year: number;
  stats: Stat[];
}

interface Stat {
  occasion: string;
  order_count: number;
  enquiry_count: number;
  total_revenue: string;
}

const getStats = async (options: FetchOptions = {year: "this_year"}): Promise<APIResponse> => {
  const params = new URLSearchParams();

  if (options.year) params.append('year', options.year);
  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.branch && options.branch !== "all") params.append('branch', options.branch);

  const res = await APIAxios.get('/order/occasion-stats/', { params });
  return res.data;
}

export const useGetConversionOccassionStats = (options: FetchOptions = {year: "this_year"}) => {
  return useQuery({
    queryKey: ['conversion-ocassion-stats', options],
    placeholderData: keepPreviousData,
    queryFn: () => getStats(options),
  });
}


