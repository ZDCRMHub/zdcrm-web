import { APIAxios } from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"



interface UpdateProductParams {
    id: number
    data: any
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


interface UpdateProductVariationStatusParams {
    id: number
}

const updateProductVariationStatus = async ({ id }: UpdateProductVariationStatusParams) => {
  const res = await APIAxios.put(`/inventory/${id}/toggle-product-variation-status/`)
  return res.data?.data
}

export const useUpdateProductVariationStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['UPDATE_PRODUCT_VARTION_STATUS'],
        mutationFn: updateProductVariationStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['GET_ALL_PRODUCTS']
            })
        },
    })
}

