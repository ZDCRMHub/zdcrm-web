'use client'

import * as React from "react"
import { FieldErrors, FieldValues } from "react-hook-form"
import { CheckIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings"
import { SmallSpinner } from "@/icons/core"

import { Button, Command, CommandGroup, CommandItem } from "."
import { Popover, PopoverContent, PopoverTrigger } from "."
import { Label } from "./label"
import FormError from "./formError"
// import { SearchIcon } from "@/app/(dashboard)/instant-web/misc/icons"

interface SelectProps<T> {
  value: string | boolean | undefined;
  onChange: (value: string) => void;
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
  errorClass?: string;
  fullWidth?: boolean;
  withIcon?: boolean;
  isLoadingOptions?: boolean;
  triggerColor?: string;
  valueKey: keyof T;
  labelKey: keyof T;
}

const SelectSingleCombo = <T extends object>({
  value,
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
  errorClass,
  fullWidth,
  withIcon,
  isLoadingOptions,
  valueKey,
  labelKey,
  triggerColor
}: SelectProps<T>) => {
  const [open, setOpen] = React.useState(false)
  const [optionsToDisplay, setOptionsToDisplay] = React.useState<T[] | undefined>(options)
  const [searchText, setSearchText] = React.useState<string>("")

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

  const getOptionLabel = (option: T) => {
    return option ? String(option[labelKey]) : `Select ${convertKebabAndSnakeToTitleCase(name).toLowerCase()}`;
  }

  const handleSelect = (currentValue: string | boolean) => {
    const selectedOption = options?.find(option => String(option[valueKey]) === String(currentValue));
    const selectedValue = selectedOption ? String(selectedOption[valueKey]) : '';
    onChange(selectedValue);
    setOpen(false);
  }

  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [width, setWidth] = React.useState<string>("50%")
  React.useEffect(() => {
    if (triggerRef?.current) {
      setWidth(`${triggerRef.current.clientWidth}px`)
    }
  }, [triggerRef?.current?.clientWidth])

  return (
    <div className={cn("inputdiv", withIcon && "withicon", containerClass)}>

      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-2">
          {
            label && (
              <Label className="text-sm text-[#0F172B] font-poppins font-medium" htmlFor={name || "gbo"}>
                {label}
              </Label>
            )
          }
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
                (value && options && options?.length) ? '' : '!text-[#A4A4A4]'
              )}>
                {(value && options && options?.length)
                  ? getOptionLabel(options.find(option => (option[valueKey]) === String(value)) || {} as T)
                  : placeholder
                }
              </span>
              <svg
                className={cn("ml-2  shrink-0 opacity-70 transition-transform duration-300", open && "rotate-180")}
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
        </div>


        <PopoverContent className={cn("p-0", triggerRef?.current && `min-w-max`)} style={{ width }}>
          <Command>
            <div className="relative px-6">
              <SearchIcon className="absolute top-1/2 left-2 -translate-y-1/2 text-[#032282] h-4 w-4" />
              <input
                className="focus:!ring-0 !ring-0 bg-transparent pl-5 p-3 !outline-none text-sm placeholder:text-[#86898ec7] border-b border-[#E6E6E6] w-full rounded-none"
                placeholder={`Search` || placeholder}
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
                optionsToDisplay?.map((option, index) => (
                  <button
                    className={cn("grid grid-cols-[max-content_1fr] text-xs relative flex select-none items-center rounded-md px-3 py-2 outline-none aria-selected:bg-blue-100/70 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                      itemClass, "hover:bg-blue-100 w-full text-sm",
                      "py-2 my-1 hover:!bg-primary hover:!text-white cursor-pointer rounded-lg border hover:border-transparent"
                    )}
                    key={index}
                    onClick={() => handleSelect(option[valueKey] as string)}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        option[valueKey] === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option[labelKey] as string}
                  </button>
                ))
              ) : (
                <CommandItem className={cn("text-[0.8125rem]", isLoadingOptions && "!hidden", itemClass)} value={""} disabled>
                  There&apos;s no option to select from
                </CommandItem>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {
        hasError && errorMessage && (
          <FormError errorMessage={errorMessage} />
        )
      }
    </div>
  )
}

export default SelectSingleCombo
