'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ElipsisHorizontal } from '@/icons/core';
import { useBooleanStateControl } from '@/hooks';
import { ConfirmActionModal, ConfirmDeleteModal, SuccessModal } from '@/components/ui';
import ConfirmPaymentModal from './ConfirmPaymentModal';
import { I3DRotate, Refresh } from 'iconsax-react';

const enquiries = [
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: [
      'Adeline Faultline Cake',
      'Moet Chandon',
      'Large size teddy',
    ],
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: [
      'Adeline Faultline Cake',
      'Moet Chandon',
      'Large size teddy',
    ],
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: [
      'Adeline Faultline Cake',
      'Moet Chandon',
      'Large size teddy',
    ],
    deliveryNotes: 'Call Simisola',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['A stem of chrys', 'Moet Chandon', 'Large size teddy'],
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['Delectable Choco cake', 'Moet Chandon', 'Large size teddy'],
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['Choco Drip Drop 104', 'Moet Chandon', 'Large size teddy'],
    deliveryNotes: 'Call Adeola',
    category: ['C', 'F', 'TB'],
    status: 'PAYMENT MADE',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['Delectable Choco cake', 'Moet Chandon', 'Large size teddy'],
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: [
      'Adeline Faultline Cake',
      'Moet Chandon',
      'Large size teddy',
    ],
    deliveryNotes: 'Call Simisola',
    category: ['C', 'F', 'TB'],
    status: 'STILL DISCUSSING',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: [
      'Adeline Faultline Cake',
      'Moet Chandon',
      'Large size teddy',
    ],
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['Delectable Choco cake', 'Moet Chandon', 'Large size teddy'],
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
];


export default function TrashedEnquiriesTable() {
  const router = useRouter();

  const handleConfirm = () => {
    console.log(`Confirmed action`);
    closeConfirmApproveModal();
    router.push("/order-management/orders")
  };

  const {
    state: isConfirmRestoreModalOpen,
    setTrue: openConfirmDeleteModal,
    setFalse: closeConfirmRestoreeModal,
  } = useBooleanStateControl()

  const {
    state: isConfirmApproveModalOpen,
    setTrue: openConfirmApproveModal,
    setFalse: closeConfirmApproveModal,
  } = useBooleanStateControl()

  const {
    state: isSuccessModalOpen,
    setTrue: openSuccessModal,
    setFalse: closeSuccessModal
  } = useBooleanStateControl()





  return (
    <Table className='w-full'>
      <TableHeader>
        <TableRow>
          <TableHead className='text-gray-500'>Customer Details</TableHead>
          <TableHead className='text-gray-500'>Enquiry Item</TableHead>
          <TableHead className='text-gray-500'>Delivery Notes</TableHead>
          <TableHead className='text-gray-500'>Category</TableHead>
          <TableHead className='text-gray-500'>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {enquiries.map((enquiry, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className='font-medium !min-w-max'>{enquiry.customerName}</div>
              <div className='text-sm text-gray-500'>
                {enquiry.phoneNumber}
              </div>
            </TableCell>
            <TableCell>
              {enquiry.enquiryItems.map((item, idx) => (
                <div key={idx} className='!min-w-max'>{item}</div>
              ))}
            </TableCell>
            <TableCell>{enquiry.deliveryNotes}</TableCell>
            <TableCell>
              <div className='flex space-x-1'>
                {enquiry.category.map((cat, idx) => (
                  <Badge key={idx} variant='outline' className='flex items-center justify-center bg-transparent text-[#A7A7A7] font-normal rounded-sm h-5 w-5'>
                    {cat}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className='min-w-full max-w-max grid grid-cols-[1fr,0.5fr] items-center '>
                <Badge
                  variant='secondary'
                  className={cn(
                    "rounded-md w-max",
                    `${enquiry.status === 'FINALIZED DISCUSSION'
                      ? 'bg-[#E7F7EF] text-[#0CAF60]'
                      : enquiry.status === 'PAYMENT MADE'
                        ? 'bg-[#BF6A021C] text-[#BF6A02]'
                        : 'bg-[#F4F0FF] text-[#8C62FF]'

                    }`)}>
                  {enquiry.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <ElipsisHorizontal className='h-6 w-6' />
                      <span className='sr-only'>Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='end'
                    className='p-4 space-y-2 w-max max-w-[220px]'>
                    <DropdownMenuItem
                      onClick={() => router.push('trash/details')} className="flex items-center justify-center px-3.5 py-2 font-sans hover:!bg-primary hover:!text-white cursor-pointer rounded-xl border hover:border-transparent">
                      <Link href='/trash/details' className="flex items-center justify-center gap-2 w-full">
                        <I3DRotate
                          size={22}
                        />
                        Enquiry Details
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={openConfirmDeleteModal} className="flex items-center justify-center gap-2 px-3.5 py-2 font-sans hover:!bg-primary hover:!text-white cursor-pointer rounded-xl border hover:border-transparent">
                      <Refresh
                        size={20}
                      />
                      Restore Enquiry
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>



      <ConfirmActionModal
        isModalOpen={isConfirmRestoreModalOpen}
        closeModal={closeConfirmRestoreeModal}
        confirmFn={() => { }}
        heading='Restore Enquiry'
        subheading="This action means this enquiry will be restored and added back to the enquiry table."

      />

      <ConfirmPaymentModal
        isModalOpen={isConfirmApproveModalOpen}
        closeModal={closeConfirmApproveModal}
        nextStep={openSuccessModal}
        heading='Client made payment'
        subheading="This action converts Enquiries to Order"

      />

      <SuccessModal
        closeModal={handleConfirm}
        isModalOpen={isSuccessModalOpen}
      />

    </Table>

  );
}
