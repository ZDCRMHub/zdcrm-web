import { APIAxios } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TDispatchItem } from "../types";

interface createDispatchProps {
  state: string;
  location: string;
  delivery_price: number;
  zone: string;
}

const createDispatch = async (
  data: createDispatchProps
): Promise<TDispatchItem> => {
  const response = await APIAxios.post("/order/create-dispatch/", data);
  return response.data.data;
};

export const UsecreateDispatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDispatch,
    mutationKey: ["CREATE-DISPATCH"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_DSIPATCH"],
      });
    },
  });
};
