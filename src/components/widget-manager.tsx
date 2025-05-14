
import { useState, useEffect, memo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { WidgetContainer } from "./widget-container";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";

// Define available widget types
export type WidgetType = 
  | "security-score" 
  | "attack-chart" 
  | "threat-map" 
  | "live-traffic" 
  | "metrics" 
  | "network-status"
  | "system-health";

interface WidgetDefinition {
  id: string;
  type: WidgetType;
  title: string;
  defaultSize: 'small' | 'medium' | 'large';
}

interface WidgetManagerProps {
  defaultWidgets?: WidgetDefinition[];
  renderWidget: (type: WidgetType) => React.ReactNode;
  storageKey?: string;
}

// Use memo to prevent unnecessary re-renders
export const WidgetManager = memo(({ 
  defaultWidgets = [], 
  renderWidget,
  storageKey = "dashboard-widgets"
}: WidgetManagerProps) => {
  const { toast } = useToast();
  const [isAddingWidget, setIsAddingWidget] = useState(false);
  const [widgets, setWidgets] = useLocalStorage<WidgetDefinition[]>(
    storageKey,
    defaultWidgets
  );

  const availableWidgets: Array<Omit<WidgetDefinition, 'id'>> = [
    { type: "security-score", title: "Security Score", defaultSize: "small" },
    { type: "attack-chart", title: "Attack Distribution", defaultSize: "medium" },
    { type: "threat-map", title: "Threat Map", defaultSize: "large" },
    { type: "live-traffic", title: "Live Traffic", defaultSize: "large" },
    { type: "metrics", title: "Key Metrics", defaultSize: "medium" },
    { type: "network-status", title: "Network Status", defaultSize: "medium" },
    { type: "system-health", title: "System Health", defaultSize: "small" }
  ];

  // Add a new widget to the dashboard
  const addWidget = (widgetType: WidgetType) => {
    const widgetDef = availableWidgets.find(w => w.type === widgetType);
    if (!widgetDef) return;

    const newWidget = {
      ...widgetDef,
      id: `${widgetType}-${Date.now()}`
    };

    setWidgets([...widgets, newWidget]);
    setIsAddingWidget(false);
    
    toast({
      title: "Widget Added",
      description: `Added ${widgetDef.title} to your dashboard`,
    });
  };

  // Remove a widget from the dashboard
  const removeWidget = (id: string) => {
    const widgetToRemove = widgets.find(w => w.id === id);
    setWidgets(widgets.filter(widget => widget.id !== id));
    
    if (widgetToRemove) {
      toast({
        title: "Widget Removed",
        description: `Removed ${widgetToRemove.title} from your dashboard`,
      });
    }
  };

  // Get available widgets that are not already on the dashboard
  const getAvailableWidgetTypes = () => {
    const existingTypes = new Set(widgets.map(w => w.type));
    return availableWidgets.filter(w => !existingTypes.has(w.type));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Dialog open={isAddingWidget} onOpenChange={setIsAddingWidget}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus size={16} />
              Add Widget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Widget</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {getAvailableWidgetTypes().map((widget) => (
                <Button
                  key={widget.type}
                  variant="outline"
                  className="h-auto flex flex-col p-4 justify-start items-center gap-2"
                  onClick={() => addWidget(widget.type)}
                >
                  <span>{widget.title}</span>
                </Button>
              ))}
              {getAvailableWidgetTypes().length === 0 && (
                <p className="text-muted-foreground col-span-2 text-center py-4">
                  All available widgets are already on your dashboard.
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {widgets.map((widget) => (
          <WidgetContainer
            key={widget.id}
            id={widget.id}
            title={widget.title}
            defaultSize={widget.defaultSize}
            onRemove={removeWidget}
            className="animate-fade-in"
          >
            {renderWidget(widget.type)}
          </WidgetContainer>
        ))}
      </div>
    </div>
  );
});

WidgetManager.displayName = "WidgetManager";
