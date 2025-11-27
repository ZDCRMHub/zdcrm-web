
export const orderUrl = {
    getFinancialStats: (queryString = "") =>
        `/order/financial-stats/${queryString}`,
};

export const inventoryUrl = {
    getInventoryChart: (queryString = "") =>
        `/inventory/alerts/${queryString}`,
}

export const businessUrl = {
    getAllBranches: () =>
        `/business/branches/list`,
}