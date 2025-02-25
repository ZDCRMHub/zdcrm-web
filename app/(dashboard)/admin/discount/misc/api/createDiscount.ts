import { APIAxios } from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TDiscountItem } from "../types"

interface createDiscountProps {
    type: string
    amount: number
}
const createDiscount = async (data: createDiscountProps): Promise<TDiscountItem>=> {
    const response = await APIAxios.post("/order/create-discount/", data)
    return response.data.data
}

export const useCreateDiscount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createDiscount,
        mutationKey: ['CREATE-DISCOUNT'],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['GET_ALL_DISCOUNT']
            })
        },
    })
}
