import { APIAxios } from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"


interface UpdateDiscount {
    type?: string
    amount?: number
    is_active?: boolean
}

interface UpdateDiscountParams {
    id: number
    data: UpdateDiscount
}

const updateDiscount = async ({ id, data }: UpdateDiscountParams) => {
  const res = await APIAxios.put(`/order/${id}/update-discount/`, data)
  return res.data?.data
}

export const useUpdateDiscount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['UPDATE_DISCOUNT'],
        mutationFn: updateDiscount,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['GET_ALL_DISCOUNT']
            })
        },
    })
}

