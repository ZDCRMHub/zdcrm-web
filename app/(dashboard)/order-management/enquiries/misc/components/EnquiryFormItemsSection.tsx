import React from 'react';
import { Controller, useFieldArray, UseFormWatch, Control, UseFormSetValue } from "react-hook-form";
import { TrashIcon } from 'lucide-react';

import { useGetCategories, useGetProducts, useGetStockInventory } from '@/app/(dashboard)/inventory/misc/api';
import { Checkbox, FormControl, FormField, FormItem, Input, SelectSingleCombo } from '@/components/ui';


import { EnquiryItemCardAdditionalItems } from ".";
import StockItemFormEnquiry from "./StockItemFormEnquiry";
import { NewEnquiryFormValues } from "../utils/schema";
import ProductItemFormEnquiry from './ProductItemFormEnquiry';
import { PRODUCT_TYPES_OPTIONS } from '@/constants';
import { Label } from '@/components/ui/label';


interface EnquiryItemsSectionProps {
    control: Control<NewEnquiryFormValues>;
    watch: UseFormWatch<NewEnquiryFormValues>;
    setValue: UseFormSetValue<NewEnquiryFormValues>;
    register: any;
    errors: any;
    index: number;

}
export interface TFormItemSelectionOption {
    id: number;
    name: string;
    variation: string;
    stock_inventory_id: number;
    product_image?: string;
}


