import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TBranchUpdate = {
  id: number;
  name?: string;
  address?: string;
  phone_number?: string;
  business_id?: number;
}

const mutationFn = async (branch: TBranchUpdate) => {
  const { id, ...payload } = branch;
  const res = await APIAxios.put(`/business/branches/${id}/update/`, payload);
  return res.data;
}

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    mutationKey: ['updateBranch'],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getAllBranches'] });
      queryClient.invalidateQueries({ queryKey: ['getBusinessBranches'] });
    }
  })
}
