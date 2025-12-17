import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IOrderStatus {
    id: number;
    payment_options: string;
}

const updateOrderStatus = async ({ payment_options, id }: IOrderStatus) => {
    const res = await APIAxios.patch(`/order/${id}/payment-options/`, { payment_options });
    return res.data;
};

export const useUpdateOrderPaymentMethod = (id?: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrderStatus,
        mutationKey: ['update-order-payment-method'],
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