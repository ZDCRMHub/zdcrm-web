import React from "react";
import { Button, LinkButton, CardTitle, Spinner } from "@/components/ui";
import { Mail, X } from "lucide-react";
import {
  Book,
  Notepad2,
  UserOctagon,
  EmojiHappy,
  ProfileCircle,
  UserEdit,
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
import { ORDER_DELIVERY_STATUS_OPTIONS } from "@/constants";
import { useGetOrderDetail, useUpdateDeliveryStatus, useUpdateOrderPaymentMethod, } from "../api";
import { TOrder } from "../types";
import { extractErrorMessage, formatAxiosErrorMessage } from "@/utils/errors";
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/currency";
import OrderDetailSheetSkeleton from "./OrderDetailSheetSkeleton";
import { printNote } from "../utils/print";
import Link from "next/link";

interface OrderDetailsPanelProps {
  order: TOrder;
  isSheetOpen: boolean;
  closeSheet: () => void;
}

export default function OrderDetailSheetDelivery({ order: default_order, isSheetOpen, closeSheet }: OrderDetailsPanelProps) {
  const { mutate, isPending: isUpdatingStatus } = useUpdateDeliveryStatus()
  const { data: order, isLoading, refetch, isFetching } = useGetOrderDetail(default_order?.id, isSheetOpen);
  const {
    state: isEditDeliveryDetailsModalOpen,
    setTrue: openEditDeliveryDetailsModal,
    setFalse: closeEditDeliveryDetailsModal,
  } = useBooleanStateControl();

  const handleStatusUpdate = (new_status: string) => {
    mutate({ id: default_order?.id, status: new_status },

      {
        onSuccess: (data) => {
          toast.success("Order status updated successfully");
          refetch();
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





  return (
    <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
      <SheetContent className="!w-[90vw] !max-w-[800px] h-screen overflow-y-scroll xl:px-10">
        <SheetTitle>
          <h2 className="text-xl font-semibold flex items-center gap-4">
            <span className="bg-[#E8EEFD] p-2 rounded-full">
              <Book size={25} variant="Bold" color="#194A7A" />
            </span>
            <span className="flex items-center gap-1.5">
              Order Details

              {
                isFetching && <Spinner size={18} />
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
              <div className="flex justify-between pt-8">
                <div className="flex items-center gap-5">
                  <div className="flex items-center space-x-2 mt-1 border border-gray-400 rounded-[10px] px-3 py-2 min-w-max shrink-0">
                    <span className="text-sm">Order ID: {order?.order_number}</span>
                  </div>

                  <Select value={order?.delivery.status} defaultValue={order?.delivery.status} onValueChange={(new_value) => handleStatusUpdate(new_value)}>
                    <SelectTrigger className="w-[150px] bg-transparent">
                      <SelectValue placeholder={order?.delivery.status} />
                      {
                        isUpdatingStatus && <Spinner size={18} />
                      }
                    </SelectTrigger>
                    <SelectContent>
                      {
                        ORDER_DELIVERY_STATUS_OPTIONS.map((option) => (
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
              </div>

              <div className="py-4 space-y-10">
                <div className="grid grid-cols-2 gap-2.5 mt-8">
                  <Card className="flex-1 bg-[#194A7A] text-white rounded-lg">
                    <CardHeader className="border-b border-[#FFC600] pb-4">
                      <CardTitle className="flex items-center justify-center gap-2 text-lg">
                        <UserOctagon size={25} color="#FFC600" />
                        <span>Client&apos;s Info</span>
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
                            <span>{order?.customer?.name}</span>
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
                            <span>{order?.customer?.phone}</span>
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
                    <p>{convertKebabAndSnakeToTitleCase(order?.payment_options)}</p>
                  </div>
                </section>

                <section className="mt-16 mb-8">
                  <header className="flex items-center justify-between border-b border-b-[#00000021]">
                    <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1">
                      <Notepad2 size={19} />
                      Message on Order
                      <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
                    </p>

                    <Button
                      variant="yellow"
                      onClick={() => printNote(
                        {
                          note: order?.message || '',
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
                      value={order?.message || "No note"}
                      readOnly
                      containerClassName={cn("w-full", !order?.message && "text-[#687588] italic")}
                      rightIcon={
                        <Link href={`/order-management/orders/edit?order_id=${order?.id}`} className="">
                          <EditPenIcon width={20} height={20} />
                        </Link>
                      }
                    />
                  </div>
                </section>

                <section className="p-4 px-6 rounded-2xl border">
                  <div className="flex justify-between items-center mb-2 border-b">
                    <h3 className="font-semibold font-manrope text-lg">
                      Delivery Details
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={openEditDeliveryDetailsModal}
                    >
                      <EditPenIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className=" grid grid-cols-[max-content,1fr] gap-x-6 gap-y-2 text-sm mt-4">
                    {[
                      ["Delivery Method", order?.delivery.method],
                      ["Primary address", order?.delivery.address],
                      ["Residence Type", order?.delivery.residence_type],
                      ["Delivery Location", `${order?.delivery.dispatch?.location} - ${formatCurrency(Number(order?.delivery.dispatch?.delivery_price || '0'), 'NGN')}`],
                      ["Delivery Zone", order?.delivery.zone],
                      ["Dispatch Time", order?.delivery.delivery_time],
                      ["Delivery Date", order?.delivery.delivery_date],
                    ].map(([label, value]) => (
                      <>
                        <span className="text-[#687588] font-manrope">{label}</span>
                        <span className="text-[#111827]">{value}</span>
                      </>
                    ))}
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
                                          \
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
                                      {/* <p className="text-[#111827] font-medium text-sm">
                                        <span className="text-[#687588] italic font-light text-[0.8rem]">
                                          Production Cost:{" "}
                                        </span>
                                      </p> */}
                                      <p className="font-medium text-[#194A7A] ml-auto">
                                        Total Amount:{" "}
                                        <span className="font-bold">
                                          {
                                            formatCurrency(
                                              (
                                                Number(item.product_variation.selling_price || 0) +
                                                item.miscellaneous
                                                  .map(misc => Number(misc.cost) || 0)
                                                  .reduce((acc: number, curr: number) => Number(acc) + Number(curr), 0) +
                                                item.properties.reduce((acc, property) => {
                                                  const value =
                                                    Number(property.bouquet_selling_at_order || 0) +
                                                    Number(property.glass_vase_selling_at_order || 0) +
                                                    Number(property.toppings_selling_at_order || 0) +
                                                    Number(property.layers_selling_at_order || 0) +
                                                    Number(property.whipped_cream_selling_at_order || 0);
                                                  return acc + value;
                                                }, 0)
                                              ) * Number(item.quantity || 0),
                                              'NGN'
                                            )
                                          }
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
                  <LinkButton
                    href={(!order?.delivery.driver_phone && !order?.delivery.driver_name) ? `/order-management/orders/${order?.id}/confirm-delivery` : `/order-management/orders/${order?.id}/complete-order`}
                    className="h-12 px-8"
                  >
                    Proceed to Dispatch
                  </LinkButton>
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

        <EditDeliveryDetailsModal
          closeModal={closeEditDeliveryDetailsModal}
          isModalOpen={isEditDeliveryDetailsModalOpen}
        />
      </SheetContent>
    </Sheet>
  );
}
