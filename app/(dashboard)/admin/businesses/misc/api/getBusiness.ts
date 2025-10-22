import { APIAxios } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (id: string) => {
  const res = await APIAxios.get(`/business/${id}/details/`);
  return res.data as APIResponse;
};

export const useGetBusinessDetails = (id: string) => {
  return useQuery({
    queryFn: () => queryFn(id),
    queryKey: ["getBusinessDetails", id],
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

interface APIResponse {
  data: TBusiness
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
