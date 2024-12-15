import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { TStoreInventoryItem } from "../types/store";


interface StoreInventoryResponse {
  count: number;
  next_page: number;
  previous_page: number;
  number_of_pages: number;
  data: TStoreInventoryItem[];
}



interface FetchOptions {
  page?: number;
  size?: number;
  search?: string;
  category?: number;
}

const fetchStoreInventory = async (options: FetchOptions = {}): Promise<StoreInventoryResponse> => {
  const params = new URLSearchParams();
  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.search) params.append('search', options.search);
  if (options.category) params.append('category', options.category.toString());

  const res = await APIAxios.get('/inventory/store-inventories/', { params });
  return res.data;
}

export const useGetStoreInventory = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['storeInventory', options],
    placeholderData: keepPreviousData,
    queryFn: () => fetchStoreInventory(options),
  });
}

