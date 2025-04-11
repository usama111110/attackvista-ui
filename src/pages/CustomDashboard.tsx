
import { lazy, Suspense } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { WidgetManager, WidgetType } from "@/components/widget-manager";
import { Skeleton } from "@/components/ui/skeleton";
import { SecurityScore } from "@/components/security-score";
import { Shield, Activity, Database, Network } from "lucide-react";
import { MetricsCard } from "@/components/metrics-card";

// Lazy-loaded components for performance optimization
const AttackChart = lazy(() => import("@/components/attack-chart").then(module => ({ default: module.AttackChart })));
const ThreatMap = lazy(() => import("@/components/threat-map").then(module => ({ default: module.ThreatMap })));
const LiveTrafficGraph = lazy(() => import("@/components/live-traffic-graph").then(module => ({ default: module.LiveTrafficGraph })));

// Wrap components with Suspense for code splitting benefits
const LazyLoadedComponent = ({ component: Component }: { component: React.ComponentType<any> }) => (
  <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
    <Component />
  </Suspense>
);

// Memoized system health component for better performance
const SystemHealth = () => {
  const items = [
    { name: "CPU Usage", value: 42, icon: <Activity size={18} /> },
    { name: "Memory Usage", value: 65, icon: <Database size={18} /> },
    { name: "Disk Space", value: 28, icon: <Database size={18} /> },
    { name: "Network I/O", value: 54, icon: <Network size={18} /> },
  ];

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
              {item.icon}
            </div>
            <span>{item.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-36 h-2 rounded-full overflow-hidden bg-gray-200/70 dark:bg-gray-700/50">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  item.value > 80 ? 'bg-gradient-to-r from-red-500 to-red-400' : 
                  item.value > 60 ? 'bg-gradient-to-r from-orange-500 to-orange-400' : 
                  'bg-gradient-to-r from-green-500 to-green-400'
                }`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{item.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Network status component
const NetworkStatus = () => {
  const items = [
    { name: "Main Gateway", value: 92, icon: <Activity size={18} /> },
    { name: "Database Server", value: 88, icon: <Database size={18} /> },
    { name: "Application Server", value: 95, icon: <Network size={18} /> },
    { name: "DNS Server", value: 97, icon: <Network size={18} /> },
  ];

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
              {item.icon}
            </div>
            <span>{item.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-36 h-2 rounded-full overflow-hidden bg-gray-200/70 dark:bg-gray-700/50">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{item.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Key metrics component
const KeyMetrics = () => (
  <div className="grid grid-cols-2 gap-4">
    <MetricsCard
      title="Total Attacks"
      value="1,234"
      icon={<Shield className="text-blue-500" />}
      trend={{ value: 12, isPositive: false }}
    />
    <MetricsCard
      title="Protected Systems"
      value="156"
      icon={<Database className="text-purple-500" />}
      trend={{ value: 3, isPositive: true }}
    />
  </div>
);

const CustomDashboard = () => {
  // Default widgets configuration
  const defaultWidgets = [
    { id: "security-score-1", type: "security-score" as WidgetType, title: "Security Score", defaultSize: "small" },
    { id: "attack-chart-1", type: "attack-chart" as WidgetType, title: "Attack Distribution", defaultSize: "medium" },
    { id: "metrics-1", type: "metrics" as WidgetType, title: "Key Metrics", defaultSize: "medium" },
    { id: "threat-map-1", type: "threat-map" as WidgetType, title: "Threat Map", defaultSize: "large" },
  ];

  // Render the appropriate widget content based on the widget type
  const renderWidget = (type: WidgetType) => {
    switch (type) {
      case "security-score":
        return <SecurityScore score={78} />;
      case "attack-chart":
        return <LazyLoadedComponent component={AttackChart} />;
      case "threat-map":
        return <LazyLoadedComponent component={ThreatMap} />;
      case "live-traffic":
        return <LazyLoadedComponent component={LiveTrafficGraph} />;
      case "metrics":
        return <KeyMetrics />;
      case "network-status":
        return <NetworkStatus />;
      case "system-health":
        return <SystemHealth />;
      default:
        return <div>Widget not found</div>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <WidgetManager 
          defaultWidgets={defaultWidgets}
          renderWidget={renderWidget}
          storageKey="dashboard-widgets"
        />
      </div>
    </DashboardLayout>
  );
};

export default CustomDashboard;
