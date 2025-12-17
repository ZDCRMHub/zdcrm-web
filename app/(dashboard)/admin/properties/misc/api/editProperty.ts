import { APIAxios } from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"


interface UpdatePropertyItem {
    name?: string
    type?: string
    category?: string
    cost_price?: number
    selling_price?: number
    is_active?: boolean
}

interface UpdatePropertyParams {
    id: number
    data: UpdatePropertyItem
}

const updateProperty = async ({ id, data }: UpdatePropertyParams) => {
  const res = await APIAxios.put(`/inventory/${id}/update-property-option/`, data)
  return res.data?.data
}

export const useUpdateProperty = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['UPDATE_PROPERTY_OPTIONS'],
        mutationFn: updateProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['GET_ALL_PROPERTIES']
            })
        },
    })
}

