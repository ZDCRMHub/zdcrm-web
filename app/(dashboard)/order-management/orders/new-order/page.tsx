'use client'
import React from 'react'
import Image from 'next/image'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'
import { TruckTime } from 'iconsax-react'
import { Plus, Trash, Trash2, UserIcon } from 'lucide-react'

import {
    Accordion, AccordionContent, AccordionTrigger, AccordionItem, Input, SingleDatePicker, LinkButton, SelectSingleCombo, Button, Checkbox, ProductsDropdown, FilePicker, FormControl,
    FormField, FormItem, FormLabel, FormMessage,
    Form,
    TimePicker
} from '@/components/ui'
import { generateMockOrders } from '@/app/(dashboard)/order-timeline/misc/components/Timeline'
import { EditPenIcon } from '@/icons/core';
import { AllProducts, productOptions } from '@/constants'
import EnquiryDiscussCard from '@/app/(dashboard)/order-timeline/misc/components/EnquiryDiscussCard'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import { getSchemaForCategory } from '../../enquiries/misc/schemas'

// Define your schema here
const schema = z.object({
    customerName: z.string().min(1, { message: "Customer's name is required" }),
    customerPhone: z.string().min(1, { message: "Customer's phone number is required" }),
    enquiryChannel: z.string({ message: "Invalid enquiry channel" }),
    recipientName: z.string().min(1, { message: "Recipient's name is required" }),
    recipientPhone: z.string().min(1, { message: "Recipient's phone number is required" }),
    enquiryOccasion: z.string().min(1, { message: "Enquiry occasion is required" }),
    isCustomDelivery: z.boolean(),
    deliveryNote: z.string().optional(),
    deliveryDate: z.date(),
    deliveryMethod: z.enum(["Dispatch", "Pickup"], { message: "Delivery method is required" }),
    deliveryAddress: z.string().min(1, { message: "Delivery address is required" }),
    deliveryZone: z.enum(["Lagos Mainland (LM)", "Lagos Central (LC)", "Lagos Island (LI)"], { message: "Delivery zone is required" }),
    paymentMode: z.enum(["cash", "transfer", "pos", "online"], { message: "Payment mode is required" }),
    paymentStatus: z.enum(["pending", "Paid(Naira Transfer)"], { message: "Payment status is required" }),
    proofOfPayment: z.instanceof(File).refine(file => file.size <= 5 * 1024 * 1024, { message: "File size should be less than 5MB" }),
    deliveryFee: z.string().optional(),
    dispatchTime: z.date().optional(),

    items: z.array(z.object({
        branch: z.enum(["Zuzu Delights", "Prestige Flowers"], { message: "Branch is required" }),
        category: z.enum(["C", "F", "W", "TB"], { message: "Category is required" }),
        productType: z.string().min(1, { message: "Product type is required" }),
        productSize: z.string().optional(),
        quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
        message: z.string().optional(),
        isEditing: z.boolean().optional(),
        layers: z.enum(["2", "3", "4", "5"]).optional(),
        flavour: z.enum(["vanilla", "chocolate", "red velvet"]).optional(),
        whippedCreamUpgrade: z.enum(["true", "false"]).optional(),
        toppings: z.enum(["none", "chocolate", "fruits", "mixed"]).optional(),
        vase: z.enum(["none", "25cm", "50cm"]).optional(),
        size: z.enum(["8 inches", "10 inches", "12 inches"]).optional(),
        bouquet: z.enum(["entry", "xsmall", "small", "medium", "standard", "human"]).optional(),
        additionalItems: z.array(z.object({
            name: z.string().min(1, { message: "Name is required" }),
            quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
            cost: z.string().min(1, { message: "Price is required" }),
        })).optional(),
    }).refine((item) => {
        const dynamicValidation = getSchemaForCategory(item.category);
        return dynamicValidation.safeParse(item).success;
    }, { message: "Invalid product details for the selected category" }))
}).refine((data) => {
    const errors = [];

    if (data.isCustomDelivery) {
        if (!data.deliveryFee) {
            errors.push({
                path: ["deliveryFee"],
                message: "Delivery fee is required for custom delivery",
                code: "custom" as const
            });
        }
    }

    if (!data.isCustomDelivery) {
        if (!data.deliveryMethod) {
            errors.push({
                path: ["deliveryMethod"],
                message: "Delivery method is required when not using custom delivery",
                code: "custom" as const
            });
        }
    }

    if (data.items.length === 0) {
        errors.push({
            path: ["items"],
            message: "At least one item is required",
            code: "custom" as const
        });
    }

    if (errors.length > 0) {
        throw new z.ZodError(errors);
    }

    return true;
});

