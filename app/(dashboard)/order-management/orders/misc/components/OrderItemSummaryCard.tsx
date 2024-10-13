import { Card } from '@/components/ui'
import { Separator } from '@/components/ui/separator'
import { EditPenIcon } from '@/icons/core'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props {
    // editFn: () => void
    // deleteFn: () => void
}
const OrderItemSummaryCard: React.FC<Props> = ({ }) => {
    return (
        <Card className='py-6 px-10 rounded-xl max-w-3xl'>
            <header className='w-full flex items-center text-sm gap-10 font-manrope'>
                <p className="w-36 font-semibold text-[#111827] ">
                    Item1
                </p>
                <p className="font-dm-sans font-medium text-[#687588]">
                    Branch:{" "}
                    <span className="text-[#111827]">Zuzu Delights</span>
                </p>
            </header>
            <Separator className="my-4" />
            <div className='flex gap-10'>
                <div className='flex flex-col items-center w-36'>
                    <div className='bg-white-grey rounded-[6px] w-fit'>
                        <Image
                            src='/img/cake.png'
                            alt='Adeline Fautline Cake'
                            className='w-24 h-24 object-cover rounded-md p-2'
                            width={100}
                            height={100}
                        />
                    </div>

                    <p className='text-custom-blue text-sm text-center font-medium'>
                        Adeline Fautline Cake
                    </p>
                </div>
                <div className='space-y-2 text-sm grow'>
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
                    <Separator className='mt-5 mb-2.5' />

                    <p className='flex items-end justify-end mb-3 w-full'>
                        <span className='font-semibold text-[#687588]'>Cost: {" "}</span>
                        <span className='font-semibold text-[#111827]'>₦50,000.00</span>
                    </p>
                    <section>
                        <p className='flex items-center justify-between w-full'>
                            <span className='font-light italic text-[#687588] text-xs'>
                                Additional Item Name:{" "}
                                <span className="text-[#111827] font-medium not-italic">Fan</span>
                            </span>
                            <span className='font-semibold italic text-xs text-[#111827]'>₦40,000.00</span>
                        </p>
                    </section>
                </div>
            </div>

            <Separator className='mt-5 mb-2.5' />

            <div className='flex items-end justify-end w-full font-dm-sans'>
                <p className='font-medium text-[#194A7A]'>Total Cost for Item 1: {" "}</p>
                <p className='font-medium text-[#194A7A]'>₦90,000.00</p>
            </div>
        </Card>
    )
}

export default OrderItemSummaryCard