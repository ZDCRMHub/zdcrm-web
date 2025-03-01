import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { TCategory } from "../types";
import { TProductInventoryItem } from "../types/products";

interface RootObject {
  data: TInvetoryHistoryItem[];
  next_page: null;
  previous_page: null;
  number_of_pages: number;
  count: number;
}

export interface TInvetoryHistoryItem {
  id: number;
  action: string;
  action_display: string;
  quantity_before: number;
  quantity_after: number;
  quantity_changed: number;
  cost_price: null;
  amount: string;
  order_number: string;
  updated_by: Updatedby;
  note: string;
  create_date: string;
}

interface Updatedby {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: null;
}

const fetchDetails = async (id: string | number): Promise<RootObject> => {
    const res = await APIAxios.get(`/inventory/${id}/product-inventory-history`)
    return res.data
}

export const useGetProductInventoryHistory = (id?: string | number) => {
    return useQuery({
        queryKey: ['product-inventory-history', id],
        queryFn: () => fetchDetails(id!),
        enabled: !!id
    })
}
