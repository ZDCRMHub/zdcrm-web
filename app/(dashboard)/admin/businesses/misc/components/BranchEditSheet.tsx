"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectSingleCombo, Spinner } from "@/components/ui";
import { BranchFormData, branchSchema } from "../utils/schemas";
import { Controller as RHFController } from "react-hook-form";
import { useUpdateBranch } from "../api";

type BranchEditSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branch: any; // TBranch can be used if desired
  onSuccess?: () => void;
};

export default function BranchEditSheet({ open, onOpenChange, branch, onSuccess }: BranchEditSheetProps) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: branch?.name ?? "",
      address: branch?.address ?? "",
      phone_number: branch?.phone_number ?? "",
    }
  });

  React.useEffect(() => {
    reset({
      name: branch?.name ?? "",
      address: branch?.address ?? "",
      phone_number: branch?.phone_number ?? "",
    })
  }, [branch, reset]);

  const { mutate: updateBranch, isPending } = useUpdateBranch();

  const onSubmit = (data: BranchFormData) => {
    updateBranch({ id: branch.id, ...data }, {
      onSuccess: () => {
        onOpenChange(false);
        onSuccess && onSuccess();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-8 w-[520px]">
        <DialogHeader>
          <DialogTitle>Edit Branch</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input label="Name" placeholder="Enter Branch Name" {...field} hasError={!!errors.name} errorMessage={errors?.name?.message} />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input label="Address" placeholder="Enter Address" {...field} hasError={!!errors.address} errorMessage={errors?.address?.message} />
            )}
          />

          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <Input label="Phone Number" placeholder="Enter Phone Number" {...field} hasError={!!errors.phone_number} errorMessage={errors?.phone_number?.message} />
            )}
          />

          <DialogFooter>
            <Button type="submit" className="w-full">
              Save Changes {isPending && <Spinner className="ml-2" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
