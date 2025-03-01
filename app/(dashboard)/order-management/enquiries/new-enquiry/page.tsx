"use client";
import React from "react";
import Image from "next/image";
import {
  Controller,
  FieldErrors,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Money, TruckTime, ShoppingBag, Box } from "iconsax-react";
import { Plus, UserIcon } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";

import useCloudinary from '@/hooks/useCloudinary';
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
  Input,
  SingleDatePicker,
  SelectSingleCombo,
  Button,
  FilePicker,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
  TimePicker,
  SelectMultipleSpecialCombo,
  Spinner,
  ConfirmActionModal,
} from "@/components/ui";
import {
  DISPATCH_METHOD_OPTIONS,
  ENQUIRY_CHANNEL_OPTIONS,
  ENQUIRY_OCCASION_OPTIONS,
  ENQUIRY_PAYMENT_OPTIONS,
} from "@/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllBranches } from "@/app/(dashboard)/admin/branches/misc/api";
import { useGetCategories, useGetProducts } from "@/app/(dashboard)/inventory/misc/api";
import FormError from "@/components/ui/formError";
import { formatCurrency } from "@/utils/currency";
import { useBooleanStateControl } from "@/hooks";
import { extractErrorMessage } from "@/utils/errors";

import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts";
import { NewEnquiryFormValues, NewEnquirySchema } from "../misc/utils/schema";
import { useCreateEnquiry } from "../misc/api";
import { TEnquiry } from "../misc/types";
import { useGetOrderDeliveryLocations } from "../../misc/api";
import EnquiryFormItemsSection from "../misc/components/EnquiryFormItemsSection";


