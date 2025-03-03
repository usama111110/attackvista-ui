
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";

type TimeFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TimeFilter({ value, onChange }: TimeFilterProps) {
  const { isDarkMode } = useTheme();
  const timeOptions = [
    { value: "1h", label: "Last hour" },
    { value: "6h", label: "Last 6 hours" },
    { value: "24h", label: "Last 24 hours" },
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" }
  ];

  return (
    <Card className={`p-4 backdrop-blur-lg border ${
      isDarkMode 
        ? "bg-gray-900/50 border-gray-700/50" 
        : "bg-white/90 border-gray-200"
    }`}>
      <div className="flex items-center flex-wrap gap-3">
        <div className="flex items-center gap-2 mr-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Time Range:</span>
        </div>
        {timeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              value === option.value
                ? "bg-primary text-primary-foreground"
                : isDarkMode
                  ? "bg-gray-800/80 hover:bg-gray-700/80 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </Card>
  );
}
