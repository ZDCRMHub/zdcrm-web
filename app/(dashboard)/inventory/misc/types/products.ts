import { TBranch, TCategory } from ".";

export interface TProductInventoryItem {
  id: number;
  name: string;
  category: TCategory;
  branch: TBranch;
  image_one: string;
  cost_price: string;
  selling_price: string;
  quantity: number;
  inventory_number: string;
  created_by: Createdby;
  last_updated_by: Createdby | null;
  create_date: string;
  update_date: string;
  quantity_sold: number;
}

interface Createdby {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: null;
}