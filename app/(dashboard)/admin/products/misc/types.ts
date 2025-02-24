import { TCategory } from "@/app/(dashboard)/inventory/misc/types";


export interface TProductItem {
  id: number;
  name: string;
  category: TCategory;
  selling_price: string;
  is_active: boolean;
  create_date: string;
  update_date: string;
}

export interface PaginatedResponse<T> {
    data: TProductItem[];
    next_page: number | null;
    previous_page: number | null;
    number_of_pages: number;
    count: number;
  }
  
  export interface ProductsQueryParams {
    paginate?: boolean;
    page?: number;
    size?: number;
    search?: string;
    category?: string;
    is_active?: boolean;
  }