import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import { SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import FormError from '@/components/ui/formError';
import { TStockInventoryItem, TStockVariation } from '@/app/(dashboard)/inventory/misc/types/stock';


interface OrderFormStockInventorySelectorProps {
    options: TStockInventoryItem[];
    inventoryId?: number
    setInventoryId: (inventoryId: number) => void;
    isLoadingOptions?: boolean;
    isFetchingOptions: boolean;
    disabled?: boolean;
    hasError: boolean
    errorMessage?: string
    category: string
}

const OrderFormStockInventorySelector: React.FC<OrderFormStockInventorySelectorProps> = ({
    options,
    isLoadingOptions,
    isFetchingOptions,
    disabled,
    inventoryId,
    setInventoryId,
    hasError,
    errorMessage,
    category
}) => {
    // const [selectedVariation, setSelectedVariation] = useState<TStockInventoryItem | null>(null);

    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedInventory, setSelectedInventory] = useState<TStockInventoryItem | null>(null)
    const [selectedVariation, setSelectedVariation] = useState<TStockVariation | null>(null);
    const [filteredOptions, setFilteredOptions] = useState(options);

    const handleInventoryChange = (variation: TStockVariation | null) => {
        setSelectedVariation(variation);
        const selectedOption = options.find(option => option.variations.find(vari => vari.id === variation?.id));
        setInventoryId(selectedOption?.id || 0);

        // setInventoryId(inventory?.id || 0);
    };


    React.useEffect(() => {
        setFilteredOptions(
            options?.filter((option) =>
                option.name.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [searchText, options]);

    const handleSelect = (variation: TStockVariation) => {
        setSelectedVariation(variation);
        const selectedOption = options.find(option => option.variations.find(vari => vari.id === variation.id));
        setSelectedInventory(selectedOption || null);
        handleInventoryChange(variation);
        setOpen(false);
    };



    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <div className="flex flex-col gap-2">
                    <Label className="text-sm text-[#0F172B] font-poppins font-medium">
                        {
                            category == "Cake" ? "Flavour"
                                :
                                category == "Cupcake" ? "Size"
                                    :
                                    category == "Flowers" ? "Colour"
                                        :
                                        "Stock"
                        }
                    </Label>
                    <PopoverTrigger asChild>
                        <Button
                            variant="inputButton"
                            size="inputButton"
                            className={cn(
                                'flex w-full items-center justify-between gap-2 text-left text-sm transition duration-300',
                                isFetchingOptions || isLoadingOptions || disabled && "!text-[#A4A4A4]"
                            )}
                            type='button'
                            role="combobox"
                            aria-expanded={open}
                            disabled={isLoadingOptions || isFetchingOptions || disabled}
                        >
                            <span className="!overflow-hidden text-sm w-full truncate">
                                {
                                    (isLoadingOptions || isFetchingOptions) ?
                                        "Loading options..."
                                        :
                                        options?.length === 0 ?
                                            "No inventory found" :
                                            selectedVariation ?
                                                `${selectedInventory?.name} - ${category == "Cake" ? selectedVariation.flavour : category == "Cupcake" ? selectedVariation.size : category == "Flowers" ? selectedVariation.color : selectedVariation.size}`
                                                :
                                                "Select inventory"
                                }
                            </span>
                            <svg
                                className={cn("ml-2 h-4 w-4 shrink-0 opacity-50", open && "rotate-180")}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Button>
                    </PopoverTrigger>
                    {
                        hasError && <FormError errorMessage={errorMessage} />
                    }
                </div>
                <PopoverContent className="w-full p-0">
                    <div className="relative px-3 py-2">
                        <SearchIcon className="absolute left-4 top-3 h-4 w-4 text-gray-500" />
                        <input
                            className="w-full rounded-md border border-gray-300 bg-transparent py-2 pl-10 pr-4 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Search products..."
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    {
                        (searchText.trim() !== "" && filteredOptions.length === 0) ?
                            <p className="text-xs text-[#8B909A] text-center w-full py-4 col-span-full">
                                No inventory found
                            </p>
                            :
                            <div className="grid grid-cols-2 xl:grid-cols-3 min-w-max h-max min-h-[16rem] max-h-[30rem] overflow-scroll overflow-y-auto">
                                {
                                    filteredOptions?.map((option) => (
                                        <>

                                            {
                                                option.variations.map((variation) => (
                                                    <button
                                                        key={variation.id}
                                                        className={cn(
                                                            'flex flex-col items-center gap-2 p-2 hover:bg-gray-100 transition-colors',
                                                            selectedVariation?.id === variation.id && 'bg-gray-200'
                                                        )}
                                                        onClick={() => handleSelect(variation)}
                                                    >
                                                        <div className="relative bg-white-grey w-[150px] aspect-square rounded-xl">
                                                            {
                                                                typeof option.image_one === 'string' ?
                                                                    <Image
                                                                        src={option.image_one as string}
                                                                        alt={option.name as string}
                                                                        className="w-full h-full object-cover text-xs"
                                                                        fill
                                                                    />
                                                                    :
                                                                    null
                                                            }
                                                        </div>

                                                        <span className="text-xs">{option.name} - {variation.size || variation.color || variation.flavour} {category == "Cake" && "inches"}</span>
                                                    </button>
                                                ))
                                            }

                                        </>
                                    ))
                                }
                            </div>
                    }
                </PopoverContent>
            </Popover>
        </div>

    );
};

export default OrderFormStockInventorySelector;
