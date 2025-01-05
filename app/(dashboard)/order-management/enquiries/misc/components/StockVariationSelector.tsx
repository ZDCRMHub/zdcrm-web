import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CheckIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TStockInventoryItem, TStockVariation } from '@/app/(dashboard)/inventory/misc/types/stock';

interface StockVariationSelectorProps {
  inventory: TStockInventoryItem | null;
  onChange: (variation: TStockVariation[]) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  isLoadingOptions?: boolean;
}

const StockVariationSelector: React.FC<StockVariationSelectorProps> = ({
  inventory,
  onChange,
  label,
  placeholder = "Select variations",
  disabled,
  isLoadingOptions
}) => {
  const [open, setOpen] = useState(false);
  const [selectedVariations, setSelectedVariations] = useState<TStockVariation[]>([]);

  useEffect(() => {
    setSelectedVariations([]);
  }, [inventory]);

  const handleSelect = (variation: TStockVariation) => {
    const newSelectedVariations = selectedVariations.some(v => v.id === variation.id)
      ? selectedVariations.filter(v => v.id !== variation.id)
      : [...selectedVariations, variation];
    setSelectedVariations(newSelectedVariations);
    onChange(newSelectedVariations);
  };

  const getButtonText = () => {
    if (isLoadingOptions) return "Loading options...";
    if (disabled) return "Select a stock inventory first";
    if (selectedVariations.length === 0) return placeholder;
    if (selectedVariations.length === 1) return `${selectedVariations[0].size || selectedVariations[0].color || selectedVariations[0].flavour}`;
    return `${selectedVariations.length} variations selected`;
  };



  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [width, setWidth] = React.useState<string>("50%")
  React.useEffect(() => {
    if (triggerRef?.current) {
      setWidth(`${triggerRef.current.clientWidth}px`)
    }
  }, [triggerRef?.current?.clientWidth])


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
              ref={triggerRef}
              size="inputButton"
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between", isLoadingOptions && "opacity-50", isLoadingOptions || disabled && "!text-[#A4A4A4]")}
              disabled={!inventory || disabled}
            >
              {getButtonText()}
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
        <PopoverContent className={cn("p-0 overflow-hidden", triggerRef?.current && `min-w-max`)} style={{ width }} >
          <div className="max-h-96 overflow-y-auto">
            {inventory?.variations.map((variation) => (
              <button
                key={variation.id}
                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                onClick={() => handleSelect(variation)}
              >
                <span>{variation.size || variation.color || variation.flavour}</span>
                {selectedVariations.some(v => v.id === variation.id) && (
                  <CheckIcon className="h-4 w-4 text-custom-blue" />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedVariations.map((variation) => (
          <div
            key={variation.id}
            className="flex items-center gap-1 rounded-md bg-custom-blue text-white px-3 py-1 text-sm"
          >
            <span>{variation.size || variation.color || variation.flavour}</span>
            <button
              className="ml-1 text-white hover:text-red-500"
              onClick={() => handleSelect(variation)}
            >
                      <X className="h-3 w-3" />
              
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockVariationSelector;
