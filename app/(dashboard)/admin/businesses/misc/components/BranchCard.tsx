import { CiShop } from "react-icons/ci";
import Image from "next/image";
import { Edit } from "iconsax-react";
import { Button, LinkButton } from "@/components/ui";
import { CaretRightIcon } from "@/icons/sidebar";
import { CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { TBranch } from "../api/getBusinessBranches";
import BranchEditSheet from "./BranchEditSheet";
import { useState } from "react";

type BranchCardProp = {
  branch: TBranch
  business_id: string
};

const BranchCard = ({ branch, business_id }: BranchCardProp) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <div className="bg-[#F2F2F2] w-full border border-solid border-[#E1E1E1] rounded-[4px] p-3">
      <header className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-[#F4F4F4] rounded-[4px]">
            <CiShop size={24} />
          </div>
          <p>{branch.name}</p>
        </div>

        <section className="flex">
          <div>
            <p className="text-xs text-[#AAAEB0] italic font-extralight">
              Address
            </p>
            <div className="flex justify-between">
              {branch.address}
            </div>
          </div>
         
        </section>
      </header>
      <div className="h-[1px] w-full bg-[#E1E1E1CC] my-3" />

      <button className="flex items-center gap-1 text-[#111827] font-medium">
        <Edit size={15} />
        <button onClick={() => setIsEditOpen(true)} className="ml-1">Edit</button>
      </button>
      <BranchEditSheet open={isEditOpen} onOpenChange={(v) => setIsEditOpen(Boolean(v))} branch={branch} onSuccess={() => {}} />
    </div>
  );
};

export default BranchCard;
