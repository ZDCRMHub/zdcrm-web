import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TDispatchItem } from "../types";

interface UpdateDispatch {
  state?: string;
  location?: string;
  zone?: string;
  delivery_price?: number;
}

interface UpdateDispatchParams {
  id: number;
  data: UpdateDispatch;
}

const updateDispatch = async ({
  id,
  data,
}: UpdateDispatchParams): Promise<TDispatchItem> => {
  const res = await APIAxios.put(`/order/${id}/update-dispatch/`, data);
  return res.data?.data;
};

export const useUpdateDispatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATE_DISPATCH"],
    mutationFn: updateDispatch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_DISPATCH"],
      });
    },
  });
};
