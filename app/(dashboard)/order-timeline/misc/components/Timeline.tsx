'use client'

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { format } from 'date-fns';
import OrderTimelineCard from './OrderTimelineCard';
import { RefreshCcw, Search } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useGetOrderTimeline } from '../api';
import { cn } from '@/lib/utils';





const OrderTimeline = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const today = format(new Date(), 'yyyy-MM-dd');
    const tomorrow = format(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd');
    const next_tomorrow = format(new Date(new Date().setDate(new Date().getDate() + 2)), 'yyyy-MM-dd');
    const in_three_days = format(new Date(new Date().setDate(new Date().getDate() + 3)), 'yyyy-MM-dd');
    const in_four_days = format(new Date(new Date().setDate(new Date().getDate() + 4)), 'yyyy-MM-dd');

    const { data: todayData, refetch: refetchTodayData, isLoading: isLoadingTodayData, isRefetching: isRefetchingTodayData } = useGetOrderTimeline({ date: today, search: searchTerm });
    const { data: tomorrowData, refetch: refetchTomorrowData, isLoading: isLoadingTomorrowData, isRefetching: isRefetchingTomorrowData } = useGetOrderTimeline({ date: tomorrow, search: searchTerm });
    const { data: nextTomorrowData, refetch: refetchNextTomorrowData, isLoading: isLoadingNextTomorrowData, isRefetching: isRefetchingNextTomorrowData } = useGetOrderTimeline({ date: next_tomorrow, search: searchTerm });
    const { data: inThreeDaysData, refetch: refetch3DaysData, isLoading: isLoading3DaysData, isRefetching: isRefetching3DaysData } = useGetOrderTimeline({ date: in_three_days, search: searchTerm });
    const { data: inFourDaysData, refetch: refetch4DaysData, isLoading: isLoading4DaysData, isRefetching: isRefetching4DaysData } = useGetOrderTimeline({ date: in_four_days, search: searchTerm });

    const refetchAll = () => {
        refetchTodayData();
        refetchTomorrowData();
        refetchNextTomorrowData();
        refetch3DaysData();
        refetch4DaysData();
    }

    const isLoading = isLoadingTodayData || isLoadingTomorrowData || isLoadingNextTomorrowData || isLoading3DaysData || isLoading4DaysData;
    const isFetching = isRefetchingTodayData || isRefetchingTomorrowData || isRefetchingNextTomorrowData || isRefetching3DaysData || isRefetching4DaysData;

    return (
        <div className="w-full md:w-[95%] max-w-[1792px] px-8">
            <div className={cn('overflow-hidden rounded-full mb-1 grow')}>
                <div className={cn("bg-[#F8F9FB] h-1 w-full overflow-hidden", isFetching && !isLoading && 'bg-blue-200')}>
                    <div className={cn("h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary opacity-0 transition-opacity", isFetching && !isLoading && 'opacity-100')}></div>
                </div>
            </div>
            <div className='flex items-center justify-between gap-2 w-full grow pt-6 pb-10'>
                <Input
                    type='text'
              placeholder='Search (order number, customer name and phone number)'                    
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
                    <AccordionTrigger>
                        <p>
                            Today, {format(new Date(), 'do MMMM yyyy')}
                            <span className="px-2 py-1 rounded-lg min-w-6 text-xs ml-2 text-white bg-custom-blue">
                                {todayData?.data?.length || 0}
                            </span>
                        </p>
                    </AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {todayData?.data?.map(order => <OrderTimelineCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tomorrow">
                    <AccordionTrigger>
                        <p>
                            {format(new Date(new Date().setDate(new Date().getDate() + 1)), 'eeee, do MMMM yyyy')}
                            <span className="px-2 py-1 rounded-lg min-w-6 text-xs ml-2 text-white bg-custom-blue">
                                {tomorrowData?.data?.length || 0}
                            </span>
                        </p>
                    </AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {tomorrowData?.data?.map(order => <OrderTimelineCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="within72Hours">
                    <AccordionTrigger>
                        <p>

                            {format(new Date(new Date().setDate(new Date().getDate() + 2)), 'eeee, do MMMM yyyy')}
                            <span className="px-2 py-1 rounded-lg min-w-6 text-xs ml-2 text-white bg-custom-blue">
                                {nextTomorrowData?.data?.length || 0}
                            </span>
                        </p>
                    </AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {nextTomorrowData?.data?.map(order => <OrderTimelineCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="within7Days">
                    <AccordionTrigger>
                        <p>
                            {format(new Date(new Date().setDate(new Date().getDate() + 3)), 'eeee, do MMMM yyyy')}
                            <span className="px-2 py-1 rounded-lg min-w-6 text-xs ml-2 text-white bg-custom-blue">
                                {inThreeDaysData?.data?.length || 0}
                            </span>
                        </p>
                    </AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {inThreeDaysData?.data.map(order => <OrderTimelineCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="within7Days">
                    <AccordionTrigger>
                        <p>

                            {format(new Date(new Date().setDate(new Date().getDate() + 4)), 'eeee, do MMMM yyyy')}
                            <span className="px-2 py-1 rounded-lg min-w-6 text-xs ml-2 text-white bg-custom-blue">
                                {inFourDaysData?.data?.length || 0}
                            </span>
                        </p>
                    </AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {inFourDaysData?.data.map(order => <OrderTimelineCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )

};

export default OrderTimeline;
