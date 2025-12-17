import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Button, LinkButton, Spinner } from '@/components/ui';
import { format, formatDate } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TInvetoryHistoryItem } from '../api/getProductInvetoryHistory';



interface OrderRowProps {
    product: TInvetoryHistoryItem;
}

const OrderRow: React.FC<OrderRowProps> = ({ product }) => {
    return (
        <TableRow>
            <TableCell className="">{formatDate(
                new Date(product.create_date),
                'dd/MMM/yyyy'
            )}</TableCell>
            <TableCell className="">{product.action_display}</TableCell>
            <TableCell className="">{product.quantity_before}</TableCell>
            <TableCell className="">{product.quantity_changed.toString().includes("-") ? 0 : product.quantity_changed}</TableCell>
            <TableCell className="">{product.quantity_changed.toString().includes("-") ? product.quantity_changed : 0}</TableCell>
            <TableCell className="">{product.quantity_after}</TableCell>
            <TableCell className="">{product.order_number || "-"}</TableCell>
            <TableCell className="">{product.updated_by.name}</TableCell>


        </TableRow>
    );
};


interface ProductsInventoryHistoryTableTableProps {
    data?: TInvetoryHistoryItem[];
    isLoading: boolean;
    isFetching: boolean
    error: unknown;
}
const ProductsInventoryHistoryTable: React.FC<ProductsInventoryHistoryTableTableProps> = ({ data, isLoading, isFetching, error }) => {
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
                <div className={cn('overflow-hidden rounded-full mb-1 grow')}>
                    <div className={cn("bg-[#F8F9FB] h-1 w-full overflow-hidden", isFetching && !isLoading && 'bg-blue-200')}>
                        <div className={cn("h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary opacity-0 transition-opacity", isFetching && !isLoading && 'opacity-100')}></div>
                    </div>
                </div>
                <section className='flex items-center gap-2 shrink-0 px-5'>
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
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type of Stock Update</TableHead>
                                <TableHead>Quantity Before</TableHead>
                                <TableHead>Quantity In</TableHead>
                                <TableHead>Quantity Out</TableHead>
                                <TableHead>Quantity After</TableHead>
                                <TableHead>Order Number</TableHead>
                                <TableHead>Staff Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data?.map((product) => (
                                    <OrderRow
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            }
                            {
                                !isLoading && data?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            No history found
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ProductsInventoryHistoryTable;
