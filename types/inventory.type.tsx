export interface InventoryChartOptions {
    page?: number;
    size?: number;
    branch?: string;
}

export interface alert {
    inventory_id?: number | string;
    inventory_name?: string;
    quantity?: number | string;
    category?: string;
    branch?: string;
    location?: string;
    type?: string;
    variation_details?: string;
    [k: string]: any;
}

export interface BEInventoryItem {
    alerts: alert[];
    total_alerts: number;
};