import { APIAxios } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { DiscountPaginatedResponse, DiscountsQueryParams, TDiscountItem } from "../types";

const fetchAllDiscounts = async (
  params: DiscountsQueryParams = {}
): Promise<DiscountPaginatedResponse<TDiscountItem>> => {
  const queryParams = new URLSearchParams();

  if (params.paginate) queryParams.append("paginate", "true");
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.size) queryParams.append("size", params.size.toString());

  const url = `/order/discounts${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  const res = await APIAxios.get(url);
  return res.data;
};

export const useGetAllDiscounts = (params: DiscountsQueryParams = {}) => {
  return useQuery({
    queryKey: ["GET_ALL_DISCOUNT", params],
    queryFn: () => fetchAllDiscounts(params),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
