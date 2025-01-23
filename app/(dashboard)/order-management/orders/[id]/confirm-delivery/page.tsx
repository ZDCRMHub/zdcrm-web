'use client'

import React from 'react';
import { ArrowLeft2, UserOctagon } from 'iconsax-react';
import { useParams, useRouter } from 'next/navigation';

import { Button, Card, Input, LinkButton, Spinner } from '@/components/ui';
import { Separator } from '@/components/ui/separator';

import { useGetOrderDetail, useUpdateDriverDetails } from '../../../misc/api';
import { OrderManagementDeliverySkeleton } from '../../../misc/components';
import { useAuth } from '@/contexts/auth';
import { format } from 'date-fns';
import { formatTimeString } from '@/utils/strings';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { extractErrorMessage } from '@/utils/errors';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/utils/currency';

const deliveryFormSchema = z.object({
  driver_name: z.string().min(1, 'Driver Name is required'),
  driver_phone: z.string().min(1, 'Phone Number is required'),
  delivery_platform: z.string().min(1, 'Delivery Platform is required'),
  delivery_expense: z.number().min(1, 'Delivery Expenses is required'),
  tracking_link: z.string({ message: "Enter a valid url" }).url().min(1, 'Tracking Link is required'),
});

export type DeliveryDriverFormType = z.infer<typeof deliveryFormSchema>;

const OrdeManagementDelivery = () => {
  const order_id = useParams()?.id as string;
  const { data: order, isLoading } = useGetOrderDetail(order_id);
  const { user } = useAuth();
  const router = useRouter();
  const goBack = () => {
    router.back();
  }

  const { control, handleSubmit, formState: { errors }, register } = useForm<DeliveryDriverFormType>({
    resolver: zodResolver(deliveryFormSchema),
  });

  const { mutate: updateDriverDetails, isPending: isUpdatingDriverDetails } = useUpdateDriverDetails();
  const onSubmit = (data: DeliveryDriverFormType) => {
    updateDriverDetails({ id: order_id, data },
      {
        onSuccess: () => {
          router.push(`/order-management/orders/${order_id}/complete-order`);
          toast.success('Driver details updated successfully', { duration: 3500 });

        },
        onError: (error) => {
          const errorMessage = extractErrorMessage(error);
          toast.error(errorMessage, { duration: 7500 });
        }
      }
    );
    console.log(data);
  }



  if (isLoading) {
    return <OrderManagementDeliverySkeleton />;
  }

  return (
    <div className='max-w-[1440px] mx-auto p-4 space-y-6 px-8'>
      <header className='flex items-center mb-10'>
        <Button
          variant='ghost'
          size='icon'
          className='mr-2'
          onClick={() => goBack()}>
          <ArrowLeft2 className='h-6 w-6 text-[#A0AEC0]' />
        </Button>
        <Button >
          Delivery ID: {order?.delivery?.id}
        </Button>
        <Button className='flex items-center gap-1 ml-2.5' variant="outline">
          <UserOctagon size={13} />
          <span className='text-[#6C6C6C]'>
            Admin:
          </span>
          <span className='font-bold text-[#1C1C1C]'>
            {user?.name}
          </span>
        </Button>
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        <Card className='flex-1 space-y-4 p-5 rounded-2xl'>
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold font-manrope text-sm'>Delivery Details</h2>
          </div>

          <Separator />

          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Delivery Method</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">{order?.delivery?.method}</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Primary address</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">{order?.delivery.address}</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Delivery Location</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">
              {order?.delivery.dispatch?.location}{" "}
              ({formatCurrency(Number(order?.delivery.dispatch?.delivery_price) || 0, 'NGN')})
            </p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Location Zone</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">{order?.delivery.zone}</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Dispatch Time</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">{formatTimeString(order?.delivery.delivery_time || '0')}</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Delivery Date</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">{format(order?.delivery.delivery_date || 0, "dd/MMMM/yyyy")}</p>
          </div>
        </Card>


        <Card className='flex-1 space-y-4 p-5 rounded-2xl'>
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold font-manrope text-sm'>Recipient Details</h2>
          </div>
          <Separator />
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Name</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">{order?.delivery.recipient_name}</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Phone number</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">{order?.delivery.recipient_phone}</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>Primary address</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">{order?.delivery.address}</p>
          </div>
          <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
            <h3 className='text-sm text-gray-500 font-manrope'>State/City</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">Lagos/Ikeja</p>
          </div>
        </Card>


        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-8 p-5 rounded-2xl'>
          <Input
            label='Driver Name*'
            type='text'
            placeholder='Enter driver name'
            className='w-full focus:border min-w-[350px] text-xs'
            {...register('driver_name')}
            hasError={!!errors.driver_name}
            errorMessage={errors.driver_name?.message}
            defaultValue={order?.delivery?.driver_name ?? ""}
          />
          <Input
            label='Phone Number *'
            type='text'
            placeholder='Enter driver phone number'
            className='w-full focus:border min-w-[350px] text-xs'
            {...register('driver_phone')}
            hasError={!!errors.driver_phone}
            errorMessage={errors.driver_phone?.message}
            defaultValue={order?.delivery?.driver_phone ?? ""}
          />

          <Input
            label='Delivery Platform *'
            type='text'
            placeholder='Enter delivery platform'
            className='w-full focus:border min-w-[350px] text-xs'
            {...register('delivery_platform')}
            hasError={!!errors.delivery_platform}
            errorMessage={errors.delivery_platform?.message}
            defaultValue={order?.delivery?.delivery_platform ?? ""}
          />
          <Input
            label='Delivery Expenses *'
            type='text'
            placeholder='Enter delivery expenses'
            className='w-full focus:border min-w-[350px] text-xs'
            {...register('delivery_expense', { valueAsNumber: true })}
            hasError={!!errors.delivery_expense}
            errorMessage={errors.delivery_expense?.message}
            defaultValue={order?.delivery?.delivery_expense ?? ""}
          />
          <Input
            label='Tracking Link *'
            type='text'
            placeholder='Enter tracking link e.g. https://zuzutracker.com/Ioh7MvW'
            className='w-full focus:border min-w-[350px] text-xs'
            {...register('tracking_link')}
            hasError={!!errors.tracking_link}
            errorMessage={errors.tracking_link?.message}
            defaultValue={order?.delivery?.tracking_link ?? ""}
          />
          <Button
            type='submit'
            variant='default'
            className='bg-black text-white w-full h-14'
            size="lg"
            disabled={isUpdatingDriverDetails}
          >
            Proceed
            {
              isUpdatingDriverDetails && <Spinner className='ml-2' />
            }
          </Button>


        </form>
      </section>
    </div>
  );
};

export default OrdeManagementDelivery;
