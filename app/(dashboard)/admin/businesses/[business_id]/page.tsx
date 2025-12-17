"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import {
  LinkButton,
  SelectSingleCombo,
  Spinner,
  SuccessModal,
} from "@/components/ui";
import { useBooleanStateControl } from "@/hooks";
import { useCreateNewBranch, useGetAllBranches } from "../misc/api";

import { BranchFormData, branchSchema } from "../misc/utils/schemas";
import { BranchCard } from "../misc/components";
import { useParams } from "next/navigation";
import { Back } from "iconsax-react";
import Link from "next/link";
import { useGetBusinessBranches } from "../misc/api/getBusinessBranches";
import { useGetBusinessDetails } from "../misc/api/getBusiness";

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

  const searchParams = useParams<{ business_id: string }>();
  const businessId = searchParams.business_id;
  const { data: businessDetails, isLoading: isLoadingBusinessDetails } = useGetBusinessDetails(businessId);
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    error,
    refetch: refetchBranches,
  } = useGetBusinessBranches({
    business_id: Number(businessId),
    page: 1,
    size: 100,
    search,
  });

  console.log(data, "BRANCHES");
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: createBranch, isPending: isCreatingBranch } =
    useCreateNewBranch();
  const onSubmit = (data: BranchFormData) => {
    console.log(data);
    createBranch(
      {
        ...data,
        business_id: Number(businessId),
      },
      {
        onSuccess: () => {
          closeAddBranchModal();
          openSuccessModal();
          refetchBranches();
          reset();
        },
      }
    );
  };

  console.log(errors, "ERRRORRS");

  const countries = [
    { label: "Nigeria", value: "NG" },
    { label: "Ghana", value: "GH" },
  ];

  return (
    <section className="w-[910px] h-auto mx-auto mt-32 flex flex-col gap-16">
      <div className="flex items-center gap-6 justify-center text-center">
        <LinkButton
          className="flex items-center gap-1"
          href="/admin/businesses"
          variant="light"
        >
          <Back />
          Back
        </LinkButton>
        <p className="text-2xl font-medium">{businessDetails?.data.name} Branches </p>
      </div>
      <div className="p-8 bg-white flex flex-col gap-12">
        <div className="relative mx-auto w-[457px]">
          <Input
            type="search"
            placeholder="Search"
            className="h-11 w-[457px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CiSearch
            size={20}
            color="#111827"
            className="absolute top-[35%] right-[24px]"
          />
        </div>
        <div className="flex flex-col gap-6 flex-wrap">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner size={20} />
            </div>
          ) : error ? (
            <p>Error loading branches: {error.message}</p>
          ) : !isLoading && data?.data?.length === 0 ? (
            <p>No branches found</p>
          ) : (
            data?.data?.map((branch) => (
              <BranchCard
                key={branch.id}
                business_id={businessId}
                branch={branch}
              />
            ))
          )}
          <div
            className="bg-[#DFDFDF] w-full h-[50px] rounded-lg flex justify-center items-center cursor-pointer"
            onClick={openAddBranchModal}
          >
            <GoPlus size={30} />
          </div>

          <Dialog
            open={isAddBranchModalOpen}
            onOpenChange={closeAddBranchModal}
          >
            <DialogContent className="flex flex-col gap-8 w-[520px]">
              <DialogHeader className="flex items-center gap-1">
                <DialogTitle className="text-2xl">Add a New Branch</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-8 p-8"
              >
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
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Phone Number"
                      placeholder="Enter Branch Phone Number"
                      id="phone_number"
                      {...field}
                      className="mt-2"
                      hasError={!!errors.phone_number}
                      errorMessage={errors?.phone_number?.message}
                    />
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Address"
                      placeholder="Enter Branch Address"
                      id="address"
                      {...field}
                      className="mt-2"
                      hasError={!!errors.address}
                      errorMessage={errors?.address?.message}
                    />
                  )}
                />

                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-[#17181C] mt-7 mb-3 w-full p-6 h-[70px] rounded-[10px]"
                  >
                    Add New Branch
                    {isCreatingBranch && <Spinner className="ml-2" />}
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
