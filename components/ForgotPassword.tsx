'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import Link from 'next/link';

export function ForgotPassword({onNext}: {onNext: (email: string) => void}) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(email);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-16'>
      <div className='space-y-2'>
        <h2 className='text-5xl font-bold text-center'>Forgot Password?</h2>
        <p className='text-center text-gray-600'>
          Enter your email to reset password
        </p>
      </div>
      <div className=''>
        <label htmlFor='email' className='text-sm font-medium'>
          Email Address
        </label>
        <Input
          id='email'
          type='email'
          placeholder='e.g. matthew@email.com'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className='h-[70px] mb-10 mt-1'
        />
        <Button type='submit' className='w-full h-[70px]'>
          Reset Password
        </Button>
      </div>
      <p className='text-center text-sm'>
        <Link href='/login' className='hover:underline'>
          Back to <span className='text-blue-600'>login</span>
        </Link>
      </p>
    </form>
  );
}
