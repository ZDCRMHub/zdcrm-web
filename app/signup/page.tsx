'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {PasswordInput} from '@/components/password-input';
import {DialogBox} from '@/components/dialog-box';
import {SuccessMessage} from '@/components/success-message';
import {useRouter} from 'next/navigation';

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowSuccessDialog(true);
  };

  const handleProceed = () => {
    setShowSuccessDialog(false);
    // Navigate to the login page
    router.push('/login');
  };

  const inputClassName = 'h-[70px] p-6';

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center p-4'>
      <div className='w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center mb-2'>Get Started</h1>
        <p className='text-gray-500 text-center mb-6'>
          Complete signup on ZDCRM Hub
        </p>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {step === 1 ? (
            <>
              <p className='font-medium'>PERSONAL INFORMATION</p>
              <Input
                placeholder='Enter First Name'
                name='firstName'
                value={formData.firstName}
                onChange={handleInputChange}
                className={inputClassName}
              />
              <Input
                placeholder='Enter Last Name'
                name='lastName'
                value={formData.lastName}
                onChange={handleInputChange}
                className={inputClassName}
              />
              <Input
                type='email'
                placeholder='Enter Email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className={inputClassName}
              />
              <Input
                type='tel'
                placeholder='Enter Phone Number'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={inputClassName}
              />
              <Button
                type='button'
                className='w-full h-[70px]'
                onClick={() => setStep(2)}>
                Continue
              </Button>
            </>
          ) : (
            <>
              <p className='font-medium mb-2'>CREATE PASSWORD</p>
              <Input
              type="password"
                name='password'
                placeholder='Enter Password'
                value={formData.password}
                onChange={handleInputChange}
                className={inputClassName}
              />
              <Input
              type="password"
                name='confirmPassword'
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={inputClassName}
              />
              <Button type='submit' className='w-full h-[70px]'>
                Continue
              </Button>
            </>
          )}
        </form>
      </div>
      <DialogBox
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}>
        <SuccessMessage
          title='Success'
          message='Account verification complete'
          onProceed={handleProceed}
        />
      </DialogBox>
    </div>
  );
};

export default SignUpPage;
