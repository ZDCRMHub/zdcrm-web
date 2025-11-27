import { getInventoryChart } from "@/apis/inventory.api";
import { InventoryChartOptions } from "@/types/inventory.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";


export const useGetInventoryChartStats = (options: InventoryChartOptions = {}) => {
    return useQuery({
        queryKey: ["inventory-chart", options],
        placeholderData: keepPreviousData,
        queryFn: () => getInventoryChart(options),
    });
};