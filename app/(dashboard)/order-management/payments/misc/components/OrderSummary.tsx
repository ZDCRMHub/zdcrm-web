'use client'
import React, { useState } from 'react';
import { ArrowLeft, Pencil, Plus } from 'lucide-react';
import { Input, Button, LinkButton } from '@/components/ui';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Edit2 } from 'iconsax-react';
import { useRouter } from 'next/navigation';

export default function OrderSummary() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  const [processed, setprocessed] = useState(false)


  return (
    <>
      {
        processed ? (
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
          <div className='flex flex-col max-w-[1280px] mr-auto p-6 xl:px-12'>
            <div className='flex items-center mb-8'>
              <Button
                variant='ghost'
                size='icon'
                className='mr-2'
                onClick={() => goBack()}>
                <ArrowLeft className='h-6 w-6 text-[#A0AEC0]' />
              </Button>
              <h1 className='text-2xl font-semibold font-manrope'>Order Summary</h1>
            </div>

            <section className='bg-white p-6 rounded-2xl shadow-sm mb-6'>
              <div className='grid grid-cols-3 gap-6 mb-6'>
                <div>
                  <p className='text-lg text-gray-500'>
                    Customer Name:{' '}
                    <span className='text-[#194A7A] text-xl font-medium'>
                      Adetunji Emmanuel
                    </span>
                  </p>
                  <p className='text-sm text-gray-500 mt-2'>Phone Number: 08034344433</p>
                </div>
                <div>
                  <p className='text-lg text-gray-500'>
                    Recipient Name:{' '}
                    <span className='text-[#194A7A] text-xl font-medium'>Lawal Rose</span>
                  </p>
                  <p className='text-sm text-gray-500 mt-2'>Phone Number: 08034344433</p>
                </div>
                <p className='text-sm text-gray-500'>
                  Order Occasion: <span className='font-medium'>Birthday</span>
                </p>
              </div>
            </section>

            <section className='grid grid-cols-[1fr,0.5fr] gap-8 mt-6 '>
              <div>
                <article className="flex gap-6 w-full max-w-[800px] bg-white p-6 rounded-2xl mb-10 text-sm">
                  <div className='relative w-[180px] aspect-[5/3] p-6 rounded-xl bg-[#F6F6F6]'>
                    <Image
                      src='/img/cake.png'
                      alt='cake'
                      fill
                      className='object-cover rounded-xl border-8 border-[#F6F6F6]'
                    />
                  </div>
                  <section className='flex flex-col justify-between'><h5 className="text-[#194A7A] text-lg font-medium">
                    Adeline Fautline Cake
                  </h5>
                    <div className='py-6 space-y-3'>
                      <div className="flex items-center gap-x-4 flex-wrap font-medium">
                        <p className="text-[#687588]">
                          Quantity:{" "}
                          <span className="text-[#111827] font-medium">
                            1pcs
                          </span>
                        </p>
                        <p className="text-[#687588]">
                          Category:{" "}
                          <span className="text-[#111827] font-medium">
                            Cake
                          </span>
                        </p>
                        <p className="text-[#687588]">
                          Size:{" "}
                          <span className="text-[#111827] font-medium">
                            6 inches
                          </span>
                        </p>
                        <p className="text-[#687588]">
                          Layers:{" "}
                          <span className="text-[#111827] font-medium">
                            3 layers
                          </span>
                        </p>
                      </div>
                      <p className="text-[#687588]">
                        Flavour: {" "}
                        <span className="text-[#111827] font-medium">
                          Chocolate, Vanilla, Strawberry
                        </span>
                      </p>
                      <p className="text-[#687588]">
                        Cake toppings: {" "}
                        <span className="text-[#111827] font-medium">
                          Fruits, chocolate & cookies
                        </span>
                      </p>
                      <p className="text-[#687588]">
                        Message on cake: {" "}
                        <span className="text-[#111827] font-medium">
                          Love Me Like You Always Do
                        </span>
                      </p>
                    </div>
                    <div className='flex justify-between items-center gap-1'>

                    </div>
                  </section>
                </article>

                <article className='mb-6'>
                  <div className='p-6'>
                    <h2 className='font-semibold mb-4'>Additional Cost</h2>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                      <div>
                        <label className='text-sm text-gray-500 mb-1 block'>
                          Item Name
                        </label>
                        <Input placeholder='Enter additional item name' />
                      </div>
                      <div>
                        <label className='text-sm text-gray-500 mb-1 block'>Cost</label>
                        <Input placeholder='Enter cost' />
                      </div>
                    </div>
                    <div className='flex justify-between items-center'>
                      <Button variant='outline' size='sm'>
                        <Plus className='w-4 h-4 mr-2' /> Add More
                      </Button>
                      <Button className='px-5 bg-[#53A02F] rounded-none hover:bg-[#53a02fbd]'>Save</Button>
                    </div>

                    <div className='text- my-6 text-right'>
                      <p className='text-base font-medium text-[#8B909A]'>Total (NGN)</p>
                      <p className='text-xl font-semibold'>₦50,000.00</p>
                    </div>

                  </div>
                </article>
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
                    <div className='grid grid-cols-[max-content,1fr] gap-4 text-[0.75rem] px-4 pb-4'>
                      <p className="grid grid-cols-[subgrid] col-span-2 text-[#687588]">
                        Primary address:{' '}
                        <span className='font-medium text-[#111827] font-manrope'>
                          No. 45, Adeniji close, Lekki Phase 1
                        </span>
                      </p>
                      <p className="grid grid-cols-[subgrid] col-span-2 text-[#687588]">
                        Country: <span className='font-medium text-[#111827] font-manrope'>Nigeria</span>
                      </p>
                      <p className="grid grid-cols-[subgrid] col-span-2 text-[#687588]">
                        State: <span className='font-medium text-[#111827] font-manrope'>Lagos</span>
                      </p>
                      <p className="grid grid-cols-[subgrid] col-span-2 text-[#687588]">
                        City: <span className='font-medium text-[#111827] font-manrope'>Ikeja</span>
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


            <Button className='w-max bg-gray-900 hover:bg-gray-800 text-white ml-auto px-8  ' variant="inputButton" onClick={() => setprocessed(true)}>
              Send For Processing
            </Button>
          </div>
      }
    </>
  );
}
