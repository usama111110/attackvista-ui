
import { DashboardLayout } from "@/components/dashboard-layout";
import { WidgetManager, WidgetType } from "@/components/widget-manager";
import { SecurityScore } from "@/components/security-score";
import { AttackChart } from "@/components/attack-chart"; 
import { ThreatMap } from "@/components/threat-map";
import { LiveTrafficGraph } from "@/components/live-traffic-graph";
import { MetricsCard } from "@/components/metrics-card";
import { TrafficSummary } from "@/components/traffic-summary";
import { AttackTypesVisualization } from "@/components/attack-types-visualization";
import { PredictiveAnalytics } from "@/components/predictive-analytics";
import { SecurityTrendsChart } from "@/components/data-visualizations/security-trends-chart";
import { AttackInsights } from "@/components/attack-insights"; // Import the AttackInsights component

const defaultWidgets = [
  { id: "security-score-1", type: "security-score", title: "Security Score", defaultSize: "small" },
  { id: "attack-chart-1", type: "attack-chart", title: "Attack Distribution", defaultSize: "medium" },
  { id: "threat-map-1", type: "threat-map", title: "Threat Map", defaultSize: "large" },
  { id: "network-status-1", type: "network-status", title: "Network Status", defaultSize: "medium" },
];

export default function Index() {
  // Render the appropriate component based on widget type
  const renderWidget = (type: WidgetType) => {
    switch (type) {
      case "security-score":
        return <SecurityScore />;
      case "attack-chart":
        return <AttackChart />;
      case "threat-map":
        return <ThreatMap />;
      case "live-traffic":
        return <LiveTrafficGraph />;
      case "metrics":
        return <MetricsCard />;
      case "network-status":
        return <TrafficSummary />;
      case "system-health":
        return <SecurityTrendsChart />;
      case "attack-insights": // Add case for the new widget type
        return <AttackInsights />;
      default:
        return <div>Widget not found</div>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WidgetManager
          defaultWidgets={defaultWidgets}
          renderWidget={renderWidget}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PredictiveAnalytics />
          <AttackTypesVisualization />
        </div>
      </div>
    </DashboardLayout>
  );
}
