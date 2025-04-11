
import { ReactNode, useState } from "react";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";
import { Trash2, Minimize2, Maximize2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export interface WidgetProps {
  id: string;
  title: string;
  children: ReactNode;
  onRemove?: (id: string) => void;
  defaultSize?: 'small' | 'medium' | 'large';
  className?: string;
}

export function WidgetContainer({ 
  id, 
  title, 
  children, 
  onRemove, 
  defaultSize = 'medium',
  className 
}: WidgetProps) {
  const { isDarkMode } = useTheme();
  const [isMinimized, setIsMinimized] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>(defaultSize);

  const sizeClasses = {
    small: "col-span-1",
    medium: "col-span-1 md:col-span-2",
    large: "col-span-1 md:col-span-3",
  };

  // Calculate content height based on minimized state
  const contentHeight = isMinimized ? "h-0 overflow-hidden" : "h-auto";

  return (
    <Card 
      className={`
        ${sizeClasses[size]} 
        backdrop-blur-lg border 
        overflow-hidden relative transition-all duration-300
        ${isDarkMode 
          ? "bg-gray-900/50 border-gray-700/50 text-gray-100 hover:bg-gray-900/60 hover:border-gray-600/50" 
          : "bg-white/90 border-gray-200 text-gray-800 hover:bg-white hover:border-gray-300/80"}
        ${className}
      `}
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700/50 border-gray-200">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSize('small')}>
                Small
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSize('medium')}>
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSize('large')}>
                Large
              </DropdownMenuItem>
              {onRemove && (
                <DropdownMenuItem 
                  className="text-red-500 dark:text-red-400"
                  onClick={() => onRemove(id)}
                >
                  Remove Widget
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className={`p-4 ${contentHeight} transition-all duration-300`}>
        {children}
      </div>
      
      {/* Background decoration elements */}
      <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-500"></div>
      <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-primary/5 opacity-50 transition-all duration-700"></div>
    </Card>
  );
}
