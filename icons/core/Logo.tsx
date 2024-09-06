import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = ({ className }: { className?: string }) => {
    return (
        <Link href="/dashboard" className={cn('flex items-center h-[100px] py-6', className)}>
            <Image src='/img/logo.svg' alt='logo' width={28} height={24} />
            <h1 className='ml-2 text-xl font-semibold'>ZDCRM Hub</h1>
        </Link>
    )
}

export default Logo