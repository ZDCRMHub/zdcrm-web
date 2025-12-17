import { APIAxios } from "@/utils/axios"
import { useMutation } from "@tanstack/react-query"


interface verifyOTPProps {
    email: string
    otp: string
}
const verifyOTP = async (data: verifyOTPProps) => {
    const res = await APIAxios.post("/auth/verify-otp/", data)
    return res.data
}

export const useVerifyOTP = () => {
    return useMutation({
        mutationFn: verifyOTP,
        mutationKey: ['verify-oto-on-signup']
    })
}