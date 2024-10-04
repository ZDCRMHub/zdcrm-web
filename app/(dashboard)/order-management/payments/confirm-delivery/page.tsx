'use client'

import { Button, Card, Input, LinkButton } from '@/components/ui';
import { Separator } from '@/components/ui/separator';
import { EditPenIcon } from '@/icons/core';
import { ArrowLeft2, UserOctagon } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const OrdeManagementDelivery = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  }

  return (
    <div className='max-w-[1440px] mx-auto p-4 space-y-6 px-8'>
      <header className='flex items-center mb-10'>
        <Button
          variant='ghost'
          size='icon'
          className='mr-2'
          onClick={() => goBack()}>
          <ArrowLeft2 className='h-6 w-6 text-[#A0AEC0]' />
        </Button>
        <Button >
          Delivery ID: ZD-LM3243
        </Button>
        <Button className='flex items-center gap-1 ml-2.5' variant="outline">
          <UserOctagon size={13} />
          <span className='text-[#6C6C6C]'>
            Admin:
          </span>
          <span className='font-bold text-[#1C1C1C]'>
            Peter Racheal
          </span>
        </Button>
      </header>

      <section className="grid grid-cols-2 gap-8">
        <Card className='flex-1 space-y-4 p-5 rounded-2xl'>
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold font-manrope text-sm'>Delivery Details</h2>
          </div>

          <Separator />

          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Primary address</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">No. 8, Adeniran close, Lekki Phase 1</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Country</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">Nigeria</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>State/City</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">Lagos/Ikeja</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Delivery Date</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">2/July/2024</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Location Zone</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">Lagos Mainland</p>
          </div>
        </Card>


        <Card className='flex-1 space-y-4 p-5 rounded-2xl'>
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold font-manrope text-sm'>Recipient Details</h2>
          </div>
          <Separator />
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Name</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">Abdulwahab Adeyinka</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Phone number</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">08134554455</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Primary address</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">No. 8, Adeniran close, Lekki Phase 1</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>State/City</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">Lagos/Ikeja</p>
          </div>
        </Card>


        <div className='flex flex-col space-y-8 p-5 rounded-2xl'>
          <Input
            label='Driver Name*'
            type='text'
            placeholder='Enter delivery note'
            className='w-full focus:border min-w-[350px] text-xs'
          />
          <Input
            label='Phone Number *'
            type='text'
            placeholder='Enter delivery note'
            className='w-full focus:border min-w-[350px] text-xs'
          />
          <Input
            label='Delivery Platform *'
            type='text'
            placeholder='Enter delivery platform'
            className='w-full focus:border min-w-[350px] text-xs'
          />

          <LinkButton href="./complete-order" variant='default' className='bg-black text-white w-full h-14' size="lg">
            Proceed
          </LinkButton>

        </div>
      </section>
    </div>
  );
};

export default OrdeManagementDelivery;
