export interface FinancialFetchOptions {
    page?: number;
    size?: number;
    branch?: string;
    period?: "today" | "week" | "month" | "year" | "custom";
    date_from?: string;
    date_to?: string;
}

export interface FinancialSummary {
    total_revenue?: string;
    total_production_cost?: string;
    total_inventory_cost?: string;
    total_misc_expenses?: string | null;
    total_delivery_fees?: string;
    total_delivery_expenses?: string | null;
    net_profit?: string;
    total_orders?: number;
    order_count?: number;
    items_sold?: number;
}