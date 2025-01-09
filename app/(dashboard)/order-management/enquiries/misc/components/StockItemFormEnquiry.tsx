import React from 'react'
import { Control, Controller, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { Checkbox, FormControl, FormField, FormItem, Input, SelectSingleCombo } from '@/components/ui';
import { useGetStockInventory } from '@/app/(dashboard)/inventory/misc/api';
import { PRODUCT_TYPES_OPTIONS } from '@/constants';
import { Label } from '@radix-ui/react-label';

import { NewEnquiryFormValues } from '../utils/schema';
import StockItemSelector from './StockItemSelector';



const EnquiryDetailsInventoriesForm = ({
  index,
  control,
  watch,
  setValue,
  errors,
  categoryName
}: {
  index: number;
  control: Control<NewEnquiryFormValues>;
  watch: UseFormWatch<NewEnquiryFormValues>;
  setValue: UseFormSetValue<NewEnquiryFormValues>;
  errors: FieldErrors<NewEnquiryFormValues>;
  categoryName: string;
}) => {
  const watchedItems = watch("items");
  const watchedInventories = watch(`items.${index}.inventories`)

  const { data: stockInvetories, isLoading: stockLoading, isFetching: stockFetching, error: stockError, refetch: refetchStockInventory } = useGetStockInventory({
    page: 1,
    size: 20000000000000,
    category: Number(watchedItems[index].category),
  });


  return (

    <div key={index} className="mt-4 border-t pt-4">
      {
        watchedInventories.map((_, invIndex) =>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 mb-8" key={invIndex}>
            <StockItemSelector
              inventoryId={watch(`items.${index}.inventories.${invIndex}.stock_inventory_id`)}
              setInventoryId={(inventoryId) => {
                setValue(`items.${index}.inventories.${invIndex}.stock_inventory_id`, inventoryId);
              }}
              hasError={!!errors.items?.[index]?.inventories?.[invIndex]?.stock_inventory_id}
              errorMessage={errors.items?.[index]?.inventories?.[invIndex]?.stock_inventory_id?.message as string}
              setVariations={(variations) => {
                setValue(`items.${index}.inventories.${invIndex}.variations`, variations);
              }}
              options={stockInvetories?.data!}
              disabled={stockLoading || (!stockLoading && !stockInvetories?.data.length)}
              isLoadingOptions={stockLoading}
              isFetchingOptions={stockFetching}

            />


            {
              categoryName === 'Cake' && (
                <>

                  <Controller
                    name={`items.${index}.inventories.${invIndex}.properties.layers`}
                    control={control}
                    render={({ field }) => (
                      <SelectSingleCombo
                        options={
                          PRODUCT_TYPES_OPTIONS.Cakes.layers
                        }
                        label="Layers"
                        valueKey="value"
                        labelKey="label"
                        placeholder="Select layers"
                        {...field}
                        hasError={!!errors.items?.[index]?.inventories?.[invIndex]?.properties?.layers}
                        errorMessage={errors.items?.[index]?.inventories?.[invIndex]?.properties?.layers?.message as string}

                      />
                    )}
                  />

                  <Controller
                    name={`items.${index}.inventories.${invIndex}.properties.toppings`}
                    control={control}
                    render={({ field }) => (
                      <SelectSingleCombo
                        options={
                          PRODUCT_TYPES_OPTIONS.Cakes.toppings
                        }
                        label="Topping"
                        valueKey="value"
                        labelKey="label"
                        placeholder="Select Topping"
                        {...field}
                        hasError={!!errors.items?.[index]?.inventories?.[invIndex]?.properties?.toppings}
                        errorMessage={errors.items?.[index]?.inventories?.[invIndex]?.properties?.toppings?.message as string}

                      />
                    )}
                  />

                  <Controller
                    name={`items.${index}.inventories.${invIndex}.properties.whipped_cream_upgrade`}
                    control={control}
                    render={({ field }) => (
                      <Label htmlFor="Whipped Cream Upgrade" className='flex flex-col gap-4'>
                        <span className='text-sm text-[#0F172B] font-poppins font-medium'>
                          Whipped Cream Upgrade
                        </span>
                        <Checkbox
                          id="Whipped Cream Upgrade"
                          value={field.value ? 'true' : 'false'}
                          className='h-7 w-7'
                          iconClass="h-5 w-5"
                          onCheckedChange={(value) => field.onChange(value)}
                        />
                      </Label>
                    )}
                  />
                </>

              )
            }


            <FormField
              control={control}
              name={`items.${index}.inventories.${invIndex}.instruction`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Instruction"
                      placeholder='Enter instruction'
                      {...field}
                      hasError={!!errors.items?.[index]?.inventories?.[invIndex]?.instruction}
                      errorMessage={errors.items?.[index]?.inventories?.[invIndex]?.instruction?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`items.${index}.inventories.${invIndex}.message`}
              render={({ field }) => (
                <FormItem className='col-span-2 xl:col-span-3'>
                  <FormControl>
                    <Input
                      label="Message"
                      placeholder='Enter message'
                      {...field}
                      hasError={!!errors.items?.[index]?.inventories?.[invIndex]?.message}
                      errorMessage={errors.items?.[index]?.inventories?.[invIndex]?.message as string}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

          </div>
        )
      }
    </div>

  )
}

export default EnquiryDetailsInventoriesForm