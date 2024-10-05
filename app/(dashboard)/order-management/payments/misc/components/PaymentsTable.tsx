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
import OrderDetailSheet from './PaymentsDetailSheet';
import { format } from 'date-fns';
import { convertNumberToNaira } from '@/utils/currency';


const statusColors: Record<string, string> = {
    'Paid (Naira Transfer)': 'bg-green-100 hover:bg-green-100 text-green-800 w-full text-center',
    'Paid (Bitcoin)': 'bg-yellow-100 hover:bg-yellow-100 text-yellow-800',
    'DIS CL': 'bg-purple-100 hover:bg-purple-100 text-purple-800',
    DELIVERED: 'bg-gray-100 hover:bg-gray-100 text-gray-800',
    'Not Received (Paid)': 'bg-red-100 hover:bg-red-100 text-red-800',
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
    orderItems: string[];
    recipientName: string;
    paymentMethod: string;
    category: {
        category: Category;
        isActive: boolean;
    }[];
    amount: number;
    status: string;
    deliveryDate: Date; 
}

interface OrderRowProps {
    order: Order;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
    return (
        <TableRow>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>
                <div>{order.customerName}</div>
                <div className='text-sm text-gray-500'>{order.phoneNumber}</div>
            </TableCell>
            <TableCell>
                {order.orderItems.map((item, idx) => (
                <div key={idx} className='!min-w-max'>{item}</div>
                ))}
            </TableCell>
            <TableCell>
                <div className=''>{order.paymentMethod}</div>
            </TableCell>


            <TableCell>{convertNumberToNaira(order.amount)}</TableCell>
            <TableCell>{format(order.deliveryDate, 'dd-MM-yyyy')}</TableCell>
            <TableCell>
                <Badge
                    className={cn(
                        'flex items-center justify-center',
                        statusColors[order.status] || ' bg-gray-100 text-gray-800 w-full text-center min-w-max'
                    )}>
                    {order.status}
                </Badge>
            </TableCell>
            <TableCell>
                <OrderDetailSheet orderId={order.orderId} />
            </TableCell>
        </TableRow>
    );
};

const PaymentsTable = () => {
    const orders: Order[] = [
        {
            orderId: 'PF/LM6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Lagos Mainland',
            orderItems: [
                'Adeline Faultline Cake',
                'Moet Chandon',
                'Large size teddy',
            ],
            recipientName: 'Simisola',
            paymentMethod: 'Card Payment',
            category: [
                { category: 'C', isActive: true },
            ],
            amount: 50000, 
            status: 'Paid (Naira Transfer)',
            deliveryDate: new Date('2024-10-04T17:00:00'), 
        },
        {
            orderId: 'PF/LM6766',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Lagos Mainland',
            orderItems: [
                'Adeline Faultline Cake',
                'Moet Chandon',
                'Large size teddy',
            ],
            recipientName: 'Simisola',
            paymentMethod: 'Card Payment',
            category: [
                { category: 'C', isActive: true },
            ],
            amount: 50000, 
            status: 'Paid (Bitcoin)',
            deliveryDate: new Date('2024-10-04T17:00:00'), 
        },
        {
            orderId: 'ZD/LM6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Lagos Mainland',
            orderItems: ['A stem of chrys', 'Moet Chandon', 'Large size teddy'],
            recipientName: 'Simisola',
            paymentMethod: 'Bank Transfer',
            category: [
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            amount: 45000, 
            status: 'Paid (Naira Transfer)',
            deliveryDate: new Date('2024-10-04T18:00:00'), 
        },
        {
            orderId: 'ZD/LI6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Lagos Island',
            orderItems: [
                'Delectable Choco cake',
                'Moet Chandon',
                'Large size teddy',
            ],
            recipientName: 'Simisola',            
            paymentMethod: 'Credit Card',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            amount: 55000, 
            status: 'Not Received (Paid)',
            deliveryDate: new Date('2024-10-04T19:00:00'), 
        },
        {
            orderId: 'PF/LC6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Lagos Central',
            orderItems: ['Choco Drip Drop 104', 'Moet Chandon', 'Large size teddy'],
            recipientName: 'Simisola',
            paymentMethod: 'Paypal',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            amount: 60000, 
            status: 'Not Received (Paid)',
            deliveryDate: new Date('2024-10-04T20:00:00'), 
        },
        {
            orderId: 'PF/LM6767',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Lagos Mainland',
            orderItems: [
                'Adeline Faultline Cake',
                'Moet Chandon',
                'Large size teddy',
            ],
            recipientName: 'Simisola',
            paymentMethod: 'Bank Transfer',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            amount: 50000, 
            status: 'Paid (Naira Transfer)',
            deliveryDate: new Date('2024-10-04T21:00:00'), 
        },
        {
            orderId: 'ZD/LC6765',
            customerName: 'Ife Adebayo',
            phoneNumber: '08067556644',
            zone: 'Lagos Central',
            orderItems: [
                'Adeline Faultline Cake',
                'Moet Chandon',
                'Large size teddy',
            ],
            recipientName: 'Simisola',
            paymentMethod: 'Card Payment',            
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            amount: 55000, 
            status: 'Paid (Bitcoin)',
            deliveryDate: new Date('2024-10-04T22:00:00'), 
        },
    ];

    return (
        <Table>
            <TableHeader>
                <TableRow className='text-[#113770] font-medium'>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customers Details</TableHead>
                    <TableHead>Order Items</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
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

export default PaymentsTable;
