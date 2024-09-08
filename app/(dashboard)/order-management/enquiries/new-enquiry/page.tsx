'use client'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Accordion, AccordionContent, AccordionTrigger, AccordionItem, Input, SingleDatePicker, LinkButton, SelectSingleCombo, Button, Checkbox, ProductsDropdown } from '@/components/ui'
import { Plus, Trash, Trash2, UserIcon } from 'lucide-react'
import { TruckTime } from 'iconsax-react'
import { generateMockOrders, OrderCard } from '@/app/(dashboard)/order-timeline/misc/components/Timeline'
import { EditPenIcon } from '@/icons/core';
import Image from 'next/image'
import { getSchemaForCategory } from '../misc/schemas'
import { AllProducts, productOptions } from '@/constants'

// Define your schema here
const schema = z.object({
  customerName: z.string().min(1, { message: "Customer's name is required" }),
  customerPhone: z.string().min(1, { message: "Customer's phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  recipientName: z.string().min(1, { message: "Recipient's name is required" }),
  recipientPhone: z.string().min(1, { message: "Recipient's phone number is required" }),
  enquiryOccasion: z.string().min(1, { message: "Enquiry occasion is required" }),
  deliveryNote: z.string().optional(),
  deliveryDate: z.date(),

  items: z.array(z.object({
    category: z.enum(["C", "F", "W", "TB"], { message: "Category is required" }),
    productType: z.string().min(1, { message: "Product type is required" }),
    productSize: z.string().optional(),
    quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
    message: z.string().optional(),
    isEditing: z.boolean().optional(),
    layers: z.enum(["2", "3", "4", "5"]).optional(),
    flavour: z.enum(["vanilla", "chocolate", "red velvet"]).optional(),
    whippedCreamUpgrade: z.enum(["true", "false", "red velvet"]).optional(),
    toppings: z.enum(["none", "chocolate", "fruits", "mixed"]).optional(),
    vase: z.enum(["none", "25cm", "50cm"]).optional(),
    size: z.enum(["8 inches", "10 inches", "12 inches"]).optional(),
    bouquet: z.enum(["entry", "xsmall", "small", "medium", "standard", "human"]).optional(),
  }).refine((item) => {
    const dynamicValidation = getSchemaForCategory(item.category);
    return dynamicValidation.safeParse(item).success;
  }, { message: "Invalid product details for the selected category" }))
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

const NewEnquiryPage = () => {
  const mockDiscussion = generateMockOrders(1)[0];
  const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      items: [{ category: 'C', productType: '', productSize: '', quantity: 1, message: '', isEditing: true }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const watchFieldArray = watch("items");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  const addNewItem = () => {
    append({ category: 'C', productType: '', productSize: '', quantity: 1, message: '', isEditing: true });
  }

  return (
    <main className='px-8 2xl:px-14 max-w-[1560px]'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion type="multiple" defaultValue={["customer-information", "enquiry-information", "delivery-information", "initial-discussion"]}>
          <AccordionItem value="customer-information">
            <AccordionTrigger className="flex">
              <div className="flex items-center gap-3 text-[#194A7A]">
                <div className='flex items-center justify-center p-1.5 h-10 w-10 rounded-full bg-[#F2F2F2]'>
                  <UserIcon className='text-custom-blue' stroke="#194a7a" fill="#194a7a" size={18} />
                </div>
                <h3 className="font-semibold text-base">Customer Information</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className='grid grid-cols-2 xl:grid-cols-3 gap-10 pt-8 pb-14'>
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
                  label="Email"
                  {...register('email')}
                  hasError={!!errors.email}
                  errorMessage={errors.email?.message as string}
                  placeholder='Enter email'
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
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='-discussion'>
            <AccordionTrigger className=''>
              <div className='flex items-center gap-5'>
                <div className='h-10 w-10 flex items-center justify-center bg-custom-white rounded-full'>
                  <img src='/img/book.svg' alt='' width={24} height={24} />
                </div>
                <p className='text-custom-blue font-medium'>Discussion</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className='pt-8 pb-14'>
              <OrderCard order={mockDiscussion} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='enquiry-information'>
            <AccordionTrigger className=''>
              <div className='flex items-center gap-5'>
                <div className='h-10 w-10 flex items-center justify-center bg-custom-white rounded-full'>
                  <img src='/img/book.svg' alt='' width={24} height={24} />
                </div>
                <p className='text-custom-blue font-medium'>Enquiry Details</p>
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
                        )
                    }
                  </>
                ))}

            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="delivery-information">
            <AccordionTrigger className="flex">
              <div className="flex items-center gap-3 text-[#194A7A]">
                <div className='flex items-center justify-center p-1.5 h-10 w-10 rounded-full bg-[#F2F2F2]'>
                  <TruckTime className='text-custom-blue' stroke="#194a7a" size={18} />
                </div>
                <h3 className="font-semibold text-base">Delivery Details</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className='grid grid-cols-2 xl:grid-cols-3 gap-10 pt-8 pb-14'>
                <Input
                  label="Delivery note"
                  {...register('deliveryNote')}
                  hasError={!!errors.deliveryNote}
                  errorMessage={errors.deliveryNote?.message as string}
                  placeholder='Enter delivery date'
                />
                <SingleDatePicker
                  label="Delivery Date"
                // control={control}
                // error={errors.deliveryDate?.message}
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
    </main>
  )
}

export default NewEnquiryPage
