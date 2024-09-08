'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/password-input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    router.push('/order-timeline');
  };

  const inputClassName = 'h-[70px] p-6';

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center p-4'>
      <div className='w-full max-w-md'>
        <h1 className='text-5xl font-bold text-center mb-2'>Welcome Back 👋</h1>
        <p className='text-gray-500 text-center mb-6'>
          Kindly login with necessary credentials and access to your dashboard
        </p>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <p className='font-medium'>LOGIN</p>
          <Input
            type='email'
            placeholder='Enter Email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className={inputClassName}
          />
          <Input
            type="password"
            name='password'
            placeholder='Enter Password'
            value={formData.password}
            onChange={handleInputChange}
            className={inputClassName}
          />

          <Link href='/reset-password' className='mt-4'>
            Forgot Password? <span className='text-red-500'> Reset</span>
          </Link>
          <Button type='submit' className='w-full h-[70px]'>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
