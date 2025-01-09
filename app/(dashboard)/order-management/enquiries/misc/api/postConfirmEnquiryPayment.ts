import { APIAxios } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { ConfirmPaymentFormData } from "../components/ConfirmPaymentModal";
import { TOrder } from "../../../misc/types";

interface confirmPaymentProps {
    id: number | string;
    data: ConfirmPaymentFormData
}

interface ConfirmationAPIResponse {
    data: TOrder;
    status: number;
    message: string;
  }
const confirmPayment = async ({ id, data }: confirmPaymentProps) => {
    const res = await APIAxios.post(`/enquiry/${id}/confirm/`, data);
    return res.data as ConfirmationAPIResponse;
};
export const useConfirmEnquiry = () => {
    return useMutation({
        mutationFn: confirmPayment,
        mutationKey: ['confirm-enquiry']
    });
}