import * as React from "react"
import { Clock } from "lucide-react"
import { format } from "date-fns"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import FormError from "./formError"
import { Label } from "./label"

interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  hasError?: boolean
  errorMessage?: string
  errorMessageClass?: string
  leftIcon?: React.ReactNode
  leftIconContainerClass?: string
  rightIcon?: React.ReactNode
  containerClassName?: string
  label?: string
}

const TimePicker = React.forwardRef<HTMLButtonElement, TimePickerProps>(
  ({ 
    className, 
    containerClassName, 
    date, 
    setDate, 
    hasError, 
    errorMessage, 
    errorMessageClass, 
    leftIcon, 
    leftIconContainerClass, 
    rightIcon, 
    label, 
    ...props 
  }, ref) => {
    const minuteRef = React.useRef<HTMLInputElement>(null)
    const hourRef = React.useRef<HTMLInputElement>(null)
    const secondRef = React.useRef<HTMLInputElement>(null)

    const [hour, setHour] = React.useState(date ? date.getHours() : 0)
    const [minute, setMinute] = React.useState(date ? date.getMinutes() : 0)
    const [second, setSecond] = React.useState(date ? date.getSeconds() : 0)

    const handleTimeChange = () => {
      if (!date) return

      const newDate = new Date(date)
      newDate.setHours(hour)
      newDate.setMinutes(minute)
      newDate.setSeconds(second)
      setDate(newDate)
    }

    React.useEffect(() => {
      handleTimeChange()
    }, [hour, minute, second])

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value)
      if (value >= 0 && value <= 23) {
        setHour(value)
        if (value > 2) {
          minuteRef.current?.focus()
        }
      }
    }

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value)
      if (value >= 0 && value <= 59) {
        setMinute(value)
        if (value > 5) {
          secondRef.current?.focus()
        }
      }
    }

    const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value)
      if (value >= 0 && value <= 59) {
        setSecond(value)
      }
    }

    const handleInputKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      type: 'hour' | 'minute' | 'second'
    ) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        const increment = e.key === 'ArrowUp' ? 1 : -1
        switch (type) {
          case 'hour':
            setHour((prevHour) => (prevHour + increment + 24) % 24)
            break
          case 'minute':
          case 'second':
            const setter = type === 'minute' ? setMinute : setSecond
            setter((prev) => (prev + increment + 60) % 60)
            break
        }
      }
    }

    return (
      <div className={cn("flex flex-col gap-2", containerClassName)}>
        {label && (
          <Label className="text-sm text-[#0F172B] font-poppins font-medium" htmlFor={label}>
            {label}
          </Label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className={cn("absolute left-4 top-[25%] cursor-pointer", leftIconContainerClass)}>
              {leftIcon}
            </span>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                // type="number"
                variant={"outline"}
                id={label}
                className={cn(
                  "flex h-14 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background",
                  "file:bg-transparent file:text-sm file:font-medium placeholder:text-[#A4A4A4] focus-visible:outline-none",
                  "focus:border-[#31A5F9] focus:bg-[#E3F2FD] focus:border-[1.75px]",
                  "focus-visible:border-[#31A5F9] focus-visible:border-[1.75px] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                  leftIcon && "pl-12",
                  rightIcon && "pr-12",
                  !date && "text-muted-foreground",
                  className
                )}
                // ref={ref}
                {...props}
              >
                <Clock className="mr-2 h-4 w-4" />
                {date ? format(date, "HH:mm:ss") : <span>Pick a time</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="flex items-end gap-2 p-3">
                <div className="grid gap-1 text-center">
                  <Label htmlFor="hours" className="text-xs">
                    Hours
                  </Label>
                  <input
                    id="hours"
                    className="w-16 text-center h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus:border-[#31A5F9] focus:bg-[#E3F2FD] focus:border-[1.75px]"
                    value={hour.toString().padStart(2, '0')}
                    onChange={handleHourChange}
                    onKeyDown={(e) => handleInputKeyDown(e, 'hour')}
                    ref={hourRef}
                  />
                </div>
                <span className="text-2xl mb-3">:</span>
                <div className="grid gap-1 text-center">
                  <Label htmlFor="minutes" className="text-xs">
                    Minutes
                  </Label>
                  <input
                    id="minutes"
                    className="w-16 text-center h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus:border-[#31A5F9] focus:bg-[#E3F2FD] focus:border-[1.75px]"
                    value={minute.toString().padStart(2, '0')}
                    onChange={handleMinuteChange}
                    onKeyDown={(e) => handleInputKeyDown(e, 'minute')}
                    ref={minuteRef}
                  />
                </div>
                <span className="text-2xl mb-3">:</span>
                <div className="grid gap-1 text-center">
                  <Label htmlFor="seconds" className="text-xs">
                    Seconds
                  </Label>
                  <input
                    id="seconds"
                    className="w-16 text-center h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus:border-[#31A5F9] focus:bg-[#E3F2FD] focus:border-[1.75px]"
                    value={second.toString().padStart(2, '0')}
                    onChange={handleSecondChange}
                    onKeyDown={(e) => handleInputKeyDown(e, 'second')}
                    ref={secondRef}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {rightIcon && (
            <span className="absolute right-4 top-[25%] cursor-pointer">
              {rightIcon}
            </span>
          )}
        </div>
        {hasError && <FormError className={errorMessageClass} errorMessage={errorMessage} />}
      </div>
    )
  }
)

TimePicker.displayName = "TimePicker"

export default TimePicker