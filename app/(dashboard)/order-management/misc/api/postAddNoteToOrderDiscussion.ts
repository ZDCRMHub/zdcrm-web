import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface newNoteProps {
    id: number | string;
    message: string;
}
const newNote = async ({ id, message }: newNoteProps) => {
    const res = await APIAxios.post(`/order/${id}/discussions/add/`, { message });
    return res.data;
};
interface useAddNoteToDiscussionProps {
    id?: number;
    type?: string;
}
export const useAddNoteToOrderDiscussion = ({ id,  }: useAddNoteToDiscussionProps) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: newNote,
        mutationKey: ['add-discudd-note'],
        onSuccess(data, variables, context) {
            if (id) {
                queryClient.invalidateQueries({
                    queryKey: [`order-details`, id]
                });
            }
        },
    });
}