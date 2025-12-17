import APIAxios from "@/utils/axios";

import { TOrder } from "../types";
import { useMutation } from "@tanstack/react-query";
import { AddPartPaymentFormData } from "../components/PartPaymentsForm";

interface addPartPaymentProps {
    id: number | string;
    data: AddPartPaymentFormData & { payment_proof?: string }
}

interface ConfirmationAPIResponse {
    data: TOrder;
    status: number;
    message: string;
}
const addPartPayment = async ({ id, data }: addPartPaymentProps) => {
    const res = await APIAxios.post(`/order/${id}/part-payment/`, data);
    return res.data as ConfirmationAPIResponse;
};
export const useAddPartPayment = () => {
    return useMutation({
        mutationFn: addPartPayment,
        mutationKey: ['add-part-payment']
    });
}