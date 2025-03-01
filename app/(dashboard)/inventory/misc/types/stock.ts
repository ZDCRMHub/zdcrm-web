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
  size: string;
  color: string;
  flavour: string;
  selling_price: string;
  cost_price: string;
  quantity: number;
  quantity_sold: number;
  last_updated_by: number;
  create_date: string;
  update_date: string;
}



interface Variation {
  id: number;
  size: null | string;
  color: null | string;
  flavour: null;
  selling_price: string;
  cost_price: string;
  quantity: number;
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