const NewEnquiryPage = () => {

  const { data: branches, isLoading: branchesLoading } = useGetAllBranches();
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { data: products, isLoading: productsLoading } = useGetProducts();
  const { data: dispatchLocations, isLoading: dispatchLocationsLoading } = useGetOrderDeliveryLocations();

  const form = useForm<NewEnquiryFormValues>({
    resolver: zodResolver(NewEnquirySchema),
    defaultValues: {
      branch: branches?.data?.[0].id,
      customer: { name: "", phone: "", email: "" },
      delivery: {
        zone: "LM",
        method: "Dispatch",
        delivery_date: format(new Date(), 'yyyy-MM-dd'),
        address: "",
        recipient_name: "",
        recipient_phone: ""
      },
      enquiry_channel: "",
      enquiry_occasion: "",
      items: [],
    }
  });

  const { control, handleSubmit, formState: { errors }, watch, setValue, getValues, register, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  console.log(errors)

  const addNewItem = () => {
    append({
      category: categories?.[0].id || 1,
      product_id: products?.[0].id || 0,
      quantity: 1,
      properties: {},
      inventories: [{
        variations: [],
      }],
    });
  };

  const router = useRouter();
  const {
    state: isSuccessModalOpen,
    setTrue: openSuccessModal,
    setFalse: closeSuccessModal,
  } = useBooleanStateControl()

  const { mutate, isPending } = useCreateEnquiry()
  const { uploadToCloudinary } = useCloudinary()
  const [createdEnquiry, setCreatedEnquiry] = React.useState<TEnquiry | null>(null);
  const onSubmit = async (data: NewEnquiryFormValues) => {
    const processedItems = !!data.items ? await Promise.all(
      data.items.map(async (item) => {
        let custom_image: string | undefined
        if (item.custom_image) {
          const uploadResult = await uploadToCloudinary(item.custom_image)
          custom_image = uploadResult.secure_url
        }
        return {
          ...item,
          custom_image,
        }
      })
    ) : [];
    const dataToSubmit = {
      ...data,
      items: processedItems,
    }

    mutate(dataToSubmit, {
      onSuccess(data) {
        toast.success("Enquiry created successfully");
        openSuccessModal();
        setCreatedEnquiry(data?.data);
      },
      onError(error: unknown) {
        const errMessage = extractErrorMessage((error as any)?.response?.data as any);
        toast.error(errMessage, { duration: 7500 });
      }
    })
  };

  const routeToEnquiryDetails = () => {
    router.push(`/order-management/enquiries/${createdEnquiry?.id}`);
  }

  const resetForm = () => {
    reset();
  }
  const isCustomDelivery = watch(`delivery.is_custom_delivery`);
  const toggleCustomDelivery = () => {
    setValue('delivery.is_custom_delivery', !isCustomDelivery);
  }

  console.log(getValues('items'))



  return (
    <div className="px-8 md:pt-12 w-full md:w-[92.5%] max-w-[1792px] mx-auto">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Accordion
            type="multiple"
            defaultValue={["customer-information", "Enquiry-information", "delivery-information", "Enquiry-Instruction", "payment-information",]}
            className="w-full"
          >
            {/* /////////////////////////////////////////////////////////////////////////////// */}
            {/* /////////////                CUSTOMER INFORMATION                 ///////////// */}
            {/* /////////////////////////////////////////////////////////////////////////////// */}
            <AccordionItem value="customer-information">
              <AccordionTrigger className="py-4 flex">
                <div className="flex items-center gap-5 text-[#194A7A]">
                  <div className="flex items-center justify-center p-1.5 h-10 w-10 rounded-full bg-[#F2F2F2]">
                    <UserIcon className="text-custom-blue" stroke="#194a7a" fill="#194a7a" size={18} />
                  </div>
                  <h3 className="text-custom-blue font-medium">Customer Information</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 pt-8 pb-14 w-full">
                  <FormField
                    control={control}
                    name="customer.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            label="Customer's Name"
                            hasError={!!errors.customer?.name}
                            errorMessage={errors.customer?.name?.message}
                            placeholder="Enter customer name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="customer.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            label="Customer's Phone Number"
                            hasError={!!errors.customer?.phone}
                            errorMessage={errors.customer?.phone?.message}
                            placeholder="Enter customer phone number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="customer.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            label="Customer's Email"
                            hasError={!!errors.customer?.email}
                            errorMessage={errors.customer?.email?.message}
                            placeholder="Enter customer email"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="enquiry_occasion"
                    render={({ field }) => (
                      <FormItem>
                        <SelectSingleCombo
                          options={ENQUIRY_OCCASION_OPTIONS}
                          valueKey="value"
                          label="Enquiry Occasion"
                          labelKey="label"
                          placeholder="Select enquiry occasion"
                          {...field}
                          hasError={!!errors.enquiry_occasion}
                          errorMessage={errors.enquiry_occasion?.message}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="enquiry_channel"
                    render={({ field }) => (
                      <FormItem>
                        <SelectSingleCombo
                          options={ENQUIRY_CHANNEL_OPTIONS}
                          label="Enquiry Channel"
                          valueKey="value"
                          labelKey="label"
                          placeholder="Select enquiry channel"
                          hasError={!!errors.enquiry_channel}
                          errorMessage={errors.enquiry_channel?.message}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="social_media_details"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            label="Social Media Details"
                            hasError={!!errors.social_media_details}
                            errorMessage={errors.social_media_details?.message}
                            placeholder="Enter social media details"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>


            {/* /////////////////////////////////////////////////////////////////////////////// */}
            {/* /////////////                 DELIVERY INFORMATION                ///////////// */}
            {/* /////////////////////////////////////////////////////////////////////////////// */}
            <AccordionItem value="delivery-information">
              <AccordionTrigger className="py-4 flex">
                <div className="flex items-center gap-5 text-[#194A7A]">
                  <div className="flex items-center justify-center p-1.5 h-10 w-10 rounded-full bg-[#F2F2F2]">
                    <TruckTime className="text-custom-blue" stroke="#194a7a" size={18} />
                  </div>
                  <h3 className="text-custom-blue font-medium">Delivery Details</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-5">
                {
                  watch('delivery.method') === "Dispatch" &&
                  <FormField
                    control={control}
                    name="delivery.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className=""
                            label="Delivery Address"
                            {...field}
                            hasError={!!errors.delivery?.address}
                            errorMessage={errors.delivery?.address?.message}
                            placeholder="Enter delivery address"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                }
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 pt-8 pb-14 w-full">
                  <FormField
                    control={control}
                    name="delivery.recipient_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            label="Recipient's Name"
                            {...field}
                            hasError={!!errors.delivery?.recipient_name}
                            errorMessage={errors.delivery?.recipient_name?.message}
                            placeholder="Enter recipient name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="delivery.recipient_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            label="Recipient's Phone Number"
                            {...field}
                            hasError={!!errors.delivery?.recipient_phone}
                            errorMessage={errors.delivery?.recipient_phone?.message}
                            placeholder="Enter recipient name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="delivery.method"
                    render={({ field }) => (
                      <FormItem>
                        <SelectSingleCombo
                          label="Delivery Method"
                          options={DISPATCH_METHOD_OPTIONS}
                          {...field}
                          valueKey={"value"}
                          labelKey={"label"}
                          placeholder="Select delivery method"
                          hasError={!!errors.delivery?.method}
                          errorMessage={errors.delivery?.method?.message}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="delivery.zone"
                    render={({ field }) => (
                      <FormItem>
                        <SelectSingleCombo
                          label="Delivery Zone"
                          options={[
                            {
                              value: "LM",
                              label: "Lagos Mainland (LM)",
                            },
                            {
                              value: "LC",
                              label: "Lagos Central (LC)",
                            },
                            {
                              value: "LI",
                              label: "Lagos Island (LI)",
                            },
                          ]}
                          {...field}
                          valueKey={"value"}
                          labelKey={"label"}
                          placeholder="Select delivery zone"
                          hasError={!!errors.delivery?.zone}
                          errorMessage={errors.delivery?.zone?.message}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="delivery.dispatch"
                    render={({ field }) => (
                      <FormItem>
                        {
                          isCustomDelivery ?
                            <Input
                              label="Delivery Fee"
                              {...register('delivery.fee', { valueAsNumber: true })}
                              hasError={!!errors.delivery?.fee}
                              errorMessage={errors.delivery?.fee?.message}
                              placeholder="Enter delivery fee"
                            />
                            :
                            <SelectSingleCombo
                              label="Dispatch Location"
                              {...field}
                              value={field.value?.toString() || ''}
                              isLoadingOptions={dispatchLocationsLoading}
                              options={dispatchLocations?.data?.map(loc => ({ label: loc.location, value: loc.id.toString(), price: loc.delivery_price })) || []}
                              valueKey={"value"}
                              // labelKey={"label"}
                              labelKey={(item) => `${item.label} (${formatCurrency(item.price, 'NGN')})`}
                              placeholder="Select dispatch location"
                              hasError={!!errors.delivery?.dispatch}
                              errorMessage={errors.delivery?.dispatch?.message}
                            />
                        }
                        <button
                          className="bg-custom-blue rounded-none px-4 py-1.5 text-xs text-white"
                          onClick={toggleCustomDelivery}
                          type="button"
                        >
                          {
                            !isCustomDelivery ? "+ Custom Delivery" : "- Regular Delivery"
                          }
                        </button>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="delivery.delivery_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <SingleDatePicker
                          label="Delivery Date"
                          value={field.value ? new Date(field.value) : new Date()}
                          onChange={(newValue) => setValue('delivery.delivery_date', format(newValue, 'yyyy-MM-dd'))}
                          placeholder="Select delivery date"
                        />
                        {
                          errors.delivery?.delivery_date &&
                          <FormError errorMessage={errors.delivery?.delivery_date?.message as string}
                          />
                        }
                      </FormItem>
                    )}
                  />

                  <TimePicker
                    label="Delivery Time"
                    control={control}
                    name="delivery.delivery_time"
                    hasError={!!errors.delivery?.delivery_time}
                    errorMessage={errors.delivery?.delivery_time?.message}

                  // placeholder="Select delivery date"
                  />
                  <FormField
                    control={control}
                    name="delivery.note"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormControl>
                          <Input
                            label="Delivery Note"
                            {...field}
                            hasError={!!errors.delivery?.note}
                            errorMessage={errors.delivery?.note?.message}
                            placeholder="Enter delivery note"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                </div>
              </AccordionContent>
            </AccordionItem>


            {/* /////////////////////////////////////////////////////////////////////////////// */}
            {/* /////////////                  Enquiry INFORMATION                  ///////////// */}
            {/* /////////////////////////////////////////////////////////////////////////////// */}
            <AccordionItem value="Enquiry-information">
              <AccordionTrigger className="py-4">
                <div className="flex items-center gap-5">
                  <div className="h-10 w-10 flex items-center justify-center bg-custom-white rounded-full">
                    <Image src="/img/book.svg" alt="" width={24} height={24} />
                  </div>
                  <p className="text-custom-blue font-medium">Enquiry Details</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col pt-3 pb-14 gap-y-8">
                <section className="flex items-center justify-between gap-10">
                  {
                    (!!watch('items') && !!watch('items')?.length) &&
                    <Controller
                      name="branch"
                      control={control}
                      render={({ field }) => (
                        <SelectSingleCombo
                          {...field}
                          name='branch'
                          value={field.value?.toString() || ''}
                          options={branches?.data?.map(bra => ({ label: bra.name, value: bra.id.toString() })) || []}
                          valueKey='value'
                          className="!h-10 min-w-40"
                          labelKey="label"
                          placeholder='Select Branch'
                          onChange={(value) => field.onChange(Number(value))}
                          isLoadingOptions={branchesLoading}
                          hasError={!!errors.branch}
                          errorMessage={errors.branch?.message}
                        />
                      )}
                    />
                  }
                  {
                    !watch('items')?.length &&
                    <div className="w-full h-48 flex items-center justify-center">
                      <Button size="inputButton" onClick={addNewItem} className="w-full max-w-[300px]" type="button">
                        Add Item
                      </Button>
                    </div>
                  }
                </section>
                <section className="flex flex-col gap-y-12 lg:gap-y-20">
                  {
                    watch('items')?.map((_, index) => {
                      return (
                        <EnquiryFormItemsSection
                          key={index}
                          index={index}
                          control={control}
                          watch={watch}
                          errors={errors}
                          register={register}
                          setValue={setValue}
                          addNewItem={addNewItem}
                        />
                      )
                    })
                  }
                </section>
              </AccordionContent>
            </AccordionItem>

            {/* /////////////////////////////////////////////////////////////////////////////// */}
            {/* /////////////////////////////////////////////////////////////////////////////// */}
            {/* /////////////                  Enquiry INSTRUCTION                  ///////////// */}
            {/* /////////////////////////////////////////////////////////////////////////////// */}
            {/* /////////////////////////////////////////////////////////////////////////////// */}
            <AccordionItem value="Enquiry-Instruction">
              <AccordionTrigger className="py-4">
                <div className="flex items-center gap-5">
                  <div className="h-10 w-10 flex items-center justify-center bg-custom-white rounded-full">
                    <Image src="/img/book.svg" alt="" width={24} height={24} />
                  </div>
                  <p className="text-custom-blue font-medium">
                    Message on Enquiry
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-8 pb-14">
                <Input
                  label="Message on Enquiry"
                  hasError={!!errors.message}
                  errorMessage={errors.message?.message as string}
                  placeholder="Enter message on Enquiry"
                  {...register("message")}
                />
              </AccordionContent>
            </AccordionItem>



          </Accordion>

          <footer className="flex py-16">
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="flex items-center gap-2 ml-auto"
              disabled={isPending}
            >
              Proceed
              {
                isPending && <Spinner size={20} />
              }
            </Button>
          </footer>
        </form>
      </Form>


      <ConfirmActionModal
        isModalOpen={isSuccessModalOpen}
        icon={<Box className="text-[#37d67a]" size={60} />}
        customTitleText="Success"
        heading="Enquiry created successfully"
        subheading="Enquiry has been created successfully"
        customConfirmText="View Enquiry"
        customCancelText="Create New Enquiry"
        confirmFn={routeToEnquiryDetails}
        closeModal={closeSuccessModal}
        cancelAction={resetForm}
      />
    </div>
  );
};

export default NewEnquiryPage;