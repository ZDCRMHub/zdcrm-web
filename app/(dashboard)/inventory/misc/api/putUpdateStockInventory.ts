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
    const res = await APIAxios.put(`/inventory/${id}/update-variation/`, data)
    return res.data
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