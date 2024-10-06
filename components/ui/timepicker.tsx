import * as React from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

function TimePicker({ date, setDate }: TimePickerProps) {
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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
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
            <Input
              id="hours"
              className="w-16 text-center"
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
            <Input
              id="minutes"
              className="w-16 text-center"
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
            <Input
              id="seconds"
              className="w-16 text-center"
              value={second.toString().padStart(2, '0')}
              onChange={handleSecondChange}
              onKeyDown={(e) => handleInputKeyDown(e, 'second')}
              ref={secondRef}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TimePicker