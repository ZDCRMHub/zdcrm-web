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
import { useCreateNewBusiness, useGetAllBusinesses } from "./misc/api";
import { BusinessFormData, businessSchema } from "./misc/utils/schemas";
import BusinessCard from "./misc/components/BusinessCard";

const BusinessPage = () => {
  const {
    state: isSuccessModalOpen,
    setTrue: openSuccessModal,
    setFalse: closeSuccessModal,
  } = useBooleanStateControl();

  const {
    state: isAddBusinessModalOpen,
    setTrue: openAddBusinessModal,
    setFalse: closeAddBusinessModal,
  } = useBooleanStateControl();

  const {
    data,
    isLoading,
    error,
    refetch: refetchBusinesses,
  } = useGetAllBusinesses();

  console.log(data, "BusinessES");
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: "",
      country: "",
      address: "",
      phone_number: "",
    },
  });

  const { mutate: createBusiness, isPending: isCreatingBusiness } =
    useCreateNewBusiness();
  const onSubmit = (data: BusinessFormData) => {
    console.log(data);
    createBusiness(data, {
      onSuccess: () => {
        closeAddBusinessModal();
        openSuccessModal();
        refetchBusinesses();
        reset();
      },
    });
  };

  const countries = [
    { label: "Nigeria", value: "NG" },
    { label: "Ghana", value: "GH" },
  ];

  return (
    <section className="w-[910px] h-auto mx-auto mt-32 flex flex-col gap-16">
      <div className="text-center">
        <p>Welcome Admin!</p>
        <p className="text-2xl font-medium">Create & Manage Businesses</p>
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
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner size={20} />
            </div>
          ) : error ? (
            <p>Error loading Businesses: {error.message}</p>
          ) : !isLoading && data?.data?.length === 0 ? (
            <p>No Businesses found</p>
          ) : (
            data?.data?.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))
          )}
          <div
            className="bg-[#DFDFDF] w-[264px] h-[180px] rounded-lg flex justify-center items-center cursor-pointer"
            onClick={openAddBusinessModal}
          >
            <GoPlus size={30} />
          </div>

          <Dialog
            open={isAddBusinessModalOpen}
            onOpenChange={closeAddBusinessModal}
          >
            <DialogContent className="flex flex-col gap-8 w-[520px]">
              <DialogHeader className="flex items-center gap-1">
                <DialogTitle className="text-2xl">
                  Add a New Business
                </DialogTitle>
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
                      placeholder="Enter Business Name"
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
                      label="Business Phone Number"
                      placeholder="Enter Phone Number"
                      id="phone_number"
                      {...field}
                      className="mt-2"
                      hasError={!!errors.phone_number}
                      errorMessage={errors?.phone_number?.message}
                    />
                  )}
                />

                <SelectSingleCombo
                  name="country"
                  options={countries}
                  placeholder="Select Country"
                  label="Select Country"
                  labelKey="label"
                  valueKey="value"
                  value={watch("country")}
                  onChange={(selectedOption) => {
                    setValue("country", selectedOption);
                  }}
                  hasError={!!errors.country}
                  errorMessage={errors?.country?.message}
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
                    Add New Business
                    {isCreatingBusiness && <Spinner className="ml-2" />}
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
        heading="Business Added Successfully"
        subheading="New Business Added"
      />
    </section>
  );
};

export default BusinessPage;
