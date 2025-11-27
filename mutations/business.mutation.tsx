import { getAllBranches } from "@/apis/business.api"
import { useQuery } from "@tanstack/react-query"

export const useGetAllBranches = () => {
    return useQuery({
        queryKey: ['getAllBranches'],
        queryFn: getAllBranches,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })
}
