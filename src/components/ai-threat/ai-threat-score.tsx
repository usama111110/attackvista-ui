
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Network, Zap, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIThreatScoreProps {
  isDarkMode: boolean;
  detectionScore: number;
  isAnalyzing: boolean;
  onRunAnalysis: () => Promise<any>;
}

export function AIThreatScore({ 
  isDarkMode, 
  detectionScore, 
  isAnalyzing, 
  onRunAnalysis 
}: AIThreatScoreProps) {
  return (
    <div className={cn(
      "p-4 rounded-lg mb-6",
      isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"
    )}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">AI Detection Confidence</span>
        <span className="text-sm font-bold">{detectionScore}%</span>
      </div>
      <Progress value={detectionScore} className="h-2" />
      
      <div className="mt-4 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={onRunAnalysis}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Zap className="h-3.5 w-3.5" />
              <span>Run Deep Analysis</span>
            </>
          )}
        </Button>
        
        <span className={cn(
          "text-xs flex items-center gap-1",
          isDarkMode ? "text-gray-400" : "text-gray-600"
        )}>
          <Network className="h-3.5 w-3.5" />
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
