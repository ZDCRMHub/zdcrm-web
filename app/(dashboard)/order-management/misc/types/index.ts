import { TProductCategory } from "@/app/(dashboard)/inventory/misc/types";


export interface TOrder {
  id: number;
  customer: Customer;
  created_by: Createdby;
  approved_by: Createdby | null;
  completed_by: Createdby | null;
  discount: any;
  order_number: string;
  enquiry_channel: string;
  enquiry_occasion: string;
  branch: Branch;  
  message: string;
  status: "PND" | "SOA" | "SOR" | "STD" | "COM" | "CAN";
  payment_status: string;
  payment_options: "not_paid_go_ahead" | "paid_website_card" | "paid_naira_transfer" | "paid_pos" | "paid_usd_transfer" | "paid_paypal" | "cash_paid" | "part_payment_cash" | "part_payment_transfer" | "paid_bitcoin" | "not_received_paid" | undefined;
  initial_amount_paid: number | null;
  payment_currency: string;
  payment_proof: string| null;
  payment_verified: boolean;
  amount_paid_in_usd: number | null;
  payment_receipt_name: string;
  total_production_cost: string;
  total_selling_price: string;
  total_amount: string;
  delivery: TOrderDeliveryInfo;
  items: Item[];
  discussions: TOrderDiscussion[];
  part_payments: any[];
  create_date: string;
  update_date: string;
}


interface Item {
  id: number;
  product: Product;
  product_variation: Productvariation;
  quantity: number;
  miscellaneous: Miscellaneou[];
  inventories: Inventory[];
  custom_image: null;
  create_date: string;
  update_date: string;
  price_at_order: string;
  is_sorted: boolean;
  properties: Property[];
}

interface Inventory {
  id: number;
  stock_inventory: Stockinventory | null;
  product_inventory: Stockinventory | null;
  message: string;
  instruction: string;
  variations: Variation[];
}

interface Variation {
  id: number;
  variation_details: Variationdetails;
  quantity: number;
  price_at_order: null;
  selling_price_at_order: null;
}

interface Variationdetails {
  id: number;
  size: string;
  color: string | null;
  flavour: string | null;
  quantity: number;
  last_updated_by: Createdby | number;
  create_date: string;
  update_date: string;
}

interface Stockinventory {
  id: number;
  name: string;
  category: TProductCategory;
  image_one: string | null;
  inventory_number: string;
}

interface Miscellaneou {
  id: number;
  description: string;
  cost: string;
}

export interface Productvariation {
  id: number;
  size: string;
  layer: string;
  max_flowers: null;
  cost_price: string;
  selling_price: string;
  quantity: number;
  recently_updated_by: Createdby;
}

interface Product {
  id: number;
  name: string;
  category: TProductCategory;
  image: string;
}



interface Createdby {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: null;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}


// 

export interface TOrderDiscussion {
  id: number;
  user: Createdby;
  message: string;
  create_date: string;
}
interface Item {
  id: number;
  product: Product;
  quantity: number;
  miscellaneous: Miscellaneou[];
  inventories: Inventory[];
  custom_image: null;
  create_date: string;
  update_date: string;
  price_at_order: string;
  is_sorted: boolean;
  properties: Property[];
}

interface Property {
  id: number;
  layers: PropertyItem | null;
  layers_cost_at_order: string | null;
  layers_selling_at_order: string | null;
  toppings: PropertyItem | null;
  toppings_cost_at_order: string | null;
  toppings_selling_at_order: string | null;
  glass_vase: PropertyItem | null;
  glass_vase_cost_at_order: string;
  glass_vase_selling_at_order: string;
  bouquet: PropertyItem | null;
  bouquet_cost_at_order: string;
  bouquet_selling_at_order: string;
  whipped_cream: PropertyItem | null;
  whipped_cream_cost_at_order: string | null;
  whipped_cream_selling_at_order: string | null;
}

interface PropertyItem {
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


export interface TOrderDeliveryInfo {
  id: number;
  zone: string;
  note: string;
  delivery_time: string;
  delivery_date: string;
  method: string;
  dispatch: Dispatch;
  address: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_alternative_phone: string;
  residence_type: string;
  status: "PENDING" | "DISPATCHED" | "DISPATCHED_CL" | "DELIVERED" | "DELIVERED_CL" | "CANCELLED";
  driver_name: string | null;
  driver_phone: string | null;
  tracking_link: string | null;
  delivery_platform: string | null;
  fee: string | null;
  is_custom_delivery: boolean;
}

interface Dispatch {
  id: number;
  state: string;
  location: string;
  delivery_price: string;
}

interface Branch {
  id: number;
  name: string;
  country: string;
  create_date: string;
  update_date: string;
}

interface Createdby {
  id: number;
  email: string;
  name: string;
  phone: string;
  image: null;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}