import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

const queryFn = async ()=>{
    const res = await APIAxios.get(`/branch/list`)
    return res.data as RootObject
}

export const useGetAllBusinesses = () => {
    return useQuery({
        queryFn,
        queryKey: ['getAllBusinesses'],
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })
}



interface RootObject {
  data: TBusiness[];
  status: number;
  message: null;
}

export interface TBusiness {
  id: number;
  name: string;
  country: string;
  create_date: string;
  update_date: string;
}