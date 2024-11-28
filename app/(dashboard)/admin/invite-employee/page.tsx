"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
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
import { SelectSingleCombo, SuccessModal } from "@/components/ui";
import { useBooleanStateControl } from "@/hooks";
import { useGetRoles, UseSendInviteToEmployee } from "./misc/api";


const inviteEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string({
    message: "Role is required",
  }),
});

type InviteEmployeeFormData = z.infer<typeof inviteEmployeeSchema>;

const InviteEmployeePage = () => {
  const {
    state: isSuccessModalOpen,
    setTrue: openSuccessModal,
    setFalse: closeSuccessModal,
  } = useBooleanStateControl();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm<InviteEmployeeFormData>({
    resolver: zodResolver(inviteEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });
  const { data, isLoading: isLoadingRoles } = useGetRoles()
  const { mutate } = UseSendInviteToEmployee()

  const onSubmit = (data: InviteEmployeeFormData) => {
    mutate({
      role: data.role,
      email: data.email
    }, {
      onSuccess(data, variables, context) {
        console.log("Form Submitted:", data);
        openSuccessModal();
        reset();
      },
    })
  };

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-[392px] bg-white px-4 py-6"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                className="h-16"
                placeholder="Enter employee's name"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                className="h-16"
                placeholder="Enter email address"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              // <Select
              //   onValueChange={field.onChange}
              //   value={field.value}
              // >
              //   <SelectTrigger className="h-16">
              //     <SelectValue placeholder="Select Role" />
              //   </SelectTrigger>
              //   <SelectContent>
              //     <SelectGroup>
              //       <SelectLabel className="text-[#194A7A]">
              //         Select Role
              //       </SelectLabel>
              //       <SelectItem value="branch-manager">
              //         Branch Manager
              //       </SelectItem>
              //       <SelectItem value="admin">Admin</SelectItem>
              //       <SelectItem value="digital-marketer">
              //         Digital Marketer
              //       </SelectItem>
              //     </SelectGroup>
              //   </SelectContent>
              // </Select>

              <SelectSingleCombo
                isLoadingOptions={isLoadingRoles}
                valueKey="name"
                labelKey="name"
                options={data!}
                onChange={(e) => setValue('role', e)}
                name="role"
                placeholder="Select role"
                value={watch('role')}

              />
            )}
          />
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}

          <div className="flex flex-col gap-6">
            <p className="text-sm text-center mt-14">
              Recipient will receive an invite email notification and must
              accept notification prompt on or before 3days
            </p>
            <Button
              type="submit"
              className="h-14 flex gap-4 bg-[#090909] rounded-xl text-[18px] px-7"
            >
              Invite
            </Button>
          </div>
        </form>
      </div>

      <SuccessModal
        isModalOpen={isSuccessModalOpen}
        closeModal={closeSuccessModal}
        heading="New Invitation Sent Successfully"
      />
    </section>
  );
};

export default InviteEmployeePage;
