import { APIAxios } from "@/utils/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { TEnquiry } from "../types";



const fetchDetail = async (enquiry_id?: string): Promise<TEnquiry> => {
  const res = await APIAxios.get(`/enquiry/${enquiry_id}/details/`);
  return res.data?.data as TEnquiry;
}

export const useGetEnquiryDetail = (enquiry_id?: string) => {
  return useQuery({
    queryKey: ['enquiry-details', enquiry_id],
    placeholderData: keepPreviousData,
    queryFn: () => fetchDetail(enquiry_id),
    enabled: !!enquiry_id
  });
}

