import { TProductCategory } from "@/app/(dashboard)/inventory/misc/types";

export interface TOrder {
  id: number;
  customer: Customer;
  created_by: Createdby;
  approved_by: Createdby;
  completed_by: Createdby;
  discount: null;
  order_number: string;
  enquiry_channel: string;
  enquiry_occasion: string;
  branch: Branch;
  message: string;
  status: string;
  payment_status: string;
  payment_options: string;
  payment_proof: null;
  total_production_cost: string;
  total_selling_price: null;
  delivery: TOrderDeliveryInfo;
  items: TOrderItem[];
  discussions: TOrderDiscussion[];
  create_date: string;
  update_date: string;
  part_payments: Partpayment[];
  initial_amount_paid: number
}


interface Partpayment {
  id: number;
  payment_options: string;
  payment_proof: string;
  payment_currency: string;
  amount_paid: string;
  payment_receipt_name: string;
  recorded_by: Createdby;
  create_date: string;
}


export interface TOrderDiscussion {
  id: number;
  user: Createdby;
  message: string;
  create_date: string;
}

interface TOrderItem {
  id: number;
  product: Product;
  quantity: number;
  miscellaneous: any[];
  inventories: TOrderInventory[];
  custom_image: string | null;
  create_date: string;
  update_date: string;
  price_at_order: string;
  is_sorted: boolean;  
  properties: Property[];
}


interface Variation {
  id: number;
  variation_details: Variationdetails;
  quantity: number;
  price_at_order: string;
}

interface Variationdetails {
  id: number;
  size: string | null;
  color: string | null;
  flavour: string;
  selling_price: string | null;
  cost_price: string;
  quantity: number;
  last_updated_by: number;
  create_date: string;
  update_date: string;
}
interface TOrderInventory {
  id: number;
  stock_inventory: Stockinventory;
  product_inventory: Productinventory | null;
  quantity_used: string | number | null;
  message: string;
  instruction: string | null;
  variations: Variation[];
}
interface Productinventory {
  id: number;
  name: string;
  category: TProductCategory;
  image_one: string | null;
  cost_price: string;
  inventory_number: string;
}

interface Property {
  id: number;
  layers: string;
  toppings: string;
  glass_vase: string;
  whipped_cream_upgrade: boolean;
  bouquet: string;
}

interface Stockinventory {
  id: number;
  name: string;
  category: Category;
  image_one: string | null;
  inventory_number: string;
}

interface Product {
  id: number;
  name: string;
  category: Category;
  create_date: string;
  update_date: string;
}

interface Category {
  id: number;
  name: string;
  type: string;
  create_date: string;
  update_date: string;
}


interface Dispatch {
  id: number;
  state: string;
  location: string;
  delivery_price: string;
}

export interface TOrderDeliveryInfo {
  id: number;
  zone: string;
  note: string | null;
  delivery_time: string;
  delivery_date: string;
  method: string;
  dispatch: Dispatch | null;
  address: string;
  recipient_name: string;
  recipient_phone: string;
  status: "PND" | "DIS" | "DSC" | "DEL" | "CAN";
  driver_name: string | null;
  driver_phone: string | null;
  delivery_platform: string | null;
  tracking_link: string | null;
  delivery_expense: string | null;
  
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
  image: string | null;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}