import React from 'react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Checkbox} from '@/components/ui/checkbox';
import {Pencil, X} from 'lucide-react';

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
      <div className='fixed inset-y-0 right-0 w-[600px] bg-white shadow-lg overflow-y-auto z-50'>
        <div className='flex justify-between items-center p-4 border-b'>
          <div>
            <h2 className='text-xl font-semibold'>Order Details</h2>
            <div className='flex items-center space-x-2 mt-1'>
              <span className='text-sm'>Order ID: {orderId}</span>
              <Badge variant='secondary'>SOA</Badge>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Button variant='ghost' size='sm'>
              <Pencil className='h-4 w-4' />
            </Button>
            <Badge
              variant='outline'
              className='bg-green-100 text-green-800 border-green-300'>
              Payment Confirmed
            </Badge>
            <Button variant='ghost' size='sm' onClick={onClose}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <div className='p-4 space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-blue-900 text-white p-4 rounded-lg'>
              <h3 className='font-semibold mb-2'>Customer's Info</h3>
              <p>Name: Ife Adebayo</p>
              <p className='text-sm'>adebayo@gmail.com</p>
              <p className='text-sm'>08031823849</p>
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
              <div className='flex items-start space-x-4'>
                <Checkbox id='item1' className='mt-1' />
                <img
                  src='/api/placeholder/80/80'
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
                      <span className='text-gray-500'>Layers:</span> 3 layers
                    </div>
                    <div className='col-span-2'>
                      <span className='text-gray-500'>Flavor:</span> Chocolate,
                      Vanilla, Strawberry
                    </div>
                  </div>
                  <div className='mt-2'>
                    <span className='text-gray-500'>Cake toppings:</span>{' '}
                    Fruits, chocolate & cookies
                  </div>
                  <div className='mt-2'>
                    <span className='text-gray-500'>Message on cake:</span> Love
                    Me Like You Always Do
                  </div>
                  <div className='mt-2 text-right'>
                    <span className='font-semibold'>Amount: ₦50,000</span>
                  </div>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <Checkbox id='item2' className='mt-1' />
                <img
                  src='/api/placeholder/80/80'
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
