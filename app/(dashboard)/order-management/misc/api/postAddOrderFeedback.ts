import APIAxios from "@/utils/axios";

import { TOrder } from "../types";
import { useMutation } from "@tanstack/react-query";

interface addFeedbackProps {
    id: number | string;
    data: {
        feedback: string;
    };
}

interface ConfirmationAPIResponse {
    data: TOrder;
    status: number;
    message: string;
}
const addFeedback = async ({ id, data }: addFeedbackProps) => {
    const res = await APIAxios.post(`/order/${id}/feedback/`, data);
    return res.data as ConfirmationAPIResponse;
};
export const useAddFeedback = () => {
    return useMutation({
        mutationFn: addFeedback,
        mutationKey: ['add-feedback']
    });
}