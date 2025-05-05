import React, { useState } from 'react';
import { Controller, useFieldArray, UseFormWatch, Control, UseFormSetValue, FieldErrors } from "react-hook-form";
import { TrashIcon, XIcon } from 'lucide-react';

import { useGetCategories, useGetProducts, useGetProductsInventory, useGetStockInventory } from '@/app/(dashboard)/inventory/misc/api';
import { Checkbox, FormControl, FormField, FormItem, Input, SelectSingleCombo, Button } from '@/components/ui';



import { NewOrderFormValues } from "../utils/schema";
import OrderFormMiscellaneous from './OrderFormMiscellaneous';
import StockItemFormEnquiry from '../../enquiries/misc/components/StockItemFormEnquiry';
import OrderFormProductInventorySelector from './OrderFormProductInventorySelector';
import { TProductInventoryItem } from '@/app/(dashboard)/inventory/misc/types/products';
import { TStockInventoryItem } from '@/app/(dashboard)/inventory/misc/types/stock';
import { formatCurrency } from '@/utils/currency';
import { cn } from '@/lib/utils';
import { useGetPropertyOptions } from '../api';
import CustomImagePicker from '@/app/(dashboard)/inventory/misc/components/CustomImagePicker';
import SelectMultiCombo from '@/components/ui/selectMultipleSpecialCombo';
import ProductSelector from './ProductSelector';


interface OrderItemsSectionProps {
    control: Control<NewOrderFormValues>;
    watch: UseFormWatch<NewOrderFormValues>;
    setValue: UseFormSetValue<NewOrderFormValues>;
    register: any;
    errors: FieldErrors<NewOrderFormValues>;
    index: number;
    addNewItem: () => void

}
type TOrderFormItem = NewOrderFormValues['items']


export interface TFormItemSelectionOption {
    id: number;
    name: string;
    variation: string;
    stock_inventory_id: number;
    product_image?: string;
}


