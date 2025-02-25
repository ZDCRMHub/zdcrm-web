import { APIAxios } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse, ProductsQueryParams, TProductItem } from "../types";

const fetchAllProducts = async (
  params: ProductsQueryParams = {}
): Promise<PaginatedResponse<TProductItem>> => {
  const queryParams = new URLSearchParams();

  if (params.paginate) queryParams.append("paginate", "true");
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.size) queryParams.append("size", params.size.toString());
  if (params.search) queryParams.append("search", params.search);
  if (params.category) queryParams.append("category", params.category);
  if (params.is_active !== undefined)
    queryParams.append("is_active", params.is_active.toString());

  const url = `/inventory/products${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  const res = await APIAxios.get(url);
  return res.data;
};

export const useGetAllProducts = (params: ProductsQueryParams = {}) => {
  return useQuery({
    queryKey: ["GET_ALL_PRODUCTS", params],
    queryFn: () => fetchAllProducts(params),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
