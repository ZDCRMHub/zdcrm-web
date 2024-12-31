import { TBranch } from ".";

export interface TStoreInventoryItem {
    id: number;
    name: string;
    branch: TBranch;
    image_one: string;
    cost_price: string;
    quantity: number;
    created_by: number;
    create_date: string;
    update_date: string;
  }