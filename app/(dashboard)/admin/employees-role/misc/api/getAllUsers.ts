import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

const queryFn = async () => {
    const res = await APIAxios.get(`/auth/users`)
    return res.data as TUserAPIResponse
}

export const useGetAllUsers = () => {
    return useQuery({
        queryFn,
        queryKey: ['getAllUsers'],
    })
}
interface TUserAPIResponse {
  data: TUser[];
  status: number;
  message: null;
}

export interface TUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: null;
  role: number;
  role_name: string;
  branches: any[];
  branch_names: any[];
  permissions: string[];
  is_active: boolean;
  create_date: string;
}