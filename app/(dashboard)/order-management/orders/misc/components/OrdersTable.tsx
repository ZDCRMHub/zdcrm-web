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
import { FilterSearch, Tag } from 'iconsax-react';
import { TOrder } from '../types';
import { LinkButton, Spinner } from '@/components/ui';
import { Inbox } from 'lucide-react';

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


interface OrderRowProps {
    order: TOrder;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
    return (
        <TableRow>
            <TableCell className='min-w-[150px]'>
                <div>{order.order_number}</div>
                {/* {
                    order.tag &&
                    <div className="flex items-center gap-1.5 text-[#494949] text-xs">
                        <span>
                            <Tag size={15} />
                        </span>
                        <span>
                            {order.tag}
                        </span>
                    </div>
                } */}

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
            {/* <TableCell>
                <div>{order.recipientName}</div>
                <div className='text-sm text-gray-500'>{order.recipientPhone}</div>
            </TableCell> */}

            <TableCell>
                <div className='flex items-center gap-2 min-w-max'>
                    {order.items.map((item) => (
                        <Badge
                            key={item.id}
                            variant="outline"
                            className="flex items-center justify-center bg-transparent text-[#A7A7A7] font-normal rounded-sm h-5 w-5"
                        >
                            {item.product.category.name.charAt(0)}
                        </Badge>
                    ))}
                </div>
            </TableCell>

            <TableCell className='min-w-[180px] max-w-[500px]'>{order.message}</TableCell>
            <TableCell className=' uppercase'>{format(order.delivery.delivery_date, 'dd/MMM/yyyy')}</TableCell>
            <TableCell className='min-w-max'>
                <Badge
                    className={cn(
                        statusColors[order.status] || 'bg-gray-100 text-gray-800 w-full text-center min-w-max',
                        'rounded-md w-max'
                    )}
                >
                    {order.status}
                </Badge>
            </TableCell>
            <TableCell className='min-w-max'>
                <div className='font-bold'>{convertNumberToNaira(Number(order.total_amount) || 0)}</div>
                <div className='text-sm text-[#494949]'>{order.payment_status}</div>
            </TableCell>
            <TableCell className='min-w-max font-bold'>
                {/* <div>{order.amountUSD ? "$" + order.amountUSD : "-"}</div> */}
                {/* <div>{order.paymentStatus}</div> */}
                -
            </TableCell>
            <TableCell>
                <OrderDetailSheet
                    order={order}
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
const OrdersTable = ({ data, isLoading, isFetching, error, isFiltered }: OrdersTableProps) => {
    const [selectedOrder, setSelectedOrder] = React.useState<TOrder | null>(null);


    if (isLoading) return <div className='flex items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'><Spinner /></div>;
    if (error) return <div>Error fetching data</div>;
    if (!data) return null;


    return (
        <div className="w-full md:w-[95%] max-w-[1792px] max-md:px-8">
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
                        {/* <TableHead className='min-w-[200px]'>Recipient Details</TableHead> */}
                        <TableHead className='min-w-[150px]'>Category</TableHead>
                        <TableHead className='w-[170px]'>Order Notes</TableHead>
                        <TableHead className='min-w-[175px] max-w-[500px]'>Delivery Date</TableHead>
                        <TableHead className='min-w-[150px]'>Status</TableHead>
                        <TableHead className='min-w-[180px]'>Payment</TableHead>
                        <TableHead>Payment(USD)</TableHead>
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
                        <Inbox size={60}/>
                        <div className='text-[#494949] text-center text-lg font-medium font-manrope max-w-sm text-balance'>No Orders Found</div>
                        <LinkButton href="./orders/new-order">
                        </LinkButton>

                    </div>
                )
            }
            {
                data.length === 0 && !isFiltered && (
                    <div className='flex flex-col items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'>
                        <FilterSearch size={60}/>
                        <div className='text-[#494949] text-center text-lg font-medium font-manrope max-w-sm text-balance'>No orders match your filters. Clear filters and try again</div>
                    </div>
                )
            }
        </div>
    )
}

export default OrdersTable;
