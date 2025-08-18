
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
import { format } from 'date-fns';
import { convertNumberToNaira, formatCurrency } from '@/utils/currency';
import { FilterSearch, Tag } from 'iconsax-react';
import { TOrder } from '../types';
import { Button, LinkButton, Popover, PopoverContent, PopoverTrigger, Spinner } from '@/components/ui';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import { useBooleanStateControl } from '@/hooks';
import OrderDetailSheetDelivery from './OrderDetailSheetDelivery';
import { ORDER_DELIVERY_STATUS_ENUMS, ORDER_DELIVERY_STATUS_OPTIONS } from '@/constants';
import { extractErrorMessage } from '@/utils/errors';
import toast from 'react-hot-toast';
import { useUpdateDeliveryStatus, useUpdateOrderStatus } from '../api';
import { formatUniversalDate } from '@/utils/strings';
import AddDeliveryNoteModal from './AddDeliveryNoteModal';

type StatusColor =
    | 'bg-green-100 hover:bg-green-100 text-green-800'
    | 'bg-yellow-100 hover:bg-yellow-100 text-yellow-800'
    | 'bg-purple-100 hover:bg-purple-100 text-purple-800'
    | 'bg-gray-100 hover:bg-gray-100 text-gray-800'
    | 'bg-red-100 hover:bg-red-100 text-red-800'
    | 'bg-blue-100 hover:bg-blue-100 text-blue-800';

export const ORDER_STATUS_COLORS: Record<string, StatusColor> = {
    SOA: 'bg-green-100 hover:bg-green-100 text-green-800',
    SOR: 'bg-yellow-100 hover:bg-yellow-100 text-yellow-800',
    PND: 'bg-purple-100 hover:bg-purple-100 text-purple-800',
    COM: 'bg-gray-100 hover:bg-gray-100 text-gray-800',
    CAN: 'bg-red-100 hover:bg-red-100 text-red-800',
    STD: 'bg-blue-100 hover:bg-blue-100 text-blue-800',
};

export const ORDER_DELIVERY_STATUS_COLORS: Record<string, StatusColor> = {
    PENDING: 'bg-purple-100 hover:bg-purple-100 text-purple-800',
    DISPATCHED: 'bg-blue-100 hover:bg-blue-100 text-blue-800',
    DISPATCHED_CL: 'bg-yellow-100 hover:bg-yellow-100 text-yellow-800',
    DELIVERED: 'bg-green-100 hover:bg-green-100 text-green-800',
    DELIVERED_CL: 'bg-gray-100 hover:bg-gray-100 text-gray-800',
    CANCELLED: 'bg-red-100 hover:bg-red-100 text-red-800',
};

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

    const {
        state: isAddDeliveryNoteModalOpen,
        setTrue: openAddDeliveryNoteModal,
        setFalse: closeAddDeliveryNoteModal,
    } = useBooleanStateControl();

    const { mutate, isPending: isUpdatingStatus } = useUpdateDeliveryStatus()
    const handleStatusUpdate = (new_status: string) => {
        mutate({ id: order?.id, status: new_status },

            {
                onSuccess: (data) => {
                    toast.success("Order status updated successfully");
                    if(new_status  == "DELIVERED" || new_status == "DELIVERED_CL") {
                        openAddDeliveryNoteModal();
                    }
                },
                onError: (error) => {
                    const errorMessage = extractErrorMessage(error as unknown as any);
                    toast.error(errorMessage), {
                        duration: 5000,
                    };
                }
            }
        );
    }

    return (
        <>
            <TableRow>
                <TableCell className='min-w-[150px]'>
                    <div>{order.order_number}</div>
                    <div>{order.created_by.name}</div>
                </TableCell>
                <TableCell className=' uppercase'>
                    {formatUniversalDate(order.delivery.delivery_date)}
                </TableCell>
                <TableCell className='min-w-max'>
                    <Popover>
                        <PopoverTrigger className="flex items-center gap-1">
                            <Badge
                                className={cn(
                                    ORDER_DELIVERY_STATUS_COLORS[order.delivery.status] || 'bg-gray-100 text-gray-800 w-full text-center min-w-max',
                                    'rounded-md w-max'
                                )}
                            >
                                {ORDER_DELIVERY_STATUS_ENUMS[order?.delivery.status!]}
                            </Badge>
                            {
                                isUpdatingStatus && <Spinner size={18} />
                            }
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-0.5 max-w-max p-2">
                            {
                                ORDER_DELIVERY_STATUS_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        value={option.value}
                                        onClick={() => handleStatusUpdate(option.value)}
                                        className="py-1.5 px-3 hover:!bg-primary hover:!text-white cursor-pointer rounded-lg border hover:border-transparent text-xs"
                                    >
                                        {option.label}
                                    </button>
                                ))
                            }
                        </PopoverContent>
                    </Popover>
                </TableCell>
                <TableCell className=''>
                    <div>{order.delivery.recipient_name}</div>
                    <div className='text-sm text-gray-500'>{order.delivery.recipient_phone}</div>
                </TableCell>
                <TableCell className='min-w-[180px] max-w-[500px]'>{order.delivery.address}</TableCell>
                <TableCell className='min-w-[180px] max-w-[500px]'>{order.delivery.note}</TableCell>
                <TableCell>
                    <div>{order.delivery.delivery_platform || "-"} - {order.delivery.driver_name || "-"} </div>
                    <div className='text-sm text-gray-500'>{order.delivery.driver_phone}</div>
                </TableCell>
                <TableCell className=''>
                    <div>{order.customer?.name}</div>
                    <div className='text-sm text-gray-500'>{order.customer.phone}</div>
                </TableCell>
                <TableCell className='min-w-[180px] max-w-[500px]'>
                    {
                        formatCurrency(Number(order.delivery.dispatch?.delivery_price || 0), "NGN")
                    }
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
                    <OrderDetailSheetDelivery
                        order={order}
                        isSheetOpen={isSheetOpen}
                        closeSheet={closeSheet}
                    />
                </TableCell>
            </TableRow>

            <AddDeliveryNoteModal
                isModalOpen={isAddDeliveryNoteModalOpen}
                closeModal={closeAddDeliveryNoteModal}
                orderId={order.id}
            />
        </>
    );
};

