import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TBusiness = {
    name: string;
    country: string;
    address: string;
}

const mutationFn = async (branch: TBusiness) => {
    const res = await APIAxios.post(`/branch/create/`, branch);
    return res.data;
}

export const useCreateNewBusiness = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        mutationKey: ['createNewBusiness'],
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['getAllBusinesses']
            });
        },
    })
}