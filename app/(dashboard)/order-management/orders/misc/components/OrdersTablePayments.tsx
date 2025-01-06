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
import OrderDetailSheetPayments from './OrderDetailSheetPayments';
import { format } from 'date-fns';
import { convertNumberToNaira } from '@/utils/currency';
import { FilterSearch, Tag } from 'iconsax-react';
import { TOrder } from '../types';
import { Button, LinkButton, Spinner } from '@/components/ui';
import { Inbox } from 'lucide-react';
import { useBooleanStateControl } from '@/hooks';
import { convertKebabAndSnakeToTitleCase } from '@/utils/strings';

type StatusColor =
    | 'bg-green-100 hover:bg-green-100 text-green-800'
    | 'bg-yellow-100 hover:bg-yellow-100 text-yellow-800'
    | 'bg-purple-100 hover:bg-purple-100 text-purple-800'
    | 'bg-gray-100 hover:bg-gray-100 text-gray-800'
    | 'bg-red-100 hover:bg-red-100 text-red-800'
    | 'bg-blue-100 hover:bg-blue-100 text-blue-800';

const statusColors: Record<string, StatusColor> = {
    'paid_website_card': 'bg-green-100 hover:bg-green-100 text-green-800',
    'paid_naira_transfer': 'bg-green-100 hover:bg-green-100 text-green-800',
    'paid_pos': 'bg-green-100 hover:bg-green-100 text-green-800',
    'paid_usd_transfer': 'bg-green-100 hover:bg-green-100 text-green-800',
    'paid_paypal': 'bg-green-100 hover:bg-green-100 text-green-800',
    'cash_paid': 'bg-green-100 hover:bg-green-100 text-green-800',
    'paid_bitcoin': 'bg-green-100 hover:bg-green-100 text-green-800',
    'not_received_paid': 'bg-yellow-100 hover:bg-yellow-100 text-yellow-800',
    'part_payment': 'bg-yellow-100 hover:bg-yellow-100 text-yellow-800',
    'not_paid_go_ahead': 'bg-red-100 hover:bg-red-100 text-red-800',
    // PND: 'bg-purple-100 hover:bg-purple-100 text-purple-800',
    // COM: 'bg-gray-100 hover:bg-gray-100 text-gray-800',
    // STD: 'bg-blue-100 hover:bg-blue-100 text-blue-800',
};

const paymentStatusEnums = { 
    'FP': 'Full Payment',
    'PP': 'Part Payment',
    'UP': 'Unpaid',
}


interface OrderRowProps {
    order: TOrder;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
    const {
        state: isSheetOpen,
        toggle: toggleSheet,
        setFalse: closeSheet,
        setTrue: openSheet,
    } = useBooleanStateControl()


    return (
        <TableRow>
            <TableCell className='min-w-[150px]'>
                <div>{order.order_number}</div>
            </TableCell>
            <TableCell className=''>
                <div>{order.customer?.name}</div>
                <div className='text-sm text-gray-500'>{order.customer.phone}</div>
            </TableCell>
            <TableCell>
                {order.items.map((item, idx) => (
                    <div key={idx} className='!min-w-max'>{item.product.name}</div>
                ))}
            </TableCell>
            <TableCell className='min-w-[180px] max-w-[500px]'>{order.message}</TableCell>
            <TableCell className='min-w-[180px] max-w-[300px]'>{convertKebabAndSnakeToTitleCase(order?.payment_options)}</TableCell>
            <TableCell className='min-w-max'>
                <div className='font-bold'>{convertNumberToNaira(Number(order.total_amount) || 0)}</div>
                <div className='text-sm text-[#494949]'>{order.payment_status}</div>
            </TableCell>
            <TableCell className='min-w-max font-bold'>
                {/* <div>{order.amountUSD ? "$" + order.amountUSD : "-"}</div> */}
                {/* <div>{order.paymentStatus}</div> */}
                -
            </TableCell>

            <TableCell className=' uppercase'>{format(order.delivery.delivery_date, 'dd/MMM/yyyy')}</TableCell>
            <TableCell className='min-w-max'>
                <Badge
                    className={cn(
                        statusColors[order.payment_options] || 'bg-gray-100 text-gray-800 w-full text-center min-w-max',
                        'rounded-md w-max'
                    )}
                >
                    {convertKebabAndSnakeToTitleCase(order.payment_options)}
                </Badge>
            </TableCell>

            <TableCell>
                <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Open order details for ${order?.id}`}
                    onClick={openSheet}
                >
                    {">>"}
                </Button>
                <OrderDetailSheetPayments
                    order={order}
                    isSheetOpen={isSheetOpen}
                    closeSheet={closeSheet}
                />
            </TableCell>
        </TableRow>
    );
};

interface OrdersTableProps {
    data?: TOrder[]
    isLoading: boolean;
    isFetching: boolean;
    error: unknown;
    type?: string;
    isFiltered?: boolean;
}
const OrdersTablePayments = ({ data, isLoading, isFetching, error, isFiltered }: OrdersTableProps) => {


    if (isLoading) return <div className='flex items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'><Spinner /></div>;
    if (error) return <div>Error fetching data</div>;
    if (!data) return null;


    return (
        <div className="overflow-y-scroll">
            <div className={cn('overflow-hidden rounded-full mb-1')}>
                <div className={cn("bg-[#F8F9FB] h-1 w-full overflow-hidden", isFetching && !isLoading && 'bg-blue-200')}>
                    <div className={cn("h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary opacity-0 transition-opacity", isFetching && !isLoading && 'opacity-100')}></div>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='min-w-[150px]'>Order ID</TableHead>
                        <TableHead className='min-w-[200px] max-w-[500px]'>Customers Details</TableHead>
                        <TableHead className='min-w-[230px]'>Order Items</TableHead>
                        <TableHead className='w-[170px]'>Order Notes</TableHead>
                        <TableHead className='min-w-[180px]'>Payment Mode</TableHead>
                        <TableHead className='min-w-[150px]'>Amount</TableHead>
                        <TableHead>Amount(USD)</TableHead>
                        <TableHead className='min-w-[175px] max-w-[500px]'>Delivery Date</TableHead>
                        <TableHead className='min-w-[175px] max-w-[500px]'>Payment Status</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.map((order, index) => (
                            <OrderRow
                                key={index}
                                order={order}
                            />
                        ))
                    }
                </TableBody>
            </Table>

            {
                data.length === 0 && isFiltered && (
                    <div className='flex flex-col items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'>
                        <Inbox size={60} />
                        <div className='text-[#494949] text-center text-lg font-medium font-manrope max-w-sm text-balance'>No Orders Found</div>
                        <LinkButton href="./orders/new-order">
                        </LinkButton>

                    </div>
                )
            }
            {
                data.length === 0 && !isFiltered && (
                    <div className='flex flex-col items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'>
                        <FilterSearch size={60} />
                        <div className='text-[#494949] text-center text-lg font-medium font-manrope max-w-sm text-balance'>No orders match your filters. Clear filters and try again</div>
                    </div>
                )
            }
        </div>
    )
}

export default OrdersTablePayments;
