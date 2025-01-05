import { APIAxios } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { NewEnquiryFormValues } from "../utils/schema";

const newEnquiry = async (data: NewEnquiryFormValues) => {
    console.log(data)
    const res = await APIAxios.post('/enquiry/create/', data, {
        // headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
};
 export const useCreateEnquiry = () =>{
    return useMutation({
        mutationFn: newEnquiry,
        mutationKey: ['create-enquiry']
    });
 }