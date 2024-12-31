'use client';

import { useState } from 'react';
import { ResetPasswordStep1, ResetPasswordStep2, ResetPasswordStep3 } from '../misc/components';
// import { Stepper } from '../misc/components/Stepper';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SuccessModal } from '@/components/ui';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const router = useRouter();
  const steps = ['Email', 'Verification', 'New Password'];

  const handleProceed = () => {
    setShowSuccessDialog(false);
    window.location.href = '/login';
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-full max-w-lg min-h-[35vh] py-12 md:px-6'>
        <CardHeader className='mb-8 text-center'>
          <CardTitle className='text-5xl font-bold text-center mb-2'>Reset Password</CardTitle>
          <CardDescription >Follow the steps to reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <Stepper currentStep={step} steps={steps} /> */}
          {step === 1 && (
            <ResetPasswordStep1
              onNext={(email) => {
                setEmail(email);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <ResetPasswordStep2
              email={email}
              onNext={(code) => {
                setCode(code);
                setStep(3);
              }}
            />
          )}
          {step === 3 && (
            <ResetPasswordStep3
              email={email}
              code={code}
              onNext={() => setShowSuccessDialog(true)}
            />
          )}
        </CardContent>
      </Card>

      <SuccessModal
        isModalOpen={showSuccessDialog}
        closeModal={() => router.push('/login')}
        heading='Password Changed!'
        subheading='Your password has been changed successfully.'
      />
    </div>
  );
}

