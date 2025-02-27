import { APIAxios } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { NewEnquiryFormValues } from "../utils/schema";
import { TEnquiry } from "../types";

const newEnquiry = async (data: NewEnquiryFormValues) => {
    console.log(data)
    const res = await APIAxios.post('/enquiry/create/', data, {
        // headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data as APIResponse;
};
export const useCreateEnquiry = () => {
    return useMutation({
        mutationFn: newEnquiry,
        mutationKey: ['create-enquiry']
    });
}

type Props = {
    id: string;
    data: NewEnquiryFormValues;
}
const updateEnquiry = async ({ id, data }: Props) => {
    console.log(data)
    const res = await APIAxios.put(`/enquiry/${id}/update/`, data, {
    });
    return res.data as APIResponse;
};


export const useUpdateEnquiry = () => {
    return useMutation({
        mutationFn: updateEnquiry,
        mutationKey: ['update-enquiry']
    });
}

interface APIResponse {
    data: TEnquiry;
    status: number;
    message: string;
}

