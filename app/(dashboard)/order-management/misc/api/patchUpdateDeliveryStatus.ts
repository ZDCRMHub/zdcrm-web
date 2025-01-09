import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IOrderStatus {
    id: number;
    status: string;
}

const updateOrderStatus = async ({ status, id }: IOrderStatus) => {
    const res = await APIAxios.patch(`/order/${id}/delivery-status/`, { status });
    return res.data;
};

export const useUpdateDeliveryStatus = (id?: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrderStatus,
        mutationKey: ['update-delivery-status'],
        onSuccess() {
            if (!!id) {
                queryClient.invalidateQueries({
                    queryKey: ['order-details']
                });
            }
            else {

                queryClient.invalidateQueries({
                    queryKey: ['active-orders-list']
                });
            }
        },
    });
}