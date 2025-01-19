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
    const res = await APIAxios.put(`/inventory/${id}/update-store-inventory/`, data)
    return res.data
}

export const useUpdateStoreInventory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['product-inventory-detail'],
        mutationFn: mutateFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['store-inventory-detail']
            })
        },
    })
}