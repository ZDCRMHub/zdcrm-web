import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { TStockInventoryItem } from "../types/stock";

interface StockInventoryResponse {
  count: number;
  next_page: number;
  previous_page: number;
  number_of_pages: number;
  data: TStockInventoryItem[];
}

interface FetchOptions {
  page?: number;
  size?: number;
  search?: string;
  category?: number;
  variation?: string;
}

const fetchStockInventory = async (options: FetchOptions = {}): Promise<StockInventoryResponse> => {
  const params = new URLSearchParams();
  if (options.page) params.append('page', options.page.toString());
  if (options.size) params.append('size', options.size.toString());
  if (options.search) params.append('search', options.search);
  if (options.category) params.append('category', options.category.toString());
  if (options.variation) params.append('variation', options.variation);

  const res = await APIAxios.get('/inventory/stock-inventories/', { params });
  return res.data;
}

export const useGetStockInventory = (options: FetchOptions = {}) => {
  return useQuery({
    queryKey: ['stockInventory', options],
    queryFn: () => fetchStockInventory(options),
  });
}

