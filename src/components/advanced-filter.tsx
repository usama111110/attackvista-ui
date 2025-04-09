
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Filter, Search, X, ChevronDown, ArrowDownUp, CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'select' | 'date';
  options?: { value: string; label: string }[];
}

interface AdvancedFilterProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

// Create a schema for our filter form
const filterSchema = z.object({
  attackType: z.string().optional(),
  severity: z.string().optional(),
  sourceIp: z.string().optional(),
  country: z.string().optional(),
  timeRange: z.string().optional(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

export function AdvancedFilter({ onFilterChange }: AdvancedFilterProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Initialize the form with react-hook-form
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      attackType: '',
      severity: '',
      sourceIp: '',
      country: '',
      timeRange: '',
    },
  });

  const filterOptions: FilterOption[] = [
    { id: 'attackType', label: 'Attack Type', value: '', type: 'select', options: [
      { value: 'ddos', label: 'DDoS' },
      { value: 'sqlInjection', label: 'SQL Injection' },
      { value: 'xss', label: 'XSS' },
      { value: 'bruteForce', label: 'Brute Force' },
      { value: 'malware', label: 'Malware' },
      { value: 'phishing', label: 'Phishing' },
    ]},
    { id: 'severity', label: 'Severity', value: '', type: 'select', options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'critical', label: 'Critical' },
    ]},
    { id: 'sourceIp', label: 'Source IP', value: '', type: 'text' },
    { id: 'country', label: 'Country', value: '', type: 'text' },
    { id: 'timeRange', label: 'Time Range', value: '', type: 'select', options: [
      { value: 'today', label: 'Today' },
      { value: 'yesterday', label: 'Yesterday' },
      { value: 'last7days', label: 'Last 7 Days' },
      { value: 'last30days', label: 'Last 30 Days' },
    ]},
  ];

  const applyFilter = (id: string, value: string) => {
    const newFilters = { ...activeFilters };
    
    if (value) {
      newFilters[id] = value;
    } else {
      delete newFilters[id];
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
    
    if (value && !activeFilters[id]) {
      const option = filterOptions.find(opt => opt.id === id);
      toast.success(`Filter added: ${option?.label}`);
    }
  };

  const removeFilter = (id: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[id];
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
    
    const option = filterOptions.find(opt => opt.id === id);
    if (option) {
      toast.info(`Filter removed: ${option.label}`);
    }
  };
  
  const clearAllFilters = () => {
    setActiveFilters({});
    onFilterChange({});
    form.reset();
    if (Object.keys(activeFilters).length > 0) {
      toast.info('All filters cleared');
    }
  };
  
  useEffect(() => {
    // Close popover when filters are applied
    if (Object.keys(activeFilters).length > 0 && isPopoverOpen) {
      setIsPopoverOpen(false);
    }
  }, [activeFilters, isPopoverOpen]);

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-wrap items-center gap-2">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1 px-3">
              <Filter size={16} />
              <span>Filter</span>
              <ChevronDown size={14} className="ml-1 opacity-70" />
              {hasActiveFilters && (
                <Badge className="ml-1 px-1 h-5 bg-primary" variant="secondary">
                  {Object.keys(activeFilters).length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" align="start">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium">Advanced Filters</div>
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 text-xs"
                    onClick={clearAllFilters}
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <Separator className="mb-4" />
              
              <Form {...form}>
                <form className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                  {filterOptions.map((option) => (
                    <div key={option.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-xs font-medium text-muted-foreground">
                          {option.label}
                        </FormLabel>
                        {activeFilters[option.id] && (
                          <CheckCircle2 size={14} className="text-primary" />
                        )}
                      </div>
                      
                      {option.type === 'text' ? (
                        <div className="flex items-center gap-2">
                          <Input 
                            placeholder={`Enter ${option.label.toLowerCase()}`}
                            className="h-8 text-sm"
                            value={activeFilters[option.id] || ''}
                            onChange={(e) => applyFilter(option.id, e.target.value)}
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => applyFilter(option.id, activeFilters[option.id] ? '' : ' ')}
                          >
                            {activeFilters[option.id] ? <X size={14} /> : <Search size={14} />}
                          </Button>
                        </div>
                      ) : (
                        <Select 
                          value={activeFilters[option.id] || ''} 
                          onValueChange={(value) => applyFilter(option.id, value)}
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder={`Select ${option.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {option.options?.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </form>
              </Form>
              
              {hasActiveFilters && (
                <>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {Object.keys(activeFilters).length} filter{Object.keys(activeFilters).length !== 1 ? 's' : ''} applied
                    </span>
                    <Button 
                      size="sm" 
                      className="h-8"
                      onClick={() => setIsPopoverOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <Button 
          variant={hasActiveFilters ? "secondary" : "ghost"} 
          size="sm" 
          className={cn("h-9 gap-1", 
            hasActiveFilters ? "bg-muted hover:bg-muted" : "opacity-70"
          )}
          onClick={clearAllFilters}
          disabled={!hasActiveFilters}
        >
          <ArrowDownUp size={14} />
          <span>Sort</span>
        </Button>

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {Object.entries(activeFilters).map(([id, value]) => {
            if (!value) return null;
            const option = filterOptions.find(opt => opt.id === id);
            const label = option?.label || id;
            const displayValue = option?.type === 'select' 
              ? option.options?.find(opt => opt.value === value)?.label || value
              : value;
            
            return (
              <Badge 
                key={id} 
                variant="outline" 
                className="flex items-center gap-1 h-7 px-2 py-1 bg-background hover:bg-background"
              >
                <span className="font-medium text-xs text-muted-foreground">{label}:</span>
                <span className="text-xs">{displayValue}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 hover:bg-transparent hover:text-destructive"
                  onClick={() => removeFilter(id)}
                >
                  <X size={12} />
                </Button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
