import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href="/dashboard" className='flex items-center h-[121px] py-6'>
            <Image src='/img/logo.svg' alt='logo' width={28} height={24} />
            <h1 className='ml-2 text-xl font-semibold'>ZDCRM Hub</h1>
        </Link>
    )
}

export default Logo