const EnquiryItemsSection: React.FC<EnquiryItemsSectionProps> = ({
    control,
    watch,
    setValue,
    register,
    errors,
    index

}) => {
    const { data: categories, isLoading: categoriesLoading } = useGetCategories();
    const { data: products, isLoading: productsLoading } = useGetProducts({
        category: watch(`items.${index}.category`)
    });

    const { remove: deleteItems } = useFieldArray({
        control,
        name: `items`
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: `items.${index}.inventories`
    });
    const selectedCategory = watch(`items.${index}.category`);
    const categoryName = categories?.find(cat => cat.id === Number(selectedCategory))?.name || '';
    const matchedCategory = categories?.find(cat => cat.id === Number(selectedCategory));
    const isStockInventory = matchedCategory?.name === 'Cake' || matchedCategory?.name === 'Flower' || matchedCategory?.name === 'Cupcake';
    const isComboItem = matchedCategory?.name === 'Combo';

    React.useEffect(() => {
        setValue(`items.${index}.product_id`, 0);
        setValue(`items.${index}.inventories`, [{
            variations: [],
            properties: {}
        }]);
    }, [index, selectedCategory, setValue]);


    const watchedItems = watch("items");
    const watchedInventories = watch(`items.${index}.inventories`)

    const { data: stockInvetories, isLoading: stockLoading, isFetching: stockFetching, error: stockError, refetch: refetchStockInventory } = useGetStockInventory({
        page: 1,
        size: 20000000000000,
        category: Number(watchedItems[index].category),
    });
    const handleProductVariationChange = (selectedItems: TFormItemSelectionOption[]) => {
        const newInventories = selectedItems.reduce((acc: any[], item) => {
            const existingInventory = acc.find(inv => inv.stock_inventory_id === item.stock_inventory_id);
            if (existingInventory) {
                existingInventory.variations.push({
                    stock_variation_id: item.id,
                    quantity: 1
                });
            } else {
                acc.push({
                    stock_inventory_id: item.stock_inventory_id,
                    variations: [{
                        stock_variation_id: item.id,
                        quantity: 1
                    }],
                    properties: {}
                });
            }
            return acc;
        }, []);
        if (newInventories.length == 0) {
            newInventories.push({
                variations: [],
                properties: {}
            });
        }
        setValue(`items.${index}.inventories`, newInventories);
    };

    const productVariations = stockInvetories?.data?.flatMap(product =>
        product.variations.map(variation => ({
            id: variation.id,
            stock_inventory_id: product.id,
            product_image: product.image_one,
            name: product.name,
            variation: variation.size || variation.color || variation.flavour,
        }))
    ) || [];

    return (
        <div className="rounded-md mb-10">
            <div className="flex items-center gap-2 mb-4 ">

                <div
                    className='flex items-center justify-center px-4 py-1.5 bg-yellow-500 max-w-max'
                >
                    Item {index + 1}
                </div>
                <button
                    onClick={() => deleteItems(index)}
                    className='flex items-center justify-center px-3 py-1.5 bg-red-500 text-white max-w-max'
                >
                    <TrashIcon size={20} />
                    <span className="sr-only">
                        Remove
                    </span>
                </button>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 mb-8">
                <Controller
                    name={`items.${index}.category`}
                    control={control}
                    render={({ field }) => (
                        <SelectSingleCombo
                            {...field}
                            value={field.value ? field.value.toString() : ''}
                            label="Item Category"
                            options={categories?.map(cat => ({ label: cat.name, value: cat.id.toString() })) || []}
                            valueKey='value'
                            labelKey="label"
                            placeholder='Item category'
                            onChange={(value) => field.onChange(parseInt(value))}
                            isLoadingOptions={categoriesLoading}
                            hasError={!!errors.items?.[index]?.category}
                            errorMessage={errors.items?.[index]?.category?.message}
                        />
                    )}
                />
                <Controller
                    name={`items.${index}.product_id`}
                    control={control}
                    render={({ field }) => (
                        <SelectSingleCombo
                            {...field}
                            value={field.value ? field.value.toString() : ''}
                            options={products?.map(prod => ({ label: prod.name, value: prod.id.toString() })) || []}
                            valueKey='value'
                            labelKey="label"
                            label="Product Type"
                            disabled={!selectedCategory || (!productsLoading && !products?.length)}
                            placeholder={
                                (!productsLoading && !products?.length) ?
                                    'No products found' :
                                    selectedCategory ?
                                        'Select product' :
                                        'Select category first'
                            }
                            onChange={(value) => field.onChange(parseInt(value))}
                            isLoadingOptions={productsLoading}
                            hasError={!!errors.items?.[index]?.product_id}
                            errorMessage={errors.items?.[index]?.product_id?.message}
                        />
                    )}
                />
                <div>
                    <label htmlFor="">Quantity</label>
                    <div className="flex items-center justify-start gap-2 h-14">
                        <button
                            type="button"
                            onClick={() => {
                                const newQuantity = watch('items')?.[index].quantity - 1;
                                if (newQuantity >= 1) {
                                    setValue(`items.${index}.quantity`, newQuantity);
                                }
                            }}
                            className="flex items-center justify-center border border-[#0F172B] text-lg text-center p-2 leading-3"
                        >
                            -
                        </button>
                        <span className="w-9 text-center">
                            {watch('items')?.[index].quantity}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                const newQuantity = watch('items')?.[index].quantity + 1;
                                setValue(`items.${index}.quantity`, newQuantity);
                            }}
                            className="flex items-center justify-center border border-[#0F172B] text-lg text-center p-2 leading-3"
                        >
                            +
                        </button>
                    </div>
                </div>
                {
                    selectedCategory &&
                    <>
                        {
                            isStockInventory &&
                            <>
                                < StockItemFormEnquiry
                                    options={productVariations}
                                    onChange={handleProductVariationChange}
                                    label="Product and Variation"
                                    disabled={!selectedCategory || (!productsLoading && !products?.length)}
                                    placeholder={
                                        (!productsLoading && !products?.length) ?
                                            'No products found' :
                                            selectedCategory ?
                                                'Select product and variation' :
                                                'Select category first'
                                    }
                                    isLoadingOptions={productsLoading}
                                />

                                {
                                    fields.map((_, invIndex) => (
                                        <div className="col-span-full">
                                            <h4 className="px-4 py-1 bg-custom-blue text-white max-w-max">
                                                {stockInvetories?.data?.find(inv => inv.id === watchedInventories[invIndex]?.stock_inventory_id)?.name || ''}
                                            </h4>
                                            <div className="grid grid-cols-2 xl:grid-cols-3 gap-10">

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
                                                    <FormItem className='col-span-2'>
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
                                        </div>
                                    ))
                                }
                            </>

                        }
                        {
                            !isStockInventory && !isComboItem && fields.map((_, invIndex) => (
                                <ProductItemFormEnquiry
                                    setValue={setValue}
                                    control={control}
                                    watch={watch}
                                    errors={errors}
                                    index={index}
                                    selectedBranch={watch('branch')}
                                    categoryName={matchedCategory?.name || ''}
                                    key={invIndex}
                                />
                            ))
                        }
                    </>
                }



            </div>


            <EnquiryItemCardAdditionalItems
                index={index}
                control={control}
                register={register}
                errors={errors}
            />
        </div>
    );
};

export default EnquiryItemsSection;

