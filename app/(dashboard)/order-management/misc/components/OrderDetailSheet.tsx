import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox, Button, LinkButton, CardTitle, Spinner } from "@/components/ui";
import { Mail, MessageCircle, User, X } from "lucide-react";
import {
  Book,
  Notepad2,
  UserOctagon,
  Printer,
  EmojiHappy,
  ProfileCircle,
  UserEdit,
  Money,
} from "iconsax-react";
import { Separator } from "@radix-ui/react-select";
import { Phone } from "@phosphor-icons/react";
import Image from "next/image";
import {
  Input,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  CardHeader,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui";
import { EditPenIcon } from "@/icons/core";
import EditDeliveryDetailsModal from "./EditDeliveryDetailsModal";
import { useBooleanStateControl } from "@/hooks";
import { ENQUIRY_PAYMENT_OPTIONS, ORDER_STATUS_OPTIONS, } from "@/constants";
import { useGetOrderDetail, useUpdateOrderPaymentMethod, useUpdateOrderStatus } from "../api";
import { TOrder } from "../types";
import { extractErrorMessage, formatAxiosErrorMessage } from "@/utils/errors";
import { convertKebabAndSnakeToTitleCase, formatTimeString } from "@/utils/strings";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/currency";
import OrderDetailSheetSkeleton from "./OrderDetailSheetSkeleton";
import { useRouter } from "next/navigation";
import APIAxios from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PartPaymentsForm from "./PartPaymentsForm";
import { printNote } from "../utils/print";
import Link from "next/link";

interface OrderDetailsPanelProps {
  order: TOrder;
  isSheetOpen: boolean;
  closeSheet: () => void;
}

export default function OrderDetailSheet({ order: default_order, isSheetOpen, closeSheet }: OrderDetailsPanelProps) {
  const { data: order, isLoading, isRefetching } = useGetOrderDetail(default_order?.id, isSheetOpen);

  const { mutate, isPending: isUpdatingStatus } = useUpdateOrderStatus()
  const { mutate: updatePaymentMethod, isPending: isUpdatingPaymentMethod } = useUpdateOrderPaymentMethod()
  const {
    state: isEditDeliveryDetailsModalOpen,
    setTrue: openEditDeliveryDetailsModal,
    setFalse: closeEditDeliveryDetailsModal,
  } = useBooleanStateControl();
  const router = useRouter();
  const queryClient = useQueryClient();
  const refetchDetailsAndList = () => {
    queryClient.invalidateQueries({
      queryKey: ['order-details']
    });
    queryClient.invalidateQueries({
      queryKey: ['active-orders-list']
    });
  }
  const handleStatusUpdate = (new_status: string) => {
    mutate({ id: default_order?.id, status: new_status as "PND" | "SOA" | "SOR" | "STD" | "COM" | "CAN" },

      {
        onSuccess: (data) => {
          toast.success("Order status updated successfully");
          refetchDetailsAndList();
          if (new_status == "STD") {
            router.push(`/order-management/orders/${default_order?.id}/confirm-delivery`)
          }
          else if (new_status == "COM" || new_status == "CAN") {
            router.push("/order-management/order-history")
          }
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as unknown as any) || extractErrorMessage(error as unknown as any);
          toast.error(errorMessage), {
            duration: 5000,
          };
        }
      }
    );
  }

  const handleUpdatePaymentMethod = (new_payment_method: string) => {
    updatePaymentMethod({ id: default_order?.id, payment_options: new_payment_method },
      {
        onSuccess: (data) => {
          toast.success("Payment method updated successfully");
          refetchDetailsAndList();
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as unknown as any) || extractErrorMessage(error as unknown as any);
          toast.error(errorMessage), {
            duration: 5000,
          };
        }
      }
    );
  }


  const useUpdate = () => {
    return useMutation({
      mutationFn: async ({ item_id, is_sorted }: { item_id: number, is_sorted: boolean }) => {
        const res = await APIAxios.patch(`/order/items/${item_id}/sorted/`, { is_sorted });
        return res.data;
      },
      onSuccess: (data, variables) => {
        if (variables.is_sorted) {
          toast.success("Item sorted successfully");
        }
        else {
          toast.success("Item unsorted successfully");
        }
        refetchDetailsAndList();
      }
    });
  }
  const { mutate: updateStatus, isPending: isUpdatingItemSortedStatus } = useUpdate();

  const handleUpdateItemStatus = (data: { item_id: number, is_sorted: boolean }) => {
    updateStatus(data)
  }
  const {
    state: isEditingPaymentDetails,
    toggle: togglePaymentDetailsEdit,
    setFalse: stopEditingPaymentDetails,
  } = useBooleanStateControl()




  return (
    <>

      <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
        <SheetContent className="!w-[90vw] !max-w-[800px] h-screen overflow-y-scroll xl:px-10">
          <SheetTitle>
            <h2 className="text-xl font-semibold flex items-center gap-4">
              <span className="bg-[#E8EEFD] p-2 rounded-full">
                <Book size={25} variant="Bold" color="#194A7A" />
              </span>
              <span className="flex items-center gap-2">
                Order Details
                {
                  isRefetching && <Spinner />
                }
              </span>
            </h2>
          </SheetTitle>
          <SheetClose className="absolute top-1/2 left-[-100%]">
            <X className="h-4 w-4" />
          </SheetClose>

          <Separator />

          {
            isLoading ?

              <OrderDetailSheetSkeleton />

              :

              <>
                <header className="flex justify-between pt-8">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center space-x-2 mt-1 border border-gray-400 rounded-[10px] px-3 py-2 min-w-max shrink-0">
                      <span className="text-sm">Order ID: {order?.order_number}</span>
                    </div>

                    <Select value={order?.status} defaultValue={order?.status} onValueChange={(new_value) => handleStatusUpdate(new_value)}>
                      <SelectTrigger className="w-[150px] bg-transparent">
                        <SelectValue placeholder={order?.status} />
                        {
                          isUpdatingStatus && <Spinner size={18} />
                        }
                      </SelectTrigger>
                      <SelectContent>
                        {
                          ORDER_STATUS_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="py-2 my-1 hover:!bg-primary hover:!text-white cursor-pointer rounded-lg border hover:border-transparent"
                            >
                              {option.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Select value={order?.payment_options} defaultValue={order?.payment_options} onValueChange={(new_value) => handleUpdatePaymentMethod(new_value)}>

                      <SelectTrigger className="w-[200px] bg-[#3679171F]" disabled={order?.payment_options !== "not_paid_go_ahead"}>
                        <SelectValue placeholder="Select Payment Method" />
                        {
                          isUpdatingPaymentMethod && <Spinner size={18} />
                        }
                      </SelectTrigger>
                      <SelectContent>
                        {ENQUIRY_PAYMENT_OPTIONS.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            // onClick={() => setSelectedPaymentMethod(option.value)}
                            className="py-2 my-1 hover:!bg-primary hover:!text-white cursor-pointer rounded-lg border hover:border-transparent"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </header>

                <div className="py-4 space-y-10">
                  <div className="grid grid-cols-2 gap-2.5 mt-8">
                    <Card className="flex-1 bg-[#194A7A] text-white rounded-lg">
                      <CardHeader className="border-b border-[#FFC600] pb-4">
                        <CardTitle className="flex items-center justify-center gap-2 text-lg">
                          <UserOctagon size={25} color="#FFC600" />
                          <span>Customer&apos;s Info</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 flex justify-center">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="flex items-center gap-2 text-sm">
                              <UserEdit
                                size={20}
                                className="text-[#FFC600] flex-shrink-0"
                              />
                              <span>{order?.customer.name}</span>
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                              <Mail
                                size={20}
                                className="text-[#FFC600] flex-shrink-0"
                              />
                              <span>{order?.customer.email}</span>
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                              <Phone
                                size={20}
                                className="text-[#FFC600] flex-shrink-0"
                              />
                              <span>{order?.customer.phone}</span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="flex-1 bg-[#194A7A] text-white rounded-lg">
                      <CardHeader className="border-b border-[#FFC600] pb-4">
                        <CardTitle className="flex items-center justify-center gap-2 text-lg">
                          <ProfileCircle size={25} color="#FFC600" />
                          <span>Recipient Info</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 flex justify-center">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="flex items-center gap-2 text-sm">
                              <UserEdit
                                size={20}
                                className="text-[#FFC600] flex-shrink-0"
                              />
                              <span>{order?.delivery.recipient_name}</span>
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                              <Mail
                                size={20}
                                className="text-[#FFC600] flex-shrink-0"
                              />
                              <span>{order?.customer?.email}</span>
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                              <Phone
                                size={20}
                                className="text-[#FFC600] flex-shrink-0"
                              />
                              <span>{order?.delivery.recipient_phone}</span>
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                              <Phone
                                size={20}
                                className="text-[#FFC600] flex-shrink-0"
                              />
                              <span>
                                {order?.delivery.recipient_phone}
                              </span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <section className="flex items-center gap-8 mb-16 mt-3">
                    <div className="flex items-center gap-1 text-sm text-[#111827]">
                      <span className="flex items-center text-sm text-[#687588]">
                        <EmojiHappy size={18} className="mr-2" />
                        Order Occasion:{" "}
                      </span>
                      <p>{order?.enquiry_occasion}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[#111827]">
                      <span className="text-sm text-[#687588]">Order Channel: </span>
                      <p>{order?.enquiry_channel}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[#111827]">
                      <span className="text-sm text-[#687588]">Payment Mode: </span>
                      <p>{convertKebabAndSnakeToTitleCase(order?.payment_options ?? '')}</p>
                    </div>
                  </section>


                  {/* //////////////////////////////////////////////////////////////////////////////////// */}
                  {/* ///////////                       PAYMENT DETAILS                     ////////////// */}
                  {/* //////////////////////////////////////////////////////////////////////////////////// */}
                  {
                    order?.payment_options?.startsWith("part_payment") &&
                    <section className="mt-16 mb-8">
                      <header className="border-b border-b-[#00000021]">
                        <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1">
                          <Money size={19} />
                          Payment Details
                          <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
                        </p>
                      </header>
                      <div className=" space-y-2 text-sm mt-4">
                        {[
                          ["Payment Method", convertKebabAndSnakeToTitleCase(order?.payment_options ?? '')],
                          [order?.payment_options?.startsWith("part_payment") ? "Total Amount Due" : "Total", formatCurrency(Number(order?.total_selling_price || 0), 'NGN')],
                          [order?.payment_options?.startsWith("part_payment") && "Initial Amount Paid", formatCurrency(Number(order?.initial_amount_paid || 0), 'NGN')],
                          [order?.payment_options?.startsWith("part_payment") && "Oustanding Balance",
                          <span className="flex items-center gap-2" key={order?.id}>
                            {
                              formatCurrency(
                                Number(Number(order?.total_selling_price ?? 0)
                                  -
                                  (order?.part_payments?.reduce((acc: number, curr: any) => acc + Number(curr.amount_paid || 0), 0) || 0)
                                  -
                                  (order?.initial_amount_paid || 0)
                                ), 'NGN')
                            }
                            <button
                              className="flex items-center justify-center rounded-md h-6 w-6 bg-[#FFC600] text-[#111827]"
                              onClick={togglePaymentDetailsEdit}
                            >
                              <EditPenIcon height={16} width={16} />
                            </button>
                          </span>

                          ],
                        ].map(([label, value], index) => (
                          <p className=" grid grid-cols-[max-content,1fr] gap-x-6" key={index}>
                            {
                              !!label && !!value &&
                              <>
                                <span className="text-[#687588] font-manrope text-sm">{label}</span>
                                <span className="text-[#111827] text-sm">{value}</span>
                              </>
                            }
                          </p>
                        ))}
                      </div>
                      {
                        order?.part_payments.map((payment, index) => (
                          <div className=" space-y-2 text-sm mt-4 ml-3" key={index}>
                            {[
                              ["Amount Paid", formatCurrency(Number(payment.amount_paid || 0), 'NGN')],
                              ["Payment Date", format(new Date(payment.create_date), "do MMMM, yyyy | h:mma")],
                              ["Payment Method", convertKebabAndSnakeToTitleCase(payment.payment_options)],
                              ["Payment Proof", payment.payment_proof ? <a href={payment.payment_proof} target="_blank" className="text-primary">View Proof</a> : "No proof uploaded"],
                              ["Payment Receipt Name", payment.payment_receipt_name],
                            ].map(([label, value], index) => (
                              <p className="grid grid-cols-[max-content,1fr] gap-x-6" key={index}>
                                {
                                  !!label && !!value &&
                                  <>
                                    <span className="text-[#687588] font-manrope text-[13px]">{label}</span>
                                    <span className="text-[#111827] text-[13px]">{value}</span>
                                  </>
                                }
                              </p>
                            ))}
                          </div>
                        ))
                      }
                      {
                        isEditingPaymentDetails &&
                        <PartPaymentsForm
                          order_id={order?.id || default_order?.id}
                          outstanding_balance={
                            Number(order?.total_selling_price || 0) -
                            (order?.part_payments?.reduce((acc: number, curr: any) => acc + Number(curr.amount_paid || 0), 0) || 0) -
                            (order?.initial_amount_paid || 0)
                          }
                          closeForm={stopEditingPaymentDetails}
                          refetch={refetchDetailsAndList}
                        />
                      }
                    </section>
                  }



                  {/* //////////////////////////////////////////////////////////////////////////////////// */}
                  {/* ///////////                         DELIVERY NOTE                     ////////////// */}
                  {/* //////////////////////////////////////////////////////////////////////////////////// */}
                  <section className="mt-16 mb-8">
                    <header className="flex items-center justify-between border-b border-b-[#00000021]">
                      <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1">
                        <Notepad2 size={19} />
                        Delivery Note
                        <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
                      </p>

                      <Button
                        variant="yellow"
                        onClick={() => printNote(
                          {
                            note: order?.delivery.note || '',
                            orderNumber: order?.order_number,
                            title: "Order Notes",
                          }
                        )}
                      >
                        Print
                      </Button>
                    </header>
                    <div className="mt-1 py-2 bg-transparent rounded-md flex justify-between items-stretch gap-6 w-full">
                      <Input
                        value={order?.delivery.note || "No note"}
                        readOnly
                        containerClassName={cn("w-full", !order?.delivery.note && "text-[#687588] italic")}
                        rightIcon={
                          <Link href={`/order-management/orders/edit?order_id=${order?.id}`} className="">
                            <EditPenIcon width={20} height={20} />
                          </Link>
                        }
                      />
                    </div>
                  </section>
                  <Accordion type="single" defaultValue="product-items">
                    <section className="mb-8">
                      <AccordionItem value="product-items">
                        <AccordionTrigger>
                          <header className="border-b border-b-[#00000021] mb-6">
                            <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1 px-2.5">
                              Product Items
                              <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
                            </p>
                          </header>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 mt-1">
                            {
                              order?.items.map((item, index: number) => {
                                const itemCategory = item.inventories[0]?.stock_inventory?.category.name || item.inventories[0]?.product_inventory?.category.name
                                const itemImage = item.product.image || `/img/placeholders/${itemCategory}.svg`

                                return (
                                  <article key={item.id} className="flex border rounded-2xl p-6">
                                    <div className="flex flex-col gap-1.5 w-full max-w-[700px] bg-white rounded-xl">
                                      <header className="flex items-start justify-between">
                                        <div className="relative w-[120px] aspect-[98/88] rounded-xl bg-[#F6F6F6]">
                                          <Image
                                            src={itemImage}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover rounded-md"
                                          />
                                        </div>
                                        <div className="flex items-center gap-4 self-start">
                                          {
                                            isUpdatingItemSortedStatus && <Spinner className="text-custom-blue h-4 w-4" size={16} />
                                          }
                                          <Checkbox
                                            checked={item.is_sorted}
                                            customIcon={isUpdatingItemSortedStatus && <Spinner className="text-custom-blue h-4 w-4" size={16} />}
                                            onCheckedChange={(new_value) => handleUpdateItemStatus({ item_id: item.id, is_sorted: !!new_value })}
                                          />
                                        </div>
                                      </header>

                                      <section className="flex flex-col justify-between">
                                        <h5 className="text-[#194A7A] text-lg font-medium mb-5">
                                          {item.product.name}
                                        </h5>
                                        <div className="xl:flex">
                                          <div className="space-y-2.5 text-[0.8rem]">
                                            <div className="flex items-center gap-x-5 gap-y-2 flex-wrap">
                                              <p className="flex items-center gap-1 text-[#111827] font-medium">
                                                <span className="text-[#687588]">Quantity:</span> {item.quantity} pcs
                                              </p>
                                              <p className="flex items-center gap-1 text-[#111827] font-medium">
                                                <span className="text-[#687588]">Category:</span> {item.product.category.name}
                                              </p>
                                              {item.inventories[0]?.variations[0]?.variation_details?.size && (
                                                <p className="flex items-center gap-1 text-[#111827] font-medium">
                                                  <span className="text-[#687588]">Size:</span> {item.inventories[0].variations[0].variation_details.size}
                                                </p>
                                              )}
                                            </div>
                                            {item.properties.map((property, index) => (
                                              <div key={index}>
                                                {Object.entries(property).map(([key, value]) => {
                                                  if (key === "id" || !value) return null
                                                  if (key.includes("at_order")) return null

                                                  const displayValue = typeof value === "object" && value !== null ? value.name : value

                                                  return (
                                                    <p key={key} className="text-[#111827] font-medium">
                                                      <span className="text-[#687588]">{convertKebabAndSnakeToTitleCase(key)}:</span> {displayValue}
                                                    </p>
                                                  )
                                                })}
                                              </div>
                                            ))}
                                         
                                            {item.inventories[0]?.instruction && (
                                              <p className="text-[#111827] font-medium">
                                                <span className="text-[#687588]">Instructions:</span>{" "}
                                                {item.inventories[0].instruction}
                                              </p>
                                            )}
                                          </div>

                                          <div className="space-y-2.5 text-[0.8rem] content-center flex-1 flex justify-end">
                                            {item.inventories[0]?.message && (
                                              <p className="flex flex-col text-[#111827] font-medium text-right">
                                                <span className="text-[#687588]">Message:</span>{" "}
                                                {item.inventories[0].message}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      </section>

                                      <section className="flex items-center justify-between pt-1 border-t">
                                        <p className="text-[#111827] font-medium text-sm">
                                          <span className="text-[#687588] italic font-light text-[0.8rem]">
                                            Production Cost:{" "}
                                          </span>
                                        </p>
                                        <p className="font-medium text-[#194A7A]">
                                          Amount:{" "}
                                          <span className="font-bold">
                                            {formatCurrency(Number(item.product_variation.selling_price) || 0, 'NGN')}
                                            {/* {formatCurrency(item.inventories[0]?.|| 0, 'NGN')} */}
                                          </span>
                                        </p>
                                      </section>
                                    </div>
                                  </article>
                                )
                              })
                            }
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </section>
                  </Accordion>

                  <section className="p-4 px-6 rounded-2xl border">
                    <div className="flex justify-between items-center mb-2 border-b">
                      <h3 className="font-semibold font-manrope text-lg">
                        Delivery Details
                      </h3>
                      <LinkButton
                        href={`/order-management/orders/edit?order_id=${order?.id}#delivery-information-section`}
                        variant="ghost"
                        size="sm"
                      >
                        <EditPenIcon className="h-5 w-5" />
                      </LinkButton>
                    
                    </div>
                    <div className=" grid grid-cols-[max-content,1fr] gap-x-6 gap-y-2 text-sm mt-4">
                      {[
                        ["Delivery Method", order?.delivery.method],
                        ["Primary address", order?.delivery.address],
                        ["Residence Type", order?.delivery.residence_type],
                        ["Delivery Location", order?.delivery.dispatch?.delivery_price],
                        ["Delivery Zone", order?.delivery.zone],
                        ["Dispatch Time", formatTimeString(order?.delivery.delivery_time ?? "00:00")],

                        ["Delivery Date", order?.delivery.delivery_date],
                      ].map(([label, value]) => (
                        <>
                          <span className="text-[#687588] font-manrope">{label}</span>
                          <span className="text-[#111827]">{value}</span>
                        </>
                      ))}
                    </div>
                  </section>

                  <section>
                    <p className="flex items-center gap-3">
                      <span className="text-[#8B909A] font-dm-sans text-sm">
                        Total(NGN)
                      </span>
                      <span className="text-[#111827] font-semibold text-lg font-poppins">
                        {formatCurrency(parseInt(order?.total_amount || '0'), 'NGN')}
                      </span>
                    </p>
                  </section>

                  <section className="flex justify-end my-12">
                    <Button
                      className="h-12 px-8"
                      onClick={closeSheet}
                    >
                      Close
                    </Button>
                  </section>

                  <section className="flex flex-col gap-1.5">
                    <p className="flex items-center gap-x-4 font-medium font-poppins text-[0.925rem] ">
                      <span className="text-[#000]">Enquiry Logged by: {order?.created_by.name}</span>
                      <span className="text-[#E01E1F] font-manrope text-sm">
                        {format(new Date(order?.create_date || 0), "do MMMM, yyyy | h:mmaaa")}
                      </span>
                    </p>

                    {
                      order?.approved_by &&
                      <p className="flex items-center gap-x-4 font-medium font-poppins text-[0.925rem] ">
                        <span className="text-[#000] ">Order Approved by: {order?.approved_by.name}</span>
                        <span className="text-[#E01E1F] font-manrope text-sm">
                          {format(new Date(order?.update_date || 0), "do MMMM, yyyy | h:mmaaa")}
                        </span>
                      </p>
                    }
                  </section>
                </div>
              </>
          }


        </SheetContent>
      </Sheet>
      <EditDeliveryDetailsModal
        closeModal={closeEditDeliveryDetailsModal}
        isModalOpen={isEditDeliveryDetailsModalOpen}
      />
    </>
  );
}
