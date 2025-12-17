import { APIAxios } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const queryFn = async () => {
  const res = await APIAxios.get(`/business/list`);
  return res.data as APIResponse;
};

export const useGetAllBusinesses = () => {
  return useQuery({
    queryFn,
    queryKey: ["getAllBusinesses"],
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

interface APIResponse {
  data: TBusiness[];
  status: number;
  message: null;
}

export interface TBusiness {
  id: number;
  name: string;
  phone_number: string;
  address: string;
  country: string;
  country_display: string;
  create_date: string;
  update_date: string;
}
