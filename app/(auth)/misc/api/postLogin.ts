import { APIAxios } from "@/utils/axios"
import { useMutation } from "@tanstack/react-query"

type SignInData = {
    email: string;
    password: string;
}


const signIn = async (data: SignInData): Promise<LoginAPIResponse> => {
  // const response = await axios.post<LoginAPIResponse>('/auth/login/', data);
  const response = await APIAxios.post<LoginAPIResponse>('/auth/login/', data);
console.log(response.data)
  return response.data as LoginAPIResponse ;
}

export const useSignIn = () => {
  return useMutation<LoginAPIResponse, Error, SignInData>({
    mutationFn: signIn,
    mutationKey: ['signIn'],
    onSuccess: (data) => {
      console.log('SignIn successful:', data.message);
    },
    onError: (error) => {
      console.error('SignIn failed:', error.message);
    }
  });
}



export interface LoginAPIResponse {
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