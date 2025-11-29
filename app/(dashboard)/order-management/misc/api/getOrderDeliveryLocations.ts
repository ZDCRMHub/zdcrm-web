import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"



const fetchLocations = async (): Promise<LocationsAPIResponse> => {
  const res = await APIAxios.get('/order/delivery-location/');
  return res.data;
}

export const useGeTOrderDeliveryLocations = () => {
  return useQuery({
    queryKey: ['orders-dispatch-locations-list'],
    placeholderData: keepPreviousData,
    queryFn: fetchLocations,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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