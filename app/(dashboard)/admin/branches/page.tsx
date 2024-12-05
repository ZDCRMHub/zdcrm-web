"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { CiSearch, CiShop } from "react-icons/ci";
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { SelectSingleCombo, Spinner, SuccessModal } from "@/components/ui";
import { useBooleanStateControl } from "@/hooks";
import { useCreateNewBranch, useGetAllBranches } from "./misc/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BranchFormData, branchSchema } from "./misc/utils/schemas";
import { BranchCard } from "./misc/components";



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

  const { data, isLoading, error, refetch: refetchBranches } = useGetAllBranches();

  console.log(data, "BRANCHES")
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }, watch,
    reset,
  } = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: "",
      country: "",
    },
  });

  const { mutate: createBranch, isPending: isCreatingBranch } = useCreateNewBranch();
  const onSubmit = (data: BranchFormData) => {
    console.log(data);
    createBranch(data, {
      onSuccess: () => {
        closeAddBranchModal();
        openSuccessModal();
        refetchBranches()
        reset();
      },

    })
  };

  // This is a mock list of countries. In a real application, you'd fetch this from an API or use a comprehensive list.
  const countries = [
    "Nigeria",
    "Ghana",
    "Kenya",
    "South Africa",
    "Egypt",
    "Morocco",
    "Ethiopia",
    "Tanzania",
    "Uganda",
    "Algeria",
  ];

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
        <div className="flex gap-6 flex-wrap">
          {
            isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner size={20} />
              </div>
            ) : error ? (
              <p>Error loading branches: {error.message}</p>
            ) :
              !isLoading && data?.data?.length === 0 ? (
                <p>No branches found</p>
              ) :
                (
                  data?.data?.map((branch: any) => (
                    <BranchCard
                      key={branch.id}
                      name={branch.name}
                      country={branch.country}
                    />
                  ))
                )}
          <div
            className="bg-[#DFDFDF] w-[264px] h-[180px] rounded-lg flex justify-center items-center cursor-pointer"
            onClick={openAddBranchModal}
          >
            <GoPlus size={30} />
          </div>





          <Dialog open={isAddBranchModalOpen} onOpenChange={closeAddBranchModal}>
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
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Name"
                      placeholder="Enter Branch Name"
                      id="name"
                      {...field}
                      className="mt-2"
                      hasError={!!errors.name}
                      errorMessage={errors?.name?.message}
                    />
                  )}
                />

                <SelectSingleCombo
                  name="country"
                  options={countries.map((country) => ({
                    label: country,
                    value: country,
                  }))}
                  placeholder="Select Country"
                  label="Select Country"
                  labelKey="label"
                  valueKey="value"
                  value={watch('country')}
                  onChange={(selectedOption) => {
                    setValue("country", selectedOption);
                  }}
                  hasError={!!errors.country}
                  errorMessage={errors?.country?.message}

                />

                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-[#17181C] mt-7 mb-3 w-full p-6 h-[70px] rounded-[10px]"
                  >
                    Add New Branch

                    {
                      isCreatingBranch  && <Spinner className="ml-2" />
                    }
                  </Button>
                </DialogFooter>
              </form>
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

