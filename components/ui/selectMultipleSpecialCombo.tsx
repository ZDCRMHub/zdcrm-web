import * as React from "react"
import { CheckIcon, SearchIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings"
import { SmallSpinner } from "@/icons/core"
import { Button, Command, CommandGroup, CommandItem } from "."
import { Popover, PopoverContent, PopoverTrigger } from "."
import { Label } from "./label"
import FormError from "./formError"

interface SelectProps<T extends Record<string, any>> {
  value: string[];
  onChange: (value: string[]) => void;
  options: T[] | undefined;
  name: string;
  hasError?: boolean;
  errorMessage?: string;
  label?: string | React.ReactNode;
  placeholder: string;
  className?: string;
  containerClass?: string;
  labelClass?: string;
  itemClass?: string;
  fullWidth?: boolean;
  withIcon?: boolean;
  isLoadingOptions?: boolean;
  triggerColor?: string;
  valueKey: keyof T;
  labelKey: keyof T;
  maxSelections?: number;
  placeHolderClass?: string;
}

const SelectMultiCombo = <T extends Record<string, any>>({
  value = [],
  onChange,
  options,
  hasError,
  errorMessage,
  label,
  name,
  placeholder,
  className,
  containerClass,
  labelClass,
  itemClass,
  fullWidth,
  withIcon,
  isLoadingOptions,
  valueKey,
  labelKey,
  triggerColor,
  maxSelections,
  placeHolderClass,
}: SelectProps<T>) => {
  const [open, setOpen] = React.useState(false)
  const [optionsToDisplay, setOptionsToDisplay] = React.useState<T[] | undefined>(options)
  const [searchText, setSearchText] = React.useState<string>("")

  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [width, setWidth] = React.useState<string>("50%")

  React.useEffect(() => {
    if (searchText) {
      const filteredOptions = options?.filter(option => {
        const optionLabel = String(option[labelKey]).toLowerCase();
        return optionLabel.includes(searchText.toLowerCase());
      });
      setOptionsToDisplay(filteredOptions);
    } else {
      setOptionsToDisplay(options);
    }
  }, [searchText, options, labelKey])

  React.useEffect(() => {
    if (triggerRef?.current) {
      setWidth(`${triggerRef.current.clientWidth}px`)
    }
  }, [triggerRef?.current?.clientWidth])

  const getOptionLabel = (optionValue: string) => {
    const option = options?.find(opt => String(opt[valueKey]) === optionValue);
    return option ? String(option[labelKey]) : '';
  }

  const handleSelect = (currentValue: string) => {
    const newValue = value.includes(currentValue)
      ? value.filter(v => v !== currentValue)
      : maxSelections && value.length >= maxSelections
        ? value
        : [...value, currentValue];

    onChange(newValue);
  }

  const removeValue = (valueToRemove: string) => {
    onChange(value.filter(v => v !== valueToRemove));
  }

  const isMaxSelected = maxSelections ? value.length >= maxSelections : false;

  return (
    <div className={cn("inputdiv", withIcon && "withicon", containerClass)}>
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-2">
          {label && (
            <Label className="text-sm text-[#0F172B] font-poppins font-medium" htmlFor={name || "gbo"}>
              {label}
            </Label>
          )}

          <div className="flex flex-col gap-2">
            <PopoverTrigger asChild>
              <Button
                variant="inputButton"
                size="inputButton"
                className={cn(
                  'flex w-full items-center justify-between gap-2 text-left text-sm transition duration-300',
                  className
                )}
                type="button"
                role="combobox"
                onClick={() => setOpen(!open)}
                ref={triggerRef}
              >
                <span className={cn(
                  '!overflow-hidden text-sm w-full font-normal',
                  value.length ? '' : '!text-[#A4A4A4]',
                  placeHolderClass
                )}>
                  {value.length > 0
                    ? getOptionLabel(value[0])
                    : placeholder}
                </span>
                <svg
                  className={cn("ml-2 shrink-0 opacity-70 transition-transform duration-300", open && "rotate-180")}
                  fill="none"
                  height={7}
                  viewBox="0 0 12 7"
                  width={12}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={cn('fill-label-text')}
                    clipRule="evenodd"
                    d="M8.357 5.522a3.333 3.333 0 0 1-4.581.126l-.133-.126L.41 2.089A.833.833 0 0 1 1.51.84l.078.07L4.82 4.342c.617.617 1.597.65 2.251.098l.106-.098L10.411.91a.833.833 0 0 1 1.248 1.1l-.07.079-3.232 3.433Z"
                    fill={triggerColor || "#032282"}
                    fillRule="evenodd"
                  />
                </svg>
              </Button>
            </PopoverTrigger>

            {value.length > 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {value.slice(1).map((value) => (
                  <span
                    key={value}
                    className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {getOptionLabel(value)}
                    <button
                      onClick={() => removeValue(value)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <PopoverContent className={cn("p-0", triggerRef?.current && `min-w-max`)} style={{ width }}>
            <Command>
              <div className="relative px-6">
                <SearchIcon className="absolute top-1/2 left-2 -translate-y-1/2 text-[#032282] h-4 w-4" />
                <input
                  className="focus:!ring-0 !ring-0 bg-transparent pl-5 p-3 !outline-none text-sm placeholder:text-[#86898ec7] border-b border-[#E6E6E6] w-full rounded-none"
                  placeholder={placeholder || "Search"}
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <CommandGroup className="flex flex-col gap-3 px-5">
                {isLoadingOptions && (
                  <CommandItem className="flex items-center justify-center gap-2 text-main-solid py-2 font-medium" value={"loading"} disabled>
                    <SmallSpinner color='#000000' /> Loading options...
                  </CommandItem>
                )}
                {!isLoadingOptions && options && options?.length > 0 ? (
                  optionsToDisplay?.map((option, index) => {
                    const thisValue = String(option[valueKey]);
                    const isSelected = value.includes(thisValue);
                    const isDisabled = !isSelected && isMaxSelected;

                    return (
                      <button
                        className={cn(
                          "grid grid-cols-[max-content_1fr] text-xs relative flex select-none items-center rounded-md px-3 py-2 outline-none",
                          "hover:bg-blue-100 w-full text-sm",
                          "py-2 my-1 hover:!bg-primary hover:!text-white cursor-pointer rounded-lg border hover:border-transparent",
                          isDisabled && "opacity-50 cursor-not-allowed hover:!bg-transparent hover:!text-current",
                          itemClass
                        )}
                        key={index}
                        onClick={() => !isDisabled && handleSelect(thisValue)}
                        disabled={isDisabled}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option[labelKey] as string}
                      </button>
                    );
                  })
                ) : (
                  <CommandItem className={cn("text-[0.8125rem]", isLoadingOptions && "!hidden", itemClass)} value={""} disabled>
                    There&apos;s no option to select from
                  </CommandItem>
                )}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </div>
      </Popover>

      {hasError && errorMessage && (
        <FormError errorMessage={errorMessage} />
      )}
    </div>
  )
}

export default SelectMultiCombo