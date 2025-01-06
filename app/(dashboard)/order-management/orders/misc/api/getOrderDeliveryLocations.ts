import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"



const fetchLocations = async (): Promise<LocationsAPIResponse> => {
  const res = await APIAxios.get('/order/delivery-location/');
  return res.data;
}

export const useGetOrderDeliveryLocations = () => {
  return useQuery({
    queryKey: ['orders-dispatch-locations-list'],
    placeholderData: keepPreviousData,
    queryFn: fetchLocations,
  });
}


interface LocationsAPIResponse {
  data: TDeliveryLocation[];
  status: number;
  message: null;
}

export interface TDeliveryLocation {
  id: number;
  state: string;
  location: string;
  delivery_price: string;
}