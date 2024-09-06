"use client"
import { Button } from '@/components/ui';
import { Notepad2 } from 'iconsax-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { ArrowLeft2, UserOctagon } from 'iconsax-react';

const CompleteOrderPage = () => {
    const router = useRouter();
    const goBack = () => {
        router.back();
    }
    return (
        <div>
            <header className="flex items-center border-b border-b-[#00000021] w-full pt-4">
                <Button
                    variant='ghost'
                    size='icon'
                    className='mr-2'
                    onClick={() => goBack()}>
                    <ArrowLeft2 className='h-6 w-6 text-[#A0AEC0]' />
                </Button>
                <p className='relative flex items-center gap-2 text-base text-[#111827] w-max p-1'>
                    <Notepad2 size={19} />
                    Delivery notes
                    <span className="absolute h-[2px] w-full bottom-[-6px] left-0 bg-black" />
                </p>
            </header>

        </div>
    )
}

export default CompleteOrderPage