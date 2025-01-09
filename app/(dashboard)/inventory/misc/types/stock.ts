export interface TStockInventoryItem {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
      create_date: string;
      update_date: string;
    };
    description: string;
    image_one: string;
    image_two: string;
    image_three: string;
    created_by: number;
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
    last_updated_by: number;
    create_date: string;
    update_date: string;
  }