const OrderItemsSection: React.FC<OrderItemsSectionProps> = ({
    control,
    watch,
    setValue,
    register,
    errors,
    index,
    addNewItem

}) => {
    const { data: categories, isLoading: categoriesLoading } = useGetCategories();
    const { data: products, isLoading: productsLoading, isFetching: productsFetching } = useGetProducts({
        category: watch(`items.${index}.category`)
    });

    const { data: propertyOptions, isLoading: isLoadingPropertyOptions } = useGetPropertyOptions()


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
    const isProductInventory = matchedCategory?.name !== 'Cake' && matchedCategory?.name !== 'Flower' && matchedCategory?.name !== 'Cupcake' && matchedCategory?.name !== 'Combo';
    const isComboItem = matchedCategory?.name === 'Combo';



    const watchedItems = watch("items");
    const watchedItemAtIndex = watch(`items.${index}`)
    const isCustomOrder = watch(`items.${index}.is_custom_order`)
    const watchedInventories = watch(`items.${index}.inventories`)

    const { data: productsInvetories, isLoading: productInventoriesLoading, isFetching: productInventoriesFetching, error: productsError, refetch: refetchProductsInventory } = useGetProductsInventory({
        page: 1,
        size: 20000000000000,
        category: Number(watchedItems[index]?.category),
        branch: watch('branch'),
    });

    const { data: stockInvetories, isLoading: stockLoading, isFetching: stockFetching, error: stockError, refetch: refetchStockInventory } = useGetStockInventory({
        page: 1,
        size: 20000000000000,
        category: Number(watchedItems[index]?.category),
    });
    const handleProductVariationChange = (selectedItems: Array<TFormItemSelectionOption & { quantity: number }>) => {
        const newInventories = selectedItems.reduce((acc: any[], item) => {
            const existingInventory = acc.find(inv => inv.stock_inventory_id === item.stock_inventory_id);
            if (existingInventory) {
                existingInventory.variations.push({
                    stock_variation_id: item.id,
                    quantity: item.quantity
                });
            } else {
                acc.push({
                    stock_inventory_id: item.stock_inventory_id,
                    variations: [{
                        stock_variation_id: item.id,
                        quantity: item.quantity
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
            category: product.category.name
        }))
    ) || [];


   const calcucateStockItemAmount = React.useCallback((items: TOrderFormItem, inventories: TStockInventoryItem[]) => {
        const item = items?.[0];
        if (!item) return 0;
        const miscellaneous = item.miscellaneous || [];
        const miscCost = miscellaneous.reduce((acc, misc) => acc + misc.cost, 0);
        const allProperties = [
            item?.properties?.bouquet,
            item?.properties?.layers,
            item?.properties?.glass_vase,
            item?.properties?.toppings,
            item?.properties?.whipped_cream_upgrade,
        ]
        const propertiesCost = allProperties.reduce((acc, item) => {
            const findItemPrice = parseInt(propertyOptions?.data.find(prop => prop.id.toString() == item)?.selling_price || '0')
            return acc + findItemPrice
        }, 0)


        if (!item.category || !item.inventories) {
            return 0;
        } else {
            const inventoriesIds = item.inventories?.map(inv => inv?.stock_inventory_id);
            const allInventoriesSelected = inventoriesIds.every(inv => inv !== undefined);
            if (!allInventoriesSelected) {
                return 0;
            } else {
                const itemInventories = inventories?.filter(inv => inventoriesIds.includes(inv.id));

                const selectedVariations = items.map(item => item.inventories.map(inv => inv?.variations?.map(variation => {
                    const selected = itemInventories?.flatMap(inv =>
                        inv.variations.find(varr => variation.stock_variation_id == varr.id)
                    );
                    return { id: variation.stock_variation_id, quantity: variation.quantity, cost_price: selected?.[0]?.cost_price || 0 };
                }))).flat(2);

                console.log("selectedVariations", selectedVariations);
                console.log("form items", item);

                const totalVariationCost = selectedVariations.reduce((acc, variation) => {
                    return acc + (Number(variation?.cost_price || '0') * (variation?.quantity || 1));
                }, 0);

                return ((totalVariationCost + propertiesCost) * item.quantity) + miscCost;
            }
        }
    }, [watchedItemAtIndex]);

    const calculateProductItemAmount = React.useCallback((items: TOrderFormItem, inventories: TProductInventoryItem[]) => {
        const item = items?.[0];
        if (!item) return 0;
        const miscellaneous = item.miscellaneous || [];
        const miscCost = miscellaneous.reduce((acc, misc) => acc + misc.cost, 0);
        const allProperties = [
            item?.properties?.bouquet,
            item?.properties?.layers,
            item?.properties?.glass_vase,
            item?.properties?.toppings,
            item?.properties?.whipped_cream_upgrade,
        ]
        console.log(allProperties, "PROPS")
        const propertiesCost = allProperties.reduce((acc, item) => {
            const findItemPrice = parseInt(propertyOptions?.data.find(prop => prop.id.toString() == item)?.selling_price.toString() || '0')
            console.log(findItemPrice, "PRICES")
            return acc + findItemPrice
        }, 0)

        return miscCost + propertiesCost
    }, [watchedItemAtIndex])


    const [mockFlavor, setMockFlavor] = useState<Array<{ name: string; quantity: number }>>([]);
    const [mockSize, setMockSize] = useState<string>('')


    return (

        <>

            {
                !!watchedItemAtIndex &&
                <div className="rounded-md mb-10">
                    <div className="flex items-center gap-2 mb-4 ">
                        <div className='flex items-center justify-center px-4 py-1.5 bg-yellow-500 max-w-max'>
                            Item {index + 1}
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setValue(`items.${index}.is_custom_order`, !isCustomOrder)
                            }}
                            className={cn('flex items-center justify-center px-3 py-1.5 bg-[#FFC600] text-[#111827] hover:opacity-90 max-w-max')}
                        >
                            {
                                watchedItemAtIndex?.is_custom_order ?
                                    "+ Regular Order" :
                                    "+ Custom Order"
                            }

                        </button>
                        <button
                            onClick={() => deleteItems(index)}
                            className={cn('flex items-center justify-center px-3 py-1.5 bg-red-500 text-white max-w-max')}
                        >
                            <TrashIcon size={20} />
                            <span className="sr-only">
                                Remove
                            </span>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
                        <Controller
                            name={`items.${index}.category`}
                            control={control}
                            render={({ field }) => (
                                <SelectSingleCombo
                                    {...field}
                                    value={field.value ? field.value.toString() : ''}
                                    label="Category"
                                    options={categories?.map(cat => ({ label: cat.name, value: cat.id.toString() })) || []}
                                    valueKey='value'
                                    labelKey="label"
                                    placeholder='Category'
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
                                <ProductSelector
                                    {...field}
                                    productId={field.value?.toString() || ''}
                                    variationId={watch(`items.${index}.product_variation_id`) || ''}
                                    setProductId={(value) => { setValue(`items.${index}.product_id`, Number(value)); }}
                                    setVariationId={(value) => setValue(`items.${index}.product_variation_id`, value)}
                                    options={products|| []}
                                    label="Product Name"
                                    disabled={!selectedCategory || (!productsLoading && !products?.length)}
                                    placeholder={
                                        (!productsLoading && !products?.length) ?
                                            'No products found' :
                                            selectedCategory ?
                                                'Select product' :
                                                'Select category first'
                                    }
                                    isLoadingOptions={productsLoading}
                                    hasError={!!errors.items?.[index]?.product_id}
                                    errorMessage={errors.items?.[index]?.product_id?.message}
                                />
                            )}
                        />

                        {
                            selectedCategory &&
                            <>

                                {/* /////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////                    STOCK INVENTORY                 //////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////// */}
                                {

                                    isStockInventory &&
                                    <>
                                      


                                        {
                                            (categoryName === 'Cake' || categoryName === 'Cupcake') && (
                                                <>
                                                    <SelectSingleCombo
                                                        name="size"
                                                        options={[
                                                            { name: "6 Inches", value: "6" },
                                                            { name: "8 Inches", value: "8" },
                                                            { name: "10 Inches", value: "10" }
                                                        ]}
                                                        isLoadingOptions={isLoadingPropertyOptions}
                                                        label="Size"
                                                        labelKey={'name'}
                                                        valueKey="value"
                                                        value={mockSize}
                                                        onChange={setMockSize}
                                                        placeholder="Select size"
                                                        allowDisselect

                                                    />
                                                </>
                                            )
                                        }
                                        {
                                            categoryName === 'Cake' && (
                                                <>

                                                    <Controller
                                                        name={`items.${index}.properties.layers`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <SelectSingleCombo
                                                                options={propertyOptions?.data.filter(option => option.type === 'LAYER').map(option => ({ label: option.name, value: option.id, amount: option.selling_price })) || []}
                                                                isLoadingOptions={isLoadingPropertyOptions}
                                                                label="Layers"
                                                                labelKey={(item) => `${item.label} (${formatCurrency(item.amount, 'NGN')})`}
                                                                valueKey="value"
                                                                placeholder="Select layers"
                                                                {...field}
                                                                allowDisselect
                                                                hasError={!!errors.items?.[index]?.properties?.layers}
                                                                errorMessage={errors.items?.[index]?.properties?.layers?.message as string}

                                                            />
                                                        )}
                                                    />
                                                    <div>
                                                        <SelectMultiCombo
                                                            name="flavour"
                                                            options={[
                                                                { name: "Chocolate", value: "Chocolate" },
                                                                { name: "Vanilla", value: "Vanilla" },
                                                                { name: "Red Velvet", value: "Red Velvet" },
                                                            ]}
                                                            onChange={(new_values) => setMockFlavor((prev) => {
                                                                const newFlavors = new_values.filter(
                                                                    (flavor) => !prev.some((item) => item.name === flavor)
                                                                );

                                                                const updatedFlavors = prev.filter((item) =>
                                                                    new_values.includes(item.name)
                                                                );

                                                                return [
                                                                    ...updatedFlavors,
                                                                    ...newFlavors.map((flavor) => ({ name: flavor, quantity: 1 })),
                                                                ];
                                                            })}
                                                            value={mockFlavor.map((item) => item.name)}
                                                            isLoadingOptions={isLoadingPropertyOptions}
                                                            label="Flavour"
                                                            labelKey="name"
                                                            valueKey="value"
                                                            placeholder="Select flavour"
                                                            showValues={false}
                                                        />
                                                        <div className="flex items-center gap-x-4 gap-y-1.5 flex-wrap">

                                                            {
                                                                mockFlavor.map((item, index) => (
                                                                    <div key={index} className="flex items-center gap-2 mt-2 bg-primary text-white px-2 py-1 rounded-md">
                                                                        <span>{item.name}</span>
                                                                        <input
                                                                            type="number"
                                                                            value={item.quantity}
                                                                            onChange={(e) => {
                                                                                const newQuantity = parseInt(e.target.value);
                                                                                if (newQuantity >= 1) {
                                                                                    setMockFlavor((prev) =>
                                                                                        prev.map((flavor, i) =>
                                                                                            i === index ? { ...flavor, quantity: newQuantity } : flavor
                                                                                        )
                                                                                    );
                                                                                }
                                                                            }}
                                                                            className="w-16 border border-none outline-none !p-0 px-1 rounded-sm !h-6 text-xs text-primary appearance-none"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setMockFlavor((prev) =>
                                                                                    prev.filter((_, i) => i !== index)
                                                                                );
                                                                            }}
                                                                            className="text-white hover:text-red-500"
                                                                        >
                                                                            <XIcon size={15} />
                                                                        </button>
                                                                    </div>

                                                                ))
                                                            }
                                                        </div>

                                                    </div>


                                                    <Controller
                                                        name={`items.${index}.properties.toppings`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <SelectSingleCombo
                                                                options={propertyOptions?.data.filter(option => option.type === 'TOPPING').map(option => ({ label: option.name, value: option.id, selling_price: option.selling_price })) || []}
                                                                labelKey={(item) => `${item.label} (${formatCurrency(item.selling_price, 'NGN')})`}
                                                                isLoadingOptions={isLoadingPropertyOptions}
                                                                label="Topping"
                                                                valueKey="value"
                                                                placeholder="Select Topping"
                                                                {...field}
                                                                allowDisselect
                                                                hasError={!!errors.items?.[index]?.properties?.toppings}
                                                                errorMessage={errors.items?.[index]?.properties?.toppings?.message as string}

                                                            />
                                                        )}
                                                    />
                                                    <Controller
                                                        name={`items.${index}.properties.whipped_cream_upgrade`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <SelectSingleCombo
                                                                options={propertyOptions?.data.filter(option => option.type === 'WHIPPED_CREAM').map(option => ({ label: option.name, value: option.id, selling_price: option.selling_price })) || []}
                                                                labelKey={(item) => `${item.label} (${formatCurrency(item.selling_price, 'NGN')})`}
                                                                isLoadingOptions={isLoadingPropertyOptions}
                                                                label="Whipped Cream Upgrade"
                                                                valueKey="value"
                                                                placeholder="Select Whipped Cream"
                                                                {...field}
                                                                allowDisselect
                                                                hasError={!!errors.items?.[index]?.properties?.whipped_cream_upgrade}
                                                                errorMessage={errors.items?.[index]?.properties?.whipped_cream_upgrade?.message as string}

                                                            />
                                                        )}
                                                    />


                                                </>

                                            )
                                        }
                                        {
                                            categoryName === 'Flower' && (
                                                <>
                                                    <Controller
                                                        name={`items.${index}.properties.bouquet`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <SelectSingleCombo
                                                                options={propertyOptions?.data.filter(option => option.type === 'BOUQUET').map(option => ({ label: option.name, value: option.id, selling_price: option.selling_price })) || []}
                                                                labelKey={(item) => `${item.label} (${formatCurrency(item.selling_price, 'NGN')})`}
                                                                isLoadingOptions={isLoadingPropertyOptions}
                                                                label="Size"
                                                                valueKey="value"
                                                                placeholder="Select bouquet"
                                                                {...field}
                                                                hasError={!!errors.items?.[index]?.properties?.bouquet}
                                                                errorMessage={errors.items?.[index]?.properties?.bouquet?.message as string}

                                                            />
                                                        )}
                                                    />


                                                    <Controller
                                                        name={`items.${index}.properties.glass_vase`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <SelectSingleCombo
                                                                options={propertyOptions?.data.filter(option => option.type === 'GLASS_VASE').map(option => ({ label: option.name, value: option.id, selling_price: option.selling_price })) || []}
                                                                labelKey={(item) => `${item.label} (${formatCurrency(item.selling_price, 'NGN')})`}
                                                                isLoadingOptions={isLoadingPropertyOptions}
                                                                label="Vase"
                                                                valueKey="value"
                                                                placeholder="Select vase"
                                                                {...field}
                                                                hasError={!!errors.items?.[index]?.properties?.glass_vase}
                                                                errorMessage={errors.items?.[index]?.properties?.glass_vase?.message as string}

                                                            />
                                                        )}
                                                    />


                                                </>

                                            )
                                        }


                                        <FormField
                                            control={control}
                                            name={`items.${index}.inventories.${0}.instruction`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            label="Instruction"
                                                            placeholder='Enter instruction'
                                                            {...field}
                                                            hasError={!!errors.items?.[index]?.inventories?.[0]?.instruction}
                                                            errorMessage={errors.items?.[index]?.inventories?.[0]?.instruction?.message}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        {
                                            (categoryName === 'Cake' || categoryName === 'Cupcake') &&
                                            <FormField
                                                control={control}
                                                name={`items.${index}.inventories.${0}.message`}
                                                render={({ field }) => (
                                                    <FormItem className='col-span-full'>
                                                        <FormControl>
                                                            <Input
                                                                label="Message on Cake"
                                                                placeholder='Enter message'
                                                                {...field}
                                                                hasError={!!errors.items?.[index]?.inventories?.[0]?.message}
                                                                errorMessage={errors.items?.[index]?.inventories?.[0]?.message as string}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        }


                                    </>

                                }


                                {/* /////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////                    PRODUCT INVENTORY                 //////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////// */}
                                {/* /////////////////////////////////////////////////////////////////////////////////// */}
                                {
                                    !isStockInventory && !isComboItem && fields.map((_, invIndex) => (
                                        <React.Fragment key={invIndex}>
                                            {
                                                watchedInventories.map((_, invIndex) =>

                                                    <React.Fragment key={invIndex}>
                                                        <OrderFormProductInventorySelector
                                                            inventoryId={watch(`items.${index}.inventories.${invIndex}.product_inventory_id`)}
                                                            setInventoryId={(inventoryId) => {
                                                                setValue(`items.${index}.inventories.${invIndex}.product_inventory_id`, inventoryId);
                                                            }}
                                                            options={productsInvetories?.data!}
                                                            disabled={productInventoriesLoading || (!productInventoriesLoading && !productsInvetories?.data.length)}
                                                            isLoadingOptions={productInventoriesLoading}
                                                            isFetchingOptions={productInventoriesFetching}
                                                            errorMessage={errors.items?.[index]?.inventories?.[invIndex]?.product_inventory_id?.message}
                                                            hasError={!!errors.items?.[index]?.inventories?.[invIndex]?.product_inventory_id}
                                                        />

                                                        <FormField
                                                            control={control}
                                                            name={`items.${index}.inventories.${0}.instruction`}
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

                                                    </React.Fragment>
                                                )
                                            }
                                        </React.Fragment>

                                    ))
                                }
                            </>
                        }

                        {
                            isCustomOrder &&
                            <CustomImagePicker
                                control={control}
                                name={`items.${index}.custom_image`}
                                errors={errors}
                                hasError={!!errors.items?.[index]?.custom_image}
                                errorMessage={errors.items?.[index]?.custom_image?.message as string}
                            />
                        }

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

                    </div>


                    <OrderFormMiscellaneous
                        index={index}
                        control={control}
                        register={register}
                        errors={errors}
                    />



                    <footer className="flex items-center justify-between border-t pt-2 mt-4">
                        <p className='flex items-center gap-1.5 font-semibold text-2xl text-custom-blue'>

                            <span>Amount: </span>
                            <span>
                                {
                                    formatCurrency(
                                        isStockInventory ?
                                            calcucateStockItemAmount([watch(`items.${index}`)], stockInvetories?.data!)
                                            :
                                            isProductInventory ?
                                                calculateProductItemAmount([watch(`items.${index}`)], productsInvetories?.data!)
                                                :
                                                0, "NGN")
                                }
                            </span>
                        </p>

                        {

                        }
                        <Button
                            // variant="outline"
                            onClick={addNewItem}
                            type="button"
                        >
                            + Add Item
                        </Button>
                    </footer>
                </div>
            }
        </>

    );
};

export default OrderItemsSection;

