'use client'

import React from 'react';
import { ArrowLeft2, UserOctagon } from 'iconsax-react';
import { useParams, useRouter } from 'next/navigation';

import { AmountInput, Button, Card, Input, LinkButton, SelectSingleCombo, Spinner } from '@/components/ui';
import { Separator } from '@/components/ui/separator';

import { useGeTOrderDetail, useUpdateDriverDetails } from '../../../misc/api';
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
  delivery_expense: z.number().optional(),
  tracking_link: z.string().optional().refine((val) => {
    if (!val) return true; // If tracking link is not provided, it's valid
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w- .\/?%&=]*)?$/;
    return urlPattern.test(val);
  }, {
    message: 'Tracking link must be a valid URL',
  }),
});

export type DeliveryDriverFormType = z.infer<typeof deliveryFormSchema>;

const OrdeManagementDelivery = () => {
  const order_id = useParams()?.id as string;
  const { data: order, isLoading } = useGeTOrderDetail(order_id);
  const { user } = useAuth();
  const router = useRouter();
  const goBack = () => {
    router.back();
  }

  const { setValue, handleSubmit, formState: { errors }, register, watch } = useForm<DeliveryDriverFormType>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      driver_name: order?.delivery?.driver?.name || '',
      driver_phone: order?.delivery?.driver?.phone_number || '',
      delivery_platform: order?.delivery?.driver?.delivery_platform || '',
      delivery_expense: 0,
      tracking_link: order?.delivery?.tracking_link || '',
    }
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

  console.log(errors)

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
          onClick={() => router.push('/order-management/delivery')}>
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
            <h3 className='text-sm text-gray-500 font-manrope'>Residence type</h3>
            <p className="text-[0.92rem] text-[#111827] font-medium">{order?.delivery.residence_type}</p>
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
          {
            !!order?.delivery.recipient_alternative_phone &&
            <div className='grid grid-cols-[0.5fr,1fr] items-center gap-5'>
              <h3 className='text-sm text-gray-500 font-manrope'>Alternative number</h3>
              <p className="text-[0.92rem] text-[#111827] font-medium">{order?.delivery.recipient_alternative_phone}</p>
            </div>
          }
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
            label='Driver Name'
            type='text'
            placeholder='Enter driver name'
            className='w-full focus:border min-w-[350px] text-xs'
            {...register('driver_name')}
            hasError={!!errors.driver_name}
            errorMessage={errors.driver_name?.message}
            defaultValue={order?.delivery?.driver?.name ?? ""}
          />
          <Input
            label='Phone Number'
            type='text'
            placeholder='Enter driver phone number'
            className='w-full focus:border min-w-[350px] text-xs'
            {...register('driver_phone')}
            hasError={!!errors.driver_phone}
            errorMessage={errors.driver_phone?.message}
            defaultValue={order?.delivery?.driver?.phone_number ?? ""}
          />
          <SelectSingleCombo
            name='delivery_platform'
            placeholder='Select delivery platform'
            options={[
              { value: 'Bolt', label: 'Bolt' },
              { value: 'Uber', label: 'Uber' },
              { value: 'Indrive', label: 'Indrive' },
              { value: 'RideBooker', label: 'RideBooker' },
              { value: 'Offline', label: 'Offline' },
            ]}
            className='w-full focus:border min-w-[350px] text-xs'
            value={watch('delivery_platform')}
            onChange={(value) => setValue('delivery_platform', value)}
            label='Delivery Platform'
            valueKey={"value"}
            labelKey={"label"}
            hasError={!!errors.delivery_platform}
            errorMessage={errors.delivery_platform?.message}
          />
          <AmountInput
            label='Delivery Expense'
            type='text'
            placeholder='Enter delivery expense'
            className='w-full focus:border min-w-[350px] text-xs'
            {...register('delivery_expense')}
            hasError={!!errors.delivery_expense}
            errorMessage={errors.delivery_expense?.message}
          />

          <Input
            label='Tracking Link'
            type='text'
            placeholder='Enter tracking link e.g. https://zuzutracker.com/Ioh7MvW'
            className='w-full focus:border min-w-[350px] text-xs'
            {...register('tracking_link')}
            hasError={!!errors.tracking_link}
            errorMessage={errors.tracking_link?.message}
            defaultValue={order?.delivery?.tracking_link ?? ""}
            optional
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
