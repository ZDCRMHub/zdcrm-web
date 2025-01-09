import Axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const APIAxios = Axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAxiosDefaultToken = (token: string) => {
  APIAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteAxiosDefaultToken = () => {
  delete APIAxios.defaults.headers.common.Authorization;
};


export const handleInactiveAccountRedirect = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

APIAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response && 
      error.response.data?.error?.summary === 'inactive account'
    ) {
      handleInactiveAccountRedirect();
    }
    return Promise.reject(error);
  }
);