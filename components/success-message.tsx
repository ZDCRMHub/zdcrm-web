import React from 'react';
import {Button} from '@/components/ui/button';
import {CheckCircle} from 'lucide-react';
import Image from 'next/image';

interface SuccessMessageProps {
  title: string;
  message: string;
  onProceed: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title,
  message,
  onProceed,
}) => {
  return (
    <div className='flex flex-col items-center justify-center p-6'>
      <div className='relative w-full h-48 mb-4'>
        <Image
          src='/img/Illustration.png'
          alt='illustration'
          layout='fill'
          objectFit='contain'
        />
      </div>
      <h2 className='text-2xl font-bold text-center mb-2 text-[#00A825]'>
        {title}
      </h2>
      <p className='text-gray-600 text-center mb-6'>{message}</p>
      <Button onClick={onProceed} className='w-full h-[70px] rounded-[10px]'>
        Proceed
      </Button>
    </div>
  );
};
