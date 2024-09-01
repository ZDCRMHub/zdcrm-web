import React from 'react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Checkbox} from '@/components/ui/checkbox';
import {Mail, Pencil, X} from 'lucide-react';
import {Book, UserOctagon} from 'iconsax-react';
import {Separator} from '@radix-ui/react-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {Card, CardContent} from '../ui/card';
import {Phone} from '@phosphor-icons/react';
import {PhoneCall} from '@phosphor-icons/react/dist/ssr';

interface OrderDetailsPanelProps {
  orderId: string;
  onClose: () => void;
}

export default function OrderDetailsPanel({
  orderId,
  onClose,
}: OrderDetailsPanelProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className='fixed inset-0 bg-black bg-opacity-50 z-40'
        onClick={onClose}
      />

      {/* Panel */}
      <div className='fixed inset-y-0 right-0 w-[822px] bg-white shadow-lg overflow-y-auto z-50'>
        <div className='flex justify-between items-center px-7 pt-7 pb-4 border-b'>
          <div>
            <h2 className='text-xl font-semibold flex items-center gap-4'>
              <span className='bg-[#E8EEFD] p-2 rounded-full'>
                <Book size={25} variant='Bold' color='#194A7A' />
              </span>
              <span>Order Details</span>
            </h2>
          </div>

          <Button variant='ghost' size='sm' onClick={onClose}>
            <X className='h-4 w-4' />
          </Button>
        </div>

        <Separator />

        <div className='flex justify-between px-9 pt-8'>
          <div className='flex items-center gap-5'>
            <div className='flex items-center space-x-2 mt-1 border border-gray-400 rounded-[10px] px-3 py-2'>
              <span className='text-sm'>Order ID: {orderId}</span>
            </div>

            <Select>
              <SelectTrigger className='w-[150px] bg-gray-300'>
                <SelectValue placeholder='SOA' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='az'>ABC</SelectItem>
                <SelectItem value='za'>HOC</SelectItem>
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
              className='bg-[#367917] bg-opacity-15 border-green-300 px-3 py-3 rounded-[10px] text-[#2D7D08]'>
              Payment Confirmed
            </Badge>
          </div>
        </div>

        <div className='p-4 space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-blue-900 text-white p-4 rounded-lg'>
              <h3 className='font-semibold mb-2 flex items-center gap-2'>
                <span>
                  <UserOctagon size={25} variant='Linear' color='#FFC600' />
                </span>
                <span>Customer's Info</span>
              </h3>

              <Separator />

              <p>Name: Ife Adebayo</p>
              <p className='text-sm flex gap-2 items-center'>
                <span>
                  <Mail />
                </span>
                adebayo@gmail.com
              </p>
              <p className='text-sm flex gap-2 items-center'>
                <span>
                  <Phone size={20} />
                </span>
                08031823849
              </p>
            </div>
            <div className='bg-blue-900 text-white p-4 rounded-lg'>
              <h3 className='font-semibold mb-2'>Recipient Info</h3>
              <p>Name: Paul Adeola</p>
              <p className='text-sm'>adeola@gmail.com</p>
              <p className='text-sm'>08031823849</p>
            </div>
          </div>

          <div className='flex justify-between'>
            <div>
              <span className='text-sm text-gray-500'>Order Occasion</span>
              <p>Happy Anniversary</p>
            </div>
            <div>
              <span className='text-sm text-gray-500'>Order Channel</span>
              <p>Website</p>
            </div>
            <div>
              <span className='text-sm text-gray-500'>Payment Mode</span>
              <p>Bank Transfer</p>
            </div>
          </div>

          <div>
            <span className='text-sm text-gray-500'>Delivery Note</span>
            <div className='mt-1 p-2 bg-gray-50 rounded-md flex justify-between items-center'>
              <span>Happy Anniversary</span>
              <Button variant='ghost' size='sm'>
                <Pencil className='h-4 w-4' />
              </Button>
            </div>
          </div>

          <div>
            <h3 className='font-semibold mb-2'>Product Item</h3>
            <div className='space-y-4'>
              <Card className='flex items-start space-x-4'>
                <CardContent className='flex justify-between w-full pt-5'>
                  <div>
                    <img
                      src='/img/cake.png'
                      alt='Adeline Faultline Cake'
                      className='w-20 h-20 object-cover rounded-md'
                    />
                    <div className='flex-grow'>
                      <h4 className='font-semibold'>Adeline Faultline Cake</h4>
                      <div className='grid grid-cols-3 gap-2 text-sm mt-2'>
                        <div>
                          <span className='text-gray-500'>Quantity:</span> 1pcs
                        </div>
                        <div>
                          <span className='text-gray-500'>Category:</span> Cake
                        </div>
                        <div>
                          <span className='text-gray-500'>Size:</span> 8 inches
                        </div>
                        <div>
                          <span className='text-gray-500'>Layers:</span> 3
                          layers
                        </div>
                        <div className='col-span-2'>
                          <span className='text-gray-500'>Flavor:</span>{' '}
                          Chocolate, Vanilla, Strawberry
                        </div>
                      </div>
                      <div className='mt-2'>
                        <span className='text-gray-500'>Cake toppings:</span>{' '}
                        Fruits, chocolate & cookies
                      </div>
                      <div className='mt-2'>
                        <span className='text-gray-500'>Message on cake:</span>{' '}
                        Love Me Like You Always Do
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
                <img
                  src='/img/cake1.png'
                  alt='Adelya - Red Roses Bouquet'
                  className='w-20 h-20 object-cover rounded-md'
                />
                <div className='flex-grow'>
                  <h4 className='font-semibold'>Adelya - Red Roses Bouquet</h4>
                  <div className='grid grid-cols-3 gap-2 text-sm mt-2'>
                    <div>
                      <span className='text-gray-500'>Quantity:</span> 1pcs
                    </div>
                    <div>
                      <span className='text-gray-500'>Category:</span> Flower
                    </div>
                    <div>
                      <span className='text-gray-500'>Size:</span> 6 inches
                    </div>
                    <div>
                      <span className='text-gray-500'>Colour:</span> Red
                    </div>
                    <div>
                      <span className='text-gray-500'>Type:</span> Red Rose
                    </div>
                  </div>
                  <div className='mt-2'>
                    <span className='text-gray-500'>Message on Flower:</span>{' '}
                    Love Me Like You Always Do
                  </div>
                  <div className='mt-2 text-right'>
                    <span className='font-semibold'>Amount: ₦50,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  <span className='text-gray-500'>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
