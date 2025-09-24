'use client'

import { Bell, Dot } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/contexts/auth';
import { convertPathToTitle, getInitials } from '@/utils/strings';

import { AvatarComponent, Button } from '../ui';
import Link from 'next/link';
import { NotificationBing } from 'iconsax-react';


export function Navbar() {
  const pathName = usePathname()
  const { user } = useAuth()


  return (
    <nav className='bg-[#F1F5F9] shadow-sm'>
      <div className='max-w-[1792px] w-full md:w-[95%] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-[100px]'>
          <div className='flex items-center'>
            <h1 className='flex items-center gap-2 text-lg font-semibold text-[#194A7A]'>
              <span className=' mr-2.5'><Dot className='text-[#F3C948] scale-150' /></span>
              {convertPathToTitle(pathName)}
            </h1>
          </div>
          <div className='flex items-center'>
            <Link href="/notifications">
                <Button variant="ghost" size="icon" className="relative border border-[#6884CA4D] rounded-full">
                <NotificationBing variant="Bold" className="h-5 w-5 text-[#194A7A]" />
              </Button>
            </Link>
            <div className='ml-4 relative'>
              <AvatarComponent
                fallback={user?.name || "0kay 0kay"}
                src={undefined}
                size='large'
                alt='profile' 

              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
