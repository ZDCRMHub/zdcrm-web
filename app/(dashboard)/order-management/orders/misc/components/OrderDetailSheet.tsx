import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox, Button } from '@/components/ui';
import { Mail, MessageCircle, Pencil, User, X } from 'lucide-react';
import { Book, UserOctagon } from 'iconsax-react';
import { Separator } from '@radix-ui/react-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../components/ui/select';
import { Card, CardContent } from '../../../../../../components/ui/card';
import { Phone } from '@phosphor-icons/react';
import Image from 'next/image';
import { Input, Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui';

interface OrderDetailsPanelProps {
  orderId: string;
}

export default function OrderDetailSheet({ orderId }: OrderDetailsPanelProps) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='sm'

          aria-label={`Open order details for ${orderId}`}>
          {'>>'}
        </Button>
      </SheetTrigger>

      <SheetContent className='!w-[90vw] !max-w-[800px] h-screen overflow-y-scroll xl:px-12'>
        <SheetTitle>
          <h2 className='text-xl font-semibold flex items-center gap-4'>
            <span className='bg-[#E8EEFD] p-2 rounded-full'>
              <Book size={25} variant='Bold' color='#194A7A' />
            </span>
            <span>Order Details</span>
          </h2>
        </SheetTitle>
        <SheetClose className='absolute top-1/2 left-[-100%]' >
          <X className='h-4 w-4' />
        </SheetClose>

        <Separator />

        <div className='flex justify-between pt-8'>
          <div className='flex items-center gap-5'>
            <div className='flex items-center space-x-2 mt-1 border border-gray-400 rounded-[10px] px-3 py-2 min-w-max shrink-0'>
              <span className='text-sm'>Order ID: {orderId}</span>
            </div>

            <Select>
              <SelectTrigger className='w-[150px] bg-transparent'>
                <SelectValue placeholder='SOA' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='SOA'>SOA</SelectItem>
                <SelectItem value='SORTED'>SORTED</SelectItem>
                <SelectItem value='DIS CL'>DIS CL</SelectItem>
                <SelectItem value='DELIVERED'>DELIVERED</SelectItem>
                <SelectItem value='CANCELLED'>CANCELLED</SelectItem>
                <SelectItem value='SENT TO DISPATCH'>SENT TO DISPATCH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              className='px flex gap-1 border-[#B9B9B9]'>
              <Pencil className='h-4 w-4' />

              <span>Edit</span>
            </Button>
            <Badge
              variant='outline'
              className='bg-[#367917] bg-opacity-15 border-green-300 px-3 py-3 rounded-[10px] text-[#2D7D08] min-w-max'>
              Payment Confirmed
            </Badge>
          </div>
        </div>

        <div className='py-4 space-y-10'>
          <div className='grid grid-cols-2 gap-4 mt-8'>
            <article className='flex flex-col bg-[#194A7A] text-center text-white rounded-lg shadow-md'>
              <h3 className='font-semibold mb-2 flex items-center justify-center gap-2 text-lg py-3 px-4 border-b border-[#FFC600]'>
                <span>
                  <UserOctagon size={25} variant='Linear' color='#FFC600' />
                </span>
                <span>Customers Info</span>
              </h3>

              <Separator />

              <section className="flex flex-col items-center p-4 space-y-3 text-left">
                <p>Name: Ife Adebayo</p>
                <p className='text-sm flex gap-2 items-center justify-start'>
                  <span>
                    <Mail size={20} className="text-[#FFC600]" />
                  </span>
                  adebayo@gmail.com
                </p>
                <p className='text-sm flex gap-2 items-center justify-start'>
                  <span>
                    <Phone size={20} className="text-[#FFC600]" />
                  </span>
                  08031823849
                </p>
              </section>
            </article>
            <article className='flex flex-col bg-[#194A7A] text-center text-white rounded-lg shadow-md'>
              <h3 className='font-semibold mb-2 flex items-center justify-center gap-2 text-lg py-3 px-4 border-b border-[#FFC600]'>
                <span>
                  <User size={25} color='#FFC600' />
                </span>
                <span>Recipient Info</span>
              </h3>

              <div className='flex flex-col items-center p-4 space-y-3 text-left'>
                <p>Name: Paul Adeola</p>
                <p className='text-sm flex gap-2 items-center justify-start'>
                  <span>
                    <Mail size={20} className="text-[#FFC600]" />
                  </span>
                  onikhalidayo@gmail.com
                </p>
                <p className='text-sm flex gap-2 items-center justify-start'>
                  <span>
                    <Phone size={20} className="text-[#FFC600]" />
                  </span>
                  08031823849
                </p>
              </div>
            </article>
          </div>

          <section className='flex items-center gap-8 mb-16 mt-3'>
            <div className='flex items-center gap-1 text-sm text-[#111827]'>
              <span className='text-sm text-[#687588]'>Order Occasion:{" "}</span>
              <p>Happy Anniversary</p>
            </div>
            <div className='flex items-center gap-1 text-sm text-[#111827]'>
              <span className='text-sm text-[#687588]'>Order Channel:{" "}</span>
              <p>Website</p>
            </div>
            <div className='flex items-center gap-1 text-sm text-[#111827]'>
              <span className='text-sm text-[#687588]'>Payment Mode:{" "}</span>
              <p>Bank Transfer</p>
            </div>
          </section>


          <section className='mt-16 mb-8'>
            <header className="border-b border-b-[#00000021]">
              <p className='relative flex items-center gap-2 text-base text-[#111827] w-max p-1'>
                <MessageCircle size={19} />
                Message for order
                <span className="absolute h-[2px] w-full bottom-[-2px] left-0 bg-black" />
              </p>
            </header>
            <div className='mt-1 py-2 bg-transparent rounded-md flex justify-between items-center w-full'>
              <Input value="Happy Anniversary"
                // rightIcon={
                //   <Button variant='ghost' size='sm'>
                //     <Pencil className='h-4 w-4' />
                //   </Button>
                // }
                readOnly
                containerClassName='w-full'
              />

            </div>
          </section>

          <section className='mb-8'>

            <header className="border-b border-b-[#00000021]">
              <p className='relative flex items-center gap-2 text-base text-[#111827] w-max p-1 px-2.5'>
                <MessageCircle size={19} />
                Product Item
                <span className="absolute bottom-[-2px]w-full bottom-0 left-0 bg-black" />
              </p>
            </header>

            <div className='space-y-4 mt-1'>
              <article className="flex gap-6 w-full max-w-[700px] bg-white p-6 rounded-xl mb-10">
                <div className='relative w-[180px] aspect-square p-6 rounded-xl bg-[#F6F6F6]'>
                  <Image
                    src='/img/cake.png'
                    alt='cake'
                    fill
                    className='object-cover rounded-xl border-8 border-[#F6F6F6]'
                  />
                </div>
                <section className='flex flex-col justify-between'><h5 className="text-[#194A7A] text-xl font-medium">
                  Adeline Fautline Cake
                </h5>
                  <div className='py-6 space-y-3 grow'>
                    <div className='flex items-center gap-1'>
                      <h2 className='text-sm font-medium text-[#687588]'>Customer Name:</h2>
                      <p className='font-medium text-custom-blue'>Adetunji Emmanuel</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <h2 className='text-sm font-medium text-[#687588]'>Email:</h2>
                      <p className='font-medium text-custom-blue'>adel23@gmail.com</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <h2 className='text-sm font-medium text-[#687588]'>Phone Number:</h2>
                      <p className='font-medium text-custom-blue'>08034344433</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <h2 className='text-sm font-medium text-[#687588]'>Message on cake:</h2>
                      <p className='font-medium text-custom-blue'>Love me like you always do</p>
                    </div>
                  </div>
                  <div className='flex justify-between items-center gap-1'>

                  </div>
                </section>
                <div className="flex items-center gap-4 self-start">
                  <Checkbox />
                </div>
              </article>

              <Card className='flex items-start space-x-4'>
                <CardContent className='flex justify-between w-full pt-5'>
                  <div>
                    <Image
                      src='/img/cake.png'
                      alt='Adeline Faultline Cake'
                      className='w-20 h-20 object-cover rounded-md'
                      width={100}
                      height={100}
                    />
                    <div className='flex-grow'>
                      <h4 className='font-semibold'>Adeline Faultline Cake</h4>
                      <div className='flex justify-between'>
                        <div className='grid grid-cols-3 gap-2 text-sm mt-2'>
                          <div>
                            <div>
                              <span className='text-[#687588]'>Quantity:</span>{' '}
                              1pcs
                            </div>
                            <div>
                              <span className='text-[#687588]'>Category:</span>{' '}
                              Cake
                            </div>
                            <div>
                              <span className='text-[#687588]'>Size:</span> 8
                              inches
                            </div>
                            <div>
                              <span className='text-[#687588]'>Layers:</span> 3
                              layers
                            </div>
                            <div className='col-span-2'>
                              <span className='text-[#687588]'>Flavor:</span>{' '}
                              Chocolate, Vanilla, Strawberry
                            </div>
                          </div>
                          <div className='mt-2'>
                            <span className='text-[#687588]'>
                              Cake toppings:
                            </span>{' '}
                            Fruits, chocolate & cookies
                          </div>
                        </div>
                        <div className='mt-2'>
                          <span className='text-[#687588]'>
                            Message on cake:
                          </span>{' '}
                          Love Me Like You Always Do
                        </div>
                      </div>

                      <Separator />
                      <div className='mt-2 text-right'>
                        <span className='font-semibold'>Amount: ₦50,000</span>
                      </div>
                    </div>
                  </div>

                  <Checkbox id='item1' className='mt-1' />
                </CardContent>
              </Card>

              <div className='flex items-start space-x-4'>
                <Checkbox id='item2' className='mt-1' />
                <Image
                  src='/img/cake1.png'
                  alt='Adelya - Red Roses Bouquet'
                  className='w-20 h-20 object-cover rounded-md'
                  width={100}
                  height={100}
                />
                <div className='flex-grow'>
                  <h4 className='font-semibold'>Adelya - Red Roses Bouquet</h4>
                  <div className='grid grid-cols-3 gap-2 text-sm mt-2'>
                    <div>
                      <span className='text-[#687588]'>Quantity:</span> 1pcs
                    </div>
                    <div>
                      <span className='text-[#687588]'>Category:</span> Flower
                    </div>
                    <div>
                      <span className='text-[#687588]'>Size:</span> 6 inches
                    </div>
                    <div>
                      <span className='text-[#687588]'>Colour:</span> Red
                    </div>
                    <div>
                      <span className='text-[#687588]'>Type:</span> Red Rose
                    </div>
                  </div>
                  <div className='mt-2'>
                    <span className='text-[#687588]'>Message on Flower:</span>{' '}
                    Love Me Like You Always Do
                  </div>
                  <div className='mt-2 text-right'>
                    <span className='font-semibold'>Amount: ₦50,000</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div>
            <div className='flex justify-between items-center mb-2'>
              <h3 className='font-semibold'>Delivery Details</h3>
              <Button variant='ghost' size='sm'>
                <Pencil className='h-4 w-4' />
              </Button>
            </div>
            <div className='space-y-2'>
              {[
                ['Delivery Method', 'Dispatch'],
                ['Primary address', 'No. 8, Adeniran close, Lekki Phase 1'],
                ['Country', 'Nigeria'],
                ['State/City', 'Lagos/Ikeja'],
                ['Delivery Zone', 'L1-Lagos Island'],
                ['Delivery Date', '21/July/2024'],
                ['Delivery Fee', 'Lekki Phase 1 - ₦5,000'],
              ].map(([label, value]) => (
                <div key={label} className='flex justify-between'>
                  <span className='text-[#687588]'>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet >

  );
}
