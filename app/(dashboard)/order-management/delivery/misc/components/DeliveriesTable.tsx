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
import DeliveryDetailSheet from './DeliveryDetailSheet';

type StatusColor =
    | 'bg-green-100 hover:bg-green-100 text-green-800'
    | 'bg-yellow-100 hover:bg-yellow-100 text-yellow-800'
    | 'bg-purple-100 hover:bg-purple-100 text-purple-800'
    | 'bg-gray-100 hover:bg-gray-100 text-gray-800'
    | 'bg-red-100 hover:bg-red-100 text-red-800'
    | 'bg-blue-100 hover:bg-blue-100 text-blue-800';

const statusColors: Record<string, StatusColor> = {
    DELIVERED: 'bg-gray-100 hover:bg-gray-100 text-gray-800',
    'IN DISPATCH': 'bg-blue-100 hover:bg-blue-100 text-blue-800',
    CANCELED: 'bg-red-100 hover:bg-red-100 text-red-800',
    'DISPATCH': 'bg-blue-100 hover:bg-blue-100 text-blue-800',
};

interface DeliveryOrder {
    orderId: string;
    customerName: string;
    customerPhone: string;
    deliveryDate: string;
    recipientName: string;
    recipientPhone: string;
    riderName: string;
    riderCompany: string;
    riderPhone: string;
    deliveryAddress: string;
    status: string;
}

interface OrderRowProps {
    order: DeliveryOrder;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
    return (
        <TableRow>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>
                <div>{order.customerName}</div>
                <div className='text-sm text-gray-500'>{order.customerPhone}</div>
            </TableCell>
            <TableCell>{order.deliveryDate}</TableCell>
            <TableCell>
                <div>{order.recipientName}</div>
                <div className='text-sm text-gray-500'>{order.recipientPhone}</div>
            </TableCell>
            <TableCell>
                <div>{order.riderCompany} - {order.riderName} </div>
                <div className='text-sm text-gray-500'>{order.riderPhone}</div>
            </TableCell>
            <TableCell>{order.deliveryAddress}</TableCell>
            <TableCell>
                <Badge
                    className={statusColors[order.status] || 'bg-gray-100 text-gray-800 text-center min-w-max w-max'}>
                    {order.status}
                </Badge>
            </TableCell>
            <TableCell>
                <DeliveryDetailSheet orderId={order.orderId} />
            </TableCell>
        </TableRow>
    );
};

