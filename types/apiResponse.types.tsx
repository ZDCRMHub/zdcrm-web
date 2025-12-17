export interface ApiResponse<T> {
    success: boolean;
    message: string;
    status: number;
    data: T;
    // meta: Meta;
}

export interface FetchOptions {
    page?: number;
    size?: number;
    branch?: string;
    period?: "today" | "week" | "month" | "year" | "custom";
    date_from?: string;
    date_to?: string;
}