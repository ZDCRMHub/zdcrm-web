import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

const queryFn = async ()=>{
    const res = await APIAxios.get(`/branch/list`)
    return res.data as RootObject
}

export const useGetAllBranches = () => {
    return useQuery({
        queryFn,
        queryKey: ['getAllBranches'],
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