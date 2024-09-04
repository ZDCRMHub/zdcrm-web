import React from 'react';
import { faker } from '@faker-js/faker';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from 'lucide-react';

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
const generateMockOrders = (count: number) => {
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        customerName: faker.person.fullName(),
        orderId: faker.string.alphanumeric(6).toUpperCase(),
        action: faker.helpers.arrayElement(['placed an order', 'carted an item', 'requested a quote']),
        status: faker.helpers.arrayElement(['Pending', 'Processing', 'Shipped', 'Delivered']),
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

const OrderCard = ({ order }: { order: TOrder }) => (
    <Card className="mb-4 border border-[#194A7A] bg-[#f4f6f3]">
        <CardContent className='flex items-start pt-4'>

            <section className='flex-[2]'>
                <CardTitle className='text-[#194A7A] font-semibold text-[1.35rem]'>{order.customerName} just {order.action} {order.orderId}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <span>{order.agent}</span>
                </div>
                {order.timeline.length > 0 && (
                    <ul className="space-y-2 pl-4 border-l-2 border-gray-200">
                        {order.timeline.map((event: any, index: number) => (
                            <li key={index} className="relative">
                                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[25px] top-2"></div>
                                <p className="font-medium">{event.agent} {event.action}</p>
                                <p className="text-sm text-gray-500">{event.details}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <div className="flex items-center gap-4">
                <Button variant="outline"><Calendar size={16} /> + Add Note</Button>
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
    </Card>
);



const OrderTimeline = () => (
    <Accordion type="single" collapsible className="w-full max-w-[1000px]" defaultValue='today'>
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
);

export default OrderTimeline;


/////TODO
//not everything has order ID
//types order- wenquiry
//different statuses for order and enquiries
//save to local storage