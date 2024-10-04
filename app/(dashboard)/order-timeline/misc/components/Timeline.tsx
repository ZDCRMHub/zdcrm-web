'use client'

import React from 'react';
import { faker } from '@faker-js/faker';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { format } from 'date-fns';
import EnquiryDiscussCard from './EnquiryDiscussCard';
import { RefreshCcw, Search } from 'lucide-react';
import { Button, Input } from '@/components/ui';

export type TDiscusssion = {
    id: string;
    customerName: string;
    orderId: string;
    action: string;
    status: string;
    agent: string;
    timeline: {
        action: string;
        details: string;
        agent: string;
    }[];
    type: string;
    time: Date;
}
// Generate mock data
export const generateMockOrders = (count: number) => {
    const action = faker.helpers.arrayElement(['placed an order', 'carted an item', 'made an enquiry', 'created an order'])
    const type = action == ('made an enquiry' || 'carted an item') ? 'enquiry' : 'order';
    const generateId = () => {
        const prefix = faker.helpers.arrayElement(['ZD', 'PF']);
        const letters = faker.string.alpha({ length: 2 }).toUpperCase();
        const numbers = faker.string.numeric(4);
        return `${prefix}/${letters}${numbers}`;
    };
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        customerName: faker.person.fullName(),
        orderId: generateId(),
        action,
        status: faker.helpers.arrayElement(['Still Discussing', 'Finalized Discussion']),
        agent: faker.person.fullName(),
        timeline: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
            action: faker.helpers.arrayElement(['started a discussion', 'updated the order', 'sent a message']),
            details: faker.lorem.sentence(),
            agent: faker.person.fullName()
        })),
        time: faker.date.future(),
        type
    }));
};

const mockData = {
    today: generateMockOrders(7),
    tomorrow: generateMockOrders(3),
    within72Hours: generateMockOrders(4),
    within7Days: generateMockOrders(5)
};





const OrderTimeline = () => {

    return (
        <div className="w-full md:w-[90%] max-w-[1792px] px-8">
            <div className='flex items-center justify-between gap-2 w-full grow pt-6 pb-10'>
                <Input
                    type='text'
                    placeholder='Search (client name, customer rep, phone number)'
                    className='w-full focus:border min-w-[350px] text-xs !h-10'
                    // value={searchText}
                    // onChange={(e) => setSearchText(e.target.value)}
                    rightIcon={<Search className='h-5 w-5 text-[#8B909A]' />}
                />

                <Button
                    variant='outline'
                    className='bg-[#28C76F] text-[#1EA566] bg-opacity-25'>
                    <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
                </Button>
            </div>

            <Accordion type="single" collapsible defaultValue='today' className='w-full'>
                <AccordionItem value="today">
                    <AccordionTrigger>Today, {format(new Date(), 'do MMMM yyyy')}</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {mockData.today.map(order => <EnquiryDiscussCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tomorrow">
                    <AccordionTrigger>{format(new Date(new Date().setDate(new Date().getDate() + 1)), 'eeee, do MMMM yyyy')}</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {mockData.tomorrow.map(order => <EnquiryDiscussCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="within72Hours">
                    <AccordionTrigger>{format(new Date(new Date().setDate(new Date().getDate() + 2)), 'eeee, do MMMM yyyy')}</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {mockData.within72Hours.map(order => <EnquiryDiscussCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="within7Days">
                    <AccordionTrigger>{format(new Date(new Date().setDate(new Date().getDate() + 3)), 'eeee, do MMMM yyyy')}</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {mockData.within7Days.map(order => <EnquiryDiscussCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


        </div>
    )

};

export default OrderTimeline;
