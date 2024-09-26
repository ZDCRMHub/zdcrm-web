'use client'

import React from 'react';
import { faker } from '@faker-js/faker';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { format } from 'date-fns';
import EnquiryDiscussCard from './EnquiryDiscussCard';

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
        <>
            <Accordion type="single" collapsible className="w-full max-w-[1440px] px-8" defaultValue='today'>
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


        </>
    )

};

export default OrderTimeline;
