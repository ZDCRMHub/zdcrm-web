import React from 'react';
import { faker } from '@faker-js/faker';
import { Column, ColumnDef, CellContext } from '@tanstack/react-table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define types
interface Order {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  zone: string;
  enquiryItem: string[];
  recipientName: string;
  recipientPhone: string;
  category: string;
  orderNotes: string;
  status: string;
}

type OrderSection = 'today' | 'tomorrow' | 'within72Hours' | 'within7Days';

// Generate mock data
const generateMockOrders = (count: number): Order[] => {
  return Array.from({ length: count }, (): Order => ({
    orderId: faker.string.alphanumeric(8).toUpperCase(),
    customerName: faker.person.fullName(),
    phoneNumber: faker.phone.number(),
    zone: faker.location.city(),
    enquiryItem: [
      faker.commerce.productName(),
      'Moet Chandon',
      'Large size teddy'
    ],
    recipientName: faker.person.fullName(),
    recipientPhone: faker.phone.number(),
    category: faker.helpers.arrayElement(['C', 'W', 'TB']),
    orderNotes: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(['SOA', 'SORTED', 'SENT TO DISPATCH', 'DIS CL', 'DELIVERED', 'DEL CL', 'CANcELLED'])
  }));
};

const mockData: Record<OrderSection, Order[]> = {
  today: generateMockOrders(6),
  tomorrow: generateMockOrders(4),
  within72Hours: generateMockOrders(5),
  within7Days: generateMockOrders(7)
};



interface OrderTableProps {
  data: Order[];
}



const OrderTimeline: React.FC = () => (
  <div className="w-full">
    <div className="flex space-x-2 mb-4">
      <Badge variant="secondary">All Orders 450</Badge>
      <Badge variant="secondary">SOA 40</Badge>
      <Badge variant="secondary">Sorted 36</Badge>
      <Badge variant="secondary">Sent to dispatch 18</Badge>
      <Badge variant="secondary">DIS CL 40</Badge>
      <Badge variant="secondary">Delivered 21</Badge>
      <Badge variant="secondary">DEL CL 21</Badge>
      <Badge variant="secondary">Cancelled Orders 5</Badge>
    </div>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="today">
        <AccordionTrigger>TODAY</AccordionTrigger>
        <AccordionContent>
          {/* <OrderTable data={mockData.today} /> */}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tomorrow">
        <AccordionTrigger>TOMORROW</AccordionTrigger>
        <AccordionContent>
          {/* <OrderTable data={mockData.tomorrow} /> */}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="within72Hours">
        <AccordionTrigger>IN 72 HOURS</AccordionTrigger>
        <AccordionContent>
          {/* <OrderTable data={mockData.within72Hours} /> */}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="within7Days">
        <AccordionTrigger>IN 7 DAYS</AccordionTrigger>
        <AccordionContent>
          {/* <OrderTable data={mockData.within7Days} /> */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export default OrderTimeline;