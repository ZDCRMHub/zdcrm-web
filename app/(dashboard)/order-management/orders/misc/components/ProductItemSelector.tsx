import React, { useState } from 'react';

import { TProductInventoryItem } from '@/app/(dashboard)/inventory/misc/types/products';
import ProductInventorySelector from './ProductInventorySelector';

interface ProductItemSelectorProps {
    options: TProductInventoryItem[];
    setInventoryId: (inventoryId: number) => void;
    isLoadingOptions?: boolean;
    isFetchingOptions: boolean;
    disabled?: boolean;
}

const ProductItemSelector: React.FC<ProductItemSelectorProps> = ({
    options,
    isLoadingOptions,
    isFetchingOptions,
    disabled,
    setInventoryId,
}) => {
    const [selectedInventory, setSelectedInventory] = useState<TProductInventoryItem | null>(null);

    const handleInventoryChange = (inventory: TProductInventoryItem | null) => {
        setSelectedInventory(inventory);
        setInventoryId(inventory?.id || 0);
    };

   

    return (
        <>
            <ProductInventorySelector
                options={options}
                onChange={handleInventoryChange}
                label="Select Inventory"
                placeholder="Choose a product"
                isLoadingOptions={isLoadingOptions}
                isFetchingOptions={isFetchingOptions}
                disabled={disabled}
            />
           
        </>
    );
};

export default ProductItemSelector;
