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
  created_by: number;
  create_date: string;
  update_date: string;
}

