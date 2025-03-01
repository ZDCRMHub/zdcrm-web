import { TBranch } from ".";
import { Createdby } from "./stock";

export interface TStoreInventoryItem {
    id: number;
    name: string;
    branch: TBranch;
    image_one: string;
    cost_price: string;
    quantity: number;
    created_by: Createdby;
    create_date: string;
    update_date: string;
  }