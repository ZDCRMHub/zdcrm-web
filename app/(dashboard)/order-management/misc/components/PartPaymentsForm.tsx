import React, { useMemo } from 'react'
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Button, FilePicker, Input, SelectSingleCombo, Spinner } from '@/components/ui';
import { useLoading } from '@/contexts';
import useCloudinary from '@/hooks/useCloudinary';
import { extractErrorMessage } from '@/utils/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { MAX_FILE_SIZE } from '../utils/schema';
import { useAddPartPayment } from '../api';
import { ENQUIRY_PAYMENT_OPTIONS } from '@/constants';

export const paymentFormSchema = z.object({
  payment_options: z.enum([
    "not_paid_go_ahead",
    "paid_website_card",
    "paid_naira_transfer",
    "paid_pos",
    "paid_usd_transfer",
    "paid_paypal",
    "cash_paid",
    "part_payment_cash",
    "part_payment_transfer",
    "paid_bitcoin",
    "not_received_paid"
  ]),
  // payment_proof: z.string().url().optional().nullable(),
  payment_receipt_name: z.string().optional(),
  payment_currency: z.enum(["NGN", "USD"]),
  amount_paid: z.number(),
  payment_proof: z.any().nullable().refine(
    file => {
      if (!file) {
        throw z.ZodError.create([{
          path: ['payment_proof'],
          message: 'Please select a file.',
          code: 'custom',
        }]);
      }
      if (!file.type.startsWith('application/pdf') && !file.type.startsWith('image/')) {
        throw z.ZodError.create([{
          path: ['payment_proof'],
          message: 'Please select a PDF or image file.',
          code: 'custom',
        }]);
      }
      return file.size <= MAX_FILE_SIZE;
    },

    {
      message: 'Max file size is 10MB.',
    }
  ),
}).superRefine((data, ctx) => {


});

export type AddPartPaymentFormData = z.infer<typeof paymentFormSchema>;

interface PartPaymentsFormProps {
  order_id: number | string
  outstanding_balance: number
  closeForm: () => void
  refetch: () => void
}

const PartPaymentsForm = ({ order_id, outstanding_balance, closeForm, refetch }: PartPaymentsFormProps) => {
  const { register, control, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm<AddPartPaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      payment_options: "part_payment_cash",
      payment_currency: "NGN",
    }
  });


  const router = useRouter();
  const { uploadToCloudinary } = useCloudinary()
  const { isUploading } = useLoading();

  const selectedPaymentOption = watch("payment_options");
  const { mutate, isPending } = useAddPartPayment()
  const onSubmit = async (data: AddPartPaymentFormData) => {
    if (data.amount_paid > outstanding_balance) {
      toast.error("Amount paid cannot be greater than the outstanding balance")
      return
    }
    let payment_proof: string | undefined
    const PdfFile = data.payment_proof
    if (data.payment_proof) {
      const data = await uploadToCloudinary(PdfFile)
      payment_proof = data.secure_url
    }
    const dataToSubmit = {
      ...data,
      payment_proof: PdfFile ? payment_proof : undefined,
    }

    mutate({ id: order_id, data: dataToSubmit }, {
      onSuccess: (data) => {
        toast.success('Payment Confirmed')
        reset();
        refetch();
        closeForm();
      },
      onError: (error) => {
        const errorMessage = extractErrorMessage((error as any)?.response?.data) || "An unexpected error occurred. Please try again later."
        toast.error(errorMessage)
      }
    })
  };




  const memoizedENQUIRY_PAYMENT_OPTIONS = useMemo(() => ENQUIRY_PAYMENT_OPTIONS, []);
  console.log(errors)



  return (

    <div className="border-b border-[#E6E6E6] py-6">
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-3 gap-4'>

        <Controller
          name="payment_options"
          control={control}
          render={({ field }) => (
            <SelectSingleCombo
              {...field}
              // label="Payment Option"
              valueKey="value"
              labelKey="label"
              options={memoizedENQUIRY_PAYMENT_OPTIONS.filter((option) => option.value.startsWith("part_payment"))}
              placeholder="Select Payment Option"
              hasError={!!errors.payment_options}
              errorMessage={errors.payment_options?.message}
            />
          )}
        />


        <Input
          // label="Amount Paid"
          id="amount_paid"
          className="col-span-3"
          placeholder='Amount Paid'
          {...register("amount_paid", { valueAsNumber: true })}
          pattern="^[0-9]*$"
          hasError={!!errors.amount_paid}
          errorMessage={errors.amount_paid?.message}

        />

        {!(selectedPaymentOption === "paid_usd_transfer" || selectedPaymentOption === "paid_paypal" || selectedPaymentOption === "paid_bitcoin") && (
          <Controller
            name="payment_currency"
            control={control}
            render={({ field }) => (
              <SelectSingleCombo
                {...field}
                // label="Currency"
                valueKey="value"
                labelKey="label"
                options={[
                  { value: "NGN", label: "NGN" },
                  { value: "USD", label: "USD" },
                ]}
                placeholder="Select Currency"
                hasError={!!errors.payment_currency}
                errorMessage={errors.payment_currency?.message}
              />
            )}
          />
        )}

        <FilePicker
          onFileSelect={(file) => setValue("payment_proof", file!)}
          hasError={!!errors.payment_proof}
          errorMessage={errors.payment_proof?.message as string}
          maxSize={10}
          title="Payment Proof"
        />

        <Controller
          name="payment_receipt_name"
          control={control}
          render={({ field }) => (
            <Input
              // label="Payment Receipt Name"
              id="payment_receipt_name"
              placeholder="Enter name in payment receipt"
              className="col-span-3"
              {...field}
              hasError={!!errors.payment_receipt_name}
              errorMessage={errors.payment_receipt_name?.message}

            />
          )}
        />


        <Button type="submit" className='flex items-center justify-center gap-2 w-full h-12 text-[#45971F] bg-[#aed29d] hover:bg-[#aed29d]' disabled={isPending || isUploading}>
          Confirm Payment
          {
            (isPending || isUploading) && <Spinner size={20} />
          }
        </Button>
      </form>
    </div>

  );


}

export default PartPaymentsForm