import React, { useState } from 'react';

import { TProductInventoryItem } from '@/app/(dashboard)/inventory/misc/types/products';
import ProductInventorySelector from './ProductInventorySelector';

interface ProductItemSelectorProps {
    options: TProductInventoryItem[];
    inventoryId?: number
    setInventoryId: (inventoryId: number) => void;
    isLoadingOptions?: boolean;
    isFetchingOptions: boolean;
    disabled?: boolean;
    hasError: boolean
    errorMessage?: string
}

const ProductItemSelector: React.FC<ProductItemSelectorProps> = ({
    options,
    isLoadingOptions,
    isFetchingOptions,
    disabled,
    setInventoryId,
    inventoryId,
    hasError,
    errorMessage
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
                isFetchingOptions={isFetchingOptions && !!inventoryId}
                isLoadingOptions={isLoadingOptions}
                disabled={disabled}
                hasError={hasError}
                errorMessage={errorMessage}
            />

        </>
    );
};

export default ProductItemSelector;
