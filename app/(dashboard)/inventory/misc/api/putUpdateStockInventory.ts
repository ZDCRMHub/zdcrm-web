import APIAxios from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    id: number;
    data: {
        quantity: number;
    }
}
type UpdateStockInventoryNameProps = {
    id: number;
    data: {
        name: string;
    }
}
const mutateFn = async ({ id, data }: Props) => {
    const res = await APIAxios.put(`/inventory/${id}/update-variation/`, data)
    return res.data
}

const updateName = async ({ id, data }: UpdateStockInventoryNameProps) => {
    const res = await APIAxios.put(`/inventory/${id}/update-stock-inventory/`, data)
    return res.data
}

export const useUpdateStockInventoryName = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['stock-inventory-name-update'],
        mutationFn: updateName,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['stock-inventory-details']
            })
            queryClient.invalidateQueries({
                queryKey: ['stock-inventory-history']
            })
            queryClient.invalidateQueries({
                queryKey: ['stock-inventory-list']
            })
        },
    })
}
export const useUpdateStockInventory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['update-stock-inventory-detail'],
        mutationFn: mutateFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['stock-inventory-details']
            })
            queryClient.invalidateQueries({
                queryKey: ['stock-inventory-history']
            })
            queryClient.invalidateQueries({
                queryKey: ['stock-inventory-list']
            })
        },
    })
}