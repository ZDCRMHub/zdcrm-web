import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface newNoteProps {
    id: number | string;
    message: string;
}
const newNote = async ({ id, message }: newNoteProps) => {
    const res = await APIAxios.post(`/enquiry/${id}/discussions/add/`, { message });
    return res.data;
};
interface useAddNoteToDiscussionProps {
    id?: number;
    type?: string;
}
export const useAddNoteToDiscussion = ({ id, type = "enquiry" }: useAddNoteToDiscussionProps) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: newNote,
        mutationKey: ['add-discuss-note'],
        onSuccess(data, variables, context) {
            if (id) {
                queryClient.invalidateQueries({
                    queryKey: [`${type}-details`, id]
                });
            }
        },
    });
}