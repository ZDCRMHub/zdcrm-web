import APIAxios from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    id: number;
    data: {
        cost_price: string | number;
        quantity: number;
    }
}
const mutateFn = async ({ id, data }: Props) => {
    const res = await APIAxios.put(`/inventory/${id}/update-product-inventory/`, data)
    return res.data
}

export const useUpdateProductInventory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['product-inventory-detail'],
        mutationFn: mutateFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['product-inventory-details'] 
            })
            queryClient.invalidateQueries({
                queryKey: ['product-inventory-history'] 
            })
            queryClient.invalidateQueries({
                queryKey: ['product-inventory-list'] 
            })
           
        },
    })
}