'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ChevronDown, CalendarIcon, PlusCircle, X} from 'lucide-react';

export default function OrderForm() {
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  return (
    <div className='w-full max-w-4xl mx-auto p-6 space-y-6'>
      <section>
        <h2 className='text-lg font-semibold text-blue-900 flex items-center gap-2 mb-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-blue-900'>
            <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
            <circle cx='12' cy='7' r='4'></circle>
          </svg>
          Customers Information
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Customers Name
            </label>
            <Input placeholder='Enter customers Name' className='w-full' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Customers Phone Number
            </label>
            <Input
              placeholder='Enter customers phone number'
              className='w-full'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Recipients Name
            </label>
            <Input placeholder="Enter recipient's name" className='w-full' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Recipients Phone Number
            </label>
            <Input
              placeholder="Enter recipient's phone number"
              className='w-full'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Enquiry Occasion
            </label>
            <Input placeholder='Enter enquiry occasion' className='w-full' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Payment Mode
            </label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select mode of payment' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='cash'>Cash</SelectItem>
                <SelectItem value='card'>Card</SelectItem>
                <SelectItem value='transfer'>Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-lg font-semibold text-blue-900 flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-blue-900'>
              <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
            </svg>
            Discussion
          </h2>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setIsDiscussionOpen(!isDiscussionOpen)}>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isDiscussionOpen ? 'transform rotate-180' : ''
              }`}
            />
          </Button>
        </div>
        {isDiscussionOpen && (
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Ayoade started a discussion
              </CardTitle>
              <div className='flex items-center space-x-2'>
                <Button variant='outline' size='sm'>
                  <PlusCircle className='h-4 w-4 mr-2' />
                  Add Note
                </Button>
                <Select defaultValue='open'>
                  <SelectTrigger className='w-[100px]'>
                    <SelectValue placeholder='Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='open'>Open</SelectItem>
                    <SelectItem value='closed'>Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex items-start space-x-4'>
                <span className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold'>
                  A
                </span>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Adeola Tomi</p>
                  <p className='text-xs text-gray-500 mt-1'>06:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      <section>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-lg font-semibold text-blue-900 flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-blue-900'>
              <circle cx='12' cy='12' r='10'></circle>
              <line x1='12' y1='16' x2='12' y2='12'></line>
              <line x1='12' y1='8' x2='12.01' y2='8'></line>
            </svg>
            Enquiry Details
          </h2>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setIsEnquiryOpen(!isEnquiryOpen)}>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isEnquiryOpen ? 'transform rotate-180' : ''
              }`}
            />
          </Button>
        </div>
        {isEnquiryOpen && (
          <div className='space-y-4'>
            <div className='bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md flex items-center justify-between'>
              <span className='font-medium'>Item 1</span>
              <Button variant='outline' size='sm'>
                <PlusCircle className='h-4 w-4 mr-2' />
                Custom
              </Button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Category
                </label>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select Category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='cake'>Cake</SelectItem>
                    <SelectItem value='pastry'>Pastry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Layer
                </label>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select layer' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1 Layer</SelectItem>
                    <SelectItem value='2'>2 Layers</SelectItem>
                    <SelectItem value='3'>3 Layers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Toppings
                </label>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select toppings' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='chocolate'>Chocolate</SelectItem>
                    <SelectItem value='fruits'>Fruits</SelectItem>
                    <SelectItem value='nuts'>Nuts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Product type
                </label>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select product type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='birthday'>Birthday Cake</SelectItem>
                    <SelectItem value='wedding'>Wedding Cake</SelectItem>
                    <SelectItem value='custom'>Custom Cake</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Flavour
                </label>
                <div className='flex items-center space-x-2'>
                  <Select>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select flavour' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='vanilla'>Vanilla</SelectItem>
                      <SelectItem value='chocolate'>Chocolate</SelectItem>
                      <SelectItem value='strawberry'>Strawberry</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant='outline' size='sm'>
                    <PlusCircle className='h-4 w-4' />
                  </Button>
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Message
                </label>
                <Input placeholder='Enter message' className='w-full' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Size
                </label>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select size' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='small'>Small</SelectItem>
                    <SelectItem value='medium'>Medium</SelectItem>
                    <SelectItem value='large'>Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Upgrade From Buttercream to Whipped Cream
                </label>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select upgrade' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='yes'>Yes</SelectItem>
                    <SelectItem value='no'>No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex items-end'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Quantity
                  </label>
                  <div className='flex items-center'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='rounded-r-none'>
                      -
                    </Button>
                    <Input
                      type='number'
                      defaultValue='1'
                      className='w-16 text-center rounded-none'
                    />
                    <Button
                      variant='outline'
                      size='sm'
                      className='rounded-l-none'>
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between mt-4'>
              <Button variant='outline'>
                <PlusCircle className='h-4 w-4 mr-2' />
                Add Item
              </Button>
              <Button>Confirm</Button>
            </div>
          </div>
        )}
      </section>

      <section>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-lg font-semibold text-blue-900 flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-blue-900'>
              <rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
              <line x1='16' y1='2' x2='16' y2='6'></line>
              <line x1='8' y1='2' x2='8' y2='6'></line>
              <line x1='3' y1='10' x2='21' y2='10'></line>
            </svg>
            Delivery Details
          </h2>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isDeliveryOpen ? 'transform rotate-180' : ''
              }`}
            />
          </Button>
        </div>
        {isDeliveryOpen && (
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Delivery Note
              </label>
              <Textarea placeholder='Enter delivery note' className='w-full' />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Delivery Date
              </label>
              <div className='relative'>
                <Input
                  type='text'
                  placeholder='Select delivery date'
                  className='w-full'
                />
                <CalendarIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              </div>
            </div>
            <div className='flex justify-end mt-4'>
              <Button>Proceed</Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
