import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { TProductInventoryItem } from "../types/products";

interface ProductInventoryResponse {
  count: number;
  next_page: number;
  previous_page: number;
  number_of_pages: number;
  data: TProductInventoryItem[];
}

interface FetchOptions {
  page?: number;
  size?: number;
  search?: string;
  category?: number;
  branch?: number;
}

const fetchProductInventory = async (options: FetchOptions = {}): Promise<ProductInventoryResponse> => {
  const params = new URLSearchParams();
  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.search) params.append('search', options.search);
  if (options.category) params.append('category', options.category.toString());
  if (options.branch) params.append('branch', options.branch.toString());

  const res = await APIAxios.get('/inventory/product-inventories/', { params });
  return res.data;
}

export const useGetProductsInventory = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['productsInventory', options],
    placeholderData: keepPreviousData,
    queryFn: () => fetchProductInventory(options),
  });
}


