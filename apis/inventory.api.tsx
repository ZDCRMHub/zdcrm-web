import { inventoryUrl } from "@/constants/apiUrls";
import { InventoryChartOptions } from "@/types/inventory.type";
import { get } from "@/utils/axios";
import { buildQuery } from "@/utils/functions";



export const getInventoryChart = async (params?: InventoryChartOptions) => {
    const queryString = buildQuery({
        ...params,
        branch: params?.branch === "all" ? undefined : params?.branch,
    });

    const response = await get(
        inventoryUrl.getInventoryChart(queryString)
    );

    return response;
};