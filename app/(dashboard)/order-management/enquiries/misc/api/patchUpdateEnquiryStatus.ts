import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IEnquiryStatus {
    id: number;
    status: "STD" | "FND" | "DEL" | "CON";
}

const updateEnquiryStatus = async ({ status, id }: IEnquiryStatus) => {
    const res = await APIAxios.patch(`/enquiry/${id}/status/`, { status });
    return res.data;
};

export const useUpdateEnquiryStatus = (id?: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateEnquiryStatus,
        mutationKey: ['update-enquiry-status'],
        onSuccess() {
            if (!!id) {
                queryClient.invalidateQueries({
                    queryKey: ['enquiry-details', id]
                });
            }
            else {

                queryClient.invalidateQueries({
                    queryKey: ['active-enquiries']
                });
            }
        },
    });
}