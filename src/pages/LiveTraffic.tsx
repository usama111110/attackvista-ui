
import { DashboardLayout } from "@/components/dashboard-layout";
import { LiveTrafficGraph } from "@/components/live-traffic-graph";
import { LiveConnectionsTable } from "@/components/live-connections-table";
import { TrafficSummary } from "@/components/traffic-summary";
import { ProtocolDistributionChart } from "@/components/protocol-distribution-chart";
import { TrafficFlowChart } from "@/components/traffic-flow-chart";
import { ConnectionStatusChart } from "@/components/connection-status-chart";
import { Card } from "@/components/ui/card";
import { Shield, Activity, BarChart3, TrendingUp } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const LiveTraffic = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <DashboardLayout>
      <header className="mb-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-gradient">Live Traffic</h1>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Monitor and analyze network traffic in real-time
            </p>
          </div>
        </div>
      </header>

      {/* Main traffic visualization */}
      <div className="mb-6 animate-fade-in">
        <LiveTrafficGraph />
      </div>

      {/* Traffic summary metrics */}
      <div className="mb-6 animate-fade-in">
        <TrafficSummary />
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Traffic Flow Chart */}
        <div className="animate-fade-in">
          <TrafficFlowChart />
        </div>
        
        {/* Connection Status Chart */}
        <div className="animate-fade-in">
          <ConnectionStatusChart />
        </div>
      </div>

      {/* Protocol Distribution Chart */}
      <div className="mb-6 animate-fade-in">
        <ProtocolDistributionChart />
      </div>

      {/* Live connections table */}
      <Card className={`p-6 backdrop-blur-lg border hover-lift animate-fade-in ${
        isDarkMode 
          ? "bg-gray-900/50 border-gray-700/50" 
          : "bg-gray-50 border-gray-200"
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className={`text-lg font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>Live Network Connections</h3>
        </div>
        <LiveConnectionsTable />
      </Card>
    </DashboardLayout>
  );
};

export default LiveTraffic;
