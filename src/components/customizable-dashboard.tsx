
import { useState } from "react";
import { WidgetManager, WidgetType } from "@/components/widget-manager";
import { SecurityScore } from "@/components/security-score";
import { AttackChart } from "@/components/attack-chart";
import { ThreatMap } from "@/components/threat-map";
import { LiveTrafficGraph } from "@/components/live-traffic-graph";
import { AttackTypesVisualization } from "@/components/attack-types-visualization";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";
import { Activity, Database, Network, Shield } from "lucide-react";

// Create a component for the network status widget
const NetworkStatusWidget = () => {
  const { isDarkMode } = useTheme();
  
  const networks = [
    { name: "Main Gateway", status: "Operational", uptime: "99.98%", load: "32%" },
    { name: "Backup Gateway", status: "Operational", uptime: "99.95%", load: "15%" },
    { name: "Cloud Services", status: "Operational", uptime: "99.99%", load: "47%" },
    { name: "VPN Network", status: "Degraded", uptime: "98.73%", load: "62%" },
    { name: "Internal Network", status: "Operational", uptime: "99.91%", load: "28%" },
  ];
  
  return (
    <div className="space-y-4 h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Network Systems</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">Last updated: 2 min ago</span>
      </div>
      <div className="space-y-3">
        {networks.map((network, i) => (
          <div 
            key={i}
            className={`p-3 rounded-lg flex items-center justify-between ${
              isDarkMode ? "bg-gray-800/50" : "bg-gray-100/70"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${
                network.status === "Operational" ? "bg-green-500" : 
                network.status === "Degraded" ? "bg-yellow-500" : "bg-red-500"
              }`}></div>
              <span className="font-medium">{network.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 dark:text-gray-400">{network.uptime}</span>
              <div className="flex items-center gap-1">
                <div className={`w-16 h-1.5 rounded-full overflow-hidden ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}>
                  <div 
                    className={`h-full rounded-full ${
                      parseFloat(network.load) > 80 ? "bg-red-500" :
                      parseFloat(network.load) > 50 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: network.load }}
                  ></div>
                </div>
                <span className="text-xs">{network.load}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Create a component for system health widget
const SystemHealthWidget = () => {
  const { isDarkMode } = useTheme();
  
  const healthMetrics = [
    { name: "CPU Usage", value: 42, status: "Normal" },
    { name: "Memory Usage", value: 68, status: "Normal" },
    { name: "Disk I/O", value: 35, status: "Normal" },
    { name: "Network Latency", value: 28, status: "Low" },
  ];
  
  const totalScore = Math.round(
    healthMetrics.reduce((sum, metric) => sum + metric.value, 0) / healthMetrics.length
  );
  
  const getScoreColor = (score: number) => {
    if (score < 30) return { color: "text-green-500", bg: "bg-green-500" };
    if (score < 60) return { color: "text-yellow-500", bg: "bg-yellow-500" };
    return { color: "text-red-500", bg: "bg-red-500" };
  };
  
  const scoreColor = getScoreColor(totalScore);
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">System Health</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          totalScore < 50 ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" :
          totalScore < 70 ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" :
          "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
        }`}>
          {totalScore < 50 ? "Healthy" : totalScore < 70 ? "Attention Required" : "Critical"}
        </span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center mb-4">
        <div className="relative mb-2">
          <svg viewBox="0 0 36 36" className="w-24 h-24">
            <path
              className={`stroke-current ${isDarkMode ? "text-gray-700" : "text-gray-200"}`}
              fill="none"
              strokeWidth="3"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={`stroke-current ${scoreColor.color}`}
              fill="none"
              strokeWidth="3"
              strokeDasharray={`${totalScore}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-2xl font-bold">{totalScore}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Health</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mt-auto">
        {healthMetrics.map((metric, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">{metric.name}</span>
            <div className="flex items-center gap-2">
              <div className={`w-16 h-1.5 rounded-full overflow-hidden ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              }`}>
                <div 
                  className={`h-full rounded-full ${
                    metric.value > 80 ? "bg-red-500" :
                    metric.value > 50 ? "bg-yellow-500" : "bg-green-500"
                  }`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
              <span>{metric.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Create a metrics summary widget
const MetricsWidget = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="h-full">
      <h3 className="text-sm font-medium mb-4">Key Security Metrics</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Security Score", value: "78/100", icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Open Alerts", value: "24", icon: Activity, color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { label: "Protected Assets", value: "156", icon: Database, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "Active Users", value: "32", icon: Network, color: "text-green-500", bg: "bg-green-500/10" },
        ].map((metric, i) => (
          <div 
            key={i} 
            className={`p-3 rounded-lg ${
              isDarkMode ? "bg-gray-800/50" : "bg-gray-100/70"
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${metric.bg}`}>
              <metric.icon size={16} className={metric.color} />
            </div>
            <div className="text-xl font-bold">{metric.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Default widgets to show on the dashboard
const defaultWidgets = [
  { id: "security-score-1", type: "security-score", title: "Security Score", defaultSize: "small" },
  { id: "attack-chart-1", type: "attack-chart", title: "Attack Distribution", defaultSize: "medium" },
  { id: "threat-map-1", type: "threat-map", title: "Threat Map", defaultSize: "large" },
  { id: "network-status-1", type: "network-status", title: "Network Status", defaultSize: "medium" },
  { id: "system-health-1", type: "system-health", title: "System Health", defaultSize: "small" },
];

export function CustomizableDashboard() {
  // Function to render the appropriate widget based on type
  const renderWidget = (type: WidgetType) => {
    switch (type) {
      case "security-score":
        return <SecurityScore score={78} />;
      case "attack-chart":
        return <AttackChart />;
      case "threat-map":
        return <ThreatMap />;
      case "live-traffic":
        return <LiveTrafficGraph />;
      case "metrics":
        return <MetricsWidget />;
      case "network-status":
        return <NetworkStatusWidget />;
      case "system-health":
        return <SystemHealthWidget />;
      default:
        return <Card className="p-4">Widget content not available</Card>;
    }
  };

  return (
    <div className="animate-fade-in">
      <WidgetManager 
        defaultWidgets={defaultWidgets}
        renderWidget={renderWidget}
        storageKey="dashboard-widgets"
      />
    </div>
  );
}
