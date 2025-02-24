import React, { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckIcon, SearchIcon, X, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TFormItemSelectionOption } from "./EnquiryFormItemsSection"
import Image from "next/image"
import FormError from "@/components/ui/formError"

interface StockItemFormEnquiryProps {
  options: TFormItemSelectionOption[]
  onChange: (selectedItems: Array<TFormItemSelectionOption & { quantity: number }>) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  isLoadingOptions?: boolean
  hasError?: boolean
  errorMessage?: string
}

const StockItemFormEnquiry: React.FC<StockItemFormEnquiryProps> = ({
  options,
  onChange,
  label,
  placeholder = "Select products and variations",
  disabled,
  isLoadingOptions,
  hasError,
  errorMessage,
}) => {
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Array<TFormItemSelectionOption & { quantity: number }>>([])
  const [searchText, setSearchText] = useState("")
  const [filteredOptions, setFilteredOptions] = useState(options)

  useEffect(() => {
    setFilteredOptions(options?.filter((option) => option.name.toLowerCase().includes(searchText.toLowerCase())))
  }, [searchText, options])

  const handleSelect = (item: TFormItemSelectionOption) => {
    const existingItemIndex = selectedItems.findIndex((i) => i.id === item.id)
    let newSelectedItems

    if (existingItemIndex > -1) {
      newSelectedItems = selectedItems.filter((i) => i.id !== item.id)
    } else {
      newSelectedItems = [...selectedItems, { ...item, quantity: 1 }]
    }

    setSelectedItems(newSelectedItems)
    onChange(newSelectedItems)
  }

  const handleQuantityChange = (id: number, change: number) => {
    const newSelectedItems = selectedItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change) // Ensure quantity is at least 1
        return { ...item, quantity: newQuantity }
      }
      return item
    })

    setSelectedItems(newSelectedItems)
    onChange(newSelectedItems)
  }

  const getButtonText = () => {
    if (isLoadingOptions) return "Loading options..."
    if (disabled) return "Select a category first"
    if (selectedItems.length === 0) return placeholder
    if (selectedItems.length === 1)
      return `${selectedItems[0].name} - ${selectedItems[0].variation} (${selectedItems[0].quantity})`
    return `${selectedItems.length} items selected`
  }

  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [width, setWidth] = React.useState<string>("100%")

  useEffect(() => {
    if (triggerRef?.current) {
      setWidth(`${triggerRef.current.clientWidth}px`)
    }
  }, [triggerRef?.current?.clientWidth])

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-2">
          {label && <Label className="text-sm text-[#0F172B] font-poppins font-medium">{label}</Label>}
          <PopoverTrigger asChild>
            <Button
              variant="inputButton"
              ref={triggerRef}
              size="inputButton"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between",
                isLoadingOptions && "opacity-50",
                (isLoadingOptions || disabled) && "!text-[#A4A4A4]",
              )}
              disabled={disabled}
            >
              {getButtonText()}
              <svg
                className={cn("ml-2 h-4 w-4 shrink-0 opacity-50", open && "rotate-180")}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent
          className={cn("w-full overflow-hidden min-w-[1000px] max-w-[1400px]", triggerRef?.current && `min-w-max`)}
        >
          <div className="relative px-3 py-2 mb-4">
            <SearchIcon className="absolute left-4 top-3 h-4 w-4 text-gray-500" />
            <input
              className="w-full rounded-md border border-gray-300 bg-transparent py-2 pl-10 pr-4 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search products..."
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 min-w-max h-max min-h-[16rem] max-h-[30rem] overflow-scroll overflow-y-auto">
            {filteredOptions?.map((option) => (
              <button
                className={cn(
                  "text-xs text-[#194A7A] relative flex !flex-col select-none items-center rounded-2xl p-2 outline-none aria-selected:bg-blue-100/70 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  "text-sm min-w-[150px] min-h-[150px] w-max",
                  selectedItems.some((i) => i.id === option.id) && "bg-custom-blue !text-white",
                )}
                key={option.id}
                onClick={() => handleSelect(option)}
              >
                <div className={cn("relative bg-white-grey w-[150px] aspect-square rounded-xl")}>
                  {typeof option.product_image === "string" ? (
                    <Image
                      src={(option.product_image as string) || "/placeholder.svg"}
                      alt={option.name as string}
                      className="w-full h-full object-cover text-xs rounded-xl"
                      fill
                    />
                  ) : null}
                </div>
                <p className="text-[0.75rem] pt-1.5 max-w-[130px]">{`${option.variation} - ${option.name}`}</p>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <div key={item.id} className="flex items-center gap-1 rounded-md bg-custom-blue text-white px-3 py-1 text-sm">
            <span>{`${item.name} - ${item.variation}`}</span>
            <div className="flex items-center ml-2">
              <button className="text-white hover:text-gray-300" type="button" onClick={() => handleQuantityChange(item.id, -1)}>
                <Minus className="h-3 w-3" />
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button className="text-white hover:text-gray-300" type="button" onClick={() => handleQuantityChange(item.id, 1)}>
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button className="ml-2 text-white hover:text-red-500" type="button" onClick={() => handleSelect(item)}>
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      {hasError && <FormError errorMessage={errorMessage} />}
    </div>
  )
}

export default StockItemFormEnquiry

