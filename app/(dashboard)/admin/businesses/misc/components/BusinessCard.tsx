
import { CiShop } from "react-icons/ci";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { TBusiness } from "../api/getAllBusinesses";


type BusinessCardProp = {
   
    business: TBusiness
  };

  const BusinessCard = ({ business }: BusinessCardProp) => {
    const { id, name, country, country_display } = business;
    return (
      <Link href={`/admin/businesses/${id}`} className="block w-[264px] border border-solid rounded-[4px] p-4">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-[#F4F4F4] rounded-[4px]">
            <CiShop size={24} />
          </div>
          <p>{name}</p>
        </div>
        <div className="h-[1px] w-full bg-[#E1E1E1CC] my-[18px]" />
        <div>
          <p className="text-xs text-[#AAAEB0] italic font-extralight">Country</p>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Image
                src={`/flags/${country_display}.svg`}
                alt={country}
                width={30}
                height={20}
              />
              <p className="italic font-extralight">{country}</p>
            </div>
            <FaChevronRight color="#8D8080" />
          </div>
        </div>
      </Link>
    );
  };

  export default BusinessCard;