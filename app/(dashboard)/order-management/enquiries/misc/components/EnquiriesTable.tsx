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
import { format } from 'date-fns';

const enquiries = [
  {
    customerName: 'John Doe',
    phoneNumber: '08012345678',
    enquiryItems: ['Chocolate Cake', 'Red Wine', 'Small Teddy Bear'],
    deliveryNotes: 'Leave at the front desk',
    category: ['C', 'F', 'TB'],
    status: 'STILL DISCUSSING',
    deliveryDate: '2023-10-01',
  },
  {
    customerName: 'Jane Smith',
    phoneNumber: '08087654321',
    enquiryItems: ['Vanilla Cake', 'White Wine', 'Medium Teddy Bear'],
    deliveryNotes: 'Ring the doorbell',
    category: ['C', 'F', 'TB'],
    status: 'PAYMENT MADE',
    deliveryDate: '2023-10-02',
  },
  {
    customerName: 'Alice Johnson',
    phoneNumber: '08011223344',
    enquiryItems: ['Strawberry Cake', 'Champagne', 'Large Teddy Bear'],
    deliveryNotes: 'Leave with the neighbor',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
    deliveryDate: '2023-10-03',
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
    deliveryDate: '2023-10-03',
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
    deliveryDate: '2023-10-03',
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
    deliveryDate: '2023-10-03',
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
    deliveryDate: '2023-10-03',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['Delectable Choco cake', 'Moet Chandon', 'Large size teddy'],
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    deliveryDate: '2023-10-03',
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['Choco Drip Drop 104', 'Moet Chandon', 'Large size teddy'],
    deliveryNotes: 'Call Adeola',
    deliveryDate: '2023-10-03',
    category: ['C', 'F', 'TB'],
    status: 'PAYMENT MADE',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['Delectable Choco cake', 'Moet Chandon', 'Large size teddy'],
    deliveryNotes: 'Deliver at door step',
    deliveryDate: '2023-10-03',
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
    deliveryDate: '2023-10-03',
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
    deliveryDate: '2023-10-03',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
  {
    customerName: 'Ife Adebayo',
    phoneNumber: '08067556644',
    enquiryItems: ['Delectable Choco cake', 'Moet Chandon', 'Large size teddy'],
    deliveryDate: '2023-10-03',
    deliveryNotes: 'Deliver at door step',
    category: ['C', 'F', 'TB'],
    status: 'FINALIZED DISCUSSION',
  },
];


export default function EnquiriesTable() {
  const router = useRouter();

  
  const {
    state: isConfirmDeleteModalOpen,
    setTrue: openConfirmDeleteModal,
    setFalse: closeConfirmDeleteModal,
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
  
  const handleConfirm = () => {
    console.log(`Confirmed action`);
    closeConfirmApproveModal();
    closeSuccessModal();
    router.push("/order-management/orders")
  };
  
  


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-gray-500'>Customer Details</TableHead>
          <TableHead className='text-gray-500'>Enquiry Item</TableHead>
          <TableHead className='text-gray-500'>Delivery Notes</TableHead>
          <TableHead className='text-gray-500'>Delivery Date</TableHead>
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
            <TableCell className='uppercase'>{format(new Date(enquiry.deliveryDate), 'dd/MMM/yyyy')}</TableCell>
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
                    className='py-4 px-0 w-[235px]'>
                    <DropdownMenuItem
                      onClick={() => router.push('enquiries/enquiry-details')}>
                      <Link href='/enquiries/enquiry-details' className="w-full">
                        <span className='flex items-center gap-2 pl-6 py-3'>
                          <Image
                            src='/img/3d-rotate.svg'
                            alt=''
                            width={24}
                            height={24}
                          />
                          Enquiry Details
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onSelect={openConfirmApproveModal}>
                      <span className='flex items-center gap-2 pl-6 py-3'>
                        <Image
                          src='/img/cash.svg'
                          alt=''
                          width={24}
                          height={24}
                        />
                        Payment Confirmed
                      </span>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onSelect={openConfirmDeleteModal}>
                      <span className='flex items-center gap-2 pl-6  py-3'>
                        <Image
                          src='/img/trash.svg'
                          alt=''
                          width={24}
                          height={24}
                        />
                        Delete Enquiry
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>



      <ConfirmDeleteModal
        isModalOpen={isConfirmDeleteModalOpen}
        closeModal={closeConfirmDeleteModal}
        deleteFn={() => { }}
        heading='Delete Enquiry'
        subheading="This action means order enquiry be removed."

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
        heading='Order Approved!'
        subheading='Enquiry has been approved as an order'
      />

    </Table>

  );
}
