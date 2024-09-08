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
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, type, hasError, leftIcon, leftIconContainerClass, rightIcon, errorMessageClass, label, ...props }, ref) => {
    const [show, setShow] = React.useState(false)
    const inputType = show ? "text" : "password"


    return (
      <div className={cn("flex flex-col gap-2", containerClassName)}>
        {
          label && (
            <Label className="text-sm text-[#0F172B] font-poppins font-medium pb" htmlFor={label}>
              {label}
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
          hasError && <FormError className={errorMessageClass} errorMessage={props.errorMessage} />
        }
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
