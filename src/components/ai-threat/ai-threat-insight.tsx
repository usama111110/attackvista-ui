
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIThreatInsight, ThreatSeverity } from "@/utils/aiThreatUtils";

interface AIThreatInsightProps {
  insight: AIThreatInsight;
  isDarkMode: boolean;
  getColorForSeverity: (severity: ThreatSeverity) => string;
}

export function AIThreatInsightItem({ insight, isDarkMode, getColorForSeverity }: AIThreatInsightProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-lg border transition-all hover:shadow-md",
        isDarkMode 
          ? "bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50" 
          : "bg-white border-gray-200/80 hover:bg-gray-50/80"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className={cn(
            "p-2 rounded-md",
            getColorForSeverity(insight.severity)
          )}>
            <AlertTriangle className="h-4 w-4" />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h5 className="font-medium">{insight.type}</h5>
              {insight.isNew && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/30 text-xs">
                  New
                </Badge>
              )}
            </div>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">{insight.description}</p>
            
            <div className="mt-2">
              <span className={cn(
                "inline-block rounded px-1.5 py-0.5 text-xs",
                getColorForSeverity(insight.severity)
              )}>
                {insight.severity.toUpperCase()} ({insight.confidence}% confidence)
              </span>
            </div>
            
            <div className={cn(
              "mt-3 flex items-center gap-1 text-xs",
              isDarkMode ? "text-primary" : "text-primary"
            )}>
              <Shield className="h-3 w-3" />
              <span>{insight.suggestedAction}</span>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" className="rounded-full h-6 w-6 mt-1">
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
