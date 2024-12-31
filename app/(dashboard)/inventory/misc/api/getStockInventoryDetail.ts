import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { TStockInventoryItem } from "../types/stock";




const fetchDetails = async (id: string | number): Promise<TStockInventoryItem[]> => {
  const res = await APIAxios.get(`/inventory/${id}/detail/`)
  return res.data.data
}

export const useGetStockInventoryDetails = (id: string | number) => {
  return useQuery({
    queryKey: ['inventory-details', id],
    queryFn: () => fetchDetails(id),
    enabled: !!id, 
  })
}


