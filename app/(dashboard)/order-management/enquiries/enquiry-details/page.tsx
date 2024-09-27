'use client';

import { ArrowLeft, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useRouter } from 'next/navigation';
import { CaretLeft } from '@phosphor-icons/react';
import { generateMockOrders } from '@/app/(dashboard)/order-timeline/misc/components/Timeline';
import { EditPenIcon } from '@/icons/core';
import ConfirmActionModal from '@/components/ui/confirmActionModal';
import { useBooleanStateControl } from '@/hooks';
import EnquiryDiscussCard from '@/app/(dashboard)/order-timeline/misc/components/EnquiryDiscussCard';

export default function Component() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  const mockDiscussion = generateMockOrders(1)[0];
  const {
    state: isConfirmModalOpen,
    setTrue: openConfirmModal,
    setFalse: closeConfirmModal,

  } = useBooleanStateControl()



  return (
    <div className='max-w-[1440px] mx-auto p-4 space-y-6 px-8'>
      <header className='flex items-center mb-6'>
        <Button
          variant='ghost'
          size='icon'
          className='mr-2'
          onClick={() => goBack()}>
          <CaretLeft className='h-6 w-6 text-[#A0AEC0]' />
        </Button>
        <h1 className='text-xl font-semibold font-manrope'>Enquiry Summary</h1>
      </header>

      <div className='flex gap-8'>
        <Card className='w-full max-w-[518px] rounded-lg'>
          <CardContent className='flex flex-col justify-between'>
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
            </div>
            <div className='flex justify-between items-center gap-1'>
              <div className='flex items-center gap-1'>
                <p className='text-sm text-light-grey font-medium'>
                  Enquiry Occasion:
                </p>
                <p className='text-xs text-[#111827] font-medium'>
                  Happy Anniversary
                </p>
              </div>
              <div className='flex items-center gap-1'>
                <p className='text-sm text-light-grey font-medium'>
                  Enquiry Channel:
                </p>
                <p className='text-sm text-[#111827] font-medium'>Manual</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='flex flex-col w-96 space-y-6'>
          <Card className='flex-1 space-y-4 p-5 rounded-xl'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold font-manrope text-sm'>Delivery Details</h2>
              <EditPenIcon className='h-5 w-5 text-[#A0AEC0]' />
            </div>

            <Separator />

            <div className='flex items-center gap-5'>
              <h3 className='text-sm text-gray-500'>Delivery Date</h3>
              <p className="text-[0.825rem] font-manrope">14th/August/2024</p>
            </div>
          </Card>

          <Card className='flex-1 space-y-4 p-5 rounded-xl'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold font-manrope text-sm'>Delivery Note</h2>
              <EditPenIcon className='h-5 w-5 text-[#A0AEC0]' />
            </div>

            <Separator />

            <div className='flex items-center gap-5'>
              <h3 className='text-sm text-gray-500'>Delivery Note</h3>
              <p className="text-[0.825rem] font-manrope">Deliver in person</p>
            </div>
          </Card>
        </div>
      </div>


      <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
        <AccordionItem value='item-1'>
          <AccordionTrigger className=''>
            <div className='flex items-center gap-5'>
              <div className='h-10 w-10 flex items-center justify-center bg-custom-white rounded-full'>
                <Image src='/img/book.svg' alt='' width={24} height={24} />
              </div>
              <p className='text-custom-blue font-medium'>Items</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card className='py-6 px-10 rounded-xl max-w-2xl'>
              <h2 className='font-semibold mb-4 text-sm font-manrope'>Item 1</h2>

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
                <div className='space-y-3 text-sm'>
                  <div className='flex items-center gap-x-5 gap-y-2 flex-wrap'>
                    <p className="flex items-center gap-1 text-[#111827] font-medium">
                      <span className='text-[#687588]'>Quantity:</span> 1 pcs
                    </p>
                    <p className="flex items-center gap-1 text-[#111827] font-medium">
                      <span className='text-[#687588]'>Category:</span> Cake
                    </p>
                    <p className="flex items-center gap-1 text-[#111827] font-medium">
                      <span className='text-[#687588]'>Size:</span> 6 inches
                    </p>
                    <p className="flex items-center gap-1 text-[#111827] font-medium">
                      <span className='text-[#687588]'>Layers:</span> 3 layers
                    </p>
                  </div>
                  <p className="text-[#111827] font-medium">
                    <span className='text-[#687588]'>Flavour:</span> Chocolate,
                    Vanilla, Strawberry
                  </p>
                  <p className="text-[#111827] font-medium">
                    <span className='text-[#687588]'>Cake toppings:</span> Fruits,
                    chocolate & cookies
                  </p>
                  <p className="text-[#111827] font-medium">
                    <span className='text-[#687588]'>Message on cake:</span> Love Me
                    Like You Always Do
                  </p>
                </div>
              </div>

              <Separator className='mt-7 mb-4' />

              <div className='flex items-end justify-end mb-3 w-full'>
                <p className='font-semibold text-[#194A7A]'>Amount:{" "}</p>
                <p className='font-semibold text-[#194A7A]'>₦50,000.00</p>
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>


      <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
        <AccordionItem value='item-1'>
          <AccordionTrigger className=''>
            <div className='flex items-center gap-5'>
              <div className='h-10 w-10 flex items-center justify-center bg-custom-white rounded-full'>
                <Image src='/img/book.svg' alt='' width={24} height={24} />
              </div>
              <p className='text-custom-blue font-medium'>Discussion</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <EnquiryDiscussCard isExpanded order={mockDiscussion} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className='py-6 px-10 rounded-xl max-w-lg mt-10'>
        <h2 className='font-semibold mb-4 text-sm font-manrope'>PAYMENT INFORMATION</h2>

        <Separator className='mb-2' />

        <div className='space-y-3 text-sm'>
          <p className="flex items-center gap-1 text-[#111827] font-medium">
            <span className='text-[#687588] text-xs'>Customer Name:</span> Susan Odere
          </p>
          <p className="flex items-center gap-1 text-[#111827] font-medium">
            <span className='text-[#687588] text-xs'>Payment Mode:</span> Bank Transfer
          </p>
          <p className="flex items-center gap-1 text-[#111827] font-medium">
            <span className='text-[#687588] text-xs'>Payment Status:</span> Paid (Naira Transfer)
          </p>
        </div>

      </Card>




      <div className="flex justify-end py-8" >
        <Button variant="black" onClick={openConfirmModal} size="lg">
          Confirm for processing
        </Button>
      </div>

      <Separator />

      <footer className='flex items-center justify-between w-full text-sm text-gray-500 mb-8'>
        <p className="text-black font-medium font-poppins">Enquiry Logged by: Adeayo</p>
        <p className="text-black font-medium font-poppins">Placed on: 15th June, 2024 | 6:00pm</p>
      </footer>




      <ConfirmActionModal
        isModalOpen={isConfirmModalOpen}
        closeModal={closeConfirmModal}
        confirmFn={() => { }}
        heading='Client made payment'
        subheading="This action converts Enquiries to Order"

      />
    </div>
  );
}
