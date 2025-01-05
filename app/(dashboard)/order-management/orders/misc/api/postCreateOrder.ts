import { APIAxios } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

import { NewOrderFormValues } from "../utils/schema";
import { TOrder } from "../types";

const newOrder = async (data: NewOrderFormValues) => {
    const res = await APIAxios.post('/order/create/', data);
    return res.data as APIResponse;
};
export const useCreateOrder = () => {
    return useMutation({
        mutationFn: newOrder,
        mutationKey: ['create-order']
    });
}

interface APIResponse {
    data: TOrder;
    status: number;
    message: string;
}

