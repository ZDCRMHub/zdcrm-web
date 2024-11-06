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
import OrderDetailSheet from './OrderHistoryDetailSheet';
import { format } from 'date-fns';
import { convertNumberToNaira } from '@/utils/currency';



const statusColors: Record<OrderStatus, string> = {
    DELIVERED: 'bg-[#47D44726] hover:bg-[#47D44726]  text-[#28C72D]',
    CANCELED: 'bg-[#F7E7E7] hover:bg-[#F7E7E7] text-[#AF160C]',
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

type OrderStatus = 'DELIVERED' | 'CANCELED';

interface Order {
    orderId: string;
    customerName: string;
    customerPhone: string;
    deliveryDate: string;
    category: {
        category: Category;
        isActive: boolean;
    }[];
    messageOnOrder: string;
    totalAmount: number;
    status: OrderStatus;
    deliveryNotes: string;
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
                <div className='text-sm text-gray-500'>{order.customerPhone}</div>
            </TableCell>
            <TableCell className='uppercase'>{format(new Date(order.deliveryDate), 'dd/MMM/yyyy')}</TableCell>
            <TableCell>
                <div className='flex items-center gap-2'>
                    {(['C', 'W', 'TB'] as Category[]).map(cat => (
                        <CategoryBadge
                            key={cat}
                            category={cat}
                            isActive={order.category.find(c => c.category === cat)?.isActive || false}
                        />
                    ))}
                </div>
            </TableCell>
            <TableCell>{order.messageOnOrder}</TableCell>
            <TableCell>{convertNumberToNaira(order.totalAmount)}</TableCell>
            <TableCell>
                <Badge
                    className={statusColors[order.status] || 'bg-gray-100 text-gray-800 w-full text-center min-w-max'}>
                    {order.status}
                </Badge>
            </TableCell>
            <TableCell>
                <OrderDetailSheet orderId={order.orderId} />
            </TableCell>
        </TableRow>
    );
};

const OrdersHistoryTable = () => {
    const orders: Order[] = [
        {
            orderId: 'PF/LM6765',
            customerName: 'Khalid Oni',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-01',
            category: [
                { category: 'C', isActive: false },
                { category: 'W', isActive: false },
                { category: 'TB', isActive: false },
            ],
            messageOnOrder: 'Call Simisola',
            totalAmount: 5000,
            status: 'CANCELED',
            deliveryNotes: 'Order canceled due to customer request.'
        },
        {
            orderId: 'ZD/LM6765',
            customerName: 'Ife Adebayo',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-02',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            messageOnOrder: 'Deliver at door step',
            totalAmount: 4500,
            status: 'DELIVERED',
            deliveryNotes: 'Delivered successfully at the doorstep.'
        },
        {
            orderId: 'ZD/LI6765',
            customerName: 'Akanbi Morakinyo',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-03',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            messageOnOrder: 'Deliver at door step',
            totalAmount: 6000,
            status: 'DELIVERED',
            deliveryNotes: 'Delivered successfully at the doorstep.'
        },
        {
            orderId: 'PF/LC6765',
            customerName: 'Chisom Okoli',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-04',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            messageOnOrder: 'Call Adeola',
            totalAmount: 55000,
            status: 'DELIVERED',
            deliveryNotes: 'Delivered successfully after calling Adeola.'
        },
        {
            orderId: 'PF/LM6765',
            customerName: 'Chukwuka Ibejih',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-05',
            category: [
                { category: 'C', isActive: false },
                { category: 'W', isActive: false },
                { category: 'TB', isActive: false },
            ],
            messageOnOrder: 'Deliver at door step',
            totalAmount: 42000,
            status: 'CANCELED',
            deliveryNotes: 'Order canceled due to customer request.'
        },
        {
            orderId: 'ZD/LC6765',
            customerName: 'Ibraheem Abdulhameed',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-06',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            messageOnOrder: 'Call Simisola',
            totalAmount: 14800,
            status: 'DELIVERED',
            deliveryNotes: 'Delivered successfully after calling Simisola.'
        },
        {
            orderId: 'PF/LM6766',
            customerName: 'Efetobore Egbevwie',
            customerPhone: '08034567890',
            deliveryDate: '2023-10-07',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            messageOnOrder: 'Call Amina',
            totalAmount: 57200,
            status: 'DELIVERED',
            deliveryNotes: 'Delivered successfully after calling Amina.'
        },
        {
            orderId: 'ZD/LM6766',
            customerName: 'Tunde Oladapo',
            customerPhone: '08034567890',
            deliveryDate: '2023-10-08',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            messageOnOrder: 'Deliver at door step',
            totalAmount: 41000,
            status: 'DELIVERED',
            deliveryNotes: 'Delivered successfully at the doorstep.'
        },
        {
            orderId: 'ZD/LI6766',
            customerName: 'Tunde Oladapo',
            customerPhone: '08034567890',
            deliveryDate: '2023-10-09',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            messageOnOrder: 'Deliver at door step',
            totalAmount: 10000,
            status: 'DELIVERED',
            deliveryNotes: 'Delivered successfully at the doorstep.'
        },
        {
            orderId: 'PF/LC6766',
            customerName: 'Tunde Oladapo',
            customerPhone: '08034567890',
            deliveryDate: '2023-10-10',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            messageOnOrder: 'Call Amina',
            totalAmount: 50700,
            status: 'DELIVERED',
            deliveryNotes: 'Delivered successfully after calling Amina.'
        },
        {
            orderId: 'PF/LM6767',
            customerName: 'Tunde Oladapo',
            customerPhone: '08034567890',
            deliveryDate: '2023-10-11',
            category: [
                { category: 'C', isActive: false },
                { category: 'W', isActive: false },
                { category: 'TB', isActive: false },
            ],
            messageOnOrder: 'Deliver at door step',
            totalAmount: 402000,
            status: 'CANCELED',
            deliveryNotes: 'Order canceled due to customer request.'
        },
        {
            orderId: 'ZD/LC6767',
            customerName: 'Tunde Oladapo',
            customerPhone: '08034567890',
            deliveryDate: '2023-10-12',
            category: [
                { category: 'C', isActive: true },
                { category: 'W', isActive: true },
                { category: 'TB', isActive: true },
            ],
            messageOnOrder: 'Call Amina',
            totalAmount: 40900,
            status: 'DELIVERED',
            deliveryNotes: 'Delivered successfully after calling Amina.'
        },
    ];


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer Details</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Message on Order</TableHead>
                    <TableHead>Total Amount</TableHead>
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

export default OrdersHistoryTable;
