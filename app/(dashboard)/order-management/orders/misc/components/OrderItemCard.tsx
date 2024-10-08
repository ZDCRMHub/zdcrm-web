import { Card } from '@/components/ui'
import { Separator } from '@/components/ui/separator'
import { EditPenIcon } from '@/icons/core'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props {
    editFn: () => void
    deleteFn: () => void
}
const OrderItemCard: React.FC<Props> = ({ editFn, deleteFn}) => {
    return (
        <Card className='py-6 px-10 rounded-xl max-w-3xl'>

            <div className='flex gap-10'>
                <div className='flex flex-col'>
                    <div className='bg-white-grey rounded-[6px] w-fit'>
                        <Image
                            src='/img/cake.png'
                            alt='Adeline Fautline Cake'
                            className='w-24 h-24 object-cover rounded-md p-2'
                            width={100}
                            height={100}
                        />
                    </div>

                    <p className='text-custom-blue font-medium'>
                        Adeline Fautline Cake
                    </p>
                </div>
                <div className='space-y-3 text-sm'>
                    <div className='flex items-center gap-x-5 gap-y-2 flex-wrap'>
                        <p className="flex items-center gap-1 text-[#111827] font-medium">
                            <span className='text-[#687588]'>Quantity:</span> 1 pcs
                        </p>
                        <p className="flex items-center gap-1 text-[#111827] font-medium">
                            <span className='text-[#687588]'>Category:</span> Cake
                        </p>
                        <p className="flex items-center gap-1 text-[#111827] font-medium">
                            <span className='text-[#687588]'>Size:</span> 6 inches
                        </p>
                        <p className="flex items-center gap-1 text-[#111827] font-medium">
                            <span className='text-[#687588]'>Layers:</span> 3 layers
                        </p>
                    </div>
                    <p className="text-[#111827] font-medium">
                        <span className='text-[#687588]'>Flavour:</span> Chocolate,
                        Vanilla, Strawberry
                    </p>
                    <p className="text-[#111827] font-medium">
                        <span className='text-[#687588]'>Cake toppings:</span> Fruits,
                        chocolate & cookies
                    </p>
                    <p className="text-[#111827] font-medium">
                        <span className='text-[#687588]'>Message on cake:</span> Love Me
                        Like You Always Do
                    </p>
                </div>
                <div className="flex items-center gap-4 self-start">
                    <button onClick={editFn} className="text-[#2463EB]">
                        <EditPenIcon />
                    </button>
                    <button type="button" onClick={deleteFn} className="">
                        <Trash2 size={17} className="text-red-400" />
                    </button>
                </div>
            </div>

            <Separator className='mt-7 mb-4' />

            <div className='flex items-end justify-end mb-3 w-full'>
                <p className='font-semibold text-[#194A7A]'>Amount:{" "}</p>
                <p className='font-semibold text-[#194A7A]'>₦50,000.00</p>
            </div>
        </Card>
    )
}

export default OrderItemCard