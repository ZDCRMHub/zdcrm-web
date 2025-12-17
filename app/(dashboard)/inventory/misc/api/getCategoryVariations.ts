import { APIAxios } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

interface Variation {
  id: number;
  name: string;
  type: string; 
}

interface VariationsResponse {
  data: Variation[];
  status: number;
  message: string | null;
}

const fetchVariations = async (categoryId: string): Promise<VariationsResponse> => {
  const res = await APIAxios.get(`/inventory/${categoryId}/variations/`)
  return res.data
}

export const useGetVariations = (categoryId: string) => {
  return useQuery({
    queryKey: ['variations', categoryId],
    queryFn: () => fetchVariations(categoryId),
    enabled: !!categoryId, // Only run the query if categoryId is provided
  })
}
