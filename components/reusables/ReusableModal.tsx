import React from 'react';
import {X} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Separator} from '../ui/separator';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  variant?: 'default' | 'destructive';
}

export function ReusableModal({
  isOpen,
  onClose,
  title,
  description,
  icon,
  confirmText,
  cancelText,
  onConfirm,
  variant = 'default',
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[569px] px-8 pt-7 pb-11'>
        <DialogHeader>
          <DialogTitle className='flex items-center justify-between pb-6'>
            {title}
          </DialogTitle>

          <Separator />
        </DialogHeader>
        <div className='flex flex-col items-center justify-center py-14'>
          {icon}

          {description && <DialogDescription>{description}</DialogDescription>}
        </div>
        <DialogFooter className='sm:justify-start'>
          <div className='w-full grid grid-cols-2 gap-4'>
            <Button variant='outline' onClick={onClose} className='py-6'>
              {cancelText}
            </Button>
            <Button variant={'default'} className='py-6' onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Example usage
export default function Component() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<'payment' | 'delete'>(
    'payment',
  );

  const openModal = (type: 'payment' | 'delete') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    // Handle confirmation logic here
    console.log(`Confirmed ${modalType} action`);
    closeModal();
  };

  const modalProps = {
    payment: {
      title: 'Confirm Request',
      description: 'This action converts Enquiries to Order',
      icon: (
        <div className='rounded-full bg-green-100 p-3'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z'
              stroke='#22C55E'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M3 10H21'
              stroke='#22C55E'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M7 14H7.01'
              stroke='#22C55E'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M11 14H13'
              stroke='#22C55E'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      ),
      confirmText: 'Yes, Approve',
      cancelText: 'No, Cancel',
      variant: 'default' as const,
    },
    delete: {
      title: 'Delete Enquiry',
      description: 'This action means order enquiry be removed.',
      icon: (
        <div className='rounded-full bg-red-100 p-3'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.53223 19 5.07183 19Z'
              stroke='#EF4444'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      ),
      confirmText: 'Yes, Delete',
      cancelText: 'No, Cancel',
      variant: 'destructive' as const,
    },
  };

  return (
    <div className='flex gap-4'>
      <Button onClick={() => openModal('payment')}>Open Payment Modal</Button>
      <Button onClick={() => openModal('delete')}>Open Delete Modal</Button>
      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        {...modalProps[modalType]}
      />
    </div>
  );
}
