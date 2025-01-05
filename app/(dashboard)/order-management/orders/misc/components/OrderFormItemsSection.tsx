import React from 'react';
import { Controller, useFieldArray, UseFormWatch, Control, UseFormSetValue } from "react-hook-form";
import { TrashIcon } from 'lucide-react';

import { SelectSingleCombo } from "@/components/ui";
import { useGetCategories, useGetProducts } from '@/app/(dashboard)/inventory/misc/api';

import StockItemFormOrder from "./StockItemFormOrder";
import ProductItemFormOrder from './ProductItemFormOrders';
import { NewOrderFormValues } from '../utils/schema';
import OrderFormMiscellaneous from './OrderFormMiscellaneous';


interface OrderFormItemsSectionProps {
    control: Control<NewOrderFormValues>;
    watch: UseFormWatch<NewOrderFormValues>;
    setValue: UseFormSetValue<NewOrderFormValues>;
    register: any;
    errors: any;
    index: number;
    removeItem: () => void;

}

const OrderFormItemsSection: React.FC<OrderFormItemsSectionProps> = ({
    control,
    watch,
    setValue,
    register,
    errors,
    index,
    removeItem

}) => {
    const { data: categories, isLoading: categoriesLoading, isFetching: isFetchingCategories } = useGetCategories();
    const { data: products, isLoading: productsLoading, isFetching: isFetchingProducts } = useGetProducts({
        category: watch(`items.${index}.category`)
    });


    const { fields, append, remove } = useFieldArray({
        control,
        name: `items.${index}.inventories`
    });
    const selectedCategory = watch(`items.${index}.category`);
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




    return (
        <div className="rounded-md mb-10">
            <div className="flex items-center gap-2 mb-4 ">

                <div
                    className='flex items-center justify-center px-4 py-1.5 bg-yellow-500 max-w-max'
                >
                    Item {index + 1}
                </div>
                <button
                    onClick={removeItem}
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
                            disabled={!selectedCategory || (!productsLoading && !isFetchingProducts && !products?.length)}
                            placeholder={
                                (!productsLoading && !products?.length) ?
                                    'No products found' :
                                    selectedCategory ?
                                        'Select product' :
                                        'Select category first'
                            }
                            onChange={(value) => field.onChange(parseInt(value))}
                            isLoadingOptions={productsLoading || isFetchingProducts}
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
                                const newQuantity = watch('items')?.[index]?.quantity - 1;
                                if (newQuantity >= 1) {
                                    setValue(`items.${index}.quantity`, newQuantity);
                                }
                            }}
                            className="flex items-center justify-center border border-[#0F172B] text-lg text-center p-2 leading-3"
                        >
                            -
                        </button>
                        <span className="w-9 text-center">
                            {watch('items')?.[index]?.quantity}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                const newQuantity = watch('items')?.[index]?.quantity + 1;
                                setValue(`items.${index}.quantity`, newQuantity);
                            }}
                            className="flex items-center justify-center border border-[#0F172B] text-lg text-center p-2 leading-3"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            {
                selectedCategory && <>
                    {
                        isStockInventory && fields.map((_, invIndex) => (
                            <StockItemFormOrder
                                setValue={setValue}
                                control={control}
                                watch={watch}
                                errors={errors}
                                index={index}
                                key={invIndex}
                                categoryName={matchedCategory?.name || ''}
                            />
                        ))
                    }
                    {
                        !isStockInventory && !isComboItem && fields.map((_, invIndex) => (
                            <ProductItemFormOrder
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


            <OrderFormMiscellaneous
                index={index}
                control={control}
                register={register}
                errors={errors}
            />
        </div>
    );
};

export default OrderFormItemsSection;

