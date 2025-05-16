
import React from "react";
import { AIThreatInsightItem } from "./ai-threat-insight";
import { AIThreatEmptyState } from "./ai-threat-empty-state";
import { AIThreatInsight, ThreatSeverity } from "@/utils/aiThreatUtils";

interface AIThreatInsightsListProps {
  insights: AIThreatInsight[];
  isDarkMode: boolean;
  getColorForSeverity: (severity: ThreatSeverity) => string;
}

export function AIThreatInsightsList({ 
  insights, 
  isDarkMode, 
  getColorForSeverity 
}: AIThreatInsightsListProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">AI-Detected Threats</h4>
      
      {insights.length > 0 ? (
        insights.map((insight) => (
          <AIThreatInsightItem
            key={insight.id}
            insight={insight}
            isDarkMode={isDarkMode}
            getColorForSeverity={getColorForSeverity}
          />
        ))
      ) : (
        <AIThreatEmptyState />
      )}
    </div>
  );
}
