import { get } from "@/utils/axios";
import { orderUrl } from "@/constants/apiUrls";
import type { FinancialFetchOptions, FinancialSummary } from "@/types/finacialStatistics.types";
import { buildQuery } from "@/utils/functions";

export const getFinancialStats = async (params?: FinancialFetchOptions) => {
    const queryString = buildQuery({
        ...params,
        branch: params?.branch === "all" ? undefined : params?.branch,
    });

    const response = await get<FinancialSummary>(
        orderUrl.getFinancialStats(queryString)
    );

    return response.data;
};




