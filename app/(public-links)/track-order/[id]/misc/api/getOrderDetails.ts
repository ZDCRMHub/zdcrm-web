import { TOrder } from "@/app/(dashboard)/order-management/misc/types";
import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"



const fetchDetail = async (order_id?: string): Promise<TOrder> => {
  const res = await APIAxios.get(`/order/track-order?order_number=${order_id}`);
  return res.data?.data;
}

export const useGeTOrderDetail = (order_id?: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['track-order', order_id],
    placeholderData: keepPreviousData,
    queryFn: () => fetchDetail(order_id),
    enabled: !!order_id && enabled
  });
}

