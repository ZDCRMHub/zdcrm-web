// 'use client';

// import {useState} from 'react';
// import {ForgotPassword} from '@/components/ForgotPassword';
// import {VerificationCode} from '@/components/VerificationCode';
// import {ResetPassword} from '@/components/ResetPassword';
// import {SuccessMessage} from '@/components/success-message';

// export default function ResetPasswordPage() {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState('');

//   return (
//     <div className='flex items-center justify-center min-h-screen bg-gray-100'>
//       <div className='w-full max-w-lg p-8 space-y-8'>
//         {step === 1 && (
//           <ForgotPassword
//             onNext={email => {
//               setEmail(email);
//               setStep(2);
//             }}
//           />
//         )}
//         {step === 2 && <VerificationCode onNext={() => setStep(3)} />}
//         {step === 3 && (
//           <ResetPassword
//             email={email}
//             onNext={() => setStep(4)}
//             //   onSuccess={() => setStep(4)}
//           />
//         )}
//         {step === 4 && (
//           <SuccessMessage
//             title='Password Changed!'
//             message='Your password has been changed successfully'
//             onProceed={() => {
//               // Handle proceeding after successful password reset
//               // For example, redirect to login page
//               window.location.href = '/login';
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import {useState} from 'react';
import {ForgotPassword} from '@/components/ForgotPassword';
import {VerificationCode} from '@/components/VerificationCode';
import {ResetPassword} from '@/components/ResetPassword';
import {SuccessMessage} from '@/components/success-message';
import {DialogBox} from '@/components/dialog-box';

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleProceed = () => {
    setShowSuccessDialog(false);
    // Handle proceeding after successful password reset
    // For example, redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-lg p-8 space-y-8'>
        {step === 1 && (
          <ForgotPassword
            onNext={email => {
              setEmail(email);
              setStep(2);
            }}
          />
        )}
        {step === 2 && <VerificationCode onNext={() => setStep(3)} />}
        {step === 3 && (
          <ResetPassword
            email={email}
            onNext={() => {
              setStep(4);
              setShowSuccessDialog(true);
            }}
          />
        )}
      </div>

      <DialogBox
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}>
        <SuccessMessage
          title='Password Changed!'
          message='Your password has been changed successfully'
          onProceed={handleProceed}
        />
      </DialogBox>
    </div>
  );
}
