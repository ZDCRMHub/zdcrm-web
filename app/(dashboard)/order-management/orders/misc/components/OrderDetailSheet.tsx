import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox, Button, LinkButton, CardTitle } from "@/components/ui";
import { Mail, MessageCircle, User, X } from "lucide-react";
import {
  Book,
  Notepad2,
  UserOctagon,
  Printer,
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
import { paymentOptions } from "@/constants";

interface OrderDetailsPanelProps {
  orderId: string;
}

export default function OrderDetailSheet({ orderId }: OrderDetailsPanelProps) {
  const mockOrder = generateMockOrders(1)[0];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='sm' aria-label={`Open order details for ${orderId}`}>
          {'>>'}
        <Button
          variant="ghost"
          size="sm"
          aria-label={`Open order details for ${orderId}`}
        >
          {">>"}
        </Button>
      </SheetTrigger>
      <SheetContent className='!w-[90vw] !max-w-[800px] h-screen overflow-y-scroll xl:px-12'>
        <SheetTitle>
          <h2 className="text-xl font-semibold flex items-center gap-4">
            <span className="bg-[#E8EEFD] p-2 rounded-full">
              <Book size={25} variant="Bold" color="#194A7A" />
            </span>
            <span>Order Details</span>
          </h2>
        </SheetTitle>
        <SheetClose className='absolute top-1/2 left-[-100%]'>
          <X className='h-4 w-4' />
        </SheetClose>
        <Separator />
        <div className='flex justify-between pt-8'>
          <div className='flex items-center gap-5'>
            <div className='flex items-center space-x-2 mt-1 border border-gray-400 rounded-[10px] px-3 py-2 min-w-max shrink-0'>
              <span className='text-sm'>Order ID: {orderId}</span>

        <div className="flex justify-between pt-8">
          <div className="flex items-center gap-5">
            <div className="flex items-center space-x-2 mt-1 border border-gray-400 rounded-[10px] px-3 py-2 min-w-max shrink-0">
              <span className="text-sm">Order ID: {orderId}</span>
            </div>

            <Select>
              <SelectTrigger className="w-[150px] bg-transparent">
                <SelectValue placeholder="SOA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOA">SOA</SelectItem>
                <SelectItem value="SORTED">SORTED</SelectItem>
                <SelectItem value="DIS CL">DIS CL</SelectItem>
                <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                <SelectItem value="SENT TO DISPATCH">
                  SENT TO DISPATCH
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="px flex gap-1 border-[#B9B9B9]"
            >
              <EditPenIcon className="h-4 w-4" />

              <span>Edit</span>
            </Button>
            {/* <Badge
              variant='outline'
              className='bg-[#367917] bg-opacity-15 border-green-300 px-3 py-3 rounded-[10px] text-[#2D7D08] min-w-max'>
              Payment Confirmed
            </Badge> */}
            <Select>
              <SelectTrigger className="w-[150px] bg-[#3679171F]">
                <SelectValue placeholder="Select Payment Method" />
              </SelectTrigger>
              <SelectContent>
                {paymentOptions.map((option) => (
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
        </div>

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
                      <span>Ife Adebayo</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Mail
                        size={20}
                        className="text-[#FFC600] flex-shrink-0"
                      />
                      <span>adebayo@gmail.com</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Phone
                        size={20}
                        className="text-[#FFC600] flex-shrink-0"
                      />
                      <span>08031823849</span>
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
                      <span>Paul Adeola</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Mail
                        size={20}
                        className="text-[#FFC600] flex-shrink-0"
                      />
                      <span>oniayo@gmail.com</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Phone
                        size={20}
                        className="text-[#FFC600] flex-shrink-0"
                      />
                      <span>08031823849</span>
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
              <p>Happy Anniversary</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-[#111827]">
              <span className="text-sm text-[#687588]">Order Channel: </span>
              <p>Website</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-[#111827]">
              <span className="text-sm text-[#687588]">Payment Mode: </span>
              <p>Bank Transfer</p>
            </div>
          {/* Order Details */}
          <section className='flex items-center gap-8 mb-16 mt-3'>
            {[
              { label: 'Order Occasion', value: 'Happy Anniversary' },
              { label: 'Order Channel', value: 'Website' },
              { label: 'Payment Mode', value: 'Bank Transfer' }
            ].map((item, index) => (
              <div key={index} className='flex items-center gap-1 text-sm text-[#111827]'>
                <span className='text-sm text-[#687588]'>{item.label}:{" "}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </section>
          {/* Discussion Section */}
          <section className='mt-16 mb-16'>
            <header className="border-b border-b-[#00000021] mb-6">
              <p className='relative flex items-center gap-2 text-base text-[#111827] w-max p-1'>
                <MessageCircle size={19} />
                Discussion
                <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
              </p>
            </header>
            <EnquiryDiscussCard order={mockOrder} />
          </section>

          <section className="mt-16 mb-8">
          {/* Order Notes */}
          <section className='mt-16 mb-8'>
            <header className="border-b border-b-[#00000021]">
              <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1">
                <Notepad2 size={19} />
                Delivery Note
              <p className='relative flex items-center gap-2 text-base text-[#111827] w-max p-1'>
                <MessageCircle size={19} />
                Order Notes
                <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
              </p>
            </header>
            <div className="mt-1 py-2 bg-transparent rounded-md flex justify-between items-stretch gap-6 w-full">
              <Input
                value="Happy Anniversary"
                readOnly
                containerClassName="w-full"
                rightIcon={<EditPenIcon width={20} height={20} />}
              />
            <div className='mt-1 py-2 bg-transparent rounded-md flex justify-between items-center w-full'>
              <Input value="Happy Anniversary" readOnly containerClassName='w-full' />
            </div>
          </section>



          {/* Product Items */}
          <section className='mb-8'>
            <header className="border-b border-b-[#00000021] mb-6">
              <p className='relative flex items-center gap-2 text-base text-[#111827] w-max p-1 px-2.5'>
                Product Item
                <span className="absolute bottom-[-2px]w-full bottom-0 left-0 bg-black" />
              </p>
            </header>
            <div className='space-y-4 mt-1'>
              {[
                {
                  name: 'Adeline Fautline Cake',
                  image: '/img/cake.png',
                  details: [
                    { label: 'Quantity', value: '1 pcs' },
                    { label: 'Category', value: 'Cake' },
                    { label: 'Size', value: '6 inches' },
                    { label: 'Flavour', value: 'Chocolate, Vanilla, Strawberry' },
                    { label: 'Cake toppings', value: 'Fruits, chocolate & cookies' },
                  ],
                  instructions: 'Allergic to Nuts, Please make your whipped cream low',
                  messageOnCake: 'Love Me Like You Always Do',
                  costs: {
                    production: '₦35,000',
                    total: '₦50,000.00'
                  }
                },
                {
                  name: 'Adelya Red Roses Bouquet',
                  image: 'https://www.zuzudelights.com/wp-content/uploads/2022/04/fleur-luxe.jpg',
                  details: [
                    { label: 'Quantity', value: '1 pcs' },
                    { label: 'Category', value: 'Flower' },
                    { label: 'Size', value: '6 inches' },
                    { label: 'Colour', value: 'Red' },
                    { label: 'Type', value: 'Red Rose' },
                  ],
                  instructions: 'Tie with a red ribbon',
                  costs: {
                    production: '₦35,000',
                    item: '₦45,000.00',
                    miscellaneous: '₦5,000.00',
                    total: '₦50,000.00'
                  }
                }
              ].map((item, index) => (
                <article key={index} className="flex border rounded-2xl p-6">
                  <div className="flex flex-col gap-1.5 w-full max-w-[700px] bg-white rounded-xl">
                    <header className="flex items-start justify-between">
                      <div className='relative w-[120px] aspect-[98/88] rounded-xl bg-[#F6F6F6]'>
                        <Image src={item.image} alt={item.name} fill className='object-cover rounded-md' />
                      </div>
                      <div className="flex items-center gap-4 self-start">
                        <Checkbox checked={true} disabled />
                      </div>
                    </header>
                    <section className='flex flex-col justify-between'>
                      <h5 className="text-[#194A7A] text-lg font-medium mb-5">{item.name}</h5>
                      <div className="xl:grid grid-cols-2">
                        <div className='space-y-2.5 text-[0.8rem]'>
                          <div className='flex items-center gap-x-5 gap-y-2 flex-wrap'>
                            {item.details.slice(0, 4).map((detail, detailIndex) => (
                              <p key={detailIndex} className="flex items-center gap-1 text-[#111827] font-medium">
                                <span className='text-[#687588]'>{detail.label}:</span> {detail.value}
                              </p>
                            ))}
                          </div>
                          {item.details.slice(4).map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-[#111827] font-medium">
                              <span className='text-[#687588]'>{detail.label}:</span> {detail.value}
                            </p>
                          ))}
                          {item.messageOnCake && (
                            <p className="text-[#111827] font-medium">
                              <span className='text-[#687588]'>Message on cake:</span> {item.messageOnCake}
                            </p>
                          )}
                        </div>
                        <div className='space-y-2.5 text-[0.8rem]'>
                          <p className="flex flex-col text-[#111827] font-medium">
                            <span className='text-[#687588]'>Instructions:</span> {item.instructions}
                          </p>
                        </div>
                      </div>
                    </section>
                    <section className="flex flex-col gap-2 ">
                      {item.costs.item && (
                        <div className="flex flex-col items-end gap-1 pt-3 border-t">
                          <p className="text-sm text-[#687588]">Cost of item: {item.costs.item}</p>
                          <p className="text-sm text-[#687588]">Miscellaneous: {item.costs.miscellaneous}</p>
                        </div>
                      )}
                      <div className="flex justify-between items-center border-t mt-2">
                        <p className="text-sm text-[#687588]"><span className='italic'>Production Cost:</span>{" "} {item.costs.production}</p>
                        <p className="font-medium">Amount: {item.costs.total}</p>
                      </div>
                    </section>
                  </div>
                </article>
              ))}
            </div>
          </section>



          {/* Message for order */}
          <section className='mt-16 mb-8'>
            <header className="border-b border-b-[#00000021]">
              <p className='relative flex items-center gap-2 text-base text-[#111827] w-max p-1'>
                <Notepad2 size={19} />
                Message for order
                <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
              </p>
            </header>
            <div className='mt-1 py-2 bg-transparent rounded-md flex justify-between items-stretch gap-6 w-full'>
              <Input value="Happy Anniversary" readOnly containerClassName='w-full' />
            </div>
          </section>



          {/* Delivery Details */}
          <section className='p-4 px-6 rounded-2xl border'>
            <div className='flex justify-between items-center mb-2 border-b'>
              <h3 className='font-semibold font-manrope'>Delivery Details</h3>
              <Button variant='ghost' size='sm' disabled>
                <EditPenIcon className='h-4 w-4' />
              </Button>
            </div>
            <div className='grid grid-cols-[max-content,1fr] gap-x-6 gap-y-2 text-sm mt-4'>
              {[
                ['Primary address', 'No. 8, Adeniran close, Lekki Phase 1'],
                ['Country', 'Nigeria'],
                ['State/City', 'Lagos/Ikeja'],
                ['Delivery Zone', 'L1-Lagos Island'],
                ['Delivery Date', '21/July/2024'],
                ['Delivery Fee', 'Lekki Phase 1 - ₦5,000'],
                ['Driver Name', 'Emmanuel'],
                ['Delivery Method', 'Dispatch'],
                ['Driver Number', '09017865543'],
                ['Rider Platform', 'GIG'],
              ].map(([label, value], index) => (
                <React.Fragment key={index}>
                  <span className='text-[#687588] font-manrope'>{label}</span>
                  <span className="text-[#111827]">{value}</span>
                </React.Fragment>
              ))}
            </div>
          </section>
          {/* Total */}
          <section>
            <p className="flex items-center gap-3">
              <span className='text-[#687588] font-manrope'>Total(NGN)</span>
              <span className="text-[#111827] font-bold">N130,000.00</span>
            </p>
          </section>
          {/* Customer Feedback */}
          <section className='mt-16 mb-8'>
            <header className="border-b border-b-[#00000021]">
              <p className='relative flex items-center gap-2 text-base text-[#111827] w-max p-1'>
                <Notepad2 size={19} />
                Customer&apos; Feedback
                <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
              </p>
            </header>
            <div className='mt-1 py-2 bg-transparent rounded-md flex justify-between items-stretch gap-6 w-full'>
              <Input value="Order was delivered promptly, Thank you" readOnly containerClassName='w-full' />
            </div>
          </section>
          {/* Close Button */}
          <section className="flex justify-end my-12">
            <SheetClose>
              <Button className='h-12 px-12'>Close</Button>
            </SheetClose>
          </section>
          {/* Order Timeline */}
          <section className="flex flex-col gap-1.5">
            {[
              { action: 'Enquiry Logged by', name: 'Adeayo', date: '15th June, 2024', time: '6:00pm' },
              { action: 'Order Approved by', name: 'Adeayo', date: '15th June, 2024', time: '6:07pm' },
              { action: 'Order Completed by', name: 'Adeayo', date: '16th June, 2024', time: '2:35pm' },
            ].map((item, index) => (
              <p key={index} className="flex items-center gap-x-4 font-medium font-poppins text-[0.925rem]">
                <span className='text-[#000]'>{item.action}: {item.name}</span>
                <span className="text-[#E01E1F] font-manrope text-sm">{item.date} {" "} | {" "}{item.time}</span>
              </p>
            ))}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}