'use client'
import React from 'react'
import Image from 'next/image'
import { Controller, FieldErrors, useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Money, TruckTime } from 'iconsax-react'
import { Plus, Trash, Trash2, UserIcon } from 'lucide-react'

import {
    Accordion, AccordionContent, AccordionTrigger, AccordionItem, Input, SingleDatePicker, LinkButton, SelectSingleCombo, Button, Checkbox, ProductsDropdown, FilePicker, FormControl,
    FormField, FormItem, FormLabel, FormMessage,
    Form,
    TimePicker
} from '@/components/ui'
import { generateMockOrders } from '@/app/(dashboard)/order-timeline/misc/components/Timeline'
import { AllProducts, CATEGORIES_OPTIONS, DISPATCH_METHOD_OPTIONS, ENQUIRY_CHANNEL_OPTIONS, ENQUIRY_OCCASION_OPTIONS, PAYMENT_METHODS, PAYMENT_STATUS_OPTIONS, PRODUCT_TYPES_OPTIONS, } from '@/constants'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import { OrderItemCard, OrderItemCardAdditionalItems } from '../misc/components'
import { NewOrderFormValues, NewOrderSchema } from '../misc/utils/schema'





const NewOrderPage = () => {
    const form = useForm<z.infer<typeof NewOrderSchema>>({
        resolver: zodResolver(NewOrderSchema),
        defaultValues: {
            items: [{ 
                category: 'C', productType: '', quantity: 1, message: '', isEditing: true,
            }]
        }
    });
    const { register, handleSubmit, formState: { errors }, control, watch, setValue } = form;
    const AdditionalItemsFieldArray = (index: number) => {
        return useFieldArray({
            control,
            name: `items.${index}.additionalItems`
        });
    }
    const orderItemsField = useFieldArray({
        control,
        name: "items"
    });
    const { fields, append, remove } = orderItemsField;

    const watchFieldArray = watch("items");
    const isCustomDelivery = watch('isCustomDelivery');
    const controlledFields = fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray[index]
        };
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const addNewItem = () => {
        append({
            branch: 'Zuzu Delights', category: 'C', productType: '', quantity: 1, message: '', isEditing: true, whippedCreamUpgrade: '0',
            flavour: 'Vanilla', layers: '2', size: '6 inches', toppings: 'none', isCustomOrder: false
        });
    }
    const getFieldError = (errors: FieldErrors<NewOrderFormValues>, index: number, field: string) => {
        const itemErrors = errors.items?.[index] as FieldErrors<NewOrderFormValues['items'][number]> | undefined;
        return itemErrors?.[field as keyof typeof itemErrors];
    };




    return (
        <div className='px-8 md:pt-12 w-full md:w-[92.5%] max-w-[1792px] mx-auto'>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Accordion type="multiple" defaultValue={["customer-information", "order-information", "delivery-information", "order-Instruction", "payment-information"]} className='w-full'>

                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////                CUSTOMER INFORMATION                 ///////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        <AccordionItem value="customer-information">
                            <AccordionTrigger className="py-4 flex">
                                <div className="flex items-center gap-5 text-[#194A7A]">
                                    <div className='flex items-center justify-center p-1.5 h-10 w-10 rounded-full bg-[#F2F2F2]'>
                                        <UserIcon className='text-custom-blue' stroke="#194a7a" fill="#194a7a" size={18} />
                                    </div>
                                    <h3 className="text-custom-blue font-medium">Customer Information</h3>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='grid grid-cols-2 xl:grid-cols-3 gap-10 pt-8 pb-14 w-full'>
                                    <Input
                                        label="Customer's Name"
                                        hasError={!!errors.customerName?.message}
                                        errorMessage={errors.customerName?.message as string}
                                        placeholder='Enter customer name'
                                        {...register('customerName')}
                                    />
                                    <Input
                                        label="Customer's Phone Number"
                                        {...register('customerPhone')}
                                        hasError={!!errors.customerPhone}
                                        errorMessage={errors.customerPhone?.message as string}
                                        placeholder='Enter customer phone number'
                                    />
                                    <Input
                                        label="Recipient's Name"
                                        {...register('recipientName')}
                                        hasError={!!errors.recipientName}
                                        errorMessage={errors.recipientName?.message as string}
                                        placeholder='Enter recipient name'
                                    />
                                    <Input
                                        label="Recipient's Phone Number"
                                        {...register('recipientPhone')}
                                        hasError={!!errors.recipientPhone}
                                        errorMessage={errors.recipientPhone?.message as string}
                                        placeholder='Enter recipient name'
                                    />
                                    <FormField
                                        control={control}
                                        name="enquiryOccasion"
                                        render={({ field }) => (
                                            <FormItem>
                                                <SelectSingleCombo
                                                    options={ENQUIRY_OCCASION_OPTIONS}
                                                    valueKey="value"
                                                    label="Enquiry Occasion"
                                                    labelKey="label"
                                                    placeholder="Select enquiry occasion"
                                                    hasError={!!errors.enquiryOccasion}
                                                    errorMessage={errors.enquiryOccasion?.message as string}
                                                    {...field}
                                                />
                                            </FormItem>
                                        )}
                                    />

                                    <SelectSingleCombo
                                        options={ENQUIRY_CHANNEL_OPTIONS}
                                        label="Enquiry Channel"
                                        valueKey="value"
                                        labelKey="label"
                                        placeholder="Select enquiry channel"
                                        name='enquiryChannel'
                                        value={watch('enquiryChannel')}
                                        onChange={(value: string) => setValue('enquiryChannel', value)}

                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="delivery-information">
                            <AccordionTrigger className="py-4 flex">
                                <div className="flex items-center gap-5 text-[#194A7A]">
                                    <div className='flex items-center justify-center p-1.5 h-10 w-10 rounded-full bg-[#F2F2F2]'>
                                        <TruckTime className='text-custom-blue' stroke="#194a7a" size={18} />
                                    </div>
                                    <h3 className="text-custom-blue font-medium">Delivery Details</h3>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className='pt-5'>
                                <Input
                                    label="Delivery note"
                                    {...register('deliveryNote')}
                                    hasError={!!errors.deliveryNote}
                                    errorMessage={errors.deliveryNote?.message as string}
                                    placeholder='Enter delivery note'
                                />
                                <div className='grid grid-cols-2 xl:grid-cols-3 gap-10 pt-8 pb-14 w-full'>
                                    {
                                        !isCustomDelivery &&
                                        <FormField
                                            control={control}
                                            name="deliveryMethod"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <SelectSingleCombo
                                                        label="Delivery Method"
                                                        options={DISPATCH_METHOD_OPTIONS}
                                                        {...field}
                                                        valueKey={"value"}
                                                        labelKey={"label"}
                                                        placeholder="Select delivery method"
                                                        hasError={!!errors.deliveryMethod}
                                                        errorMessage={errors.deliveryMethod?.message as string}

                                                    />
                                                </FormItem>
                                            )}
                                        />
                                    }

                                    <FormField
                                        control={control}
                                        name="deliveryAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className=""
                                                        label="Delivery Address"
                                                        {...field}
                                                        hasError={!!errors.deliveryAddress}
                                                        errorMessage={errors.deliveryAddress?.message as string}
                                                        placeholder='Enter delivery address'
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="deliveryZone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <SelectSingleCombo
                                                    label="Delivery Zone"
                                                    options={[
                                                        { value: "Lagos Mainland (LM)", label: "Lagos Mainland (LM)" },
                                                        { value: "Lagos Central (LC)", label: "Lagos Central (LC)" },
                                                        { value: "Lagos Island (LI)", label: "Lagos Island (LI)" },
                                                    ]}
                                                    {...field}
                                                    valueKey={"value"}
                                                    labelKey={"label"}
                                                    placeholder="Select delivery zone"
                                                    hasError={!!errors.deliveryZone}
                                                    errorMessage={errors.deliveryZone?.message as string}
                                                />

                                            </FormItem>
                                        )}
                                    />

                                    {
                                        isCustomDelivery &&

                                        <FormField
                                            control={control}
                                            name="deliveryFee"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            className=""
                                                            label="Delivery Fee"
                                                            {...field}
                                                            hasError={!!errors.deliveryFee}
                                                            errorMessage={errors.deliveryFee?.message as string}
                                                            placeholder='Enter delivery fee'
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    }

                                    <FormField
                                        control={control}
                                        name="deliveryDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <SingleDatePicker
                                                    label="Delivery Date"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    placeholder="Select delivery date"

                                                />
                                                <FormMessage />
                                                <Button type="button" className='rounded-none text-xs px-4 py-1.5 h-8 w-max bg-gray-200' variant="unstyled" onClick={() => setValue('isCustomDelivery', !watch('isCustomDelivery'))} >
                                                    +
                                                    {
                                                        isCustomDelivery ? ' Default ' : ' Custom '
                                                    }
                                                    Delivery
                                                </Button>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="dispatchTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <TimePicker
                                                        className=""
                                                        control={control}
                                                        label="Dispatch Time"
                                                        {...field}
                                                        hasError={!!errors.dispatchTime}
                                                        errorMessage={errors.dispatchTime?.message as string}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>




                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////                  ORDER INFORMATION                  ///////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        <AccordionItem value='order-information'>
                            <AccordionTrigger className='py-4'>
                                <div className='flex items-center gap-5'>
                                    <div className='h-10 w-10 flex items-center justify-center bg-custom-white rounded-full'>
                                        <img src='/img/book.svg' alt='' width={24} height={24} />
                                    </div>
                                    <p className='text-custom-blue font-medium'>Order Details</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className='flex flex-col pt-3 pb-14 gap-y-12 lg:gap-y-20'>
                                {
                                    controlledFields.map((field, index) => (
                                        <div key={index}>
                                            {
                                                field?.isEditing ? (
                                                    <section>
                                                        <header className='flex items-center justify-between mb-8'>
                                                            <h3 className='font-semibold text-base bg-[#F3C948] px-4 py-1.5 w-max'>Item {index + 1}</h3>
                                                            <Button variant="black"
                                                                onClick={() => {
                                                                    setValue(`items.${index}.isCustomOrder`, !field.isCustomOrder)
                                                                }}
                                                            >
                                                                {
                                                                    field.isCustomOrder ? 'Default Order' : 'Custom Order'
                                                                }
                                                            </Button>
                                                        </header>

                                                        <section className='grid grid-cols-2 xl:grid-cols-3 gap-10 mb-8'>
                                                            <Controller
                                                                name={`items.${index}.branch`}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <SelectSingleCombo
                                                                        options={[
                                                                            { value: 'Zuzu Delights', label: 'Zuzu Delights' },
                                                                            { value: 'Prestige Flowers', label: 'Prestige Flowers' },
                                                                        ]}
                                                                        label="Branch"
                                                                        valueKey="value"
                                                                        labelKey="label"
                                                                        placeholder="Select Branch"
                                                                        {...field}
                                                                        hasError={!!errors.items?.[index]?.branch}
                                                                        errorMessage={errors.items?.[index]?.branch?.message}
                                                                    />
                                                                )}
                                                            />
                                                        </section>

                                                        <div key={field.id} className='grid grid-cols-2 xl:grid-cols-3 gap-10 mb-8'>
                                                            <Controller
                                                                name={`items.${index}.category`}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <SelectSingleCombo
                                                                        options={CATEGORIES_OPTIONS}
                                                                        label="Category"
                                                                        valueKey="value"
                                                                        labelKey="label"
                                                                        placeholder="Select Category"
                                                                        {...field}
                                                                        hasError={!!errors.items?.[index]?.category}
                                                                        errorMessage={errors.items?.[index]?.category?.message}
                                                                    />
                                                                )}
                                                            />
                                                            <Controller
                                                                name={`items.${index}.productType`}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <ProductsDropdown
                                                                        options={AllProducts}
                                                                        label="Product Type"
                                                                        valueKey="category"
                                                                        labelKey="name"
                                                                        imageKey="image"
                                                                        placeholder="Select product type"
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />


                                                            {
                                                                field.category === 'C' && (
                                                                    <>
                                                                        <Controller
                                                                            name={`items.${index}.layers`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={PRODUCT_TYPES_OPTIONS.Cakes.layers}
                                                                                    label="Layers"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Select layers"
                                                                                    {...field}
                                                                                    hasError={!!getFieldError(errors, index, 'layers')}
                                                                                    errorMessage={getFieldError(errors, index, 'layers')?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                        <Controller
                                                                            name={`items.${index}.flavour`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={PRODUCT_TYPES_OPTIONS.Cakes.flavours}
                                                                                    label="Flavour"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Select Flavour"
                                                                                    {...field}
                                                                                    hasError={!!getFieldError(errors, index, 'flavour')}
                                                                                    errorMessage={getFieldError(errors, index, 'flavour')?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                        <Controller
                                                                            name={`items.${index}.toppings`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={PRODUCT_TYPES_OPTIONS.Cakes.toppings}
                                                                                    label="Topping"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Select Topping"
                                                                                    {...field}
                                                                                    hasError={!!getFieldError(errors, index, 'toppings')}
                                                                                    errorMessage={getFieldError(errors, index, 'toppings')?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                        <Controller
                                                                            name={`items.${index}.size`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={PRODUCT_TYPES_OPTIONS.Cakes.sizes}
                                                                                    label="Size"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Select Size"
                                                                                    {...field}
                                                                                    hasError={!!getFieldError(errors, index, 'size')}
                                                                                    errorMessage={getFieldError(errors, index, 'size')?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                        <Controller
                                                                            name={`items.${index}.whippedCreamUpgrade`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={PRODUCT_TYPES_OPTIONS.Cakes.whippedCreamUpgrade}
                                                                                    label="Upgrade From Buttercream to Whipped Cream"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Add Whipped Cream"
                                                                                    {...field}
                                                                                    hasError={!!getFieldError(errors, index, 'whippedCreamUpgrade')}
                                                                                    errorMessage={getFieldError(errors, index, 'whippedCreamUpgrade')?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </>
                                                                )
                                                            }

                                                            {field.category === "F" && (
                                                                <Controller
                                                                    name={`items.${index}.vase`}
                                                                    control={control}
                                                                    render={({ field }) => (
                                                                        <SelectSingleCombo
                                                                            options={PRODUCT_TYPES_OPTIONS.Flowers.vaseOptions}
                                                                            label="Vase"
                                                                            valueKey="value"
                                                                            labelKey="label"
                                                                            placeholder="Select Vase"
                                                                            {...field}
                                                                            hasError={!!getFieldError(errors, index, 'vase')}
                                                                            errorMessage={getFieldError(errors, index, 'vase')?.message}
                                                                        />
                                                                    )}
                                                                />
                                                            )}

                                                            {
                                                                field.category === "TB" && (
                                                                    <>
                                                                        <Controller
                                                                            name={`items.${index}.size`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={PRODUCT_TYPES_OPTIONS.Teddies.sizes}
                                                                                    label="Size"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Select Size"
                                                                                    {...field}
                                                                                    hasError={!!getFieldError(errors, index, 'size')}
                                                                                    errorMessage={getFieldError(errors, index, 'size')?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                        <Controller
                                                                            name={`items.${index}.bouquet`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={PRODUCT_TYPES_OPTIONS.Teddies.bouquets}
                                                                                    label="Bouquet"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Select Bouquet"
                                                                                    {...field}
                                                                                    hasError={!!getFieldError(errors, index, 'bouquet')}
                                                                                    errorMessage={getFieldError(errors, index, 'bouquet')?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </>
                                                                )
                                                            }


                                                            <Input
                                                                label="Message"
                                                                {...register(`items.${index}.message`)}
                                                                placeholder='Enter message'
                                                            />


                                                            <div>
                                                                <label htmlFor="">Quantity</label>
                                                                <div className="flex items-center justify-start gap-2 h-14">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const newQuantity = controlledFields[index].quantity - 1;
                                                                            if (newQuantity >= 1) {
                                                                                const updatedFields = [...controlledFields];
                                                                                updatedFields[index].quantity = newQuantity;
                                                                                setValue(`items.${index}.quantity`, newQuantity);
                                                                            }
                                                                        }}
                                                                        className="flex items-center justify-center size-7 border border-[#0F172B] text-lg"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <span className="w-9 text-center">{controlledFields[index].quantity}</span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const newQuantity = controlledFields[index].quantity + 1;
                                                                            const updatedFields = [...controlledFields];
                                                                            updatedFields[index].quantity = newQuantity;
                                                                            setValue(`items.${index}.quantity`, newQuantity);
                                                                        }}
                                                                        className="flex items-center justify-center size-7 border border-[#0F172B] text-lg text-center"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <footer className="flex items-center justify-end gap-4">
                                                            <Button type="button" onClick={addNewItem}
                                                                className="h-12" variant="outline" size="lg"
                                                            >
                                                                <Plus className="mr-1.5" size={16} />
                                                                Add Item
                                                            </Button>
                                                            <Button type="button" onClick={() => { setValue(`items.${index}.isEditing`, false) }} className="h-12" size="lg">
                                                                Confirm
                                                            </Button>
                                                        </footer>
                                                    </section>
                                                )
                                                    :
                                                    (
                                                        <article>

                                                            <div>
                                                                <OrderItemCard
                                                                    editFn={() => setValue(`items.${index}.isEditing`, true)}
                                                                    deleteFn={() => remove(index)}
                                                                />
                                                                <OrderItemCardAdditionalItems
                                                                    index={index}
                                                                    control={control}
                                                                    register={register}
                                                                    errors={errors}
                                                                />
                                                            </div>

                                                            <div className="flex items-center">
                                                                <Button type="button" onClick={addNewItem}
                                                                    className={cn("h-12 ml-auto", (controlledFields.length !== index + 1) && "hidden", controlledFields.length == 0 && "!visible")} variant="outline" size="lg"
                                                                >
                                                                    <Plus className="mr-1.5" size={16} />
                                                                    Add Item
                                                                </Button>
                                                            </div>
                                                        </article>
                                                    )


                                            }
                                        </div>
                                    ))}
                                {
                                    controlledFields.length === 0 && (

                                        <footer className="flex items-center justify-end gap-4">
                                            <Button type="button" onClick={addNewItem}
                                                className="h-12" variant="outline" size="lg"
                                            >
                                                <Plus className="mr-1.5" size={16} />
                                                Add Item
                                            </Button>
                                        </footer>
                                    )
                                }
                            </AccordionContent>
                        </AccordionItem>




                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////                  ORDER INSTRUCTION                  ///////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        <AccordionItem value='order-Instruction'>
                            <AccordionTrigger className='py-4'>
                                <div className='flex items-center gap-5'>
                                    <div className='h-10 w-10 flex items-center justify-center bg-custom-white rounded-full'>
                                        <Image src='/img/book.svg' alt='' width={24} height={24} />
                                    </div>
                                    <p className='text-custom-blue font-medium'>Order Instruction</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className='pt-8 pb-14'>
                                <Input
                                    label="Message on Order"
                                    hasError={!!errors.messageOnOrder}
                                    errorMessage={errors.messageOnOrder?.message as string}
                                    placeholder='Enter message on order'
                                    {...register('messageOnOrder')}
                                />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="payment-information">
                            <AccordionTrigger className='py-4'>
                                <div className='flex items-center gap-5'>
                                    <div className='h-10 w-10 flex items-center justify-center bg-custom-white rounded-full'>
                                        <Money className='text-custom-blue' stroke="#194a7a" size={18} />
                                    </div>
                                    <p className='text-custom-blue font-medium'>Payment</p>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className='grid grid-cols-2 xl:grid-cols-3 gap-10 pt-8 pb-14 w-full'>
                                    <Input
                                        label="Name of customer"
                                        {...register('customerName')}
                                        hasError={!!errors.customerName}
                                        errorMessage={errors.customerName?.message as string}
                                        placeholder='Enter customer name'
                                    />

                                    <FormField
                                        control={control}
                                        name="paymentMode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <SelectSingleCombo
                                                        options={PAYMENT_METHODS}
                                                        label="Payment Mode"
                                                        valueKey="value"
                                                        labelKey="label"
                                                        placeholder="Select Payment Mode"
                                                        hasError={!!errors.paymentMode}
                                                        errorMessage={errors.paymentMode?.message as string}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="paymentStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <SelectSingleCombo
                                                        options={PAYMENT_STATUS_OPTIONS}
                                                        label="Payment Status"
                                                        valueKey="value"
                                                        labelKey="label"
                                                        placeholder="Select Payment Status"
                                                        hasError={!!errors.paymentStatus}
                                                        errorMessage={errors.paymentStatus?.message as string}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FilePicker
                                        onFileSelect={(file) => setValue('proofOfPayment', file)}
                                        hasError={!!errors.proofOfPayment}
                                        errorMessage={errors.proofOfPayment?.message as string}
                                        maxSize={10}
                                        title='Upload Payment Proof'
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <footer className="flex py-16">
                        <LinkButton href="./order-summary" type="submit" variant="default" size="lg" className='ml-auto'>
                            Proceed
                        </LinkButton>
                    </footer>
                </form>
            </Form>
        </div>
    )
}

export default NewOrderPage
