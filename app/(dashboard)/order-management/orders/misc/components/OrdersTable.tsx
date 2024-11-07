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
import { cn } from '@/lib/utils';
import OrderDetailSheet from './OrderDetailSheet';
import { format } from 'date-fns';
import { convertNumberToNaira } from '@/utils/currency';
import { Tag } from 'iconsax-react';

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
    orderItems: string[];
    recipientName: string;
    recipientPhone: string;
    category: {
        category: Category;
        isActive: boolean;
    }[];
    orderNotes: string;
    status: string;
    deliveryNote: string;
    deliveryDate: Date;
    amount?: number;
    amountUSD?: number;
    paymentStatus: string;
    tag?: string;
}

interface OrderRowProps {
    order: Order;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
    return (
        <TableRow>
            <TableCell className='min-w-[150px]'>
                <div>{order.orderId}</div>
                {
                    order.tag &&
                    <div className="flex items-center gap-1.5 text-[#494949] text-xs">
                        <span>
                            <Tag size={15} />
                        </span>
                        <span>
                            {order.tag}
                        </span>
                    </div>
                }

            </TableCell>
            <TableCell className='min-w-max max-w-[500px]'>
                <div>{order.customerName}</div>
                <div className='text-sm text-gray-500'>{order.phoneNumber}</div>
            </TableCell>
            <TableCell>
                {order.orderItems.map((item, idx) => (
                    <div key={idx} className='!min-w-max'>{item}</div>
                ))}
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

            <TableCell className='min-w-[180px] max-w-[500px]'>{order.orderNotes}</TableCell>
            <TableCell className='min-w-[150px] max-w-[500px] uppercase'>{format(order.deliveryDate, 'dd/MMM/yyyy')}</TableCell>
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
                <div className='font-bold'>{convertNumberToNaira(order.amount || 0)}</div>
                <div className='text-sm text-[#494949]'>{order.paymentStatus}</div>
            </TableCell>
            <TableCell className='min-w-max'>
                <div>{order.amountUSD ? "$"+order.amountUSD : "-"}</div>
                {/* <div>{order.paymentStatus}</div> */}
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
            orderItems: [
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
            amountUSD: 200,
            paymentStatus: 'Paid(USD Transfer)',
            tag: '123456'
        },
        {
            orderId: 'ZD/LM6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            orderItems: ['A stem of chrys', 'Moet Chandon', 'Large size teddy'],
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            category: [
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            orderNotes: 'This is a very very long Order note. Deliver at door step',
            status: 'SORTED',
            deliveryNote: 'Deliver by 6 PM',
            deliveryDate: new Date(),
            amount: 60000,
            amountUSD: 300,
            paymentStatus: 'Paid(USD Transfer)'
        },
        {
            orderId: 'ZD/LM6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            orderItems: ['A stem of chrys', 'Moet Chandon', 'Large size teddy'],
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
            amountUSD: 400,
            paymentStatus: 'Paid(Website Card)',
            tag: '123456'
        },
        {
            orderId: 'ZD/LI6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            orderItems: [
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
            paymentStatus: 'Paid(Naira Transfer)',
            tag: '123456'
        },
        {
            orderId: 'PF/LC6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            orderItems: ['Choco Drip Drop 104', 'Moet Chandon', 'Large size teddy'],
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
            amountUSD: 600,
            paymentStatus: 'Paid(USD Transfer)'
        },
        {
            orderId: 'PF/LM6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            orderItems: [
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
            orderItems: [
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
            amountUSD: 800,
            paymentStatus: 'Paid(USD Transfer)',
            tag: '123456'
        },
    ];

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='min-w-[150px]'>Order ID</TableHead>
                    <TableHead className='min-w-[210px]'>Customers Details</TableHead>
                    <TableHead className='min-w-[230px]'>Order Items</TableHead>
                    <TableHead className='min-w-[200px]'>Recipient Details</TableHead>
                    <TableHead className='min-w-[150px]'>Category</TableHead>
                    <TableHead className='w-[170px]'>Order Notes</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead className='min-w-[150px]'>Status</TableHead>
                    <TableHead className='min-w-[180px]'>Payment</TableHead>
                    <TableHead>Payment(USD)</TableHead>
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
