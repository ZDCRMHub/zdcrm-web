import React from 'react';
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";



import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { ConvertibleEnquiryFormValues, NewEnquiryFormValues } from '../utils/schema';
import { Label } from '@/components/ui/label';

function EnquiryFormMiscellaneous({
  index,
  control,
  register,
  errors,
}: {
  index: number;
  control: Control<NewEnquiryFormValues>;
  register: UseFormRegister<NewEnquiryFormValues>;
  errors: FieldErrors<NewEnquiryFormValues>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items.${index}.miscellaneous`,
  });

  return (
    <div className="space-y-2 max-w-3xl mt-5">
      <Label className="block">
        Add-Ons
      </Label>
      {
        fields.map((field, k) => {
          return (
            <div key={field.id} className="grid grid-cols-[1fr,1fr,max-content] items-center space-x-2 w-full">
              <Input
                {...register(`items.${index}.miscellaneous.${k}.description`)}
                placeholder="Name"
                className="!h-12"
                hasError={!!errors.items?.[index]?.miscellaneous?.[k]?.description}
                errorMessage={errors.items?.[index]?.miscellaneous?.[k]?.description?.message}
              />

              <Input
                {...register(`items.${index}.miscellaneous.${k}.cost`, { valueAsNumber: true })}
                placeholder="Cost"
                className="!h-12"
                pattern="^[0-9]*$"
                hasError={!!errors.items?.[index]?.miscellaneous?.[k]?.cost}
                errorMessage={errors.items?.[index]?.miscellaneous?.[k]?.cost?.message}
              />
              <Button type="button" onClick={() => remove(k)} size="icon" variant="outline">
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      <Button
        type="button"
        onClick={() => append({ description: "", cost: 0 })}
        size="sm"
        variant="ghost"
        className="bg-white text-xs"
      >
        <Plus className="h-4 w-4 mr-2" />
        {
          fields.length === 0 ? "Add Add-On Item" : "Add More"
        }
      </Button>
    </div>
  );
}

export default EnquiryFormMiscellaneous