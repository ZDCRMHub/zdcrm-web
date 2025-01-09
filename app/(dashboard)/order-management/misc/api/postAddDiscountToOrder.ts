import { APIAxios } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { TOrder } from "../types";

interface Props {
    discount_id: number | string;
    id: number | string;
}
const discountOrder = async ({ discount_id, id }: Props) => {
    const res = await APIAxios.post(`/order/${id}/discount/`, {discount_id});
    return res.data as APIResponse;
};
export const useAddDiscountToOrder = () => {
    return useMutation({
        mutationFn: discountOrder,
        mutationKey: ['add-discount-to-order']
    });
}

interface APIResponse {
    data: TOrder;
    status: number;
    message: string;
}

