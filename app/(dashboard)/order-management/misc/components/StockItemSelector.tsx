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
}

const StockItemSelector: React.FC<StockItemSelectorProps> = ({
    options,
    isLoadingOptions,
    isFetchingOptions,
    disabled,
    setInventoryId,
    inventoryId,
    setVariations
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
                isFetchingOptions={isFetchingOptions}
                disabled={disabled}
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
