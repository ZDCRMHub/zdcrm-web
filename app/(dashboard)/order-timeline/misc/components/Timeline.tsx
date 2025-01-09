'use client'

import React from 'react';
import { faker } from '@faker-js/faker';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { format } from 'date-fns';
import OrderTimelineCard from './OrderTimelineCard';
import { RefreshCcw, Search } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useGetOrderTimeline } from '../api';





const OrderTimeline = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const today = format(new Date(), 'yyyy-MM-dd');
    const tomorrow = format(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd');
    const next_tomorrow = format(new Date(new Date().setDate(new Date().getDate() + 2)), 'yyyy-MM-dd');
    const in_three_days = format(new Date(new Date().setDate(new Date().getDate() + 3)), 'yyyy-MM-dd');

    const { data: todayData, refetch: refetchTodayData } = useGetOrderTimeline({ date: today, search: searchTerm });
    const { data: tomorrowData, refetch: refetchTomorrowData } = useGetOrderTimeline({ date: tomorrow, search: searchTerm });
    const { data: nextTomorrowData, refetch: refetchNextTomorrowData } = useGetOrderTimeline({ date: next_tomorrow, search: searchTerm });
    const { data: inThreeDaysData, refetch: refetch3DaysData } = useGetOrderTimeline({ date: in_three_days, search: searchTerm });

    const refetchAll = () => {
        refetchTodayData();
        refetchTomorrowData();
        refetchNextTomorrowData();
        refetch3DaysData();
    }

    return (
        <div className="w-full md:w-[95%] max-w-[1792px] px-8">
            <div className='flex items-center justify-between gap-2 w-full grow pt-6 pb-10'>
                <Input
                    type='text'
                    placeholder='Search (client name, customer rep, phone number)'
                    className='w-full focus:border min-w-[350px] text-xs !h-10'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    rightIcon={<Search className='h-5 w-5 text-[#8B909A]' />}
                />

                <Button
                    variant='outline'
                    className='bg-[#28C76F] text-[#1EA566] bg-opacity-25'
                    onClick={refetchAll}
                >
                    <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
                </Button>
            </div>

            <Accordion type="single" collapsible defaultValue='today' className='w-full'>
                <AccordionItem value="today">
                    <AccordionTrigger>Today, {format(new Date(), 'do MMMM yyyy')}</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {todayData?.data?.map(order => <OrderTimelineCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tomorrow">
                    <AccordionTrigger>{format(new Date(new Date().setDate(new Date().getDate() + 1)), 'eeee, do MMMM yyyy')}</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {tomorrowData?.data?.map(order => <OrderTimelineCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="within72Hours">
                    <AccordionTrigger>{format(new Date(new Date().setDate(new Date().getDate() + 2)), 'eeee, do MMMM yyyy')}</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {nextTomorrowData?.data?.map(order => <OrderTimelineCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="within7Days">
                    <AccordionTrigger>{format(new Date(new Date().setDate(new Date().getDate() + 3)), 'eeee, do MMMM yyyy')}</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {inThreeDaysData?.data.map(order => <OrderTimelineCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )

};

export default OrderTimeline;
