
import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { TStoreInventoryItem } from "../types/store";



const fetchDetails = async (id: string | number): Promise<TStoreInventoryItem> => {
    const res = await APIAxios.get(`/inventory/${id}/store-inventory-detail`)
    return res.data?.data
}

export const useGetStoreInventoryDetails = (id?: string | number) => {
    return useQuery({
        queryKey: ['store-inventory-detail', id],
        queryFn: () => fetchDetails(id!),
        enabled: !!id
    })
}
