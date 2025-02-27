
export interface TDiscountItem {
  id: number;
  type: string;
  amount: string;
  is_active: boolean;
  create_date?: string;
  update_date?: string;
}

export interface DiscountPaginatedResponse<T> {
    data: TDiscountItem[];
    next_page: number | null;
    previous_page: number | null;
    number_of_pages: number;
    count: number;
  }
  
  export interface DiscountsQueryParams {
    paginate?: boolean;
    page?: number;
    size?: number;
  }