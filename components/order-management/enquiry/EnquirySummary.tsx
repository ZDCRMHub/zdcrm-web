'use client';

import {ArrowLeft, Edit2} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useRouter} from 'next/navigation';

export default function Component() {
  const router = useRouter();

  const goBack = () => {
    router.back(); // Use the back method
  };
  return (
    <div className='max-w-7xl mx-auto p-4 space-y-6'>
      <header className='flex items-center mb-6'>
        <Button
          variant='ghost'
          size='icon'
          className='mr-2'
          onClick={() => goBack()}>
          <ArrowLeft className='h-6 w-6' />
        </Button>
        <h1 className='text-2xl font-semibold'>Enquiry Summary</h1>
      </header>

      <Card className='w-full max-w-[518px] rounded-[16px]'>
        <CardContent className='flex flex-col justify-between'>
          <div className='py-6 gap-2.5'>
            <div className='flex items-center gap-1'>
              <h2 className='text-sm text-light-grey'>Customer Name:</h2>
              <p className='font-medium text-custom-blue'>Adetunji Emmanuel</p>
            </div>
            <div className='flex items-center gap-1'>
              <h2 className='text-sm text-light-grey'>Email:</h2>
              <p className='font-medium text-custom-blue'>adel23@gmail.com</p>
            </div>
            <div className='flex items-center gap-1'>
              <h2 className='text-sm text-light-grey'>Phone Number:</h2>
              <p className='font-medium text-custom-blue'>08034344433</p>
            </div>
          </div>
          <div className='flex justify-between items-center gap-1'>
            <div className='flex items-center gap-1'>
              <h2 className='text-xs text-light-grey font-medium'>
                Enquiry Occasion:
              </h2>
              <p className='text-xs text-bblack font-medium'>
                Happy Anniversary
              </p>
            </div>
            <div className='flex items-center gap-1'>
              <h2 className='text-xs text-light-grey font-medium'>
                Enquiry Channel:
              </h2>
              <p className='text-xs text-black font-medium'>Manual</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <div className='flex items-center gap-5'>
              <div className='h-12 w-12 flex items-center justify-center bg-custom-white rounded-full'>
                <Image src='/img/book.svg' alt='' width={24} height={24} />
              </div>
              <p className='text-custom-blue font-medium'>Discussion</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card className='w-full bg-custom-green bg-opacity-5 border-custom-blue'>
              <CardContent className='p-6'>
                <div className='space-y-6 relative'>
                  <div className='flex items-start gap-6'>
                    <div className='h-7 w-7 bg-custom-blue rounded-full flex items-center justify-center'>
                      <Image
                        src='/img/shopping-cart.svg'
                        alt=''
                        width={15}
                        height={15}
                      />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center justify-between'>
                        <h3 className='font-semibold text-base text-custom-blue'>
                          Ayoade started a discussion
                        </h3>
                        <div className='flex items-center gap-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='text-xs h-10 w-[107px] flex items-center gap-1.5'>
                            <Image
                              src='/img/note-text.svg'
                              alt=''
                              width={16}
                              height={16}
                            />
                            +Add Note
                          </Button>
                          <Select>
                            <SelectTrigger className='w-[100px] h-10'>
                              <SelectValue placeholder='Status' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='open'>Open</SelectItem>
                              <SelectItem value='closed'>Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className='mt-2 space-y-1 text-sm text-gray-600 relative pl-4'>
                        <div className='absolute left-0 top-2 bottom-2 w-px bg-gray-200'></div>
                        <p>
                          Client enquired specifically for a red velvet cake
                        </p>
                        <p>Client requested for it to be changed to blue</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-start gap-6'>
                    <div className='h-7 w-7 bg-custom-blue rounded-full flex items-center justify-center'>
                      <Image
                        src='/img/shopping-cart.svg'
                        alt=''
                        width={15}
                        height={15}
                      />
                    </div>
                    <div className=' flex-1 flex justify-between'>
                      <h3 className='font-semibold text-base text-custom-blue'>
                        Discussion Finalized
                      </h3>
                      <p className='text-xs text-red-500'>06:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className='flex gap-8'>
        <Card className='py-6 px-10'>
          <h2 className='font-semibold mb-4'>Item 1</h2>

          <Separator className='mb-2' />

          <div className='flex gap-10'>
            <div className='flex flex-col'>
              <div className='bg-white-grey rounded-[6px] w-fit'>
                <Image
                  src='/img/cake.png'
                  alt='Adeline Fautline Cake'
                  className='w-24 h-24 object-cover rounded-md p-2'
                  width={100}
                  height={100}
                />
              </div>

              <p className='text-custom-blue font-medium'>
                Adeline Fautline Cake
              </p>
            </div>
            <div className='space-y-2 text-sm'>
              <div className='flex items-center gap-5'>
                <p>
                  <span className='text-gray-500'>Quantity:</span> 1pcs
                </p>
                <p>
                  <span className='text-gray-500'>Category:</span> Cake
                </p>
                <p>
                  <span className='text-gray-500'>Size:</span> 6 inches
                </p>
                <p>
                  <span className='text-gray-500'>Layers:</span> 3 layers
                </p>
              </div>
              <p>
                <span className='text-gray-500'>Flavour:</span> Chocolate,
                Vanilla, Strawberry
              </p>
              <p>
                <span className='text-gray-500'>Cake toppings:</span> Fruits,
                chocolate & cookies
              </p>
              <p>
                <span className='text-gray-500'>Message on cake:</span> Love Me
                Like You Always Do
              </p>
            </div>
          </div>

          <Separator className='mt-7 mb-4' />

          <div className='flex items-end justify-end mb-4 w-full'>
            <p className='font-semibold'>Amount:</p>
            <p className='font-semibold'>₦50,000.00</p>
          </div>
        </Card>

        <div className='fle flex-col w-96 space-y-6'>
          <Card className='flex-1 space-y-4 p-5'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold'>Delivery Details</h2>
              <Edit2 className='h-5 w-5 text-blue-600' />
            </div>

            <Separator />

            <div className='flex items-center gap-5'>
              <h3 className='text-sm text-gray-500'>Delivery Date</h3>
              <p>14th/August/2024</p>
            </div>
          </Card>

          <Card className='flex-1 space-y-4 p-5'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold'>Delivery Note</h2>
              <Edit2 className='h-5 w-5 text-blue-600' />
            </div>

            <Separator />

            <div className='flex items-center gap-5'>
              <h3 className='text-sm text-gray-500'>Delivery Note</h3>
              <p>Deliver in person</p>
            </div>
          </Card>
        </div>
      </div>

      <Separator />

      <footer className='text-sm text-gray-500'>
        <p>Enquiry Logged by: Adeayo</p>
        <p>Placed on: 15th June, 2024 | 6:00pm</p>
      </footer>
    </div>
  );
}
