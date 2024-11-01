import React from 'react';
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";



import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { NewOrderFormValues } from '../utils/schema';
import { Label } from '@/components/ui/label';

function OrderItemCardAdditionalItems({
  index,
  control,
  register,
  errors,
}: {
  index: number;
  control: Control<NewOrderFormValues>;
  register: UseFormRegister<NewOrderFormValues>;
  errors: FieldErrors<NewOrderFormValues>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items.${index}.additionalItems`,
  });

  return (
    <div className="space-y-2 max-w-3xl mt-4">
      <Label>
        Miscellaneous
      </Label>
      {fields.map((field, k) => {
        return (
          <div key={field.id} className="grid grid-cols-[1fr,1fr,max-content] items-center space-x-2 w-full">
            <Input
              {...register(`items.${index}.additionalItems.${k}.name`)}
              placeholder="Enter miscellaneous"
              hasError={!!errors.items?.[index]?.additionalItems?.[k]?.name}
              errorMessage={errors.items?.[index]?.additionalItems?.[k]?.name?.message}
            />
            {/* <Input
              {...register(`items.${index}.additionalItems.${k}.quantity`, {
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Quantity"
              hasError={!!errors.items?.[index]?.additionalItems?.[k]?.quantity}
              errorMessage={errors.items?.[index]?.additionalItems?.[k]?.quantity?.message}
            /> */}
            <Input
              {...register(`items.${index}.additionalItems.${k}.cost`)}
              placeholder="Cost"
              hasError={!!errors.items?.[index]?.additionalItems?.[k]?.cost}
              errorMessage={errors.items?.[index]?.additionalItems?.[k]?.cost?.message}
            />
            <Button type="button" onClick={() => remove(k)} size="icon" variant="outline">
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
      <Button
        type="button"
        onClick={() => append({ name: "", cost: "" })}
        size="sm"
        variant="ghost"
        className="bg-white text-xs"
      >
        <Plus className="h-4 w-4 mr-2" />
        {
          fields.length === 0 ? "Add Item" : "Add More"
        }
      </Button>
    </div>
  );
}

export default OrderItemCardAdditionalItems