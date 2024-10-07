import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button, Sheet, SheetTrigger } from '@/components/ui';
import { cn } from '@/lib/utils';
import OrderDetailSheet from './OrderDetailSheet';
import { format } from 'date-fns';
import { convertNumberToNaira } from '@/utils/currency';

type StatusColor =
    | 'bg-green-100 hover:bg-green-100 text-green-800'
    | 'bg-yellow-100 hover:bg-yellow-100 text-yellow-800'
    | 'bg-purple-100 hover:bg-purple-100 text-purple-800'
    | 'bg-gray-100 hover:bg-gray-100 text-gray-800'
    | 'bg-red-100 hover:bg-red-100 text-red-800'
    | 'bg-blue-100 hover:bg-blue-100 text-blue-800';

const statusColors: Record<string, StatusColor> = {
    SOA: 'bg-green-100 hover:bg-green-100 text-green-800',
    SORTED: 'bg-yellow-100 hover:bg-yellow-100 text-yellow-800',
    'DIS CL': 'bg-purple-100 hover:bg-purple-100 text-purple-800',
    DELIVERED: 'bg-gray-100 hover:bg-gray-100 text-gray-800',
    CANCELED: 'bg-red-100 hover:bg-red-100 text-red-800',
    'SENT TO DISPATCH': 'bg-blue-100 hover:bg-blue-100 text-blue-800',
};

type Category = 'C' | 'W' | 'TB';

const categoryColors: Record<Category, string> = {
    C: 'bg-green-500',
    W: 'bg-blue-500',
    TB: 'bg-purple-500',
};

interface CategoryBadgeProps {
    category: Category;
    isActive: boolean;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, isActive }) => {
    return (
        <span
            className={cn(
                "flex items-center justify-center bg-transparent text-[#A7A7A7] text-sm font-normal rounded-sm h-5 w-5 border border-[#EEEEEE]",
                isActive && "text-white bg-[#367917] border-transparent"
            )}
        >
            {category}
        </span>
    );
};

interface Order {
    orderId: string;
    customerName: string;
    phoneNumber: string;
    zone: string;
    enquiryItems: string[];
    recipientName: string;
    recipientPhone: string;
    category: {
        category: Category;
        isActive: boolean;
    }[];
    orderNotes: string;
    status: string;
    deliveryNote: string; // Added deliveryNote field
    deliveryDate: Date;
    amount?: number;
    paymentStatus: string;
}

interface OrderRowProps {
    order: Order;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
    return (
        <TableRow>
            <TableCell className='min-w-[150px]'>{order.orderId}</TableCell>
            <TableCell>
                {order.enquiryItems.map((item, idx) => (
                <div key={idx} className='!min-w-max'>{item}</div>
                ))}
            </TableCell>
            <TableCell className='min-w-max max-w-[500px]'>
                <div>{order.customerName}</div>
                <div className='text-sm text-gray-500'>{order.phoneNumber}</div>
                <div className='text-xs text-gray-400'>{order.zone}</div>
            </TableCell>
            <TableCell>
                <div>{order.recipientName}</div>
                <div className='text-sm text-gray-500'>{order.recipientPhone}</div>
            </TableCell>

            <TableCell>
                <div className='flex items-center gap-2 min-w-max'>
                    {(['C', 'W', 'F', 'TB'] as Category[]).map(cat => (
                        <CategoryBadge
                            key={cat}
                            category={cat}
                            isActive={order.category.find(c => c.category === cat)?.isActive || false}
                        />
                    ))}
                </div>
            </TableCell>

            <TableCell className='min-w-max max-w-[500px]'>{order.orderNotes}</TableCell>
            <TableCell className='min-w-[150px] max-w-[500px]'>{format(order.deliveryDate, 'dd/MMM/yyyy')}</TableCell>
            <TableCell className='min-w-max'>
                <Badge
                    className={cn(
                        statusColors[order.status] || 'bg-gray-100 text-gray-800 w-full text-center min-w-max',
                        'rounded-md w-max'
                    )}>
                    {order.status}
                </Badge>
            </TableCell>
            <TableCell className='min-w-max'>
                <div>{convertNumberToNaira(order.amount || 0)}</div>
                <div>{order.paymentStatus}</div>
            </TableCell>
            <TableCell>
                <OrderDetailSheet orderId={order.orderId} />
            </TableCell>
        </TableRow>
    );
};

