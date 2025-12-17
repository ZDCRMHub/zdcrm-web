import { APIAxios } from "@/utils/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TOrder } from "../types";

const fetchActiveOrders = async (
  rider_id?: string
): Promise<EnquiriesAPIResponse> => {
  const res = await APIAxios.get(`/order/rider-deliveries/${rider_id}`);
  return res.data;
};

export const useGetRiderOrders = (rider_id?: string) => {
  return useQuery({
    queryKey: ["rider-orders-list", rider_id],
    placeholderData: keepPreviousData,
    queryFn: () => fetchActiveOrders(rider_id),
    enabled: !!rider_id,
  });
};

interface EnquiriesAPIResponse {
  data: TOrder[];
  next_page: string | null;
  previous_page: string | null;
  number_of_pages: number;
  count: number;
}
