"use client";
import { Notepad2, ArrowLeft2, UserOctagon, Call, Calendar, Truck, Location, Link } from 'iconsax-react';
import React from 'react';
import { Button, LinkButton } from '@/components/ui';
import { useParams, useRouter } from 'next/navigation';
import ProgressTimeline from './ProgressTimeline';
import { useGetOrderDetail } from '../../../misc/api';
import { formatTimeString } from '@/utils/strings';
import OrderPageSkeleton from './CompleteOrderPageSkeleton';

const CompleteOrderPage = () => {
    const order_id = useParams()?.id as string;
    const { data: order, isLoading } = useGetOrderDetail(order_id);

    const router = useRouter();
    const goBack = () => {
        router.back();
    }

    const onDelivered = () => {
        console.log("Order successfully delivered!");
        // Add any additional logic here
    };

    if (isLoading) {
        return <OrderPageSkeleton />;
    }

    return (
        <div className="flex flex-col grow h-full px-8">
            <header className="flex items-center border-b border-b-[#00000021] w-full pt-4">
                <Button
                    variant='ghost'
                    size='icon'
                    className='mr-2'
                    onClick={() => goBack()}>
                    <ArrowLeft2 className='h-6 w-6 text-[#A0AEC0]' />
                </Button>
                <p className='relative flex items-center gap-2 text-base text-[#111827] w-max p-1'>
                    <Notepad2 size={19} />
                    Complete order
                    <span className="absolute h-[2px] w-full bottom-[-6px] left-0 bg-black" />
                </p>
            </header>
            {
                !!order &&
                <section className="size-full my-auto flex flex-col items-center justify-center">
                    <ProgressTimeline
                        orderId={order?.id}
                        orderNumber={order?.order_number}
                        currentStatus={order?.delivery.status}
                        onDelivered={onDelivered}
                    />

                    <article className="grid grid-cols-[0.85fr,1fr] gap-5 justify-around p-4 px-6 border border-[#0F172B1A] rounded-3xl w-full max-w-[800px] mx-auto mt-9">
                        <section className="flex flex-col items-center justify-center gap-1 p-4 py-6 border border-black rounded-3xl">
                            <div className="flex items-center text-sm">
                                <Truck variant="Bold" size="24" className="mr-2" /> Driver
                            </div>
                            <div className="font-medium text-xl">ID: 222-111-33</div>
                            <div className="name text-[#194A7A] font-semibold text-2xl">{order?.delivery.driver_name}</div>
                            <div className="platform text-sm text-[#194A7A]">
                                Rider Platform: <a href="#" className="text-blue-400 underline">{order?.delivery.delivery_platform}</a>
                            </div>
                            <LinkButton className="mt-2 h-9 w-full text-sm max-w-[120px]" variant="black" size="md" href={`tel:${order?.delivery.driver_phone}`}>
                                <Call size="20" className="mr-2" /> Call
                            </LinkButton>
                        </section>

                        <section className="flex flex-col items-center justify-around gap-4 p-4 border border-black rounded-3xl">
                            <div className="flex flex-col items-center font-poppins">
                                <p className="flex font-semibold text-[#292D32]">
                                    <Location size="24" className="mr-2" />
                                    Address
                                </p>
                                <p className="address text-sm">{order?.delivery?.address}</p>
                            </div>
                            <div className="flex flex-col items-center font-poppins">
                                <p className="flex font-semibold text-[#292D32]">
                                    <Calendar size="24" className="mr-2" />
                                    Date/Expected Time
                                </p>
                                <p className="text-sm">
                                    {formatTimeString(order?.delivery.delivery_time || '0')}
                                </p>
                            </div>
                        </section>
                    </article>

                    {/* Share Delivery Link Section */}
                    <div className="share-link-section p-4 text-center">
                        <Button className="px-8 h-14" >
                            <Link size="24" className="mr-2" /> Share Delivery Link
                        </Button>
                    </div>
                </section>

            }
        </div>
    )
}

export default CompleteOrderPage

