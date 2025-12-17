
import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { TProductInventoryItem } from "../types/products";



const fetchDetails = async (id: string | number): Promise<TProductInventoryItem> => {
    const res = await APIAxios.get(`/inventory/${id}/product-inventory-detail`)
    return res.data?.data
}

export const useGetProductInventoryDetails = (id?: string | number) => {
    return useQuery({
        queryKey: ['product-inventory-detail', id],
        queryFn: () => fetchDetails(id!),
        enabled: !!id
    })
}
