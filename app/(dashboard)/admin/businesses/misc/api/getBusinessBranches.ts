import { APIAxios } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";


interface fectchOptions {
  page?: number;
  size?: number;
  search?: string;
  business_id?: number;
}

const queryFn = async (options: fectchOptions) => {
  const res = await APIAxios.get(`/business/branches/list`, { params: options });
  return res.data as APIResponse;
};

export const useGetBusinessBranches= (options: fectchOptions) => {
  return useQuery({
    queryFn: () => queryFn(options),
    queryKey: ["getBusinessBranches", options],
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};


interface APIResponse {
  data: TBranch[];
  status: number;
  message: string | null;
}

export interface TBranch {
  id: number;
  name: string;
  phone_number: string;
  address: string;
  business: number;
  business_name: string;
  create_date: string;
  update_date: string;
}