import React from 'react';
import {ArrowLeft, Pencil, Plus} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';

export default function OrderSummary() {
  return (
    <div className='max-w-7xl mx-auto p-6'>
      <div className='flex items-center mb-8'>
        <ArrowLeft className='w-6 h-6 mr-2' />
        <h1 className='text-2xl font-semibold'>Order Summary</h1>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-sm mb-6'>
        <div className='grid grid-cols-2 gap-6 mb-6'>
          <div>
            <p className='text-sm text-gray-500'>
              Customer Name:{' '}
              <span className='text-blue-600 font-medium'>
                Adetunji Emmanuel
              </span>
            </p>
            <p className='text-sm text-gray-500'>Phone Number: 08034344433</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>
              Recipient Name:{' '}
              <span className='text-blue-600 font-medium'>Lawal Rose</span>
            </p>
            <p className='text-sm text-gray-500'>Phone Number: 08034344433</p>
          </div>
        </div>
        <p className='text-sm text-gray-500'>
          Order Occasion: <span className='font-medium'>Birthday</span>
        </p>
      </div>

      <Card className='mb-6'>
        <CardContent className='p-6'>
          <h2 className='font-semibold mb-4'>Item 1</h2>
          <div className='flex'>
            <img
              src='/placeholder.svg'
              alt='Adeline Faultline Cake'
              className='w-24 h-24 rounded-md mr-4'
            />
            <div className='flex-1'>
              <h3 className='font-medium'>Adeline Faultline Cake</h3>
              <div className='grid grid-cols-3 gap-2 text-sm mt-2'>
                <p>Quantity: 1pcs</p>
                <p>Category: Cake</p>
                <p>Size: 6 inches</p>
                <p>Layers: 3 layers</p>
                <p className='col-span-2'>
                  Flavour: Chocolate, Vanilla, Strawberry
                </p>
              </div>
              <p className='text-sm mt-2'>
                Cake toppings: Fruits, chocolate & cookies
              </p>
              <p className='text-sm mt-2'>
                Message on cake: Love Me Like You Always Do
              </p>
              <p className='text-right font-semibold mt-2'>Amount: ₦50,000</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardContent className='p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='font-semibold'>Delivery Details</h2>
            <Button variant='ghost' size='sm'>
              <Pencil className='w-4 h-4' />
            </Button>
          </div>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <p>
              Primary address:{' '}
              <span className='font-medium'>
                No. 45, Adeniji close, Lekki Phase 1
              </span>
            </p>
            <p>
              Country: <span className='font-medium'>Nigeria</span>
            </p>
            <p>
              State: <span className='font-medium'>Lagos</span>
            </p>
            <p>
              City: <span className='font-medium'>Ikeja</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardContent className='p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='font-semibold'>Delivery Note</h2>
            <Button variant='ghost' size='sm'>
              <Pencil className='w-4 h-4' />
            </Button>
          </div>
          <p className='text-sm text-gray-600'>Deliver in person</p>
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardContent className='p-6'>
          <h2 className='font-semibold mb-4'>Additional Cost</h2>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='text-sm text-gray-500 mb-1 block'>
                Item Name
              </label>
              <Input placeholder='Enter additional item name' />
            </div>
            <div>
              <label className='text-sm text-gray-500 mb-1 block'>Cost</label>
              <Input placeholder='Enter cost' />
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <Button variant='outline' size='sm'>
              <Plus className='w-4 h-4 mr-2' /> Add More
            </Button>
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>

      <div className='text-right mb-6'>
        <p className='text-lg font-semibold'>Total (NGN)</p>
        <p className='text-3xl font-bold'>₦50,000.00</p>
      </div>

      <Button className='w-full bg-gray-900 hover:bg-gray-800 text-white'>
        Send For Processing
      </Button>
    </div>
  );
}
