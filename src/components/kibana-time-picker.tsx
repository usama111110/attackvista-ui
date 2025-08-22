import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, ChevronDown, RefreshCw, Play, Pause } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export interface TimeRange {
  from: Date;
  to: Date;
  label?: string;
}

type KibanaTimePickerProps = {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
  autoRefresh?: boolean;
  onAutoRefreshChange?: (enabled: boolean) => void;
  refreshInterval?: number;
  onRefreshIntervalChange?: (interval: number) => void;
  className?: string;
};

export function KibanaTimePicker({ 
  value, 
  onChange, 
  autoRefresh = false,
  onAutoRefreshChange,
  refreshInterval = 30,
  onRefreshIntervalChange,
  className 
}: KibanaTimePickerProps) {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("quick");
  const [fromTime, setFromTime] = useState(format(value.from, "HH:mm:ss"));
  const [toTime, setToTime] = useState(format(value.to, "HH:mm:ss"));
  const [relativeValue, setRelativeValue] = useState("15");
  const [relativeUnit, setRelativeUnit] = useState("minutes");

  const quickRanges = [
    { label: "Last 15 minutes", getValue: () => ({ from: new Date(Date.now() - 15 * 60 * 1000), to: new Date() }) },
    { label: "Last 30 minutes", getValue: () => ({ from: new Date(Date.now() - 30 * 60 * 1000), to: new Date() }) },
    { label: "Last 1 hour", getValue: () => ({ from: new Date(Date.now() - 60 * 60 * 1000), to: new Date() }) },
    { label: "Last 4 hours", getValue: () => ({ from: new Date(Date.now() - 4 * 60 * 60 * 1000), to: new Date() }) },
    { label: "Last 12 hours", getValue: () => ({ from: new Date(Date.now() - 12 * 60 * 60 * 1000), to: new Date() }) },
    { label: "Last 24 hours", getValue: () => ({ from: new Date(Date.now() - 24 * 60 * 60 * 1000), to: new Date() }) },
    { label: "Last 7 days", getValue: () => ({ from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), to: new Date() }) },
    { label: "Last 30 days", getValue: () => ({ from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), to: new Date() }) },
    { label: "Last 90 days", getValue: () => ({ from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), to: new Date() }) },
    { label: "Last 1 year", getValue: () => ({ from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), to: new Date() }) },
  ];

  const refreshIntervals = [
    { label: "Off", value: 0 },
    { label: "5s", value: 5 },
    { label: "10s", value: 10 },
    { label: "30s", value: 30 },
    { label: "1m", value: 60 },
    { label: "5m", value: 300 },
    { label: "15m", value: 900 },
    { label: "30m", value: 1800 },
    { label: "1h", value: 3600 },
  ];

  const formatTimeRange = (range: TimeRange) => {
    const now = new Date();
    const diffMs = now.getTime() - range.from.getTime();
    
    // If it's a recent time range, show relative format
    if (range.to.getTime() - now.getTime() > -60000) { // Within last minute
      if (diffMs < 60 * 60 * 1000) {
        return `Last ${Math.round(diffMs / (60 * 1000))} minutes`;
      } else if (diffMs < 24 * 60 * 60 * 1000) {
        return `Last ${Math.round(diffMs / (60 * 60 * 1000))} hours`;
      } else if (diffMs < 7 * 24 * 60 * 60 * 1000) {
        return `Last ${Math.round(diffMs / (24 * 60 * 60 * 1000))} days`;
      }
    }
    
    // Otherwise show absolute format
    return `${format(range.from, "MMM dd, HH:mm")} - ${format(range.to, "MMM dd, HH:mm")}`;
  };

  const handleQuickRangeSelect = (range: { from: Date; to: Date }, label: string) => {
    onChange({ ...range, label });
    setIsOpen(false);
  };

  const handleRelativeApply = () => {
    const multiplier = relativeUnit === "minutes" ? 60 * 1000 : 
                      relativeUnit === "hours" ? 60 * 60 * 1000 : 
                      24 * 60 * 60 * 1000;
    const from = new Date(Date.now() - parseInt(relativeValue) * multiplier);
    const to = new Date();
    onChange({ from, to, label: `Last ${relativeValue} ${relativeUnit}` });
    setIsOpen(false);
  };

  const handleAbsoluteApply = () => {
    const [fromHours, fromMinutes, fromSeconds] = fromTime.split(':').map(Number);
    const [toHours, toMinutes, toSeconds] = toTime.split(':').map(Number);
    
    const from = new Date(value.from);
    from.setHours(fromHours, fromMinutes, fromSeconds || 0);
    
    const to = new Date(value.to);
    to.setHours(toHours, toMinutes, toSeconds || 0);
    
    onChange({ from, to });
    setIsOpen(false);
  };

  return (
    <Card className={cn(
      "py-2 px-4 backdrop-blur-xl flex items-center gap-3",
      isDarkMode 
        ? "bg-gray-900/50 border-gray-700/50" 
        : "bg-white/90 border-gray-200",
      className
    )}>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <span className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
          Time Range:
        </span>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "min-w-[280px] justify-between text-left font-normal",
              isDarkMode ? "border-gray-600 hover:border-gray-500" : "border-gray-300"
            )}
          >
            <span className="truncate">{formatTimeRange(value)}</span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className={cn(
            "w-[600px] p-0 z-50",
            isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          )} 
          align="start"
        >
          <div className="p-4 border-b">
            <h4 className="font-medium">Select Time Range</h4>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 m-0 rounded-none border-b">
              <TabsTrigger value="quick" className="rounded-none">Quick</TabsTrigger>
              <TabsTrigger value="relative" className="rounded-none">Relative</TabsTrigger>
              <TabsTrigger value="absolute" className="rounded-none">Absolute</TabsTrigger>
            </TabsList>
            
            <TabsContent value="quick" className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
              {quickRanges.map((range, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-8 text-sm"
                  onClick={() => handleQuickRangeSelect(range.getValue(), range.label)}
                >
                  {range.label}
                </Button>
              ))}
            </TabsContent>
            
            <TabsContent value="relative" className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>Last</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={relativeValue}
                    onChange={(e) => setRelativeValue(e.target.value)}
                    className="w-20"
                    min="1"
                  />
                  <Select value={relativeUnit} onValueChange={setRelativeUnit}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">minutes</SelectItem>
                      <SelectItem value="hours">hours</SelectItem>
                      <SelectItem value="days">days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleRelativeApply} className="w-full">
                Apply
              </Button>
            </TabsContent>
            
            <TabsContent value="absolute" className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From</Label>
                  <CalendarComponent
                    mode="single"
                    selected={value.from}
                    onSelect={(date) => date && onChange({ ...value, from: date })}
                    className="pointer-events-auto"
                  />
                  <Input
                    type="time"
                    step="1"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>To</Label>
                  <CalendarComponent
                    mode="single"
                    selected={value.to}
                    onSelect={(date) => date && onChange({ ...value, to: date })}
                    className="pointer-events-auto"
                  />
                  <Input
                    type="time"
                    step="1"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleAbsoluteApply} className="w-full">
                Apply
              </Button>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>

      {/* Auto-refresh controls */}
      {onAutoRefreshChange && (
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAutoRefreshChange(!autoRefresh)}
            className={cn(
              "h-8 w-8 p-0",
              autoRefresh ? "text-green-500" : "text-gray-400"
            )}
          >
            {autoRefresh ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Select 
            value={refreshInterval?.toString() || "0"} 
            onValueChange={(value) => onRefreshIntervalChange?.(parseInt(value))}
          >
            <SelectTrigger className="w-16 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {refreshIntervals.map((interval) => (
                <SelectItem key={interval.value} value={interval.value.toString()}>
                  {interval.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <RefreshCw className={cn(
            "h-4 w-4",
            autoRefresh ? "animate-spin text-green-500" : "text-gray-400"
          )} />
        </div>
      )}
    </Card>
  );
}
