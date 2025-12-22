
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

export interface PaymentStatusStats {
    payment_option: string,
    payment_option_label: string,
    order_count: number,
    total_amount: string
}

export interface PartPaymentStats {
    balance_due: string
    order_count: number
    total_amount: string
    total_paid: string
}
