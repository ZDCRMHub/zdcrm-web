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
import { TProductInventoryItem } from '../types/products';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';



interface OrderRowProps {
    product: TProductInventoryItem;
}

const OrderRow: React.FC<OrderRowProps> = ({ product }) => {
    return (
        <>
            {product.variations.map((variation, index) => (
                <TableRow key={`${product.id}-${index}`}>
                    {
                        index === 0 && (
                            <>
                                <TableCell rowSpan={product.variations.length}>
                                    {product.id}
                                </TableCell>
                                <TableCell rowSpan={product.variations.length} className="uppercase">
                                    {product.category.name}
                                </TableCell>
                                <TableCell rowSpan={product.variations.length}>
                                    <div className="flex products-center space-x-2">
                                        <img
                                            src={product.image_one || "/img/cake.png"}
                                            alt={"product image"}
                                            className="h-10 w-10 rounded object-cover text-[0.65rem] leading-tight bg-gray-300 lowercase"
                                        />
                                        <span>{product.name}</span>
                                    </div>
                                </TableCell>
                            </>
                        )
                    }
                    <TableCell>
                        {
                            (variation.size ? variation.size : variation.size)

                        }
                    </TableCell>
                    <TableCell>
                        <div className="grid grid-cols-[1fr,max-content] products-center space-x-2">
                            <span>{variation.quantity} In Stock</span>
                            {variation.quantity <= 5 ? (
                                <div className="relative h-full min-h-6 max-h-16 w-1.5 rounded-full bg-red-100">
                                    <div className="absolute h-1/2 bottom-0 min-h-2 max-h-12 w-1.5 rounded-full bg-red-500"></div>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </TableCell>
                    <TableCell>
                        {variation.quantity_sold}
                    </TableCell>
                    <TableCell>{format(product.update_date, 'dd-MMM-yyyy')}</TableCell>
                    <TableCell>
                        <LinkButton
                            href={`/inventory/products/${product.id}?variation=${variation.id}`}
                            variant="unstyled"
                            className=""
                            size="sm"
                        >
                            {">>"}
                        </LinkButton>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};


interface ProductsInventoryTableProps {
    data?: TProductInventoryItem[];
    isLoading: boolean;
    isFetching: boolean
    error: unknown;
}
const ProductsInventory: React.FC<ProductsInventoryTableProps> = ({ data, isLoading, isFetching, error }) => {
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

    if (isLoading) return <div className='flex products-center justify-center w-full h-full min-h-[50vh] py-[10vh]'><Spinner /></div>;
    if (error) return <div>Error fetching data</div>;
    if (!data) return null;


    return (
        <div className="relative h-[93%]">
            <div className="flex products-center gap-4 h-3">
                <div className={cn('overflow-hidden rounded-full mb-1 grow')}>
                    <div className={cn("bg-[#F8F9FB] h-1 w-full overflow-hidden", isFetching && !isLoading && 'bg-blue-200')}>
                        <div className={cn("h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary opacity-0 transition-opacity", isFetching && !isLoading && 'opacity-100')}></div>
                    </div>
                </div>
                <section className='flex products-center gap-2 shrink-0 px-5 -translate-y-full'>
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
                                <TableHead>Product ID</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Variation</TableHead>
                                <TableHead>Stock Quantity</TableHead>
                                <TableHead>Quantity Sold</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead></TableHead>
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
                                            No products found
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

export default ProductsInventory;
