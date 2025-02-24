
export interface TDispatchItem {
  id: number;
  state: string;
  location: string;
  delivery_price: string;
  create_date?: string;
  update_date?: string;
}

export interface DispatchPaginatedResponse<T> {
    data: TDispatchItem[];
    next_page: number | null;
    previous_page: number | null;
    number_of_pages: number;
    count: number;
  }
  
  export interface DispatchQueryParams {
    paginate?: boolean;
    page?: number;
    size?: number;
  }