interface OrdersTableDeliveryProps {
    data?: TOrder[]
    isLoading: boolean;
    isFetching: boolean;
    error: unknown;
    type?: string;
    isFiltered?: boolean;
}
const OrdersTableDelivery = ({ data, isLoading, isFetching, error, isFiltered }: OrdersTableDeliveryProps) => {
    const tableRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);

    const checkForScrolling = React.useCallback(() => {
        requestAnimationFrame(() => {
            if (tableRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
            }
        });
    }, []);

    React.useEffect(() => {
        const tableElement = tableRef.current;
        if (tableElement) {
            tableElement.addEventListener('scroll', checkForScrolling);
            window.addEventListener('resize', checkForScrolling);
            checkForScrolling();
        }

        return () => {
            if (tableElement) {
                tableElement.removeEventListener('scroll', checkForScrolling);
            }
            window.removeEventListener('resize', checkForScrolling);
        };
    }, [checkForScrolling]);

    React.useEffect(() => {
        checkForScrolling();
    }, [data, checkForScrolling]);

    const scrollTable = (direction: 'left' | 'right') => {
        if (tableRef.current) {
            const scrollAmount = 300;
            const currentScroll = tableRef.current.scrollLeft;
            const newScroll = direction === 'left'
                ? currentScroll - scrollAmount
                : currentScroll + scrollAmount;

            tableRef.current.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });

            setTimeout(checkForScrolling, 300);
        }
    };


    if (isLoading) return <div className='flex items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'><Spinner /></div>;
    if (error) return <div>Error fetching data</div>;
    if (!data) return null;


    return (
        <div className="relative h-[93%]">
            <div className="flex items-center gap-4 h-3">
                <div className={cn("overflow-hidden rounded-full mb-1 grow")}>
                    <div className={cn("bg-[#F8F9FB] h-1 w-full overflow-hidden", isFetching && "bg-blue-200")}>
                        <div
                            className={cn(
                                "h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary opacity-0 transition-opacity",
                                isFetching && "opacity-100",
                            )}
                        ></div>
                    </div>
                </div>
                <section className='flex items-center gap-2 shrink-0 px-5 -translate-y-full'>
                    <Button
                        className="z-10 h-7 w-7"
                        onClick={() => scrollTable('left')}
                        variant="light"
                        size="icon"
                        disabled={!canScrollLeft}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        className="z-10 h-7 w-7"
                        onClick={() => scrollTable('right')}
                        variant="light"
                        size="icon"
                        disabled={!canScrollRight}

                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </section>
            </div>


            <div ref={tableRef} className="overflow-auto max-h-full">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='min-w-[150px]'>Order ID</TableHead>
                                    <TableHead>Delivery Date</TableHead>
                                    <TableHead className='min-w-[150px] max-w-max'>Status</TableHead>
                                    <TableHead>Recipient Details</TableHead>
                                    <TableHead className='min-w-[150px]'>Delivery Address</TableHead>
                                    <TableHead className='min-w-[150px]'>Delivery Notes</TableHead>
                                    <TableHead>Rider Details</TableHead>
                                    <TableHead className='min-w-[200px]'>Customer Details</TableHead>
                                    <TableHead className='min-w-[150px]'>Delivery Expenses</TableHead>
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
                    </div>
                </div>
            </div>



            {
                data.length === 0 && isFiltered && (
                    <div className='flex flex-col items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'>
                        <Inbox size={60} />
                        <div className='text-[#494949] text-center text-lg font-medium font-manrope max-w-sm text-balance'>No Orders Found</div>
                        <LinkButton href="./orders/new-order">
                            Create New Order
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

export default OrdersTableDelivery;
