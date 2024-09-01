// File: components/Navbar.tsx
import {Search, RefreshCw, User, CircleUserRound} from 'lucide-react';
import Image from 'next/image';

export function Navbar() {
  return (
    <nav className='bg-[#F1F5F9] shadow-sm'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-[121px]'>
          <div className='flex items-center'>
            <h1 className='text-xl font-semibold text-gray-800'>
              <span className='text-[#F3C948] mr-2.5'>•</span>
              Order Timeline
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