const DeliveriesTable = () => {
    const deliveries: DeliveryOrder[] = [
        {
            orderId: 'PF/LM6765',
            customerName: 'Segun OLUKOYA',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-01',
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            riderName: 'Adeola',
            riderCompany: 'GIG Logistics',
            riderPhone: '090000000000',
            deliveryAddress: '123 Ikorodu Road, Lagos Mainland',
            status: 'DELIVERED',
        },
        {
            orderId: 'ZD/LM6765',
            customerName: 'Imole Adefarasin',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-02',
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            riderName: 'Chinedu',
            riderCompany: 'DHL',
            riderPhone: '090000000000',
            deliveryAddress: '456 Agege Motor Road, Lagos Mainland',
            status: 'IN DISPATCH',
        },
        {
            orderId: 'ZD/LI6765',
            customerName: 'Justin Hubner',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-03',
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            riderName: 'Olumide',
            riderCompany: 'DHL',
            riderPhone: '090000000000',
            deliveryAddress: '789 Victoria Island, Lagos Island',
            status: 'DELIVERED',
        },
        {
            orderId: 'PF/LC6765',
            customerName: 'Adamu Garba',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-04',
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            riderName: 'Tunde',
            riderPhone: '090000000000',
            riderCompany: 'Chowdeck',
            deliveryAddress: '101 Ikoyi, Lagos Central',
            status: 'DELIVERED',
        },
        {
            orderId: 'PF/LM6765',
            customerName: 'Ife Adebayo',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-05',
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            riderName: 'Adeola',
            riderCompany: 'Zoom Logistics',
            deliveryAddress: '123 Ikorodu Road, Lagos Mainland',
            riderPhone: '090000000000',
            status: 'CANCELED',
        },
        {
            orderId: 'ZD/LC6765',
            customerName: 'Ife Adebayo',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-06',
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            riderName: 'Chinedu',
            riderPhone: '090000000000',
            riderCompany: 'GIG',
            deliveryAddress: '456 Agege Motor Road, Lagos Central',
            status: 'DISPATCH',
        },
        {
            orderId: 'PF/LM6765',
            customerName: 'Alukp Temitope',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-01',
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            riderName: 'Adeola',
            riderCompany: 'GIG',
            riderPhone: '090000000000',
            deliveryAddress: '123 Ikorodu Road, Lagos Mainland',
            status: 'DELIVERED',
        },
        {
            orderId: 'ZD/LM6765',
            customerName: 'Ife Adebayo',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-02',
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            riderName: 'Chinedu',
            riderPhone: '090000000000',
            riderCompany: 'DHL',
            deliveryAddress: '456 Agege Motor Road, Lagos Mainland',
            status: 'IN DISPATCH',
        },
        {
            orderId: 'ZD/LI6765',
            customerName: 'Josephine Nwabili',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-03',
            recipientName: 'Simisola',
            riderPhone: '090000000000',
            recipientPhone: '07023544455',
            riderName: 'Olumide',
            riderCompany: '08078901234',
            deliveryAddress: '789 Victoria Island, Lagos Island',
            status: 'DELIVERED',
        },
        {
            orderId: 'PF/LC6765',
            customerName: 'Ife Adebayo',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-04',
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            riderName: 'Tunde',
            riderPhone: '090000000000',
            riderCompany: 'DHL',
            deliveryAddress: '101 Ikoyi, Lagos Central',
            status: 'DELIVERED',
        },
        {
            orderId: 'PF/LM6765',
            customerName: 'Ife Adebayo',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-05',
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            riderName: 'Adeola',
            riderPhone: '090000000000',
            riderCompany: 'DHL',
            deliveryAddress: '123 Ikorodu Road, Lagos Mainland',
            status: 'CANCELED',
        },
        {
            orderId: 'ZD/LC6765',
            customerName: 'Ife Adebayo',
            customerPhone: '08067556644',
            deliveryDate: '2023-10-06',
            recipientName: 'Simisola',
            recipientPhone: '07023544455',
            riderPhone: '090000000000',
            riderName: 'Chinedu',
            riderCompany: 'Chowdeck Logistics',
            deliveryAddress: '456 Agege Motor Road, Lagos Central',
            status: 'DISPATCH',
        },
        {
            orderId: 'PF/LM6766',
            customerName: 'Tunde Oladapo',
            customerPhone: '08034567890',
            deliveryDate: '2023-10-07',
            recipientName: 'Amina',
            recipientPhone: '07034567890',
            riderName: 'Babatunde',
            riderPhone: '090000000000',
            riderCompany: 'DHL',
            deliveryAddress: '234 Surulere, Lagos Mainland',
            status: 'DELIVERED',
        },
        {
            orderId: 'ZD/LM6766',
            customerName: 'Tunde Oladapo',
            customerPhone: '08034567890',
            deliveryDate: '2023-10-08',
            recipientName: 'Amina',
            riderPhone: '090000000000',
            recipientPhone: '07034567890',
            riderName: 'Chinedu',
            riderCompany: 'GIG',
            deliveryAddress: '345 Ikeja, Lagos Mainland',
            status: 'IN DISPATCH',
        },
        {
            orderId: 'ZD/LI6766',
            customerName: 'Tunde Oladapo',
            riderPhone: '090000000000',
            customerPhone: '08034567890',
            deliveryDate: '2023-10-09',
            recipientName: 'Amina',
            recipientPhone: '07034567890',
            riderName: 'Olumide',
            riderCompany: 'DHL',
            deliveryAddress: '456 Lekki, Lagos Island',
            status: 'DELIVERED',
        },
        {
            orderId: 'PF/LC6766',
            customerName: 'Tunde Oladapo',
            customerPhone: '08034567890',
            deliveryDate: '2023-10-10',
            recipientName: 'Amina',
            riderPhone: '090000000000',
            recipientPhone: '07034567890',
            riderName: 'Tunde',
            riderCompany: 'Glovo',
            deliveryAddress: '567 Yaba, Lagos Central',
            status: 'DELIVERED',
        },
        {
            orderId: 'PF/LM6767',
            customerName: 'Gbenga Aderibigbe',
            customerPhone: '08034567890',
            deliveryDate: '2023-10-11',
            riderPhone: '090000000000',
            recipientName: 'Amina',
            recipientPhone: '07034567890',
            riderName: 'Adeola',
            riderCompany: 'Glovo',
            deliveryAddress: '678 Ikorodu Road, Lagos Mainland',
            status: 'CANCELED',
        },
        {
            orderId: 'ZD/LC6767',
            customerName: 'Saliu Oladapo',
            customerPhone: '08034567890',
            riderPhone: '090000000000',
            deliveryDate: '2023-10-12',
            recipientName: 'Amina',
            recipientPhone: '07034567890',
            riderName: 'Chinedu',
            riderCompany: 'DHL',
            deliveryAddress: '789 Agege Motor Road, Lagos Central',
            status: 'DISPATCH',
        },
    ];



    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='min-w-[150px]'>Order ID</TableHead>
                    <TableHead className='min-w-[200px]'>Customer Details</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Recipient Details</TableHead>
                    <TableHead>Rider Details</TableHead>
                    <TableHead className='min-w-[150px]'>Delivery Address</TableHead>
                    <TableHead className='min-w-[150px] max-w-max'>Status</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    deliveries.map((order, index) => (
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

export default DeliveriesTable;

