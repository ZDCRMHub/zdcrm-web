import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { TOrder } from "../types";



const fetchDetail = async (order_id?: string | number): Promise<TOrder> => {
  const res = await APIAxios.get(`/order/${order_id}/details/`);
  return res.data?.data;
}

export const useGetOrderDetail = (order_id?: string | number) => {
  return useQuery({
    queryKey: ['order-details', order_id],
    placeholderData: keepPreviousData,
    queryFn: () => fetchDetail(order_id),
    enabled: !!order_id
  });
}

