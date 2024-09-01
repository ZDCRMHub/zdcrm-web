'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Eye, EyeOff} from 'lucide-react';
import {PasswordInput} from './password-input';

export function ResetPassword({
  email,
  onNext,
}: {
  email: string;
  onNext: () => void;
}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Handle password reset logic here
      console.log('Password reset successful');
      onNext();
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h2 className='text-5xl font-bold text-center'>Reset Password</h2>
      <p className='text-center text-gray-600'>Enter Reset Code</p>
      <div className='space-y-2'>
        <label htmlFor='new-password' className='text-sm font-medium'>
          New Password
        </label>
        <PasswordInput
          id='new-password'
          name='password'
          placeholder='Enter Password'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className='h-[70px] mb-10 mt-1'
        />
      </div>
      <div className='space-y-2'>
        <label htmlFor='confirm-password' className='text-sm font-medium'>
          Confirm Password
        </label>
        <PasswordInput
          id='confirm-password'
          name='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className='h-[70px] mb-10 mt-1'
        />
      </div>
      <Button type='submit' className='w-full'>
        Continue
      </Button>
    </form>
  );
}
