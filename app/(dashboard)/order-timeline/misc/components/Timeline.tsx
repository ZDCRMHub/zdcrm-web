'use client'

import React from 'react';
import { faker } from '@faker-js/faker';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, UserCheck } from 'lucide-react';
import { Phone, } from '@phosphor-icons/react';
import { useBooleanStateControl } from '@/hooks';
import AddNewNoteModal from './AddNewNoteModal';
import axios from 'axios';

type TOrder = {
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
}
// Generate mock data
export const generateMockOrders = (count: number) => {
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        customerName: faker.person.fullName(),
        orderId: faker.string.alphanumeric(6).toUpperCase(),
        action: faker.helpers.arrayElement(['placed an order', 'carted an item', 'made an enquiry', 'created an order']),
        status: faker.helpers.arrayElement(['Still Discussing', 'Finalized Discussion']),
        agent: faker.person.fullName(),
        timeline: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
            action: faker.helpers.arrayElement(['started a discussion', 'updated the order', 'sent a message']),
            details: faker.lorem.sentence(),
            agent: faker.person.fullName()
        }))
    }));
};

const mockData = {
    today: generateMockOrders(3),
    tomorrow: generateMockOrders(2),
    within72Hours: generateMockOrders(4),
    within7Days: generateMockOrders(5)
};

export const OrderCard = ({ order }: { order: TOrder }) => {
    const {
        state: isModalOpen,
        setTrue: openModal,
        setFalse: closeModal,
        setState: setModalState
    } = useBooleanStateControl();

    React.useEffect(() => {
        console.log(isModalOpen)
    }, [isModalOpen])

    return (
        <Card className="mb-4 border border-[#194A7A] bg-[#f4f6f3]">
            <CardContent className='flex items-start pt-4'>

                <section className='flex-[2]'>
                    <CardTitle className='text-[#194A7A] font-semibold text-[1.35rem]'>{order.customerName} just {order.action} {order.orderId}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                        <div className="flex items-center justify-center w-6 h-6 bg-[#FFF1C2] rounded-full -left-[25px] top-2">
                            <UserCheck size={13} className="text-[#25272B]" />
                        </div>
                        <span>{order.agent}</span>
                    </div>
                    {order.timeline.length > 0 && (
                        <ul className="space-y-2 pl-4 border-l-2 border-gray-200">
                            {order.timeline.map((event: any, index: number) => (
                                <li key={index} className="relative">
                                    <div className="absolute flex items-center justify-center w-5 h-5 bg-[#6B6D70] rounded-full -left-[25px] top-2">
                                        <Phone size={14} className="text-white" />
                                    </div>
                                    <p className="font-medium">{event.agent} {event.action}</p>
                                    <p className="text-sm text-gray-500">{event.details}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={openModal}><Calendar size={16}  /> + Add Note</Button>
                    <Select defaultValue={order.status}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </CardContent>

            <AddNewNoteModal isModalOpen={isModalOpen} closeModal={closeModal} setModalOpen={setModalState} />

        </Card>
    )
};



const OrderTimeline = () => {
    // const getttt = async () => {
    //     const res = await axios.get('https://prestigeflowershop.com/wp-json/wc/v3/products', {
    //       auth: {
    //         username: "ck_5666dad75b1290a6474cb80a9f96e47a8f506715",
    //         password: "cs_4c00c6c0c012f56f0ed9ce492d81e25694770aae",
    //       },
    //     });
    //   }
    //   React.useEffect(() => {
    //     getttt()
    //   }, [])
    


    return (
        <>
            <Accordion type="single" collapsible className="w-full max-w-[1440px] px-8" defaultValue='today'>
                <AccordionItem value="today">
                    <AccordionTrigger>Today, 22nd of 2024</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {mockData.today.map(order => <OrderCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tomorrow">
                    <AccordionTrigger>TOMORROW</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {mockData.tomorrow.map(order => <OrderCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="within72Hours">
                    <AccordionTrigger>IN 72 HOURS</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {mockData.within72Hours.map(order => <OrderCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="within7Days">
                    <AccordionTrigger>IN 7 DAYS</AccordionTrigger>
                    <AccordionContent className='px-4'>
                        {mockData.within7Days.map(order => <OrderCard key={order.id} order={order} />)}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


        </>
    )

};

export default OrderTimeline;


/////TODO
//not everything has order ID
//types order- wenquiry
//different statuses for order and enquiries
//save to local storage