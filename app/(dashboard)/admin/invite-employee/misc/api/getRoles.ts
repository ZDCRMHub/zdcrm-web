import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

const getRoles = async () => {
    const res = await APIAxios.get("/auth/roles/")
    return res.data?.data as TRole[]
}

export const useGetRoles = () =>{
    return useQuery({
        queryFn: getRoles,
        queryKey: ['get-roles']
    })
}


interface RootObject {
  data: TRole[];
  status: number;
  message: string | null;
}

export interface TRole {
  id: number;
  name: string;
  permissions: string[];
  users_count: number;
}