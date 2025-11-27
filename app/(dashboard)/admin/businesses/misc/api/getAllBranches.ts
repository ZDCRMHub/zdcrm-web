import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

const queryFn = async ()=>{
    const res = await APIAxios.get(`/business/branches/list`)
    return res.data as RootObject
}

export const useGetAllBranches = () => {
    return useQuery({
        queryFn,
        queryKey: ['getAllBranches'],
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })
}

interface RootObject {
  data: TBranch[];
  status: number;
  message: null;
}

export interface TBranch {
  id: number;
  name: string;
  country: string;
  create_date: string;
  update_date: string;
}