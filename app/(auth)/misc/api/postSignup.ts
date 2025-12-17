import { APIAxios } from "@/utils/axios"
import { useMutation } from "@tanstack/react-query"

type SignUpData = {
  name: string;
  phone: string;
  email: string;
  token: string;
  password: string;
}


const signUp = async (data: SignUpData): Promise<SignupAPIResponse> => {
  const response = await APIAxios.post<SignupAPIResponse>('/auth/signup/', data);
  console.log(response.data)
  return response.data as SignupAPIResponse;
}

export const useSignUp = () => {
  return useMutation<SignupAPIResponse, Error, SignUpData>({
    mutationFn: signUp,
    mutationKey: ['signUp'],
  });
}



export interface SignupAPIResponse {
  data: Data;
  status: number;
  message: string;
}

interface Data {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: null;
  role: number;
  role_name: string;
  permissions: string[];
  is_active: boolean;
  create_date: string;
  access_token: string;
}