import React, { useState } from 'react';
import { TStockInventoryItem, TStockVariation } from '@/app/(dashboard)/inventory/misc/types/stock';
import StockInventorySelector from './StockInventorySelector';
import StockVariationSelector from './StockVariationSelector';

interface StockItemSelectorProps {
    options: TStockInventoryItem[];
    inventoryId?: number
    setInventoryId: (inventoryId: number) => void;
    setVariations: (variations: {
        stock_variation_id: number;
        quantity: number;
    }[]) => void;
    isLoadingOptions?: boolean;
    isFetchingOptions: boolean;
    disabled?: boolean;
    hasError: boolean
    errorMessage?:string
}

const StockItemSelector: React.FC<StockItemSelectorProps> = ({
    options,
    isLoadingOptions,
    isFetchingOptions,
    disabled,
    setInventoryId,
    inventoryId,
    setVariations,
    hasError,
    errorMessage
}) => {
    const [selectedInventory, setSelectedInventory] = useState<TStockInventoryItem | null>(null);
    const [selectedVariations, setSelectedVariations] = useState<TStockVariation[]>([]);

    const handleInventoryChange = (inventory: TStockInventoryItem | null) => {
        setSelectedInventory(inventory);
        setSelectedVariations([]);
        setInventoryId(inventory?.id || 0);
    };

    const handleVariationsChange = (variations: TStockVariation[]) => {
        const formattedVariations = variations.map(variation => ({
            stock_variation_id: variation.id,
            quantity: 1
        }));
        setSelectedVariations(variations);
        setVariations(formattedVariations);
    };

    return (
        <>
            <StockInventorySelector
                options={options}
                onChange={handleInventoryChange}
                label="Select Inventory"
                placeholder="Choose a product"
                isLoadingOptions={isLoadingOptions}
                isFetchingOptions={isFetchingOptions && !!inventoryId}
                disabled={disabled}
                hasError={hasError}
                errorMessage={errorMessage}
            />
            <StockVariationSelector
                isLoadingOptions={isLoadingOptions}
                inventory={selectedInventory}
                onChange={handleVariationsChange}
                label="Select Variations"
                placeholder="Choose variations"
                disabled={disabled || !selectedInventory}
            />
        </>
    );
};

export default StockItemSelector;
