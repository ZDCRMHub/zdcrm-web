import { APIAxios } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { TOrder } from "../types";

interface Props {
    discount_id?: number | string;
    custom_discount_amount?: number
    id: number | string;
}
const discounTOrder = async ({ discount_id, custom_discount_amount, id }: Props) => {
    const res = await APIAxios.post(`/order/${id}/discount/`, {discount_id, custom_discount_amount: custom_discount_amount == 0 ? undefined : custom_discount_amount});
    return res.data as APIResponse;
};
export const useAddDiscountToOrder = () => {
    return useMutation({
        mutationFn: discounTOrder,
        mutationKey: ['add-discount-to-order']
    });
}

interface APIResponse {
    data: TOrder;
    status: number;
    message: string;
}

