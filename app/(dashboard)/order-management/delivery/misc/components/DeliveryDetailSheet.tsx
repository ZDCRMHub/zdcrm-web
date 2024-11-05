import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, User, X } from "lucide-react";
import {
  Book,
  Notepad2,
  UserOctagon,
  Printer,
  UserEdit,
  ProfileCircle,
} from "iconsax-react";
import { Separator } from "@radix-ui/react-select";
import { Phone } from "@phosphor-icons/react";
import Image from "next/image";
import {
  Checkbox,
  Button,
  LinkButton,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui";
import { EditPenIcon } from "@/icons/core";
import EditDeliveryDetailsModal from "../../../orders/misc/components/EditDeliveryDetailsModal";
import { useBooleanStateControl } from "@/hooks";
import { paymentOptions } from "@/constants";

interface OrderDetailsPanelProps {
  orderId: string;
}

// const ConfirmPaymentModal: React.FC<ModalProps> = ({
//   isSuccessModalOpen,
//   isModalOpen,
//   closeModal,
//   customConfirmText,
//   customTitleText,
//   icon,
//   heading,
//   subheading,
//   nextStep,
// }) => {

const DeliveryDetailSheet: React.FC<OrderDetailsPanelProps> = ({ orderId }) => {
  const {
    state: isEditDeliveryDetailsModalOpen,
    setTrue: openEditDeliveryDetailsModal,
    setFalse: closeEditDeliveryDetailsModal,
  } = useBooleanStateControl();

  // const openModal = () => {
  //   openEditDeliveryDetailsModal()
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
        <SheetTitle>
          <h2 className="text-xl font-semibold flex items-center gap-4">
            <span className="bg-[#E8EEFD] p-2 rounded-full">
              <Book size={25} variant="Bold" color="#194A7A" />
            </span>
            <span>Delivery Details</span>
          </h2>
        </SheetTitle>
        <SheetClose className="absolute top-1/2 left-[-100%]">
          <X className="h-4 w-4" />
        </SheetClose>

        <Separator />

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
              <EditPenIcon className="h-5 w-5" />

              <span>Edit</span>
            </Button>
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

          <section className="mt-16 mb-8">
            <header className="border-b border-b-[#00000021]">
              <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1">
                <Notepad2 size={19} />
                Delivery notes
                <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
              </p>
            </header>
            <div className="mt-1 py-2 bg-transparent rounded-md flex justify-between items-stretch gap-6 w-full">
              <Input
                value="Happy Anniversary"
                readOnly
                containerClassName="w-full"
              />
              <button className="flex items-center justify-center gap-2 bg-[#FFC600] px-5 py-2 rounded-lg">
                <Printer size={20} />
                Print
              </button>
            </div>
          </section>

          <section className="p-4 px-6 rounded-2xl border">
            <div className="flex justify-between items-center mb-2 border-b">
              <h3 className="font-semibold font-manrope">Delivery Details</h3>
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
                ["Delivery Method", "Dispatch"],
                ["Primary address", "No. 8, Adeniran close, Lekki Phase 1"],
                ["Country", "Nigeria"],
                ["State/City", "Lagos/Ikeja"],
                ["Delivery Zone", "L1-Lagos Island"],
                ["Delivery Date", "21/July/2024"],
                ["Delivery Fee", "Lekki Phase 1 - ₦5,000"],
              ].map(([label, value]) => (
                <>
                  <span className="text-[#687588] font-manrope">{label}</span>
                  <span className="text-[#111827]">{value}</span>
                </>
              ))}
            </div>
          </section>
          <section className="mt-16 mb-8">
            <header className="border-b border-b-[#00000021]">
              <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1">
                <MessageCircle size={19} />
                Message for order
                <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
              </p>
            </header>
            <div className="mt-1 py-2 bg-transparent rounded-md flex justify-between items-center w-full">
              <Input
                value="Happy Anniversary"
                // rightIcon={
                //   <Button variant='ghost' size='sm'>
                //     <EditPenIcon className='h-5 w-5' />
                //   </Button>
                // }
                readOnly
                containerClassName="w-full"
              />
            </div>
          </section>

          <Accordion type="multiple">
            <section className="mb-8">
              <AccordionItem value="product-item">
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
                            <Checkbox checked />
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
                            <Checkbox checked />
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

          <section>
            <p className="flex items-center gap-3">
              <span className="text-[#687588] font-manrope">Total(NGN)</span>
              <span className="text-[#111827] font-medium">N130,000.00</span>
            </p>
          </section>

          <section className="flex justify-end my-12">
            <LinkButton
              href="/order-management/orders/confirm-delivery"
              className="h-12 px-8"
            >
              Proceed to Dispatch
            </LinkButton>
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
          </section>
        </div>

        <EditDeliveryDetailsModal
          closeModal={closeEditDeliveryDetailsModal}
          isModalOpen={isEditDeliveryDetailsModalOpen}
        />
      </SheetContent>
    </Sheet>
  );
};

export default DeliveryDetailSheet;
