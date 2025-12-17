import APIAxios from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    id: number;
    data: {
        quantity: number;
    }
}
type UpdateProductInventoryNameProps = {
    id: number;
    data: {
        name: string;
    }
}


const updateName = async ({ id, data }: UpdateProductInventoryNameProps) => {
    const res = await APIAxios.put(`/inventory/${id}/update-product-inventory/`, data)
    return res.data
}
const mutateFn = async ({ id, data }: Props) => {
    const res = await APIAxios.put(`/inventory/${id}/update-product-inventory-variation/`, data)
    return res.data
}

export const useUpdateProductInventoryName = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['product-inventory-naem-update'],
        mutationFn: updateName,
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