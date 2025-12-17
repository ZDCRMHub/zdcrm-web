import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FilterSearch, Tag } from 'iconsax-react';
import { Check, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

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
import { convertNumberToNaira, formatCurrency } from '@/utils/currency';
import { Button, Checkbox, ConfirmActionModal, LinkButton, Spinner } from '@/components/ui';
import { useBooleanStateControl, useDebounce } from '@/hooks';
import { convertKebabAndSnakeToTitleCase } from '@/utils/strings';
import { useQueryClient } from '@tanstack/react-query';

import OrderDetailSheetPayments from './OrderDetailSheetPayments';
import { TOrder } from '../types';
import { useUpdatePaymentVerified } from '../api';
import { extractErrorMessage } from '@/utils/errors';

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
};

interface OrderRowProps {
    order: TOrder;
}
const paymentStatusEnums = {
    'FP': 'Full Payment',
    'PP': 'Part Payment',
    'UP': 'Unpaid',
}


const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
    const {
        state: isSheetOpen,
        toggle: toggleSheet,
        setFalse: closeSheet,
        setTrue: openSheet,
    } = useBooleanStateControl()
    const {
        state: isConfirmPaymentVerificationModalOpen,
        setFalse: closeConfirmPaymentVerificationModal,
        setTrue: openConfirmPaymentVerificationModal,
    } = useBooleanStateControl()


    const { mutate, isPending } = useUpdatePaymentVerified(order.id);
    const queryClient = useQueryClient();
    const handlePaymentVerifiedStatus = () => {
        mutate({ id: order.id, payment_verified: !order?.payment_verified }, {
            onSuccess: () => {
                console.log('Order payment status updated successfully');
                queryClient.invalidateQueries({
                    queryKey: ['active-orders-list']
                });
                closeConfirmPaymentVerificationModal();
            },
            onError(error) {
                const errMsg = extractErrorMessage(error as unknown as any);
                toast.error(errMsg);
            },
        });
    }


    return (
        <TableRow>
            <TableCell className='min-w-[150px]'>
                <div>{order.order_number}</div>
                <div className='text-[0.825rem] text-gray-500 truncate'>{order.created_by.name}</div>
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
            <TableCell className='min-w-max'>
                <Badge
                    className={cn(
                        statusColors[order.payment_options || 'not_paid_go_ahead'] || 'bg-gray-100 text-gray-800 w-full text-center min-w-max',
                        'rounded-md w-max'
                    )}
                >
                    {convertKebabAndSnakeToTitleCase(order.payment_options)}
                </Badge>
            </TableCell>
            <TableCell className='min-w-max'>
                <div className='font-bold'>{convertNumberToNaira(Number(order.total_amount) || 0)}</div>
                <div className='text-sm text-[#494949]'>{paymentStatusEnums[order.payment_status as keyof typeof paymentStatusEnums] || 'Unknown Status'}</div>
            </TableCell>
            <TableCell className='min-w-max font-bold'>
                {
                    !!order.amount_paid_in_usd ? formatCurrency(order.amount_paid_in_usd, 'USD') : 'N/A'
                }
            </TableCell>

            <TableCell className=' uppercase'>
                <div className="flex items-center gap-1.5">
                    <div
                        className="flex items-center justify-center h-6 w-6 shrink-0 rounded-lg border-2 border-blue-600 cursor-pointer "
                        onClick={openConfirmPaymentVerificationModal}
                    >
                        {
                            order.payment_verified && <div className="flex items-center justify-center text-current !bg-transparent">
                                <Check className={cn("h-4 w-4 stroke-[3] text-blue-600")} />

                            </div>
                        }
                    </div>

                    {
                        isPending &&
                        <Spinner size={16} />
                    }
                </div>
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


            <ConfirmActionModal
                isModalOpen={isConfirmPaymentVerificationModalOpen}
                closeModal={closeConfirmPaymentVerificationModal}
                subheading={order.payment_verified ? 'Unverifying payment will remove the verification status from this order.' : 'Verifying payment will add the verification status to this order.'}
                confirmFn={handlePaymentVerifiedStatus}
                isConfirming={isPending}
                cancelAction={closeConfirmPaymentVerificationModal}
                heading='Confirm Payment Verification'
                customConfirmText={order.payment_verified ? 'Unverify Payment' : 'Verify Payment'}
            />
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
    const tableRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkForScrolling = useCallback(() => {
        requestAnimationFrame(() => {
            if (tableRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
            }
        });
    }, []);

    useEffect(() => {
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

    useEffect(() => {
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
        <div className="relative">
            <div className="flex items-center gap-4 h-3">
                <div className={cn('overflow-hidden rounded-full mb-1 grow')}>
                    <div className={cn("bg-[#F8F9FB] h-1 w-full overflow-hidden", isFetching && !isLoading && 'bg-blue-200')}>
                        <div className={cn("h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary opacity-0 transition-opacity", isFetching && !isLoading && 'opacity-100')}></div>
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

            <div ref={tableRef} className="overflow-auto max-h-[600px] noscrollbar">
                <div className="md:rounded-lg">
                    <Table>
                        <TableHeader className="sticky top-0 bg-grey-1 z-10">
                            <TableRow>
                                <TableHead className='min-w-[150px]'>Order ID</TableHead>
                                <TableHead className='min-w-[200px] max-w-[500px]'>Customers Details</TableHead>
                                <TableHead className='min-w-[230px]'>Order Items</TableHead>
                                <TableHead className='min-w-[180px]'>Payment Mode</TableHead>
                                <TableHead className='min-w-[150px]'>Amount</TableHead>
                                <TableHead>Amount(USD)</TableHead>
                                <TableHead className='min-w-[175px] max-w-[500px]'>Payment Confirmed</TableHead>
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

export default OrdersTablePayments;
