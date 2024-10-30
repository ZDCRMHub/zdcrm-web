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
import { LinkButton } from '@/components/ui';

interface StoreProduct {
    productName: string;
    stockQuantity: string;
    costPrice: string;
    lastUpdated: string;
    updatedBy: string;
    image: string;
}

interface StoreRowProps {
    product: StoreProduct;
}

const StoreRow: React.FC<StoreRowProps> = ({ product }) => {
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center space-x-2">
                    <img
                        src={"/img/product.png"}
                        alt={product.productName}
                        className="h-10 w-10 rounded object-cover text-xs bg-gray-300 lowercase"
                    />
                    <span>{product.productName}</span>
                </div>
            </TableCell>
            <TableCell>
                <div className="grid grid-cols-[1fr,max-content] items-center space-x-2">
                    <span>{product.stockQuantity}</span>
                    <div className="relative h-full min-h-6 max-h-16 w-1.5 rounded-full bg-red-100">
                        <div className="absolute h-1/2 bottom-0 min-h-2 max-h-12 w-1.5 rounded-full bg-red-500"></div>
                    </div>
                </div>
            </TableCell>
            <TableCell>{product.costPrice}</TableCell>
            <TableCell>{product.lastUpdated}</TableCell>
            <TableCell>{product.updatedBy}</TableCell>
            <TableCell>
                <LinkButton href="/inventory/details" variant="unstyled" className="" size="sm">
                    {">>"}
                </LinkButton>
            </TableCell>
        </TableRow>
    );
};

const StoreInventory = () => {
    const products: StoreProduct[] = [
        {
            productName: "50 LITERS OF GROUNDNUT OIL",
            stockQuantity: "5",
            costPrice: "₦20,450.00",
            lastUpdated: "6:00PM | Feb. 22nd, 2024",
            updatedBy: "Adefola Hanna",
            image: "/img/oil.png"
        },
        {
            productName: "BAG OF FLOUR",
            stockQuantity: "15",
            costPrice: "₦115,450.00",
            lastUpdated: "6:00PM | Feb. 22nd, 2024",
            updatedBy: "Adefola Hanna",
            image: "/img/flour.png"
        },
        {
            productName: "BUTTER",
            stockQuantity: "15",
            costPrice: "₦115,450.00",
            lastUpdated: "6:00PM | Feb. 22nd, 2024",
            updatedBy: "Adefola Hanna",
            image: "/img/butter.png"
        },
        {
            productName: "BOXES",
            stockQuantity: "30",
            costPrice: "₦115,450.00",
            lastUpdated: "6:00PM | Feb. 22nd, 2024",
            updatedBy: "Adefola Hanna",
            image: "/img/boxes.png"
        },
        {
            productName: "YEAST",
            stockQuantity: "15",
            costPrice: "₦115,450.00",
            lastUpdated: "6:00PM | Feb. 22nd, 2024",
            updatedBy: "Adefola Hanna",
            image: "/img/yeast.png"
        },
        {
            productName: "VEGETABLE OIL",
            stockQuantity: "5",
            costPrice: "₦15,450.00",
            lastUpdated: "6:00PM | Feb. 22nd, 2024",
            updatedBy: "Adefola Hanna",
            image: "/img/vegetable-oil.png"
        }
    ];

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Stock Quantity</TableHead>
                    <TableHead>Cost Price/Unit</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Updated By</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    products.map((product, index) => (
                        <StoreRow
                            key={index}
                            product={product}
                        />
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default StoreInventory;