import { CiShop } from "react-icons/ci";
import Image from "next/image";
import { Edit } from "iconsax-react";
import { Button, LinkButton } from "@/components/ui";
import { CaretRightIcon } from "@/icons/sidebar";
import { CaretRight } from "@phosphor-icons/react";
import Link from "next/link";

type BranchCardProp = {
  name: string;
  country: string;
};

const BranchCard = ({ name, country }: BranchCardProp) => {
  return (
    <div className="bg-[#F2F2F2] w-full border border-solid border-[#E1E1E1] rounded-[4px] p-3">
      <header className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-[#F4F4F4] rounded-[4px]">
            <CiShop size={24} />
          </div>
          <p>{name}</p>
        </div>

        <section className="flex">
          <div>
            <p className="text-xs text-[#AAAEB0] italic font-extralight">
              Country
            </p>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Image
                  src={`/flags/${country}.svg`}
                  alt={country}
                  width={30}
                  height={20}
                />
                <p className="italic font-extralight">{country}</p>
              </div>
            </div>
          </div>
          <Link href="/">
            <CaretRight className="ml-4" size={16} />
          </Link>
        </section>
      </header>
      <div className="h-[1px] w-full bg-[#E1E1E1CC] my-3" />

      <button className="flex items-center gap-1 text-[#111827] font-medium">
        <Edit size={15} /> Edit
      </button>
    </div>
  );
};

export default BranchCard;
