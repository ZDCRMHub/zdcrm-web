'use client'

import * as React from "react"
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
  disabled?: boolean;
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
  showSelectedValue?: boolean;
  placeHolderClass?: string;
}

const SelectSingleSimple = <T extends object>({
  value,
  onChange,
  options,
  disabled,
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
  placeHolderClass,
  withIcon,
  isLoadingOptions,
  valueKey,
  labelKey,
  triggerColor,
  showSelectedValue = true,
}: SelectProps<T>) => {
  const [isOpen, setOpen] = React.useState(false)



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
      <Popover open={isOpen} onOpenChange={setOpen}>
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
              onClick={() => setOpen(!isOpen)}
              ref={triggerRef}
              disabled={isLoadingOptions || disabled}
            >
              <span className={cn(
                '!overflow-hidden text-sm w-full font-normal',
                (value && options && options?.length) ? '' : '!text-[#A4A4A4]', placeHolderClass
              )}>
                {
                  isLoadingOptions ?
                    "Loading options..."
                    :
                    (showSelectedValue && value && options && options?.length)
                      ? getOptionLabel(options.find(option => (option[valueKey]) === String(value)) || {} as T)
                      : placeholder
                }
             
              </span>
              <svg
                className={cn("ml-2  shrink-0 opacity-70 transition-transform duration-300", isOpen && "rotate-180")}
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


        <PopoverContent className={cn("p-0 overflow-hidden", triggerRef?.current && `min-w-max`, isLoadingOptions && "hidden")} style={{ width }}>
          <div className="">
            
            {
              isLoadingOptions &&
              <button className="flex items-center justify-center gap-2 text-main-solid py-2 font-medium" disabled>
                <SmallSpinner color='#000000' /> Loading options...
              </button>
            }
            <div className="flex flex-col gap-1.5 px-5 py-3 max-h-[450px] overflow-y-auto">
              {
                !isLoadingOptions && options && options?.length > 0 ? (
                  options?.map((option, index) => (
                    <button
                      className={cn("text-xs relative flex select-none items-center rounded-md px-3 py-2 outline-none aria-selected:bg-blue-100/70 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                        itemClass, "hover:bg-blue-100 w-full text-sm",
                        "py-2 hover:!bg-primary hover:!text-white cursor-pointer rounded-lg border hover:border-transparent"
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
                ) :
                  <button className={cn("text-[0.8125rem]", isLoadingOptions && "!hidden", itemClass)} disabled>
                    There&apos;s no option to select from
                  </button>

              }
            </div>
          </div>
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

export default SelectSingleSimple
