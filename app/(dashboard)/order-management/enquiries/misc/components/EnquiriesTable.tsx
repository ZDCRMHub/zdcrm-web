'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  Plus,
  MoreHorizontal,
  RefreshCcw,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PiWarningDiamondDuotone } from 'react-icons/pi';
import { ReusableModal } from '@/components/reusables/ReusableModal';

const enquiries = [
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
];

const tabs = [
  { name: 'All Enquiries', count: 840 },
  { name: 'In Cart', count: 400 },
  { name: 'Manual Enquiries', count: 450 },
];

export default function EnquiriesTable() {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'payment' | 'delete'>('payment');

  const openModal = (type: 'payment' | 'delete') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    console.log(`Confirmed ${modalType} action`);
    closeModal();
  };

  const modalProps = {
    payment: {
      title: 'Confirm Request',
      description: 'This action converts Enquiries to Order',
      icon: (
        <div className='flex flex-col justify-center items-center mb-3'>
          {/* <DollarSign className='h-20 w-20 text-red-600 mb-8' /> */}
          <Image
            src='/img/box-tick.svg'
            alt=''
            height={54}
            width={54}
            className='mb-6'
          />

          <p className='text-center font-semibold text-custom-blue text-2xl'>
            Client made payment
          </p>
        </div>
      ),
      confirmText: 'Yes, Approve',
      cancelText: 'No, Cancel',
      variant: 'default' as const,
    },
    delete: {
      title: 'Delete Enquiry',
      description: 'This action means order enquiry will be removed.',
      icon: (
        <div className='flex flex-col justify-center items-center mb-3'>
          <PiWarningDiamondDuotone className='h-20 w-20 text-red-600 mb-8' />

          <p className='text-center font-semibold text-custom-red text-2xl'>
            Delete Enquiry
          </p>
        </div>
      ),
      confirmText: 'Yes, Delete',
      cancelText: 'No, Cancel',
      variant: 'destructive' as const,
    },
  };

  return (
    <Table>
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
              <div className='font-medium'>{enquiry.customerName}</div>
              <div className='text-sm text-gray-500'>
                {enquiry.phoneNumber}
              </div>
            </TableCell>
            <TableCell>
              {enquiry.enquiryItems.map((item, idx) => (
                <div key={idx}>{item}</div>
              ))}
            </TableCell>
            <TableCell>{enquiry.deliveryNotes}</TableCell>
            <TableCell>
              <div className='flex space-x-1'>
                {enquiry.category.map((cat, idx) => (
                  <Badge key={idx} variant='outline' className='bg-gray-100'>
                    {cat}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant='secondary'
                className={`${enquiry.status === 'FINALIZED DISCUSSION'
                    ? 'bg-green-100 text-green-800'
                    : enquiry.status === 'PAYMENT MADE'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                {enquiry.status}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='py-7 px-0 w-[235px]'>
                  <DropdownMenuItem
                    onClick={() => router.push('enquiries/enquiry-details')}>
                    <span className='flex items-center gap-2 pl-6 py-3'>
                      <Image
                        src='/img/3d-rotate.svg'
                        alt=''
                        width={24}
                        height={24}
                      />
                      Enquiry Details
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => openModal('payment')}>
                    <span className='flex items-center gap-2 pl-6 py-3'>
                      <Image
                        src='/img/cash.svg'
                        alt=''
                        width={24}
                        height={24}
                      />
                      Payment Confirmed
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => openModal('delete')}>
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        {...modalProps[modalType]}
      />
    </Table>

  );
}
