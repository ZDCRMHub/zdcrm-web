'use client';

import {useState, useEffect, KeyboardEvent} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import Link from 'next/link';

export function VerificationCode({onNext}: {onNext: () => void}) {
  const [code, setCode] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 3) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move focus to the previous input when backspace is pressed on an empty input
      const prevInput = document.getElementById(
        `code-${index - 1}`,
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        // Optionally, clear the previous input
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.every(digit => digit !== '')) {
      onNext();
    }
  };

  const handleResend = () => {
    // Implement resend logic here
    setTimeLeft(59);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <h2 className='text-4xl font-bold text-center'>Reset Password</h2>
      <p className='text-center text-gray-600'>Enter reset code</p>
      <div className='space-y-4 mx-10'>
        <p className='text-xl font-semibold'>Verification Code</p>
        <div className='flex justify-between'>
          {code.map((digit, index) => (
            <Input
              key={index}
              id={`code-${index}`}
              type='text'
              inputMode='numeric'
              pattern='\d*'
              maxLength={1}
              className='w-20 h-20 text-center text-2xl'
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              required
            />
          ))}
        </div>
        <p className='text-center text-sm'>
          Enter your code ({timeLeft < 10 ? `0${timeLeft}` : timeLeft})
        </p>
        <p className='text-center text-sm'>
          <span className='text-gray-600'>Not received? </span>
          <button
            type='button'
            onClick={handleResend}
            className='text-blue-600 hover:underline font-semibold'>
            RESEND
          </button>
        </p>
      </div>
      <Button type='submit' className='w-full h-[70px] text-lg'>
        Continue
      </Button>
      <p className='text-center text-sm'>
        <Link href='/login' className='hover:underline'>
          Back to <span className='text-blue-600'>login</span>
        </Link>
      </p>
    </form>
  );
}
