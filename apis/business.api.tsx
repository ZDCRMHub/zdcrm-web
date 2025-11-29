import { businessUrl } from "@/constants/apiUrls";
import { AllBranchOptions } from "@/types/business.type";
import { get } from "@/utils/axios";

export const getAllBranches = async () => {
    const response = await get<AllBranchOptions[]>(
        businessUrl.getAllBranches()
    );

    return response.data;
};