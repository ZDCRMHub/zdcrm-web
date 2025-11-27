import { ApiResponse } from "@/types/apiResponse.types";
import Axios, { AxiosError, AxiosResponse } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const APIAxios = Axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAxiosDefaultToken = (token: string) => {
  APIAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteAxiosDefaultToken = () => {
  delete APIAxios.defaults.headers.common.Authorization;
};

export const handleInactiveAccountRedirect = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

APIAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Log the entire error response to the console
    console.log("Axios Error Response:", error.response);

    if (error.response) {
      const errorData = error.response.data as { error?: { summary?: string } };
      const errorSummary = errorData.error?.summary;

      if (
        errorSummary === "inactive account" ||
        errorSummary === "Invalid token" ||
        errorSummary === "Token has expired"
      ) {
        console.log("Authentication Error:", errorSummary);
        deleteAxiosDefaultToken();
        handleInactiveAccountRedirect();
      }
    }
    return Promise.reject(error);
  }
);

const handleResponse = <T>(response: AxiosResponse): ApiResponse<T> => {
  return {
    data: response.data.data,
    message: response.data.message,
    status: response.status,
    success: response.data.success,
    // meta: response.data.meta,
  };
};

export const get = async <T>(
  url: string,
  config?: object
): Promise<ApiResponse<T>> => {
  const res = await APIAxios.get(url, config);
  return handleResponse<T>(res);
};

export const post = async <T>(
  url: string,
  data?: object,
  config?: object
): Promise<ApiResponse<T>> => {
  const res = await APIAxios.post(url, data, config);
  return handleResponse<T>(res);
};

export const patch = async <T>(
  url: string,
  data?: object,
  config?: object
): Promise<ApiResponse<T>> => {
  const res = await APIAxios.patch(url, data, config);
  return handleResponse<T>(res);
};

export const put = async <T>(
  url: string,
  data?: object,
  config?: object
): Promise<ApiResponse<T>> => {
  const res = await APIAxios.put(url, data, config);
  return handleResponse<T>(res);
};

export const del = async <T>(
  url: string,
  config?: object
): Promise<ApiResponse<T>> => {
  const res = await APIAxios.delete(url, config);
  return handleResponse<T>(res);
};

export default APIAxios;
