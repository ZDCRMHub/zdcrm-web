"use client";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewEnquirySchema, NewEnquiryFormValues } from "../misc/utils/schema";
import { DISPATCH_METHOD_OPTIONS, ENQUIRY_CHANNEL_OPTIONS, ENQUIRY_OCCASION_OPTIONS } from "@/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, ConfirmActionModal, Form, FormControl, FormField, FormItem, Input, SelectSingleCombo, SingleDatePicker, Spinner, TimePicker } from "@/components/ui";
import { DollarSignIcon as Money, TruckIcon as TruckTime, UserIcon, Plus } from 'lucide-react';
import { useGetAllBranches } from "@/app/(dashboard)/admin/branches/misc/api";
import FormError from "@/components/ui/formError";
import { useGetCategories, useGetProducts, useGetStockInventory } from "@/app/(dashboard)/inventory/misc/api";
import Image from "next/image";
import EnquiryItemsSection from "../misc/components/EnquiryFormItemsSection";
import { useCreateEnquiry } from "../misc/api";
import toast from "react-hot-toast";
import { useBooleanStateControl } from "@/hooks";
import { TEnquiry } from "../misc/types";
import { Box } from "iconsax-react";
import { useRouter } from "next/navigation";

const NewOrderPage = () => {

  const { data: branches, isLoading: branchesLoading } = useGetAllBranches();
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { data: products, isLoading: productsLoading } = useGetProducts();

  const form = useForm<NewEnquiryFormValues>({
    resolver: zodResolver(NewEnquirySchema),
    defaultValues: {
      branch: branches?.data?.[0].id,
      customer: { name: "", phone: "", email: "" },
      delivery: {
        zone: "LM",
        method: "Dispatch",
        // delivery_date: new Date(),
        delivery_date: new Date().toISOString().split('T')[0],
        address: "",
        recipient_name: "",
        recipient_phone: ""
      },
      enquiry_channel: "",
      enquiry_occasion: "",
      items: [
        {
          category: categories?.[0].id,
          product_id: products?.[0].id,
          quantity: 1,
          inventories: [{
            variations: [],
            properties: {}
          }],
        }
      ]
    }
  });

  const { control, handleSubmit, formState: { errors }, watch, setValue, reset, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const watchedItems = watch("items");
  const addNewItem = () => {
    append({
      category: categories?.[0].id || 1,
      product_id: products?.[0].id || 0,
      quantity: 1,
      inventories: [{
        variations: [],
        properties: {}
      }],
    });
  };

  const [createdOrder, setCreatedOrder] = React.useState<TEnquiry | null>(null);
  const router = useRouter();
  const routeToOrderDetails = () => {
    router.push(`/order-management/orders/${createdOrder?.id}`);
  }
  const resetForm = () => {
    reset();
  }
  const {
    state: isSuccessModalOpen,
    setTrue: openSuccessModal,
    setFalse: closeSuccessModal,
  } = useBooleanStateControl()

  const { mutate, isPending } = useCreateEnquiry()
  const onSubmit = (data: NewEnquiryFormValues) => {
    mutate(data, {
      onSuccess(data, variables, context) {
        toast.success("Created successfully")
        openSuccessModal();
        setCreatedOrder(data?.data);

      },
    })
  };
  console.log(errors)

  return (
    <div className="px-8 md:pt-12 w-full md:w-[92.5%] max-w-[1792px] mx-auto">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Accordion
            type="multiple"
            defaultValue={[
              "customer-information",
              "enquiry-information",
              "delivery-information",
              "order-Instruction",
            ]}
            className="w-full"
          >
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
                    name="delivery.delivery_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <SingleDatePicker
                          label="Delivery Date"
                          value={new Date(field.value)}
                          onChange={(newValue) => setValue('delivery.delivery_date', newValue.toISOString().split('T')[0])}
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
                  />


                </div>
              </AccordionContent>
            </AccordionItem>


            {/* Order Details Section */}
            <AccordionItem value="enquiry-information">
              <AccordionTrigger className="py-4">
                <div className="flex items-center gap-5">
                  <div className="h-10 w-10 flex items-center justify-center bg-custom-white rounded-full">
                    <img src="/img/book.svg" alt="" width={24} height={24} />
                  </div>
                  <p className="text-custom-blue font-medium">Order Details</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col pt-3 pb-14 gap-y-8">
                <section className="flex items-center justify-between gap-10">
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
                  <Button
                    variant="outline"
                    onClick={addNewItem}
                    type="button"
                  >
                    + Add Item
                  </Button>
                </section>
                <section className="flex flex-col gap-y-12 lg:gap-y-20">
                  {
                    watchedItems.map((field, index) => {
                      return (
                        <EnquiryItemsSection
                          key={index}
                          index={index}
                          control={control}
                          watch={watch}
                          errors={errors}
                          register={register}
                          setValue={setValue}
                        />
                      )
                    })
                  }
                </section>
              </AccordionContent>
            </AccordionItem>

            {/* Message on Order Section */}
            <AccordionItem value="order-Instruction">
              <AccordionTrigger className="py-4">
                <div className="flex items-center gap-5">
                  <div className="h-10 w-10 flex items-center justify-center bg-custom-white rounded-full">
                    <Image src="/img/book.svg" alt="" width={24} height={24} />
                  </div>
                  <p className="text-custom-blue font-medium">
                    Message on Order
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-8 pb-14">
                <Input
                  label="Message on Order"
                  hasError={!!errors.message}
                  errorMessage={errors.message?.message as string}
                  placeholder="Enter message on order"
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
              className="flex items-center justify-center gap-1.5 ml-auto"
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
        heading="Order created successfully"
        subheading="Order has been created successfully"
        customConfirmText="View Order"
        customCancelText="Create New Order"
        confirmFn={routeToOrderDetails}
        closeModal={closeSuccessModal}
        cancelAction={resetForm}
      />
    </div>
  );
};

export default NewOrderPage;
