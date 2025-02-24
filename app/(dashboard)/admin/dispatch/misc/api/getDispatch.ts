import { APIAxios } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { DispatchPaginatedResponse, DispatchQueryParams, TDispatchItem } from "../types";

const fetchAllDispatch = async (
  params: DispatchQueryParams = {}
): Promise<DispatchPaginatedResponse<TDispatchItem>> => {
  const queryParams = new URLSearchParams();

  if (params.paginate) queryParams.append("paginate", "true");
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.size) queryParams.append("size", params.size.toString());

  const url = `/order/delivery-location${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  const res = await APIAxios.get(url);
  return res.data;
};

export const useGetAllDispatch = (params: DispatchQueryParams = {}) => {
  return useQuery({
    queryKey: ["GET_ALL_DSIPATCH", params],
    queryFn: () => fetchAllDispatch(params),
  });
};
