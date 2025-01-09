import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

const queryFn = async () => {
    const res = await APIAxios.get(`/auth/roles`)
    return res.data as TRoleAPIResponse
}

export const useGetAllRoles = () => {
    return useQuery({
        queryFn,
        queryKey: ['getAllRoles'],
    })
}


interface TRoleAPIResponse {
  data: TUserRole[];
  status: number;
  message: null;
}

export  interface TUserRole {
  id: number;
  name: string;
  permissions: string[];
  users_count: number;
}