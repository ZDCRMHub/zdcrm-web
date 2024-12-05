"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { CiSearch, CiShop } from "react-icons/ci";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { SuccessModal } from "@/components/ui";
import { useBooleanStateControl } from "@/hooks";
import { useGetAllBranches } from "./misc/api";

type BranchCardProp = {
  name: string;
  country: string;
};

const BranchCard = ({ name, country }: BranchCardProp) => {
  const { data } = useGetAllBranches()

  return (
    <div className="w-[264px] border border-solid rounded-[4px] p-4">
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
              src="/img/Nigeria - NG.svg"
              alt="Nigeria"
              width={30}
              height={20}
            />
            <p className="italic font-extralight">{country}</p>
          </div>
          <FaChevronRight color="#8D8080" />
        </div>
      </div>
    </div>
  );
};

const BranchPage = () => {
  const {
    state: isSuccessModalOpen,
    setTrue: openSuccessModal,
    setFalse: closeSuccessModal,
  } = useBooleanStateControl();

  const {
    state: isAddBranchModalOpen,
    setTrue: openAddBranchModal,
    setFalse: closeAddBranchModal,
  } = useBooleanStateControl();

  return (
    <section className="w-[910px] h-auto mx-auto mt-32 flex flex-col gap-16">
      <div className="text-center">
        <p>Welcome Admin!</p>
        <p className="text-2xl font-medium">Create & Manage Branches</p>
      </div>
      <div className="p-8 bg-white flex flex-col gap-12">
        <div className="relative mx-auto w-[457px]">
          <Input
            type="search"
            placeholder="Search"
            className="h-11 w-[457px]"
          />
          <CiSearch
            size={20}
            color="#111827"
            className="absolute top-[35%] right-[24px]"
          />
        </div>
        <div className="flex gap-6">
          <BranchCard name="Prestige Flowers" country="Nigeria" />
          <BranchCard name="Zuzu Delights" country="Nigeria" />
          <div
            className="bg-[#DFDFDF] w-[264px] rounded-lg flex justify-center items-center cursor-pointer"
            onClick={openAddBranchModal}
          >
            <GoPlus size={24} />
          </div>
          <Dialog open={isAddBranchModalOpen}>
            <DialogContent className="flex flex-col gap-8 w-[520px] px-[75px] py-8">
              <DialogClose
                onClick={closeAddBranchModal}
                className="absolute right-[75px]"
              >
                <IoIosClose size={24} />
              </DialogClose>
              <FaArrowLeftLong
                className="cursor-pointer"
                onClick={closeAddBranchModal}
              />
              <DialogHeader className="">
                <DialogTitle className="text-2xl">Add a New Branch</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-8">
                <div className="">
                  <Label htmlFor="name" className="text-sm">
                    Name
                  </Label>
                  <Input id="name" className="" />
                </div>
                <div className="">
                  <Label htmlFor="country" className="text-sm">
                    Select Country
                  </Label>
                  <Input id="country" className="" />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-[#17181C] mt-7 mb-3 w-full p-6 h-[70px] rounded-[10px]"
                  onClick={() => {
                    closeAddBranchModal();
                    openSuccessModal();
                  }}
                >
                  Add New Branch
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <SuccessModal
        isModalOpen={isSuccessModalOpen}
        closeModal={closeSuccessModal}
        heading="Branch Added Successfully"
        subheading="New Branch Added"
      />
    </section>
  );
};

export default BranchPage;
