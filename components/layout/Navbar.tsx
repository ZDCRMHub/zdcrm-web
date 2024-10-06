'use client'
import { convertPathToTitle } from '@/utils/strings';
import {Search, RefreshCw, User, Dot} from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Navbar() {
const pathName = usePathname()


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
            <div className='ml-4 relative'>
              <button className='flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out'>
                <Image
                  src='/img/ProfileIcon.svg'
                  alt='profile-icon'
                  width={50}
                  height={50}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
