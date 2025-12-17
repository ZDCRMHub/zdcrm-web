import { get } from "@/utils/axios";
import { orderUrl } from "@/constants/apiUrls";
import type { FinancialSummary, PartPaymentStats, PaymentStatusStats } from "@/types/finacialStatistics.types";
import { buildQuery } from "@/utils/functions";
import { FetchOptions } from "@/types/apiResponse.types";

export const getFinancialStats = async (params?: FetchOptions) => {
    const queryString = buildQuery({
        ...params,
        branch: params?.branch === "all" ? undefined : params?.branch,
    });

    const response = await get<FinancialSummary>(
        orderUrl.getFinancialStats(queryString)
    );

    return response.data;
};

export const getPaymentStatusStats = async (params?: FetchOptions) => {
    const queryString = buildQuery({
        ...params,
        branch: params?.branch === "all" ? undefined : params?.branch,
    });

    const response = await get<PaymentStatusStats>(
        orderUrl.getPaymentStatusStats(queryString)
    );

    return response.data;
};

export const getPartPaymentStats = async (params?: FetchOptions) => {
    const queryString = buildQuery({
        ...params,
        branch: params?.branch === "all" ? undefined : params?.branch,
    });

    const response = await get<PartPaymentStats>(
        orderUrl.getPartPaymentStats(queryString)
    );

    return response.data;
};




