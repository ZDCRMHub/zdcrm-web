import { TBranch, TCategory } from ".";

export interface TStockInventoryItem {
  id: number;
  name: string;
  category: TCategory;
  branch: TBranch;
  image_one: string;
  image_two: null;
  image_three: null;
  inventory_number: string;
  created_by: Createdby;
  create_date: string;
  update_date: string;
  variations: TStockVariation[];
}

export interface TStockVariation {
  id: number;
  is_active: boolean;
  size: string | null;
  layer: string | null;
  max_flowers: number | null;
  cost_price: string;
  selling_price: string;
  quantity: number;
  recently_updated_by: Createdby;
  color: string | null;
  flavour: string;
  max_quantity_required: number;
  minimum_quantity_required: number;
  location: string;
  quantity_sold: number;
  last_updated_by: number;
  create_date: string;
  update_date: string;
}

export interface Createdby {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: null;
}
