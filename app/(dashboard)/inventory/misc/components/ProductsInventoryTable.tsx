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
import { LinkButton, Spinner } from '@/components/ui';
import { TProductInventoryItem } from '../types/products';



interface OrderRowProps {
    product: TProductInventoryItem;
}

const OrderRow: React.FC<OrderRowProps> = ({ product }) => {
    return (
        <TableRow>
            <TableCell>{product.id}</TableCell>
            <TableCell className="uppercase">{product.category.name}</TableCell>
            <TableCell>
                <div className="flex items-center space-x-2">
                    <img
                        src={"/img/cake.png"}
                        alt={product.name}
                        className="h-10 w-10 rounded object-cover text-xs bg-gray-300 lowercase"
                    />
                    <span>{product.name}</span>
                </div>
            </TableCell>
            <TableCell>
                <div className="grid grid-cols-[1fr,max-content] items-center space-x-2">
                    <span>{product.inventory_number}</span>
                    <div className="relative h-full min-h-6 max-h-16 w-1.5 rounded-full bg-red-100">
                        <div className="absolute h-1/2 bottom-0 min-h-2 max-h-12 w-1.5 rounded-full bg-red-500"></div>
                    </div>
                </div>
            </TableCell>
            <TableCell>{product.cost_price}</TableCell>
            <TableCell>{new Date(product.update_date).toLocaleDateString()}</TableCell>

            <TableCell>
                <LinkButton href="/inventory/details" variant="unstyled" className="" size="sm">
                    {">>"}
                </LinkButton>
            </TableCell>
        </TableRow>
    );
};


interface ProductsInventoryTableProps {
    data?: TProductInventoryItem[];
    isLoading: boolean;
    isFetching: boolean
    error: unknown;
}
const ProductsInventory: React.FC<ProductsInventoryTableProps> = ({ data, isLoading, isFetching, error }) => {
    if (isLoading) return <div className='flex items-center justify-center w-full h-full min-h-[50vh] py-[10vh]'><Spinner/></div>;
    if (error) return <div>Error fetching data</div>;
    if (!data) return null;


    return (
        <div className="w-full md:w-[95%] max-w-[1792px] px-8">
            <div
                className={cn(
                    'overflow-hidden rounded-full mt-3 mb-1',
                )}
            >
                <div className={cn("bg-[#F8F9FB] h-1 w-full overflow-hidden",
                    isFetching && !isLoading && 'bg-primary/20'
                )}>

                    <div className={cn("h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary opacity-0 transition-opacity", isFetching && !isLoading && 'opacity-100')}></div>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product ID</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Stock Quantity</TableHead>
                        <TableHead>Cost Price/Unit</TableHead>
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
    )
}

export default ProductsInventory;
