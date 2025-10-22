import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TBusiness = {
    name: string;
    phone_number: string;
    country: string;
    address: string;
}

const mutationFn = async (business: TBusiness) => {
    const res = await APIAxios.post(`/business/create/`, business);
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