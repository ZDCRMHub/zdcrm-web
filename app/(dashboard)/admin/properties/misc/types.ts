export interface TPropertyItem {
  id: number;
  name: string;
  type: string;
  type_display: string;
  cost_price: string;
  selling_price: string;
  is_active: boolean;
  create_date: string;
  update_date: string;
}

export interface PaginatedResponse<T> {
  data: TPropertyItem[];
  next_page: number | null;
  previous_page: number | null;
  number_of_pages: number;
  count: number;
}

export interface PropertyQueryParams {
  paginate?: boolean;
  page?: number;
  size?: number;
  search?: string;
  type?: string;
  is_active?: boolean;
}
