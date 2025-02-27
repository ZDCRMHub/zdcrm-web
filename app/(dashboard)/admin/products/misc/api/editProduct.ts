import { APIAxios } from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"


interface UpdateProduct {
    name?: string
    is_active?: boolean
    selling_price?: number
}

interface UpdateProductParams {
    id: number
    data: UpdateProduct
}

const updateProduct = async ({ id, data }: UpdateProductParams) => {
  const res = await APIAxios.put(`/inventory/${id}/update-product/`, data)
  return res.data?.data
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['UPDATE_PRODUCT'],
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['GET_ALL_PRODUCTS']
            })
        },
    })
}

