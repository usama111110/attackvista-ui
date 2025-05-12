
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/providers/ThemeProvider";
import { useToast } from "@/hooks/use-toast";
import { Download, FileJson, FileText, FileSpreadsheet, FileArchive, Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, sub } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DataType = "securityEvents" | "networkTraffic" | "userActivity" | "systemLogs";

type ExportFormat = "json" | "csv" | "xlsx" | "zip";

export function DataExport({ trigger }: { trigger: React.ReactNode }) {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  
  const [selectedDataTypes, setSelectedDataTypes] = useState<DataType[]>([]);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("json");
  const [isExporting, setIsExporting] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: sub(new Date(), { days: 7 }),
    to: new Date(),
  });
  
  // Handle checkbox toggle for data types
  const toggleDataType = (dataType: DataType) => {
    if (selectedDataTypes.includes(dataType)) {
      setSelectedDataTypes(selectedDataTypes.filter(type => type !== dataType));
    } else {
      setSelectedDataTypes([...selectedDataTypes, dataType]);
    }
  };
  
  // Simulate export process
  const handleExport = () => {
    if (selectedDataTypes.length === 0) {
      toast({
        title: "No data selected",
        description: "Please select at least one data type to export",
        variant: "destructive",
      });
      return;
    }
    
    setIsExporting(true);
    
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
      
      toast({
        title: "Data Exported Successfully",
        description: `Your ${selectedDataTypes.join(", ")} data has been exported as ${exportFormat.toUpperCase()}`,
      });
      
      // In a real application, this would trigger a file download
      const fileName = `secure-sentry-export-${format(new Date(), "yyyy-MM-dd")}.${exportFormat}`;
      console.log(`Exported data to ${fileName}`, {
        dataTypes: selectedDataTypes,
        format: exportFormat,
        dateRange: {
          from: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : null,
          to: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : null,
        }
      });
    }, 2000);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={`sm:max-w-md ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}>
        <DialogHeader>
          <DialogTitle>Export Data</DialogTitle>
          <DialogDescription>
            Export security data for analysis and reporting
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Select Data to Export</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="securityEvents" 
                  checked={selectedDataTypes.includes("securityEvents")}
                  onCheckedChange={() => toggleDataType("securityEvents")}
                />
                <label
                  htmlFor="securityEvents"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Security Events
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="networkTraffic" 
                  checked={selectedDataTypes.includes("networkTraffic")}
                  onCheckedChange={() => toggleDataType("networkTraffic")}
                />
                <label
                  htmlFor="networkTraffic"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Network Traffic
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="userActivity" 
                  checked={selectedDataTypes.includes("userActivity")}
                  onCheckedChange={() => toggleDataType("userActivity")}
                />
                <label
                  htmlFor="userActivity"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  User Activity
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="systemLogs" 
                  checked={selectedDataTypes.includes("systemLogs")}
                  onCheckedChange={() => toggleDataType("systemLogs")}
                />
                <label
                  htmlFor="systemLogs"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  System Logs
                </label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date-range">Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-range"
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${!dateRange?.from ? "text-muted-foreground" : ""}`}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className={`w-auto p-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <Select value={exportFormat} onValueChange={(value) => setExportFormat(value as ExportFormat)}>
              <SelectTrigger id="format" className="w-full">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">
                  <div className="flex items-center">
                    <FileJson className="mr-2 h-4 w-4 text-blue-500" />
                    <span>JSON</span>
                  </div>
                </SelectItem>
                <SelectItem value="csv">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-green-500" />
                    <span>CSV</span>
                  </div>
                </SelectItem>
                <SelectItem value="xlsx">
                  <div className="flex items-center">
                    <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Excel (XLSX)</span>
                  </div>
                </SelectItem>
                <SelectItem value="zip">
                  <div className="flex items-center">
                    <FileArchive className="mr-2 h-4 w-4 text-amber-500" />
                    <span>ZIP Archive</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={handleExport} disabled={isExporting || selectedDataTypes.length === 0}>
            {isExporting ? (
              <>Exporting...</>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
