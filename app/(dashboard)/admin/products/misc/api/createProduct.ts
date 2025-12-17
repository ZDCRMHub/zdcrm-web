import { APIAxios } from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TProductItem } from "../types"


const createProduct = async (data:any): Promise<TProductItem>=> {
    const response = await APIAxios.post("/inventory/create-product/", data)
    return response.data.data
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createProduct,
        mutationKey: ['CREATE-PRODUCT'],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['GET_ALL_PRODUCTS']
            })
        },
    })
}
