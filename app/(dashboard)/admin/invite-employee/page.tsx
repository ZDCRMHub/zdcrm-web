"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { FaDotCircle } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SuccessModal } from '@/components/ui';
import { useBooleanStateControl } from "@/hooks";

const InviteEmployeePage = () => {

  const {
    state: isSuccessModalOpen,
    setTrue: openSuccessModal,
    setFalse: closeSuccessModal,
  } = useBooleanStateControl()


  return (
    <section className="mt-7 mx-10 rounded-xl bg-white border-[1px] border-[#0F172B1A]">
      <div className="border-b-[1px] border-[#E0E0E0] pl-6 pt-9 pb-5 relative">
        <p className="font-medium">Invite New Employee</p>
        <div className="bg-[#194A7A] w-[156px] h-[3px] absolute bottom-0" />
      </div>
      <div className="mx-6 my-10 bg-[#FCFCFC] h-auto flex flex-col gap-16 items-center pt-[73px] pb-[52px]">
        <div className="flex flex-col gap-2 items-center">
          <FaDotCircle color="#2463EB" />
          <p className="font-semibold">Employee Details</p>
          <p className="text-[#194A7A]">Please provide employee’s details</p>
        </div>
        <div className="flex flex-col gap-4 w-[392px] bg-white px-4 py-6 mb-">
          <Input
            type="text"
            className="h-16"
            placeholder="Enter employee's name"
          />
          <Input
            type="email"
            className="h-16"
            placeholder="Enter email address"
          />
          <Select>
            <SelectTrigger className="h-16">
              <SelectValue placeholder="Select Role" className="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-[#194A7A]">
                  Select Role
                </SelectLabel>
                <SelectItem value="branch-manager">Branch Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="digital-marketer">
                  Digital Marketer
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex flex-col gap-6">
            <p className="text-sm text-center mt-14">
              Recipient will receive an invite email notification and must
              accept notification prompt on or before 3days
            </p>
            <Button className="h-14 flex gap-4 bg-[#090909] rounded-xl text-[18px] px-7"  onClick={openSuccessModal}>
              Invite
            </Button>
          </div>
        </div>
      </div>

      <SuccessModal
        isModalOpen={isSuccessModalOpen}
        closeModal={closeSuccessModal}
        heading='New Invitation Sent Successfully'
      />
    </section>
  );
};

export default InviteEmployeePage;
