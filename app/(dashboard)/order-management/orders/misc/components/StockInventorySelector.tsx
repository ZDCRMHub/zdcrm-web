import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TStockInventoryItem } from '@/app/(dashboard)/inventory/misc/types/stock';
import Image from 'next/image';

interface StockInventorySelectorProps {
    options: TStockInventoryItem[];
    onChange: (selectedInventory: TStockInventoryItem | null) => void;
    label?: string;
    placeholder?: string;
    isLoadingOptions?: boolean;
    isFetchingOptions: boolean;
    disabled?: boolean;
}

const StockInventorySelector: React.FC<StockInventorySelectorProps> = ({
    options,
    onChange,
    label,
    placeholder = "Select a product",
    isLoadingOptions,
    isFetchingOptions,
    disabled,
}) => {
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedInventory, setSelectedInventory] = useState<TStockInventoryItem | null>(null);
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
        setFilteredOptions(
            options?.filter((option) =>
                option.name.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [searchText, options]);

    const handleSelect = (inventory: TStockInventoryItem) => {
        setSelectedInventory(inventory);
        onChange(inventory);
        setOpen(false);
    };

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <div className="flex flex-col gap-2">
                    {label && (
                        <Label className="text-sm text-[#0F172B] font-poppins font-medium">
                            {label}
                        </Label>
                    )}
                    <PopoverTrigger asChild>
                        <Button
                            variant="inputButton"
                            size="inputButton"
                            className={cn(
                                'flex w-full items-center justify-between gap-2 text-left text-sm transition duration-300',
                                isLoadingOptions || disabled && "!text-[#A4A4A4]"
                            )}
                            type='button'
                            role="combobox"
                            aria-expanded={open}
                            disabled={isLoadingOptions || isFetchingOptions || disabled}
                        >
                            {
                                (isLoadingOptions || isFetchingOptions) ?
                                    "Loading options..."
                                    :
                                    options.length === 0 ?
                                        "No inventory found" :
                                        selectedInventory ?
                                            selectedInventory.name
                                            :
                                            placeholder
                            }
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
                    <div className="grid grid-cols-2 xl:grid-cols-3 min-w-max h-max min-h-[16rem] max-h-[30rem] overflow-scroll overflow-y-auto">
                        {filteredOptions?.map((option) => (
                            <button
                                className={cn("text-xs relative flex !flex-col select-none items-center rounded-md p-4 outline-none aria-selected:bg-blue-100/70 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                    "text-sm min-w-[150px] aspect-square w-max"
                                )}
                                key={option.id}

                                onClick={() => handleSelect(option)}

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
                                <p className="text-[0.75rem] text-[#194A7A] pt-3 max-w-[130px]">
                                    {option.name}
                                </p>
                            </button>
                            // <button
                            //     key={option.id}
                            //     className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                            //     onClick={() => handleSelect(option)}
                            // >
                            //     <div className="mr-3 h-8 w-8 overflow-hidden rounded-full">
                            //         <Image
                            //             src={option.image_one || "/placeholder.svg"}
                            //             alt={option.name}
                            //             width={32}
                            //             height={32}
                            //         />
                            //     </div>
                            //     {option.name}
                            // </button>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default StockInventorySelector;

