import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { TProductCategory } from "../types";


interface FetchOptions {
  category?: number;
}
const fetchProducts = async (options: FetchOptions = {}): Promise<ProductsAPIReponse[]> => {
  const params = new URLSearchParams();
  if (options.category) params.append('category', options.category.toString());
  const res = await APIAxios.get('/inventory/products/', { params })
  return res.data.data
}

export const useGetProducts = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['products', options.category],
    queryFn: () => fetchProducts(options),
  })
}



interface RootObject {
  data: ProductsAPIReponse[];
  status: number;
  message: null;
}

interface ProductsAPIReponse {
  id: number;
  name: string;
  category: TProductCategory;
  create_date: string;
  update_date: string;
}

