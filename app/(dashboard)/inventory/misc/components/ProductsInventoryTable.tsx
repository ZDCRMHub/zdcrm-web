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



interface InventoryProduct {
    productId: string
    category: string
    productName: string
    stockQuantity: string
    costPrice: string
    lastUpdated: string
    image: string
}

interface OrderRowProps {
    product: InventoryProduct;
}

const OrderRow: React.FC<OrderRowProps> = ({ product }) => {
    return (
        <TableRow>
            <TableCell>{product.productId}</TableCell>
            <TableCell className="uppercase">{product.category}</TableCell>
            <TableCell>
                <div className="flex items-center space-x-2">
                    <img
                        src={"/img/cake.png"}
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
            <TableCell>
                <LinkButton href="/inventory/details" variant="unstyled" className="" size="sm">
                    {">>"}
                </LinkButton>
            </TableCell>
        </TableRow>
    );
};

const ProductsInventory = () => {
    const products: InventoryProduct[] = [
        {
            productId: "PF/LM6765",
            category: "WINE",
            productName: "SANARA RED WINE",
            stockQuantity: "3 In Stock",
            costPrice: "₦20,450.00",
            lastUpdated: "22nd, Oct. 2024",
            image: "/placeholder.svg?height=40&width=40"
        },
        {
            productId: "PF/LM6765",
            category: "WINE",
            productName: "SANARA RED WINE",
            stockQuantity: "3 In Stock",
            costPrice: "₦20,450.00",
            lastUpdated: "22nd, Oct. 2024",
            image: "/placeholder.svg?height=40&width=40"
        },
        {
            productId: "PF/LM6765",
            category: "WINE",
            productName: "SANARA RED WINE",
            stockQuantity: "3 In Stock",
            costPrice: "₦20,450.00",
            lastUpdated: "22nd, Oct. 2024",
            image: "/placeholder.svg?height=40&width=40"
        },
        {
            productId: "PF/LM6765",
            category: "WINE",
            productName: "MOET & CHANDON BRUT",
            stockQuantity: "20 In Stock",
            costPrice: "₦115,450.00",
            lastUpdated: "22nd, Oct. 2024",
            image: "/placeholder.svg?height=40&width=40"
        },
        {
            productId: "ZD/LI6765",
            category: "TEDDY BEAR",
            productName: "160CM LIFE SIZED TEDDY",
            stockQuantity: "3 In Stock",
            costPrice: "₦115,450.00",
            lastUpdated: "22nd, Oct. 2024",
            image: "/placeholder.svg?height=40&width=40"
        },
        {
            productId: "PF/LM6765",
            category: "GIFT",
            productName: "CLASSIC HAPPY BIRTHDAY BALLOON",
            stockQuantity: "3 In Stock",
            costPrice: "₦11,450.00",
            lastUpdated: "22nd, Oct. 2024",
            image: "/placeholder.svg?height=40&width=40"
        },
        {
            productId: "PF/LM6765",
            category: "FLOWER",
            productName: "ROSES",
            stockQuantity: "20 In Stock",
            costPrice: "₦115,450.00",
            lastUpdated: "22nd, Oct. 2024",
            image: "/placeholder.svg?height=40&width=40"
        },
        {
            productId: "ZD/LC6765",
            category: "GIFT",
            productName: "GREETING CARD",
            stockQuantity: "20 In Stock",
            costPrice: "₦15,450.00",
            lastUpdated: "22nd, Oct. 2024",
            image: "/placeholder.svg?height=40&width=40"
        },
        {
            productId: "ZD/LC6765",
            category: "WINE",
            productName: "SANARA RED WINE",
            stockQuantity: "20 In Stock",
            costPrice: "₦115,450.00",
            lastUpdated: "22nd, Oct. 2024",
            image: "/placeholder.svg?height=40&width=40"
        }
    ]


    return (
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
                    products.map((product, index) => (
                        <OrderRow
                            key={index}
                            product={product}
                        />
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default ProductsInventory;
