"use client";
import { Notepad2, Call, Calendar, Truck, Location, Link, TruckRemove } from 'iconsax-react';
import { useParams } from 'next/navigation';
import { formatDate } from 'date-fns';
import React from 'react';

import { Button, LinkButton } from '@/components/ui';
import { formatTimeString } from '@/utils/strings';

import OrderPageSkeleton from './TrackOrderPageSkeleton';
import ProgressTimeline from './ProgressTimeline';
import { useGetOrderDetail } from './misc/api';


const CompleteOrderPage = () => {
    const order_id = useParams()?.id as string;
    const { data: order, isLoading } = useGetOrderDetail(order_id);

    const onDelivered = () => {
        console.log("Order successfully delivered!");

        // Add any additional logic here
    };




    if (isLoading) {
        return <OrderPageSkeleton />;
    }
    if (!isLoading && !order) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <h1 className="font4xl font-manrope font-medium">
                    Order not found
                </h1>
            </div>
        );
    }


    return (
        <div className="flex flex-col grow h-full px-8">
            <header className="flex items-center border-b border-b-[#00000021] w-full pt-4">
                <p className='relative flex items-center gap-2 text-base text-[#111827] w-max p-1'>
                    <Notepad2 size={19} />
                    Track order
                    <span className="absolute h-[2px] w-full bottom-[-6px] left-0 bg-black" />
                </p>
            </header>
            {
                !!order &&
                <section className="size-full my-auto flex flex-col items-center justify-center">
                    <ProgressTimeline
                        orderId={order?.id}
                        orderNumber={order?.order_number}
                        currentStatus={order?.delivery.status as "PND" | "DIS" | "DSC" | "DEL" | "CAN"}
                        onDelivered={onDelivered}
                        order={order!}
                    />

                    <article className="grid grid-cols-[0.85fr,1fr] gap-5 justify-around p-4 px-6 border border-[#0F172B1A] rounded-3xl w-full max-w-[800px] mx-auto mt-9">
                        <section className="flex flex-col items-center justify-center gap-1 p-4 py-6 border border-black rounded-3xl">
                            <div className="flex items-center text-sm">
                                <Truck variant="Bold" size="24" className="mr-2" /> Driver
                            </div>
                            <div className="name text-[#194A7A] font-semibold text-2xl">
                                {order?.delivery.driver_name}                                
                            </div>
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
                                    {formatDate(order?.delivery.delivery_date || '0', "dd/MMMM/yyyy")} at {formatTimeString(order?.delivery.delivery_time || '0')}
                                </p>
                            </div>
                        </section>
                    </article>

                  
                </section>
            }
        </div>
    )
}

export default CompleteOrderPage

