
import React from 'react';

interface MetricToggleProps {
  label: string;
  metricKey: string;
  checked: boolean;
  onToggle: (metricKey: string) => void;
}

const MetricToggle: React.FC<MetricToggleProps> = ({ 
  label, 
  metricKey, 
  checked, 
  onToggle 
}) => {
  return (
    <div 
      className="flex items-center w-full cursor-pointer px-2 py-1.5 hover:bg-accent rounded-sm"
      onClick={() => onToggle(metricKey)}
    >
      <input 
        type="checkbox" 
        checked={checked} 
        className="mr-2" 
        readOnly
      />
      <span>{label}</span>
    </div>
  );
};

export default MetricToggle;
