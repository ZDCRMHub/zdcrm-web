import { APIAxios } from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TPropertyItem } from "../types"

interface createPropertyProps {
    name: string
    type: string
    category: string
    cost_price: number
    selling_price: number
}
const createProperty = async (data: createPropertyProps): Promise<TPropertyItem>=> {
    const response = await APIAxios.post("/inventory/create-property-option/", data)
    return response.data.data
}

export const useCreateProperty = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createProperty,
        mutationKey: ['CREATE_PROPERTY_OPTIONS'],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['GET_ALL_PROPERTIES']
            })
        },
    })
}
