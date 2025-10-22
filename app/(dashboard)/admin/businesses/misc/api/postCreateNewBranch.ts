import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type TBranch = {
    name: string;
    address: string;
    phone_number: string;
    business_id: number;
}

const mutationFn = async (branch: TBranch) => {
    const res = await APIAxios.post(`/business/branches/create/`, branch);
    return res.data;
}

export const useCreateNewBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        mutationKey: ['createNewBranch'],
        onSuccess(data, variables) {
            queryClient.invalidateQueries({
                queryKey: ['getAllBranches']
            });
            queryClient.invalidateQueries({
                queryKey: ['getBusinessBranches']
            });
        },
    })
}