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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui';
import EnquiriesTable from './EnquiriesTable';
import TabBar from '@/components/TabBar';

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

export default function EnquiriesDashboard() {
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
    <div className='max-w-7xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-6 gap-4'>
        <div className='flex items-center gap-2 w-80 grow'>
          <Input
            type='text'
            placeholder='Search (client name, customer rep, phone number)'
            className='w-full focus:border min-w-[300px]'
            rightIcon={<Search className='h-5 w-5' />}
          />
          <Select >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='default' className='bg-black text-white'>
            <Plus className='mr-2 h-4 w-4' /> Add Enquiry
          </Button>
          <Button
            variant='outline'
            className='bg-[#28C76F] text-[#1EA566] bg-opacity-25'>
            <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
          </Button>
        </div>
      </div>

      <TabBar tabs={tabs} onTabClick={setActiveTab} activeTab={activeTab} />

      <Accordion type="single" collapsible className="w-full max-w-[1200px] mt-8" defaultValue='today'>
        <AccordionItem value="today">
          <AccordionTrigger>Today, {format(new Date(), 'dd MMMM yyyy')}</AccordionTrigger>
          <AccordionContent className='px-4'>
            <EnquiriesTable />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="tomorrow">
          <AccordionTrigger>TOMORROW</AccordionTrigger>
          <AccordionContent className='px-4'>
            <EnquiriesTable />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="within72Hours">
          <AccordionTrigger>IN 72 HOURS</AccordionTrigger>
          <AccordionContent className='px-4'>
            <EnquiriesTable />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="within7Days">
          <AccordionTrigger>IN 7 DAYS</AccordionTrigger>
          <AccordionContent className='px-4'>
            <EnquiriesTable />
          </AccordionContent>
        </AccordionItem>
      </Accordion>



    </div>
  );
}
