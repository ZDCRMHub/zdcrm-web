import { TBranch, TProductCategory } from "@/app/(dashboard)/inventory/misc/types";
import { TOrderDeliveryInfo } from "../../../misc/types";

export interface TEnquiry {
  id: number;
  customer: Customer;
  created_by: Createdby;
  finalized_by: Createdby | null;
  converted_by: Createdby | null;
  deleted_by: Createdby | null;
  enquiry_channel: string;
  social_media_details: string;
  enquiry_occasion: string;
  branch: TBranch;
  message: string;
  status: string;
  payment_status: string;
  payment_options: string;
  payment_currency: string;
  initial_amount_paid: string | null;
  amount_paid_in_usd: string | null;
  total_production_cost: string;
  total_selling_price: string;
  total_amount: string;
  payment_proof: string | null;
  payment_receipt_name: string | null;
  delivery: TOrderDeliveryInfo;
  items: Item[];
  discussions: TEnquiryDiscussion[];
  create_date: string;
  update_date: string;
}

export interface TEnquiryDiscussion {
  id: number;
  user: Createdby;
  message: string;
  create_date: string;
  update_date: string;
}

interface Item {
  id: number;
  product: Product;
  quantity: number;
  miscellaneous: Miscellaneou[];
  inventories: Inventory[];
  custom_image: string | null;
  create_date: string;
  update_date: string;
  properties: Property[];
}

interface Property {
  id: number;
  layers: Layers | null;
  toppings: Layers | null;
  glass_vase: Layers | null;
  whipped_cream: Layers | null;
  bouquet: Layers | null;
}

interface Layers {
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

interface Inventory {
  id: number;
  stock_inventory: Stockinventory | null;
  product_inventory: Productinventory | null;
  message: null | string;
  instruction: null | string;
  variations: Variation[];
}

interface Variation {
  id: number;
  variation_details: Variationdetails;
  quantity: number;
}

interface Variationdetails {
  id: number;
  size: string;
  color: string | null;
  flavour: string | null;
  selling_price: string;
  cost_price: string;
  quantity: number;
  last_updated_by: number;
  create_date: string;
  update_date: string;
}

interface Productinventory {
  id: number;
  name: string;
  category: TProductCategory;
  image_one: string;
  cost_price: string;
  inventory_number: string;
}

interface Stockinventory {
  id: number;
  name: string;
  category: TProductCategory;
  image_one: string;
  inventory_number: string;
}

interface Miscellaneou {
  id: number;
  description: string;
  cost: string;
}

interface Product {
  id: number;
  name: string;
  category: TProductCategory;
  selling_price: string;
  is_active: boolean;
  create_date: string;
  update_date: string;
}

interface Delivery {
 
}

interface Dispatch {
  id: number;
  state: string;
  location: string;
  delivery_price: string;
}
interface Createdby {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: string | null;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}