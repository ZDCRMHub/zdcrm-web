import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { TCategory } from "../types";


interface CategoriesResponse {
    data: TCategory[];
    status: number;
    message: string | null;
  }
   
const fetchCategories = async (): Promise<TCategory[]> => {
  const res = await APIAxios.get('/inventory/product-categories/')
  return res.data.data
}

export const useGetProductCategories = () => {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: fetchCategories,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
