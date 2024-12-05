"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { CiSearch } from "react-icons/ci";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IoChevronUp } from "react-icons/io5";
import { useBooleanStateControl } from "@/hooks";
import { ConfirmDeleteModal } from "@/components/ui";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-label";
import { useGetAllUsers } from "./misc/api";

const memberDetails = [
  {
    memberID: "MEM001",
    name: "Akin Gold",
    email: "akingold@gmail.com",
    phoneNumber: "08012345678",
    dateCreated: "01 Mar 2023",
    //   role: "Credit Card",
    action: "Active",
  },
  {
    memberID: "MEM002",
    name: "Akin Gold",
    email: "akingold@gmail.com",
    phoneNumber: "08012345678",
    dateCreated: "01 Mar 2023",
    //   role: "Credit Card",
    action: "Active",
  },
  {
    memberID: "MEM003",
    name: "Akin Gold",
    email: "akingold@gmail.com",
    phoneNumber: "08012345678",
    dateCreated: "01 Mar 2023",
    //   role: "Credit Card",
    action: "Active",
  },
  {
    memberID: "MEM004",
    name: "Akin Gold",
    email: "akingold@gmail.com",
    phoneNumber: "08012345678",
    dateCreated: "01 Mar 2023",
    //   role: "Credit Card",
    action: "Active",
  },
  {
    memberID: "MEM005",
    name: "Akin Gold",
    email: "akingold@gmail.com",
    phoneNumber: "08012345678",
    dateCreated: "01 Mar 2023",
    //   role: "Credit Card",
    action: "Active",
  },
  {
    memberID: "MEM006",
    name: "Akin Gold",
    email: "akingold@gmail.com",
    phoneNumber: "08012345678",
    dateCreated: "01 Mar 2023",
    //   role: "Credit Card",
    action: "Active",
  },
  {
    memberID: "MEM007",
    name: "Akin Gold",
    email: "akingold@gmail.com",
    phoneNumber: "08012345678",
    dateCreated: "01 Mar 2023",
    //   role: "Credit Card",
    action: "Active",
  },
  {
    memberID: "MEM008",
    name: "Akin Gold",
    email: "akingold@gmail.com",
    phoneNumber: "08012345678",
    dateCreated: "01 Mar 2023",
    //   role: "Credit Card",
    action: "Active",
  },
];

const Page = () => {
  const {
    state: isConfirmDeleteModalOpen,
    setTrue: openConfirmDeleteModal,
    setFalse: closeConfirmDeleteModal,
  } = useBooleanStateControl()
  const { data } = useGetAllUsers()

  return (
    <section className="mt-7 pb-7 mx-10 rounded-xl bg-white border-[1px] border-[#0F172B1A] px-[118px] pt-[35px]">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium">Employee Management</h1>
          <p>Manage your employees and their account permissions here.</p>
        </div>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search what you need"
            className="h-14 w-[485px]"
          />
          <CiSearch
            size={20}
            color="#111827"
            className="absolute top-[30%] right-[24px]"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between items-start">
        <h2 className="text-2xl font-semibold">Team Members</h2>
        <div className="flex gap-2">
          <Button className="h-12 flex gap-4 bg-[#111827] rounded-[10px] text-sm px-6">
            Save Changes
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="h-12 flex gap-4 bg-transparent text-sm px-6 text-[#111827] border border-solid rounded-[10px]">
                Add Employee
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold pb-8">
                  Add New Employee
                </SheetTitle>
                <SheetDescription className="flex flex-col gap-3">
                  <Label htmlFor="em-name" className="text-[#111827]">
                    Employee Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="em-name" type="text" className="h-14" />
                  <Label htmlFor="em-email" className="text-[#111827]">
                    Employee Email <span className="text-red-500">*</span>
                  </Label>
                  <Input id="em-email" type="email" className="h-14" />
                </SheetDescription>
              </SheetHeader>
              <SheetFooter className="mt-20">
                <SheetClose asChild>
                  <Button
                    type="submit"
                    className="w-full bg-white text-black border border-solid h-14"
                  >
                    Cancel
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button type="submit" className="w-full bg-[#111827] h-14">
                    Create
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[22.9%]">Name</TableHead>
            <TableHead className="w-[22.9%]">Phone Number</TableHead>
            <TableHead className="w-[12.8%]">Created Date</TableHead>
            <TableHead className="">Role</TableHead>
            <TableHead className="w-[22.9%] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memberDetails.map((member) => (
            <TableRow key={member.memberID}>
              <TableCell className="font-medium">
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm">{member.email}</p>
                </div>
              </TableCell>
              <TableCell>{member.phoneNumber}</TableCell>
              <TableCell>{member.dateCreated}</TableCell>
              <TableCell className="text-right">
                <Select>
                  <SelectTrigger className="border-none">
                    <SelectValue placeholder="Select Role" className="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="branch-manager">
                        Branch Manager
                      </SelectItem>
                      <SelectItem value="marketer">Marketer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="delivery-rep">Delivery rep</SelectItem>
                      <SelectItem value="prod-team">Production Team</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right flex gap-[10px]">
                <Select>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select Action"
                      className={
                        member.action === "Active"
                          ? "bg-[#E7F7EF] text-[#0CAF60] border-none"
                          : "bg-[rgba(224,49,55,0.31)] text-[#E03137] border-none"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem className="" value="active">
                        Active
                      </SelectItem>
                      <SelectItem value="deactive">Deactivate</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="p-2 rounded-lg bg-[#2F78EE] flex items-center cursor-pointer">
                  <MdOutlineModeEdit color="#fff" size={20} />
                </div>
                <button className="p-2 rounded-lg bg-[#E03137] flex items-center cursor-pointer" onClick={openConfirmDeleteModal}>
                  <RiDeleteBin6Line color="#fff" size={20} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex justify-between items-center mt-6">
        <div>
          <Pagination className="flex justify-start">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-xs text-[#687588] ">Showing 1 to 8 of 8 entries</p>
          <Button className="flex gap-4 bg-transparent border border-solid border-[#F1F2F4] text-[#111827] rounded-[10px] text-sm px-[10px]">
            Show 8
            <IoChevronUp />
          </Button>
        </div>
      </div>


      <ConfirmDeleteModal
        isModalOpen={isConfirmDeleteModalOpen}
        closeModal={closeConfirmDeleteModal}
        deleteFn={() => { }}
        heading="Delete Employee Record"
        subheading="This action means employee record will automatically be removed."
        icon={<RiDeleteBin6Line className="bg-[#FFD4D6] p-2 rounded-2xl" color="#E03137" size={50} />}
      />
    </section>
  );
};

export default Page;
