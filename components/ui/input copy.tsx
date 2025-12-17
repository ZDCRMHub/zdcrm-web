import * as React from "react"

import { cn } from "../../lib/utils"
import FormError from "./formError"
import { Label } from "./label"
import { HideIcon, ViewIcon } from "@/icons/core"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  errorMessage?: string
  errorMessageClass?: string
  leftIcon?: React.ReactNode
  leftIconContainerClass?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
  label?: string
  footer?: React.ReactNode
  optional?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, type, hasError, leftIcon, leftIconContainerClass, rightIcon, errorMessageClass, label, footer, optional, ...props }, ref) => {
    const [show, setShow] = React.useState(false)
    const inputType = show ? "text" : "password"


    return (
      <div className={cn("flex flex-col gap-2", containerClassName)}>
        {
          label && (
            <Label className="text-sm text-[#0F172B] font-poppins font-medium" htmlFor={label}>
              {label}
              {
                !optional && <span className="text-red-400 font-medium"> *</span>
              }
            </Label>
          )
        }
        <div className="relative">
          {
            leftIcon && (
              <span className={cn("absolute left-4 top-[25%] cursor-pointer", leftIconContainerClass)}>
                {leftIcon}
              </span>
            )
          }
          <input
            type={type == "password" ? inputType : type}
            data-testid={type == "password" ? "password-input" : type}
            id={label}
            className={cn(
              "flex h-14 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background file:border-0",
              "file:bg-transparent file:text-sm file:font-medium placeholder:text-[#A4A4A4]  focus-visible:outline-none ",
              "focus:border-[#31A5F9] focus:bg-[#E3F2FD] focus:border-[1.75px]",
              "focus-visible:border-[#31A5F9] focus-visible:border-[1.75px] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              type == "password" && "pr-12", leftIcon && "pl-12", rightIcon && "pr-12",
              className
            )}
            ref={ref}
            {...props}
          />
          {
            rightIcon && (
              <span className="absolute right-4 top-[25%] cursor-pointer">
                {rightIcon}
              </span>
            )
          }
          {
            type === "password" && (
              <button type="button" className="absolute right-[3%] top-[25%] cursor-pointer" onClick={() => setShow((prev) => !prev)}>
                {
                  show ?
                    <HideIcon fill='#395CF5' />
                    :
                    <ViewIcon fill='#395CF5' width={22} height={22} />
                }
              </button>
            )
          }
        </div>
        {
          footer && footer
        }
        {
          hasError && <FormError className={errorMessageClass} errorMessage={props.errorMessage} />
        }
      </div>
    )
  }
)
Input.displayName = "Input"


type AmountInputProps = Omit<InputProps, "value" | "onChange"> & {
  value?: string | number
  onChange?: (...event: any[]) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
  ({ value, onChange, onBlur, name, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(() => formatNumber(value ? Number(value) : 0))

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, "")
        const numericValue = Number(rawValue)

        if (!isNaN(numericValue)) {
          const formattedValue = formatNumber(numericValue)
          setDisplayValue(formattedValue)
          if (onChange) {
            onChange({
              target: {
                name: name || "",
                value: numericValue,
              },
            } as unknown as React.ChangeEvent<HTMLInputElement>)
          }
        } else {
          setDisplayValue("")
          if (onChange) {
            onChange({
              target: {
                name: name || "",
                value: "",
              },
            } as unknown as React.ChangeEvent<HTMLInputElement>)
          }
        }
      },
      [onChange, name],
    )

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        const numericValue = Number(e.target.value.replace(/[^0-9]/g, ""))
        if (!isNaN(numericValue)) {
          const formattedValue = formatNumber(numericValue)
          setDisplayValue(formattedValue)
          if (onBlur) {
            // Create a new event with the numeric value
            const syntheticEvent = {
              ...e,
              target: {
                ...e.target,
                value: numericValue.toString(),
              },
            }
            onBlur(syntheticEvent)
          }
        }
      },
      [onBlur],
    )

    React.useEffect(() => {
      if (value !== undefined) {
        setDisplayValue(formatNumber(Number(value)))
      }
    }, [value])

    return (
      <Input
        {...props}
        ref={ref}
        name={name}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        inputMode="numeric"
      />
    )
  },
)

AmountInput.displayName = "AmountInput"

function formatNumber(num: number): string {
  return num.toLocaleString("en-US", { maximumFractionDigits: 0 })
}

export { Input }
