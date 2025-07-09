
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
import { cn } from "@/lib/utils";

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
      className={cn(
        sizeClasses[size],
        "card-modern overflow-hidden relative group",
        "hover:shadow-lg transition-all duration-500",
        className
      )}
    >
      <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-card to-card/50">
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        <div className="flex items-center space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-colors">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="card-glass border-border/50">
              <DropdownMenuItem 
                onClick={() => setSize('small')}
                className="cursor-pointer hover:bg-primary/10 hover:text-primary"
              >
                Small Size
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSize('medium')}
                className="cursor-pointer hover:bg-primary/10 hover:text-primary"
              >
                Medium Size
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSize('large')}
                className="cursor-pointer hover:bg-primary/10 hover:text-primary"
              >
                Large Size
              </DropdownMenuItem>
              {onRemove && (
                <DropdownMenuItem 
                  className="text-destructive hover:bg-destructive/10 cursor-pointer"
                  onClick={() => onRemove(id)}
                >
                  Remove Widget
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className={cn(
        "p-6 transition-all duration-300",
        isMinimized ? "h-0 overflow-hidden p-0" : "h-auto"
      )}>
        {children}
      </div>
      
      {/* Enhanced background decoration elements */}
      <div className="absolute -right-8 -top-8 w-16 h-16 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-500 blur-xl"></div>
      <div className="absolute -left-12 -bottom-12 w-24 h-24 rounded-full bg-secondary/5 opacity-30 group-hover:opacity-50 transition-all duration-700 blur-2xl"></div>
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </Card>
  );
}
