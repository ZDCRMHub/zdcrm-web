import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IOrderStatus {
    id: number | string;
    payment_verified: boolean;
}

const updateOrderStatus = async ({ payment_verified, id }: IOrderStatus) => {
    const res = await APIAxios.patch(`/order/${id}/payment-verification/`, { payment_verified });
    return res.data;
};

export const useUpdatePaymentVerified = (id?: string | number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrderStatus,
        mutationKey: ['update-order-payment-verified'],
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