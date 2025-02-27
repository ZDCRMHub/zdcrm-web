import { APIAxios } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

import { NewEnquiryFormValues } from "../utils/schema";
import { TEnquiry } from "../types";

interface PutUpdateEnquiry {
    id: string;
    data: NewEnquiryFormValues
}

const editEnquiry = async ({ id, data }: PutUpdateEnquiry) => {
    console.log(data, "WHATAFECK")
    const res = await APIAxios.patch(`/enquiry/${id}/update/`, data, {});
    return res.data as APIResponse;
};
export const useUpdateEnquiry = () => {
    return useMutation({
        mutationFn: editEnquiry,
        mutationKey: ['update-enquiry']
    });
}

interface APIResponse {
    data: TEnquiry;
    status: number;
    message: string;
}

