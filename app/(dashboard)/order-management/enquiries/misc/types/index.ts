import { TBranch, TProductCategory } from "@/app/(dashboard)/inventory/misc/types";

export interface TEnquiry {
  id: number;
  customer: Customer;
  created_by: Createdby;
  finalized_by: Createdby;
  converted_by: Createdby;
  deleted_by: Createdby;
  enquiry_channel: string;
  social_media_details: string;
  enquiry_occasion: string;
  branch: TBranch;
  message: string;
  status: string;
  payment_status: string;
  payment_options: string;
  payment_currency: string;
  initial_amount_paid: string;
  amount_paid_in_usd: string;
  total_amount: string;
  payment_proof: string;
  items: Item[];
  discussions: TEnquiryDiscussion[];
  create_date: string;
  update_date: string;
}

export interface BaseUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: string | null;
}
export interface TEnquiryDiscussion {
  id: number;
  user: BaseUser;
  message: string;
  create_date: string;
  update_date: string;
}

export interface Item {
  id: number;
  product: Product;
  quantity: number;
  miscellaneous: any[];
  inventories: Inventory[];
  custom_image: null;
  create_date: string;
  update_date: string;
}

export interface Inventory {
  id: number;
  stock_inventory: Stockinventory | null;
  product_inventory: Productinventory | null;
  message: string;
  instruction: string;
  properties: Property[];
  variations: any[];
}

export interface Property {
  id: number;
  layers: string;
  toppings: string;
  glass_vase: null;
  whipped_cream_upgrade: null;
  bouquet: null;
}


interface Productinventory {
  id: number;
  name: string;
  category: TProductCategory;
  image_one: string | null;
  cost_price: string;
  inventory_number: string;
}


export interface Stockinventory {
  id: number;
  name: string;
  category: TProductCategory;
  image_one: string | null;
  inventory_number: string;
}

export interface Product {
  id: number;
  name: string;
  category: TProductCategory;
  create_date: string;
  update_date: string;
}



export interface Createdby {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: null;
  role: number;
  role_name: string;
  permissions: string[];
  is_active: boolean;
  create_date: string;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}