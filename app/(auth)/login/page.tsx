'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth';
import { Spinner } from '@/components/ui';
import useErrorModalState from '@/hooks/useErrorModalState';
import ErrorModal from '@/components/ui/modal-error';
import { formatAxiosErrorMessage } from '@/utils/errors';


const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { useSignIn: useLogin } = useAuth();
  const { mutate: handleLogin, isPending: isLoggingIn } = useLogin();


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
        router.push('/order-timeline');
      },
      onError: (error: unknown) => {
        const errorMessage = formatAxiosErrorMessage(error as any)
        openErrorModalWithMessage(errorMessage)
      }
    })
  };


  const {
    isErrorModalOpen,
    errorModalMessage,
    openErrorModalWithMessage,
    closeErrorModal,
    setErrorModalState
  } = useErrorModalState()



  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center p-4'>
      <div className='w-full max-w-md'>
        <h1 className='text-5xl font-bold text-center mb-2'>Welcome Back 👋</h1>
        <p className='text-gray-500 text-center mb-6'>
          Kindly login with necessary credentials and access to your dashboard
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-6'>
          <p className='font-medium'>LOGIN</p>
          <Input
            type='email'
            placeholder='Enter Email'
            {...register('email')}
            hasError={!!errors.email}
            errorMessage={errors?.email?.message}
          />
          <div>
            <Input
              type="password"
              placeholder='Enter Password'
              {...register('password')}
              hasError={!!errors.password}
              errorMessage={errors?.password?.message}
            />
            <Link href='/reset-password' className='mt-4 text-sm p-2 mt-6 hover:underline'>
              Forgot Password? <span className='text-red-500'> Reset</span>
            </Link>
          </div>
          <Button type='submit' className='w-full h-[70px]'>
            Continue
            {
              isLoggingIn && <Spinner className='ml-2' />
            }
          </Button>
        </form>
      </div>


      <ErrorModal
        heading='An error Occured'
        subheading={errorModalMessage || "Check your inputs"}
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={setErrorModalState}
      >
        <div className="p-5 rounded-t-2xl rounded-b-3xl bg-red-200">
          <Button variant="destructive" className='w-full' onClick={closeErrorModal}>
            Okay
          </Button>
        </div>
      </ErrorModal>
    </div>
  );
};

export default LoginPage;