const OrdersTable = () => {
    const orders: Order[] = [
        {
            orderId: 'PF/LM6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Zone: Lagos Mainland',
            enquiryItems: [
                'Adeline Faultline Cake',
                'Moet Chandon',
                'Large size teddy',
            ],
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            category: [
                { category: 'C', isActive: true },
            ],
            orderNotes: 'Call Simisola',
            status: 'PAYMENT MADE',
            deliveryNote: 'Deliver by 5 PM',
            deliveryDate: new Date(),
            amount: 5000,
            paymentStatus: 'Paid(USD Transfer)'
        },
        {
            orderId: 'ZD/LM6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Zone: Lagos Mainland',
            enquiryItems: ['A stem of chrys', 'Moet Chandon', 'Large size teddy'],
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            category: [
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            orderNotes: 'Deliver at door step',
            status: 'SORTED',
            deliveryNote: 'Deliver by 6 PM',
            deliveryDate: new Date(),
            amount: 60000,
            paymentStatus: 'Paid(USD Transfer)'
        },
        {
            orderId: 'ZD/LM6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Zone: Lagos Mainland',
            enquiryItems: ['A stem of chrys', 'Moet Chandon', 'Large size teddy'],
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            category: [
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            orderNotes: 'Deliver at door step',
            status: 'SORTED',
            deliveryNote: 'Deliver by 6 PM',
            deliveryDate: new Date(),
            amount: 70000,
            paymentStatus: 'Paid(Website Card)'
        },
        {
            orderId: 'ZD/LI6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Zone: Lagos Island',
            enquiryItems: [
                'Delectable Choco cake',
                'Moet Chandon',
                'Large size teddy',
            ],
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            orderNotes: 'Deliver at door step',
            status: 'DIS CL',
            deliveryNote: 'Deliver by 7 PM',
            deliveryDate: new Date(),
            amount: 80000,
            paymentStatus: 'Paid(Bitcoin)'
        },
        {
            orderId: 'PF/LC6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Zone: Lagos Central',
            enquiryItems: ['Choco Drip Drop 104', 'Moet Chandon', 'Large size teddy'],
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            orderNotes: 'Call Adeola',
            status: 'DELIVERED',
            deliveryNote: 'Deliver by 8 PM',
            deliveryDate: new Date(),
            amount: 90000,
            paymentStatus: 'Paid(USD Transfer)'
        },
        {
            orderId: 'PF/LM6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Zone: Lagos Mainland',
            enquiryItems: [
                'Adeline Faultline Cake',
                'Moet Chandon',
                'Large size teddy',
            ],
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            orderNotes: 'Deliver at door step',
            status: 'CANCELED',
            deliveryNote: 'Deliver by 9 PM',
            deliveryDate: new Date(),
            amount: 10000,
            paymentStatus: 'Not Received(Paid)'
        },
        {
            orderId: 'ZD/LC6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Zone: Lagos Central',
            enquiryItems: [
                'Adeline Faultline Cake',
                'Moet Chandon',
                'Large size teddy',
            ],
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            orderNotes: 'Call Simisola',
            status: 'SENT TO DISPATCH',
            deliveryNote: 'Deliver by 10 PM',
            deliveryDate: new Date(),
            amount: 11000,
            paymentStatus: 'Paid(USD Transfer)'
        },
    ];

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='min-w-[150px]'>Order ID</TableHead>
                    <TableHead>Order Items</TableHead>
                    <TableHead>Customers Details</TableHead>
                    <TableHead>Recipient Details</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Order Notes</TableHead>
                    <TableHead>Delivery Note</TableHead>
                    <TableHead className='min-w-[150px]'>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    orders.map((order, index) => (
                        <OrderRow
                            key={index}
                            order={order}
                        />
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default OrdersTable;
