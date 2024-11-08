import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, User, X } from "lucide-react";
import {
  Book,
  Notepad2,
  UserOctagon,
  Printer,
  Messages2,
  ProfileCircle,
  UserEdit,
} from "iconsax-react";
import { Separator } from "@radix-ui/react-select";
import { Phone } from "@phosphor-icons/react";
import Image from "next/image";
import {
  Checkbox,
  Button,
  LinkButton,
  SelectSingleCombo,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui";
import { EditPenIcon } from "@/icons/core";
import EnquiryDiscussCard from "@/app/(dashboard)/order-timeline/misc/components/EnquiryDiscussCard";
import { generateMockOrders } from "@/app/(dashboard)/order-timeline/misc/components/Timeline";
import { PAYMENT_STATUS_OPTIONS, paymentOptions } from "@/constants";

interface PaymentsDetailSheetDetailsPanelProps {
  orderId: string;
}

export default function PaymentsDetailSheet({
  orderId,
}: PaymentsDetailSheetDetailsPanelProps) {
  const mockDiscussion = generateMockOrders(1)[0];
  const [paymentStatus, setPaymentStatus] = React.useState("not_paid");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<
    string | undefined
  >(undefined);

  // const handleConfirm = () => {

  // }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={`Open order details for ${orderId}`}
        >
          {">>"}
        </Button>
      </SheetTrigger>

      <SheetContent className="!w-[90vw] !max-w-[800px] h-screen overflow-y-scroll xl:px-12">
        <SheetTitle className="border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center gap-4">
            <span className="bg-[#E8EEFD] p-2 rounded-full">
              <Book size={25} variant="Bold" color="#194A7A" />
            </span>
            <span>Order Details</span>
          </h2>
        </SheetTitle>
        <SheetClose className="absolute top-1/2 left-[-100%]">
          <X className="h-4 w-4" />
        </SheetClose>

        <Separator />

        <div className="flex justify-between pt-8">
          <div className="flex items-center gap-5">
            <div className="flex items-center space-x-2 mt-1 border border-gray-400 rounded-[10px] px-3 py-2 min-w-max shrink-0 h-12 bg-[#FFC600]">
              <span className="text-sm font-semibold text-[#111827] font-dm-sans">
                Order ID: {orderId}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <SelectSingleCombo
              name="paymentStatus"
              placeholder="Select Payment Status"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e)}
              className="w-max !h-10 bg-[#E9EAEC] text-[#083E7D]"
              options={PAYMENT_STATUS_OPTIONS}
              valueKey="value"
              labelKey="label"
            />
            <Button
              variant="unstyled"
              size="sm"
              className="bg-[#1118271C] text-[#111827] h-10"
            >
              Delivered
            </Button>
          </div>
        </div>

        <div className="py-4 space-y-10">
          <div className="grid grid-cols-2 gap-4 mt-8">
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
              <span className="text-sm text-[#687588]">Order Occasion: </span>
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
          </section>

          <Accordion type="multiple">
            {/* <section className="mt-16 mb-8">
              <header className="border-b border-b-[#00000021]">
                <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1">
                  <Messages2 size={19} />
                  Discussion
                  <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
                </p>
              </header>
              <div className="py-4">
                <EnquiryDiscussCard
                  isExpanded
                  hideOtherDetails
                  order={mockDiscussion}
                />
              </div>
            </section> */}

            <section className="mt-16 mb-8">
              <AccordionItem value="payment-details">
                <AccordionTrigger className="">
                  <header className="relative w-full">
                    <p className="relative flex items-center gap-2 text-base text-[#111827] w-max">
                      {/* <Notepad2 size={19} /> */}
                      Payment Details
                      <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
                    </p>
                    <span className="absolute h-[1px] w-full bottom-[-2px] left-0 bg-[#00000021]" />
                  </header>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 mt-6 text-sm flex flex-col gap-5">
                    <div className="flex gap-4">
                      <p className="text-[#687588] w-36">Payment Status:</p>
                      <p className="text-[#111827] font-bold">Part Payment</p>
                    </div>
                    <div className="flex gap-6">
                      <p className="text-[#687588] w-36">Total Amount Due:</p>
                      <p className="text-[#111827] font-bold">₦120,000.00</p>
                    </div>
                    <div className="flex gap-6 items-center">
                      <p className="text-[#687588] w-36">Initial Payment:</p>
                      <p className="text-[#111827] font-bold">₦60,000.00</p>
                      <p className="text-[10px] bg-[#194A7A] px-5 py-1 text-white rounded-full">
                        cash
                      </p>
                    </div>
                    <div className="flex gap-6 items-center">
                      <p className="text-[#687588] w-36">
                        Outstanding Balance :
                      </p>
                      <p className="font-bold text-red-500">₦60,000.00</p>
                      {selectedPaymentMethod ? (
                        <p className="text-[10px] bg-[#194A7A] px-5 py-1 text-white rounded-full">
                          {selectedPaymentMethod}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex gap-7">
                      <Select
                        value={selectedPaymentMethod}
                        onValueChange={setSelectedPaymentMethod}
                      >
                        <SelectTrigger className="w-[90%] max-w-[230px] h-12 mb-4">
                          <SelectValue placeholder="Select payment Method" />
                        </SelectTrigger>
                        <SelectContent className="px-8">
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Bank Transfer">
                            Bank Transfer
                          </SelectItem>
                          <SelectItem value="Bank Deposit">Bank Deposit</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* <Button className="h-12 bg-[#3679171C] text-[#45971F] hover:bg-gray-300" onClick={handleConfirm}>Confirm Payment</Button> */}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </section>

            <section className="mt-16 mb-8">
              <AccordionItem value="delivery-note">
                <AccordionTrigger className="">
                  <header className="relative w-full">
                    <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1">
                      <Notepad2 size={19} />
                      Delivery Note
                      <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
                    </p>
                    <span className="absolute h-[1px] w-full bottom-[-2px] left-0 bg-[#00000021]" />
                  </header>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-1 py-2 bg-transparent rounded-md flex justify-between items-center w-full">
                    <Input
                      value="Happy Anniversary"
                      readOnly
                      containerClassName="w-full"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </section>

            <section className="mb-8">
              <AccordionItem value="product-item">
                <AccordionTrigger className="">
                  <header className="relative w-full">
                    <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1 px-2.5">
                      Product Items
                      <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
                    </p>
                    <span className="absolute h-[1px] w-full bottom-[-2px] left-0 bg-[#00000021]" />
                  </header>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 mt-1">
                    <article className="flex border rounded-2xl p-6">
                      <div className="flex flex-col gap-1.5 w-full max-w-[700px] bg-white rounded-xl">
                        <header className="flex items-start justify-between">
                          <div className="relative w-[120px] aspect-[98/88] rounded-xl bg-[#F6F6F6]">
                            <Image
                              src="/img/cake.png"
                              alt="cake"
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex items-center gap-4 self-start">
                            <Checkbox />
                          </div>
                        </header>

                        <section className="flex flex-col justify-between">
                          <h5 className="text-[#194A7A] text-lg font-medium mb-5">
                            Adeline Fautline Cake
                          </h5>
                          <div className="xl:flex ">
                            <div className="space-y-2.5 text-[0.8rem] ">
                              <div className="flex items-center gap-x-5 gap-y-2">
                                <p className="flex items-center gap-1 text-[#111827] font-medium">
                                  <span className="text-[#687588]">
                                    Quantity:
                                  </span>{" "}
                                  1 pcs
                                </p>
                                <p className="flex items-center gap-1 text-[#111827] font-medium">
                                  <span className="text-[#687588]">
                                    Category:
                                  </span>{" "}
                                  Cake
                                </p>
                                <p className="flex items-center gap-1 text-[#111827] font-medium">
                                  <span className="text-[#687588]">Size:</span>{" "}
                                  6 inches
                                </p>
                                <p className="flex items-center gap-1 text-[#111827] font-medium">
                                  <span className="text-[#687588]">
                                    Layers:
                                  </span>{" "}
                                  3 layers
                                </p>
                              </div>
                              <p className="text-[#111827] font-medium">
                                <span className="text-[#687588]">Flavour:</span>{" "}
                                Chocolate, Vanilla, Strawberry
                              </p>
                              <p className="text-[#111827] font-medium">
                                <span className="text-[#687588]">
                                  Cake toppings:
                                </span>{" "}
                                Fruits, chocolate & cookies
                              </p>
                              <p className="text-[#111827] font-medium">
                                <span className="text-[#687588]">
                                  Instructions:
                                </span>{" "}
                                Allergic to Nuts, Please make your whipped cream
                                low.
                              </p>
                            </div>

                            <div className="space-y-2.5 text-[0.8rem] content-center flex-1 flex justify-end">
                              <p className="flex flex-col text-[#111827] font-medium text-right">
                                <span className="text-[#687588]">
                                  Message on cake:
                                </span>{" "}
                                Love Me Like You Always Do
                              </p>
                            </div>
                          </div>
                        </section>

                        <section className="flex items-center justify-between pt-1 border-t">
                          <p className="text-[#111827] font-medium text-sm">
                            <span className="text-[#687588] italic font-light text-[0.8rem]">
                              Production Cost:{"  "}
                            </span>
                            ₦35,000
                          </p>
                          <p className="font-medium text-[#194A7A]">
                            Amount: <span className="font-bold">₦50,000</span>{" "}
                          </p>
                        </section>
                      </div>
                    </article>

                    <article className="flex border rounded-2xl p-6">
                      <div className="flex flex-col gap-1.5 w-full max-w-[700px] bg-white rounded-xl">
                        <header className="flex items-start justify-between">
                          <div className="relative w-[120px] aspect-[98/88] rounded-xl bg-[#F6F6F6]">
                            <Image
                              src="https://www.zuzudelights.com/wp-content/uploads/2022/04/fleur-luxe.jpg"
                              alt="Adelya - Red Roses Bouquet"
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex items-center gap-4 self-start">
                            <Checkbox />
                          </div>
                        </header>

                        <section className="flex flex-col justify-between">
                          <h5 className="text-[#194A7A] text-lg font-medium mb-5">
                            Adelya Red Roses Bouquet
                          </h5>
                          <div className=" ">
                            <div className="space-y-2.5 text-[0.8rem]">
                              <div className="flex items-center gap-x-5 gap-y-2 flex-wrap">
                                <p className="flex items-center gap-1 text-[#111827] font-medium">
                                  <span className="text-[#687588]">
                                    Quantity:
                                  </span>{" "}
                                  1 pcs
                                </p>
                                <p className="flex items-center gap-1 text-[#111827] font-medium">
                                  <span className="text-[#687588]">
                                    Category:
                                  </span>{" "}
                                  Flower
                                </p>
                                <p className="flex items-center gap-1 text-[#111827] font-medium">
                                  <span className="text-[#687588]">
                                    Colour:
                                  </span>{" "}
                                  6 Red
                                </p>
                              </div>
                              <p className="text-[#111827] font-medium">
                                <span className="text-[#687588]">Type:</span>{" "}
                                Red Rose
                              </p>
                              <p className="text-[#111827] font-medium">
                                <span className="text-[#687588]">
                                  Instructions:
                                </span>{" "}
                                Tie with a red ribbon
                              </p>
                            </div>
                          </div>
                        </section>
                        <section className="flex flex-col items-end gap-1 justify-end border-t py-2">
                          <p className="text-[#111827] font-medium">
                            <span className="text-[#687588] font-light text-sm">
                              Cost of Item:{"  "}
                            </span>
                            ₦45,000
                          </p>
                          <p className="text-[#111827] font-medium">
                            <span className="text-[#687588] font-light text-sm">
                              Miscellaneous:{"  "}
                            </span>
                            ₦5,000
                          </p>
                        </section>
                        <section className="flex items-center justify-between pt-1 border-t">
                          <p className="text-[#111827] font-medium text-sm">
                            <span className="text-[#687588] italic font-light text-[0.8rem]">
                              Production Cost:{"  "}
                            </span>
                            ₦35,000
                          </p>
                          <p className="font-medium text-[#194A7A]">
                            Amount: <span className="font-bold">₦50,000</span>{" "}
                          </p>
                        </section>
                      </div>
                    </article>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </section>
          </Accordion>

          <section className="p-4 px-6 rounded-2xl border">
            <div className="flex justify-between items-center mb-2 border-b">
              <h3 className="font-semibold font-manrope">Delivery Details</h3>
              <Button variant="ghost" size="sm">
                <EditPenIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className=" grid grid-cols-[max-content,1fr] gap-x-6 gap-y-2 text-sm mt-4">
              {[
                ["Primary address", "No. 8, Adeniran close, Lekki Phase 1"],
                ["Country", "Nigeria"],
                ["State/City", "Lagos/Ikeja"],
                ["Delivery Zone", "L1-Lagos Island"],
                ["Delivery Date", "21/July/2024"],
                ["Delivery Method", "Dispatch"],
                ["Driver Name", "Alli Emmanuel"],
                ["Driver Phone Number", "0800998999"],
                ["Rider Platform", "GIG"],
                // ['Delivery Fee', 'Lekki Phase 1 - ₦5,000'],
              ].map(([label, value]) => (
                <>
                  <span className="text-[#687588] font-manrope">{label}</span>
                  <span className="text-[#111827]">{value}</span>
                </>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <p className="flex items-center gap-3">
              <span className="text-[#687588] font-manrope">Total(NGN)</span>
              <span className="text-[#111827] font-medium">N130,000.00</span>
            </p>
          </section>

          <section className="mt-16 mb-8">
            <header className="border-b border-b-[#00000021]">
              <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1">
                <Notepad2 size={19} />
                Customer&apos;s Feedback
                <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
              </p>
            </header>
            <div className="mt-1 py-2 bg-transparent rounded-md flex justify-between items-center w-full">
              <Input
                value="The order was delivered intact. Rider was polite and professional"
                readOnly
                containerClassName="w-full"
              />
            </div>
          </section>

          <section className="flex justify-end my-12">
            <SheetClose className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">
              Close
            </SheetClose>
          </section>

          <section className="flex flex-col gap-1.5">
            <p className="flex items-center gap-x-4 font-medium font-poppins text-[0.925rem] ">
              <span className="text-[#000]">Enquiry Logged by: Adeayo</span>
              <span className="text-[#E01E1F] font-manrope text-sm">
                15th June, 2024 | 6:00pm
              </span>
            </p>

            <p className="flex items-center gap-x-4 font-medium font-poppins text-[0.925rem] ">
              <span className="text-[#000] ">Order Approved by: Adeayo</span>
              <span className="text-[#E01E1F] font-manrope text-sm">
                15th June, 2024 | 6:00pm
              </span>
            </p>

            <p className="flex items-center gap-x-4 font-medium font-poppins text-[0.925rem] ">
              <span className="text-[#000] ">Order Completed by: Adeayo</span>
              <span className="text-[#E01E1F] font-manrope text-sm">
                15th June, 2024 | 6:00pm
              </span>
            </p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
