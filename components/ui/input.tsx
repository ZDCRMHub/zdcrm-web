'use client'

import * as React from "react"

import { cn } from '@/lib/utils'
import { HideIcon } from "@/icons/core"
import { ViewIcon } from "lucide-react"
import FormError from "./formError"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  errorMessage?: string
  errorMessageClass?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, type, hasError, leftIcon, rightIcon, errorMessageClass, ...props }, ref) => {
    const [show, setShow] = React.useState(false)
    const inputType = show ? "text" : "password"


    return (
      <div className={containerClassName}>
        <div className="relative">
          {
            leftIcon && (
              <span className="absolute left-4 top-[25%] cursor-pointer">
                {leftIcon}
              </span>
            )
          }
          <input
            type={type == "password" ? inputType : type}
            className={cn(
              "flex h-[2.75rem] w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background file:border-0 !appearance-none",
              "file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[1.5px]",
              "focus-visible:border-primary focus-visible:border-[1.5px] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
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
              <button className="absolute right-[3%] top-[25%] cursor-pointer" onClick={(e) => { e.preventDefault(); setShow((prev) => !prev) }}>
                {
                  show ?
                    <HideIcon className="text-foreground" />
                    :
                    <ViewIcon className="text-foreground" width={22} height={22} />
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
