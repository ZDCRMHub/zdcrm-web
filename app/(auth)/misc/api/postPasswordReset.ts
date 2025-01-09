import { APIAxios } from "@/utils/axios"
import { useMutation } from "@tanstack/react-query"

interface RequestResetData {
  email: string;
}

interface VerifyCodeData {
  email: string;
  otp: string;
}

interface ResetPasswordData {
  email: string;
  code: string;
  new_password: string;
}

interface APIResponse {
  status: number;
  message: string;
}

const requestPasswordReset = async (data: RequestResetData): Promise<APIResponse> => {
  const response = await APIAxios.post<APIResponse>('/auth/request-password-reset/', data);
  return response.data;
}

const verifyCode = async (data: VerifyCodeData): Promise<APIResponse> => {
  const response = await APIAxios.post<APIResponse>('/auth/verify-otp/', data);
  return response.data;
}

const resetPassword = async (data: ResetPasswordData): Promise<APIResponse> => {
  const response = await APIAxios.post<APIResponse>('/auth/reset-password/', data);
  return response.data;
}

export const useRequestPasswordReset = () => {
  return useMutation<APIResponse, Error, RequestResetData>({
    mutationFn: requestPasswordReset,
    onSuccess: (data) => {
      console.log('Password reset requested:', data.message);
    },
    onError: (error) => {
      console.error('Password reset request failed:', error.message);
    }
  });
}

export const useVerifyCode = () => {
  return useMutation<APIResponse, Error, VerifyCodeData>({
    mutationFn: verifyCode,
    onSuccess: (data) => {
      console.log('Code verified:', data.message);
    },
    onError: (error) => {
      console.error('Code verification failed:', error.message);
    }
  });
}

export const useResetPassword = () => {
  return useMutation<APIResponse, Error, ResetPasswordData>({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      console.log('Password reset successful:', data.message);
    },
    onError: (error) => {
      console.error('Password reset failed:', error.message);
    }
  });
}

