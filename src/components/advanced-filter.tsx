
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Filter, Search, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'select';
  options?: { value: string; label: string }[];
}

interface AdvancedFilterProps {
  onFilterChange: (filters: Record<string, string>) => void;
}

export function AdvancedFilter({ onFilterChange }: AdvancedFilterProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  
  const filterOptions: FilterOption[] = [
    { id: 'attackType', label: 'Attack Type', value: '', type: 'select', options: [
      { value: 'ddos', label: 'DDoS' },
      { value: 'sqlInjection', label: 'SQL Injection' },
      { value: 'xss', label: 'XSS' },
      { value: 'bruteForce', label: 'Brute Force' },
    ]},
    { id: 'severity', label: 'Severity', value: '', type: 'select', options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'critical', label: 'Critical' },
    ]},
    { id: 'sourceIp', label: 'Source IP', value: '', type: 'text' },
    { id: 'country', label: 'Country', value: '', type: 'text' },
  ];

  const applyFilter = (id: string, value: string) => {
    const newFilters = { ...activeFilters, [id]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const removeFilter = (id: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[id];
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter size={14} />
              Add Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <div className="p-2">
              <div className="text-sm font-medium mb-2">Add Filter</div>
              <div className="space-y-2">
                {filterOptions.map((option) => (
                  <div key={option.id} className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground">{option.label}</div>
                    {option.type === 'text' ? (
                      <div className="flex items-center gap-2">
                        <Input 
                          placeholder={`Enter ${option.label.toLowerCase()}`}
                          className="h-8 text-sm"
                          onChange={(e) => applyFilter(option.id, e.target.value)}
                          value={activeFilters[option.id] || ''}
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => applyFilter(option.id, '')}
                        >
                          <Search size={14} />
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
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {Object.keys(activeFilters).length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8"
            onClick={() => {
              setActiveFilters({});
              onFilterChange({});
            }}
          >
            Clear all
          </Button>
        )}
      </div>

      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([id, value]) => {
            if (!value) return null;
            const option = filterOptions.find(opt => opt.id === id);
            const label = option?.label || id;
            const displayValue = option?.type === 'select' 
              ? option.options?.find(opt => opt.value === value)?.label || value
              : value;
            
            return (
              <div key={id} className="flex items-center bg-muted text-sm rounded-full px-3 py-1">
                <span className="font-medium mr-1">{label}:</span>
                <span>{displayValue}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => removeFilter(id)}
                >
                  <X size={12} />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
