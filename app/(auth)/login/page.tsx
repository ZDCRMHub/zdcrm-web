'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSignIn } from '../misc/api';
import { useAuth } from '@/contexts/auth';

// Zod Schema for Login Validation
const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { useSignIn: useLogin } = useAuth();
  const { mutate: handleLogin } = useLogin();

  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    handleLogin({
      email: data.email,
      password: data.password
    }, {
      onSuccess: (data) => {
        console.log(data)
        router.push('/order-timeline');
      }
    })
  };


  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center p-4'>
      <div className='w-full max-w-md'>
        <h1 className='text-5xl font-bold text-center mb-2'>Welcome Back 👋</h1>
        <p className='text-gray-500 text-center mb-6'>
          Kindly login with necessary credentials and access to your dashboard
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <p className='font-medium'>LOGIN</p>
          <div>
            <Input
              type='email'
              placeholder='Enter Email'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-500 mt-1'>{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder='Enter Password'
              {...register('password')}
            />
            {errors.password && (
              <p className='text-red-500 mt-1'>{errors.password.message}</p>
            )}
          </div>
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