const categoryOptions = [
    { value: 'C', label: 'Cake' },
    { value: 'F', label: 'Flower' },
    { value: 'W', label: 'Wine' },
    { value: 'CC', label: 'Cup Cake' },
    { value: 'TB', label: 'Teddy Bear' },
    { value: 'GC', label: 'Gift Card' },
    { value: 'V', label: 'Vase' },
    { value: 'CH', label: 'Chocolate' },
    { value: 'B', label: 'Baloon' },
    { value: 'P', label: 'Perfume' },
    { value: 'HB', label: 'Hand Bag' },
]

const NewOrderPage = () => {
    const form = useForm<z.infer<typeof schema>>({
        // resolver: zodResolver(getSchemaForCategory('default')),
        resolver: zodResolver(schema),

        defaultValues: {
            items: [{ category: 'C', productType: '', productSize: '', quantity: 1, message: '', isEditing: true }]
        }
    });
    const { register, handleSubmit, formState: { errors }, control, watch, setValue } = form;
    const mockDiscussion = generateMockOrders(1)[0];
    const AdditionalItemsFieldArray = (index: number) => {
        return useFieldArray({
            control,
            name: `items.${index}.additionalItems`
        });
    }
    const arrayField = useFieldArray({
        control,
        name: "items"
    });
    const { fields, append, remove } = arrayField;

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
        append({ branch: 'Zuzu Delights', category: 'C', productType: '', productSize: '', quantity: 1, message: '', isEditing: true });
    }




    return (
        <div className='px-8 md:pt-12 w-full md:w-[95%] max-w-[1792px] mx-auto'>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Accordion type="multiple" defaultValue={["customer-information", "enquiry-information", "delivery-information", "initial-discussion", "payment-information"]} className='w-full'>
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
                                        {...register('customerName')}
                                        hasError={!!errors.customerName?.message}
                                        errorMessage={errors.customerName?.message as string}
                                        placeholder='Enter customer name'
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
                                    <Input
                                        label="Enquiry Occasion"
                                        {...register('enquiryOccasion')}
                                        hasError={!!errors.enquiryOccasion}
                                        errorMessage={errors.enquiryOccasion?.message as string}
                                        placeholder='Enter occasion'
                                    />
                                    <SelectSingleCombo
                                        options={[
                                            { value: 'email', label: 'Email' },
                                            { value: 'whatsapp', label: 'WhatsApp' },
                                            { value: 'website', label: 'Website' },
                                            { value: 'walk-in', label: 'Store Walk In' },
                                            { value: 'instagram', label: 'Instagram' },
                                            { value: 'phone', label: 'Phone Call' },
                                            { value: 'facebook', label: 'Facebook' },
                                            { value: 'tik-tok', label: 'Tik Tok' },
                                        ]}
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
                                                        options={[
                                                            { value: "Dispatch", label: "Dispatch" },
                                                            { value: "Pickup", label: "Pickup" },
                                                        ]}
                                                        {...field}
                                                        valueKey={"value"}
                                                        labelKey={"label"}
                                                        placeholder="Select delivery method"

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
                                    {
                                        isCustomDelivery &&

                                        <FormField
                                            control={control}
                                            name="dispatchTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <TimePicker
                                                            className=""
                                                            label="Dispatch Time"
                                                            {...field}
                                                            hasError={!!errors.dispatchTime}
                                                            errorMessage={errors.dispatchTime?.message as string}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    }
                                </div>
                            </AccordionContent>
                        </AccordionItem>



                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////////////////////////////////////////////////////////////////////// */}
                        <AccordionItem value='enquiry-information'>
                            <AccordionTrigger className='py-4'>
                                <div className='flex items-center gap-5'>
                                    <div className='h-10 w-10 flex items-center justify-center bg-custom-white rounded-full'>
                                        <img src='/img/book.svg' alt='' width={24} height={24} />
                                    </div>
                                    <p className='text-custom-blue font-medium'>Order Details</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className='pt-3 pb-14'>
                                {
                                    controlledFields.map((field, index) => (
                                        <>
                                            {
                                                field?.isEditing ? (
                                                    <section>
                                                        <header className='flex items-center mb-8'>
                                                            <h3 className='font-semibold text-base bg-[#F3C948] px-4 py-1.5 w-max'>Item {index + 1}</h3>
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
                                                                        options={categoryOptions}
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
                                                            <Input
                                                                label="Product Type"
                                                                {...register(`items.${index}.productType`)}
                                                                hasError={!!errors.items?.[index]?.productType}
                                                                errorMessage={errors.items?.[index]?.productType?.message}
                                                                placeholder='Enter product type'
                                                            />



                                                            {
                                                                field.category === 'C' && (
                                                                    <>
                                                                        <Controller
                                                                            name={`items.${index}.layers`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={productOptions.Cakes.layers}
                                                                                    label="Layers"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Select layers"
                                                                                    {...field}
                                                                                    hasError={!!errors.items?.[index]?.layers}
                                                                                    errorMessage={errors.items?.[index]?.layers?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                        <Controller
                                                                            name={`items.${index}.flavour`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={productOptions.Cakes.flavours}
                                                                                    label="Flavour"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Select Flavour"
                                                                                    {...field}
                                                                                    hasError={!!errors.items?.[index]?.flavour}
                                                                                    errorMessage={errors.items?.[index]?.flavour?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                        <Controller
                                                                            name={`items.${index}.toppings`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={productOptions.Cakes.toppings}
                                                                                    label="Toppings"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Select Toppings"
                                                                                    {...field}
                                                                                    hasError={!!errors.items?.[index]?.toppings}
                                                                                    errorMessage={errors.items?.[index]?.toppings?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                        <Controller
                                                                            name={`items.${index}.whippedCreamUpgrade`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={[
                                                                                        { label: "True", value: "true" },
                                                                                        { label: "False", value: "false" },
                                                                                    ]}
                                                                                    label="Whipped Cream Upgrade"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Add Whipped Cream"
                                                                                    {...field}
                                                                                    hasError={!!errors.items?.[index]?.whippedCreamUpgrade}
                                                                                    errorMessage={errors.items?.[index]?.whippedCreamUpgrade?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </>
                                                                )
                                                            }

                                                            {
                                                                field.category === 'F' && (
                                                                    <Controller
                                                                        name={`items.${index}.vase`}
                                                                        control={control}
                                                                        render={({ field }) => (
                                                                            <SelectSingleCombo
                                                                                options={productOptions.Flowers.vaseOptions}
                                                                                label="Vase"
                                                                                valueKey="value"
                                                                                labelKey="label"
                                                                                placeholder="Select Vase"
                                                                                {...field}
                                                                                hasError={!!errors.items?.[index]?.vase}
                                                                                errorMessage={errors.items?.[index]?.vase?.message}
                                                                            />
                                                                        )}
                                                                    />
                                                                )
                                                            }

                                                            {
                                                                field.category === 'W' && (
                                                                    <>
                                                                        <Controller
                                                                            name={`items.${index}.size`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={[
                                                                                        { value: 'entry', label: 'Entry' },
                                                                                        { value: 'xsmall', label: 'XSmall' },
                                                                                        { value: 'small', label: 'Small' },
                                                                                        { value: 'medium', label: 'Medium' },
                                                                                    ]}
                                                                                    label="Size"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Select Size"
                                                                                    {...field}
                                                                                    hasError={!!errors.items?.[index]?.size}
                                                                                    errorMessage={errors.items?.[index]?.size?.message}
                                                                                />
                                                                            )}
                                                                        />
                                                                        <Controller
                                                                            name={`items.${index}.bouquet`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <SelectSingleCombo
                                                                                    options={[
                                                                                        { value: 'entry', label: 'Entry' },
                                                                                        { value: 'xsmall', label: 'XSmall' },
                                                                                        { value: 'small', label: 'Small' },
                                                                                        { value: 'medium', label: 'Medium' },
                                                                                        { value: 'standard', label: 'Standard' },
                                                                                        { value: 'human', label: 'Human' },
                                                                                    ]}
                                                                                    label="Bouquet"
                                                                                    valueKey="value"
                                                                                    labelKey="label"
                                                                                    placeholder="Select Bouquet"
                                                                                    {...field}
                                                                                    hasError={!!errors.items?.[index]?.bouquet}
                                                                                    errorMessage={errors.items?.[index]?.bouquet?.message}
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
                                                        <>

                                                            <div>
                                                                <article className="flex gap-6 w-full max-w-[700px] bg-white p-6 rounded-xl mb-10">
                                                                    <div className='relative w-[180px] aspect-[5/4] p-6 rounded-xl bg-[#F6F6F6]'>
                                                                        <Image
                                                                            src='/img/cake.png'
                                                                            alt='cake'
                                                                            fill
                                                                            className='object-cover rounded-xl border-8 border-[#F6F6F6]'
                                                                        />
                                                                    </div>
                                                                    <section className='flex flex-col justify-between'><h5 className="text-[#194A7A] text-xl font-medium">
                                                                        Adeline Fautline Cake
                                                                    </h5>
                                                                        <div className='py-6 space-y-3'>

                                                                            <div className='flex items-center gap-1'>
                                                                                <h2 className='text-sm font-medium text-[#687588]'>Customer Name:</h2>
                                                                                <p className='font-medium text-custom-blue'>Adetunji Emmanuel</p>
                                                                            </div>
                                                                            <div className='flex items-center gap-1'>
                                                                                <h2 className='text-sm font-medium text-[#687588]'>Email:</h2>
                                                                                <p className='font-medium text-custom-blue'>adel23@gmail.com</p>
                                                                            </div>
                                                                            <div className='flex items-center gap-1'>
                                                                                <h2 className='text-sm font-medium text-[#687588]'>Phone Number:</h2>
                                                                                <p className='font-medium text-custom-blue'>08034344433</p>
                                                                            </div>
                                                                            <div className='flex items-center gap-1'>
                                                                                <h2 className='text-sm font-medium text-[#687588]'>Message on cake:</h2>
                                                                                <p className='font-medium text-custom-blue'>Love me like you always do</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex justify-between items-center gap-1'>

                                                                        </div>
                                                                    </section>
                                                                    <div className="flex items-center gap-4 self-start">
                                                                        <button onClick={() => setValue(`items.${index}.isEditing`, true)} className="text-[#2463EB]">
                                                                            <EditPenIcon />
                                                                        </button>
                                                                        <button type="button" onClick={() => remove(index)} className="">
                                                                            <Trash2 size={17} className="text-red-400" />
                                                                        </button>
                                                                    </div>
                                                                </article>
                                                                <section>
                                                                    {
                                                                        field.additionalItems?.map((item, i) => (
                                                                            <div className='grid grid-cols-3' key={i}>
                                                                                <Input
                                                                                    label="Additional Item Name"
                                                                                    {...register(`items.${index}.additionalItems.${i}.name`)}
                                                                                    hasError={!!errors.items?.[index]?.additionalItems?.[i]?.name}
                                                                                    errorMessage={errors.items?.[index]?.additionalItems?.[i]?.name?.message}
                                                                                    placeholder='Enter name'
                                                                                />

                                                                                <Input
                                                                                    label="Cost"
                                                                                    {...register(`items.${index}.additionalItems.${i}.cost`)}
                                                                                    hasError={!!errors.items?.[index]?.additionalItems?.[i]?.cost}
                                                                                    errorMessage={errors.items?.[index]?.additionalItems?.[i]?.cost?.message}
                                                                                    placeholder='Enter cost'
                                                                                />
                                                                            </div>
                                                                        ))
                                                                    }
                                                                    <button
                                                                        onClick={
                                                                            () => {
                                                                                AdditionalItemsFieldArray(index).append({ name: '', quantity: 1, cost: '' }, { shouldFocus: true });
                                                                            }
                                                                        }
                                                                        className="bg-white py-1.5 px-4"
                                                                    >
                                                                        Add More
                                                                    </button>
                                                                </section>
                                                            </div>

                                                            <div className="flex items-center">
                                                                <Button type="button" onClick={addNewItem}
                                                                    className={cn("h-12 ml-auto", (controlledFields.length !== index + 1) && "hidden", controlledFields.length == 0 && "!visible")} variant="outline" size="lg"
                                                                >
                                                                    <Plus className="mr-1.5" size={16} />
                                                                    Add Item
                                                                </Button>
                                                            </div>
                                                        </>
                                                    )


                                            }
                                        </>
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

                        <AccordionItem value='-discussion'>
                            <AccordionTrigger className='py-4'>
                                <div className='flex items-center gap-5'>
                                    <div className='h-10 w-10 flex items-center justify-center bg-custom-white rounded-full'>
                                        <img src='/img/book.svg' alt='' width={24} height={24} />
                                    </div>
                                    <p className='text-custom-blue font-medium'>Discussion</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className='pt-8 pb-14'>
                                <EnquiryDiscussCard isExpanded order={mockDiscussion} />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="payment-information">
                            <AccordionTrigger className='py-4'>
                                <div className='flex items-center gap-5'>
                                    <div className='h-10 w-10 flex items-center justify-center bg-custom-white rounded-full'>
                                        <TruckTime className='text-custom-blue' stroke="#194a7a" size={18} />
                                    </div>
                                    <p className='text-custom-blue font-medium'>Payment Details</p>
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
                                    <SelectSingleCombo
                                        options={[
                                            { value: 'cash', label: 'Cash' },
                                            { value: 'transfer', label: 'Transfer' },
                                            { value: 'pos', label: 'POS' },
                                            { value: 'online', label: 'Online' },
                                        ]}
                                        label="Payment Mode"
                                        valueKey="value"
                                        labelKey="label"
                                        placeholder="Select Payment Mode"
                                        name='paymentMode'
                                        value={watch('paymentMode')}
                                        onChange={(value: string) => setValue('paymentMode', value as "cash" | "transfer" | "pos" | "online")}
                                        hasError={!!errors.paymentMode}
                                        errorMessage={errors.paymentMode?.message as string}
                                    />
                                    <SelectSingleCombo
                                        options={[
                                            { value: 'pending', label: 'Pending' },
                                            { value: 'Paid(Naira Transfer)', label: 'Paid(Naira Transfer)' },
                                        ]}
                                        label="Payment Status"
                                        valueKey="value"
                                        labelKey="label"
                                        placeholder="Select Payment Status"
                                        name='paymentStatus'
                                        value={watch('paymentStatus')}
                                        onChange={(value: string) => setValue('paymentStatus', value as "pending" | "Paid(Naira Transfer)")}
                                        hasError={!!errors.paymentStatus}
                                        errorMessage={errors.paymentStatus?.message as string}
                                    />
                                    <FilePicker
                                        onFileSelect={(file) => setValue('proofOfPayment', file)}
                                        hasError={!!errors.proofOfPayment}
                                        errorMessage={errors.proofOfPayment?.message as string}
                                        maxSize={10}
                                        title='Upload Payment Proof'
                                        supportedFileTypes={["image/*", "application/pdf"]}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <footer className="flex py-16">
                        <LinkButton href="./enquiry-details" type="submit" variant="default" size="lg" className='ml-auto'>
                            Proceed
                        </LinkButton>
                    </footer>
                </form>
            </Form>
        </div>
    )
}

export default NewOrderPage
