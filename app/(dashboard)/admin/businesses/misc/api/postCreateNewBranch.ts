import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TBranch = {
    name: string;
    country: string;
}

const mutationFn = async (branch: TBranch) => {
    const res = await APIAxios.post(`/branch/create/`, branch);
    return res.data;
}

export const useCreateNewBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        mutationKey: ['createNewBranch'],
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries({
                queryKey: ['getAllBranches']
            });
        },
    })
}