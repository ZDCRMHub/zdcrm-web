import { APIAxios } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse, PropertyQueryParams, TPropertyItem } from "../types";

const fetchAllProperties = async (
  params: PropertyQueryParams = {}
): Promise<PaginatedResponse<TPropertyItem>> => {
  const queryParams = new URLSearchParams();

  // if (params.paginate) queryParams.append("paginate", "true");
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.size) queryParams.append("size", params.size.toString());
  if (params.search) queryParams.append("search", params.search);
  if (params.type) queryParams.append("type", params.type);
  if (params.is_active !== undefined)
    queryParams.append("is_active", params.is_active.toString());

  const url = `/inventory/property-options${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  const res = await APIAxios.get(url);
  return res.data;
};

export const useGetAllProperties = (params: PropertyQueryParams = {}) => {
  return useQuery({
    queryKey: ["GET_ALL_PROPERTIES", params],
    queryFn: () => fetchAllProperties(params),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
