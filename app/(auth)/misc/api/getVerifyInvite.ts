import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

const verifyInvite = async (token?: string) => {
    const response = await APIAxios.get(`/auth/verify-invite/?token=${token}`)
    return response.data?.data as VerifyResponse
}
export const useVerifyInvite = (token?: string) => {
    return useQuery({
        queryFn: () => verifyInvite(token),
        queryKey: ['verify-invite-token'],
        enabled: !!token
    })
}

interface VerifyResponse {
  id: number;
  email: string;
  role: string;
  token: string;
  expires_at: string;
  is_used: boolean;
  create_date: string;
  update_date: string;
}