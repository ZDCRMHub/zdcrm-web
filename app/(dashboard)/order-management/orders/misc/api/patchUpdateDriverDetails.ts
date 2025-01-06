import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeliveryDriverFormType } from "../../[id]/confirm-delivery/page";

interface IDriverDetails {
    id: string | number;
    data: DeliveryDriverFormType
}

const updateDriverDetails = async ({  id, data }: IDriverDetails) => {
    const res = await APIAxios.patch(`/order/${id}/driver-details/`,data);
    return res.data;
};

export const useUpdateDriverDetails = (id?: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateDriverDetails,
        mutationKey: ['update-order-driver-details'],
        onSuccess() {
            if (!!id) {
                queryClient.invalidateQueries({
                    queryKey: ['order-details']
                });
            }
           
        },
    });
}