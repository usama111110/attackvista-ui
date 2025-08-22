import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";

type DateRangePickerProps = {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  className?: string;
};

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const quickRanges = [
    {
      label: "Last hour",
      getValue: () => ({
        from: new Date(Date.now() - 60 * 60 * 1000),
        to: new Date(),
      }),
    },
    {
      label: "Last 6 hours",
      getValue: () => ({
        from: new Date(Date.now() - 6 * 60 * 60 * 1000),
        to: new Date(),
      }),
    },
    {
      label: "Last 24 hours",
      getValue: () => ({
        from: new Date(Date.now() - 24 * 60 * 60 * 1000),
        to: new Date(),
      }),
    },
    {
      label: "Last 7 days",
      getValue: () => ({
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        to: new Date(),
      }),
    },
    {
      label: "Last 30 days",
      getValue: () => ({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        to: new Date(),
      }),
    },
  ];

  const formatDateRange = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from) {
      return "Select date range";
    }
    if (!dateRange.to) {
      return format(dateRange.from, "MMM dd, yyyy");
    }
    return `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
  };

  const handleQuickRangeSelect = (range: DateRange) => {
    onChange(range);
    setIsOpen(false);
  };

  return (
    <Card className={cn(
      `py-2 px-4 backdrop-blur-xl flex items-center flex-wrap gap-3`,
      isDarkMode 
        ? "bg-gray-900/50 border-gray-700/50 text-gray-200" 
        : "bg-white/90 border-gray-200 text-gray-800",
      className
    )}>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <span className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
          Time Range:
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Quick range buttons */}
        {quickRanges.map((range) => (
          <Button
            key={range.label}
            variant="ghost"
            size="sm"
            onClick={() => handleQuickRangeSelect(range.getValue())}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm transition-colors",
              isDarkMode
                ? "hover:bg-gray-700/80 text-gray-300"
                : "hover:bg-gray-200 text-gray-700"
            )}
          >
            {range.label}
          </Button>
        ))}

        {/* Custom date range picker */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "min-w-[240px] justify-start text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateRange(value)}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className={cn(
              "w-auto p-0 z-50",
              isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            )} 
            align="start"
          >
            <div className="flex">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={value?.from}
                selected={value}
                onSelect={onChange}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </div>
            <div className="p-3 border-t">
              <div className="flex gap-2 flex-wrap">
                {quickRanges.map((range) => (
                  <Button
                    key={range.label}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickRangeSelect(range.getValue())}
                    className="text-xs"
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
}