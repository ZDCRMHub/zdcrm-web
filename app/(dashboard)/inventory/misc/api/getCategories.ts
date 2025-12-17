import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { TCategory } from "../types";


interface CategoriesResponse {
    data: TCategory[];
    status: number;
    message: string | null;
  }
   
const fetchCategories = async (): Promise<TCategory[]> => {
  const res = await APIAxios.get('/inventory/categories/')
  return res.data.data
}

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })
}
