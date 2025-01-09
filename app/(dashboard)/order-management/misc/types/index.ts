

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
  payment_proof: string | null;
  total_amount: string;
  delivery: TOrderDelivery;
  items: TOrderItem[];
  discussions: TOrderDiscussion[];
  create_date: string;
  update_date: string;
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
}

interface TOrderInventory {
  id: number;
  stock_inventory: Stockinventory;
  product_inventory: null;
  quantity_used: string | number | null;
  message: string;
  instruction: string | null;
  properties: Property[];
  variations: any[];
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

interface TOrderDelivery {
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