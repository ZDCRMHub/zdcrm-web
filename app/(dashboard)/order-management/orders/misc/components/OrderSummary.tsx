'use client'
import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Book, Edit2, Money, Trash } from 'iconsax-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input, Button, LinkButton, Form, SelectSingleCombo } from '@/components/ui';
import { Card, CardContent } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditPenIcon } from '@/icons/core';
import OrderItemSummaryCard from './OrderItemSummaryCard';
import { useBooleanStateControl } from '@/hooks';
import OrderSummaryExportModal from './OrderSummaryExportModal';


interface AdditionalCost {
  itemName: string;
  cost: number;
  isEditing: boolean;
}

interface FormData {
  additionalCost: AdditionalCost[];
  discountType?: string;
}
const schema = z.object({
  discountType: z.string().optional(),
  additionalCost: z.array(z.object({
    itemName: z.string(),
    cost: z.number(),
    isEditing: z.boolean()
  })),
});

export default function OrderSummary() {
  const {
    state: isExportSummaaryModalOpen,
    setTrue: openExportSummaryModal,
    setFalse: closeExportSummaryModal
  } = useBooleanStateControl()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      additionalCost: [{
        itemName: 'Toys and branded cardboard',
        cost: 60000,
        isEditing: true
      }]
    }
  });

  const { register, handleSubmit, formState: { errors }, control, watch, setValue } = form;

  const arrayField = useFieldArray({
    control,
    name: "additionalCost"
  });
  const { fields, append, remove } = arrayField;
  const additionalCost = watch('additionalCost');

  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  const [processed, setprocessed] = useState(false)


  const onSubmit = (data: FormData) => {
    console.log(data);
  }

  const orderData = {
    branch: 'Zuzu Delights',
    orderNumber: 'ORD123456',
    date: '2023-10-01',
    customerName: 'Adetunji Emmanuel',
    phoneNumber: '08034344433',
    address: 'No. 45, Adeniji close, Lekki Phase 1',
    items: [
      { description: 'Toys and branded cardboard', quantity: 1, price: 60000 },
      { description: 'Toys and branded cardboard', quantity: 1, price: 60000 },
      { description: 'Toys and branded cardboard', quantity: 1, price: 60000 },
      { description: 'Toys and branded cardboard', quantity: 1, price: 60000 },
      { description: 'Toys and branded cardboard', quantity: 1, price: 60000 },
    ],
    subtotal: 300000,
    tax: 20000,
    discount: 10000,
    deliveryFee: 5000,
    total: 315000
  }


  return (
    <>
      {
        processed ?
          (
            <div className='size-full flex flex-col gap-2 items-center justify-center'>
              <Image src='/img/complete-order.png' alt='processing' width={450} height={450} />
              <h1 className='text-3xl font-medium my-1.5'>Order Added Successfully!</h1>
              <p className='font-normal font-poppins'>Processed By: Adetola Ayodeji</p>
              <LinkButton href='./' variant='black' size='lg' className='mt-8'>
                Back to Order Management
              </LinkButton>
            </div>
          )
          :
          <div className='flex flex-col w-full md:w[92.5%] max-w-[1280px] mr-auto p-6 xl:px-12'>
            <div className='flex items-center mb-10'>
              <Button
                variant='ghost'
                size='icon'
                className='mr-2'
                onClick={() => goBack()}>
                <ArrowLeft className='h-6 w-6 text-[#A0AEC0]' />
              </Button>
              <h1 className='text-2xl font-semibold font-manrope'>Order Summary</h1>
            </div>

            <section className='flex flex-col gap-3 bg-white p-6 rounded-2xl shadow-sm mb-10'>
              <article>
                <div className='grid grid-cols-3 gap-6 mb-6'>
                  <div>
                    <p className='text-lg text-gray-500'>
                      Customer Name:{' '}
                      <span className='text-[#194A7A] text-lg font-semibold'>
                        Adetunji Emmanuel
                      </span>
                    </p>
                    <p className='text-gray-500 mt-2'>
                      Phone Number: {" "}
                      <span className="text-[#194A7A]">
                        08034344433
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className='text-lg text-gray-500'>
                      Recipient Name:{' '}
                      <span className='text-[#194A7A] font-medium'>Lawal Rose</span>
                    </p>
                    <p className='text-gray-500 mt-2'>
                      Phone Number: {" "}
                      <span className="text-[#194A7A]">
                        08034344433
                      </span>
                    </p>
                  </div>
                  <p className='flex flex-col text-sm text-[#687588] font-medium'>
                    Order Occasion: <span className='font-semibold text-[#194A7A]'>Birthday</span>
                  </p>
                </div>
              </article>
            </section>

            <section className='grid grid-cols-[1fr,0.5fr] gap-8 mb-10 '>
              <div>
                <OrderItemSummaryCard />
                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className='mt-16'>
                    <section>
                      <header className="flex items-center gap-5 text-[#194A7A] border-b mb-4">
                        <div className='flex items-center justify-center p-1.5 h-10 w-10 rounded-full bg-[#F2F2F2]'>
                          <Book className='text-custom-blue' stroke="#194a7a" fill="#194a7a" size={18} />
                        </div>
                        <h3 className="text-custom-blue font-medium PB-3">Additional Cost on Order {" "}
                          <span className="text-[#BEBEBE text-sm font-normal">
                            (optional)
                          </span>
                        </h3>
                      </header>
                      {
                        additionalCost.map((field, index) => (
                          <div key={index} className="mb-4">
                            {field.isEditing ? (
                              <div>
                                <div className='grid grid-cols-2 items-center gap-4 mb-4'>
                                  <div>
                                    <label className='text-sm text-gray-500 mb-1 block'>Item Name</label>
                                    <Input
                                      {...register(`additionalCost.${index}.itemName`)}
                                      placeholder='Enter additional item name'
                                    />
                                    {errors.additionalCost?.[index]?.itemName && (
                                      <p className="text-red-500 text-xs mt-1">{errors.additionalCost[index]?.itemName?.message}</p>
                                    )}
                                  </div>
                                  <div>
                                    <label className='text-sm text-gray-500 mb-1 block'>Cost</label>
                                    <Input
                                      {...register(`additionalCost.${index}.cost`, { valueAsNumber: true })}
                                      placeholder='Enter cost'
                                      type="number"
                                    />
                                    {errors.additionalCost?.[index]?.cost && (
                                      <p className="text-red-500 text-xs mt-1">{errors.additionalCost[index]?.cost?.message}</p>
                                    )}
                                  </div>
                                </div>
                                <div className='flex justify-end'>
                                  <Button
                                    type="button"
                                    className='px-5 bg-[#53A02F] rounded-none hover:bg-[#53a02fbd]'
                                    onClick={() => setValue(`additionalCost.${index}.isEditing`, false)}
                                  >
                                    Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className='grid grid-cols-[1fr,1fr,0.2fr] items-center gap-2'>
                                <Input readOnly className='!bg-[#E3F2FD] text-[#17181C]' value={field.itemName} />
                                <Input readOnly className='!bg-[#E3F2FD] text-[#17181C]' value={`₦${field.cost.toLocaleString()}`} />
                                <div className='flex gap-2'>
                                  <Button
                                    type="button"
                                    variant='outline'
                                    className='!bg-[#FFC600] text-black h-9 !border-none'
                                    size='sm'
                                    onClick={() => setValue(`additionalCost.${index}.isEditing`, true)}
                                  >
                                    <EditPenIcon className='w-5 h-5' />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant='destructive'
                                    size='sm'
                                    onClick={() => remove(index)}
                                    className=' h-9'
                                  >
                                    <Trash className='w-5 h-5' />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      <Button
                        type="button"
                        variant='outline'
                        size='sm'
                        onClick={() => append({ itemName: '', cost: 0, isEditing: true })}
                      >
                        <Plus className='w-4 h-4 mr-2' /> Add More
                      </Button>
                    </section>

                    <div className='text-right mt-3 mb-6'>
                      <p className='text-base font-medium text-[#8B909A]'>Total (NGN)</p>
                      <p className='text-xl font-semibold'>
                        ₦{fields.reduce((sum, field) => sum + field.cost, 0).toLocaleString()}
                      </p>
                    </div>
                  </form>
                </Form>



                <section>
                  <header className="flex items-center gap-5 text-[#194A7A] border-b mb-4 p-1.5">
                    <div className='flex items-center justify-center p-1.5 h-10 w-10 rounded-full bg-[#F2F2F2]'>
                      <Book className='text-custom-blue' stroke="#194a7a" fill="#194a7a" size={18} />
                    </div>
                    <h3 className="text-custom-blue font-medium pb-3">Discount {" "}
                      <span className="text-[#BEBEBE text-sm font-normal">
                        (optional)
                      </span>
                    </h3>
                  </header>
                  <div>
                    <SelectSingleCombo
                      name='discountType'
                      className='max-w-[520px]'
                      value={form.watch('discountType')}
                      onChange={(value) => form.setValue('discountType', value)}
                      label='Discount Type'
                      labelKey={'label'}
                      valueKey={'value'}
                      placeholder='Select discount type'
                      options={[
                        { label: 'Eid Discount', value: 'eid' },
                        { label: 'Christmas Discount', value: 'christmas' },
                        { label: 'Valentine Discount', value: 'valentine' },
                        { label: 'Birthday Discount', value: 'birthday' },
                      ]}
                    />
                  </div>
                </section>

                <section className="mt-10">
                  <header className="flex items-center gap-5 text-[#194A7A] border-b mb-4 p-1.5">
                    <div className='flex items-center justify-center p-1.5 h-10 w-10 rounded-full bg-[#F2F2F2]'>
                      <Money className='text-custom-blue' stroke="#194a7a" fill="#194a7a" size={18} />
                    </div>
                    <h3 className="text-custom-blue font-medium pb-3 text-lg">Final Costing {" "}</h3>
                  </header>
                  <div className='grid grid-cols-2 '>
                    <div></div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Sub Total</span>
                        <span className="text-[#194A7A] font-medium">₦146,000.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Delivery Fee</span>
                        <span className="text-[#194A7A] font-medium">+ ₦4,000.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Discount</span>
                        <span className="text-red-500 font-medium">- ₦5,500.00</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-medium">Total Due</span>
                        <span className="text-[#194A7A] font-bold text-lg">₦144,500.00</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>


              <div className='content-start'>
                <Card className='mb-6 border-none'>
                  <CardContent className='p-0'>
                    <div className='flex justify-between items-center mb-4 border-b py-3 px-6'>
                      <h2 className='font-semibold'>Delivery Details</h2>
                      <LinkButton href="./new-order" variant='unstyled' size='sm'>
                        <Edit2 className='w-5 h-5 text-[#A0AEC0]' />
                      </LinkButton>
                    </div>
                    <div className='grid grid-cols-[max-content,1fr] gap-4 text-[0.75rem] px-4 pb-4 font-manrope'>
                      <p className="grid grid-cols-[subgrid] col-span-2 text-[#687588]">
                        Primary address:{' '}
                        <span className='font-semibold text-[#111827] font-manrope'>
                          No. 45, Adeniji close, Lekki Phase 1
                        </span>
                      </p>
                      <p className="grid grid-cols-[subgrid] col-span-2 text-[#687588]">
                        Country: <span className='font-semibold text-[#111827] font-manrope'>Nigeria</span>
                      </p>
                      <p className="grid grid-cols-[subgrid] col-span-2 text-[#687588]">
                        Delivey Date: <span className='font-semibold text-[#111827] font-manrope'>12-SEP-2024</span>
                      </p>
                      <p className="grid grid-cols-[subgrid] col-span-2 text-[#687588]">
                        Dispatch Time: <span className='font-semibold text-[#111827] font-manrope'>12:00PM</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className='mb-6'>
                  <CardContent className='p-0'>

                    <div className='flex justify-between items-center mb-4 px-6 py-3 border-b'>
                      <h2 className='font-semibold'>Delivery Note</h2>
                      <LinkButton href="./new-order" variant='unstyled' size='sm'>
                        <Edit2 className='w-5 h-5 text-[#A0AEC0]' />
                      </LinkButton>
                    </div>
                    <p className='text-sm text-gray-600 p-6 pt-0'>Deliver in person</p>
                  </CardContent>
                </Card>
              </div>
            </section>


            <footer className="flex items-center justify-end gap-4 mb-10">
              <Button variant={"outline"} className="h-14 ml-auto px-16" onClick={openExportSummaryModal} >
                Export
              </Button>
              <Button className='w-max bg-gray-900 hover:bg-gray-800 text-white px-8  ' variant="inputButton" onClick={() => setprocessed(true)}>
                Send For Processing
              </Button>
            </footer>

            <OrderSummaryExportModal
              isModalOpen={isExportSummaaryModalOpen}
              closeModal={closeExportSummaryModal}
              orderData={orderData}
            />
          </div>
      }
    </>
  );
}