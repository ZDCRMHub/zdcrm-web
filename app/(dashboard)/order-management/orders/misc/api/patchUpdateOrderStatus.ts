import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IOrderStatus {
    id: number;
    status: "PND" | "SOA" | "SOR" | "STD" | "COM" | "CAN";
}

const updateOrderStatus = async ({ status, id }: IOrderStatus) => {
    const res = await APIAxios.patch(`/order/${id}/status/`, { status });
    return res.data;
};

export const useUpdateOrderStatus = (id?: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrderStatus,
        mutationKey: ['update-Order-status'],
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