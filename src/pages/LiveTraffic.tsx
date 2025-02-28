
import { DashboardLayout } from "@/components/dashboard-layout";
import { LiveTrafficGraph } from "@/components/live-traffic-graph";
import { LiveConnectionsTable } from "@/components/live-connections-table";
import { TrafficSummary } from "@/components/traffic-summary";
import { Card } from "@/components/ui/card";
import { Shield, Activity } from "lucide-react";

const LiveTraffic = () => {
  return (
    <DashboardLayout>
      <header className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Live Traffic</h1>
            <p className="text-gray-400">
              Monitor and analyze network traffic in real-time
            </p>
          </div>
        </div>
      </header>

      {/* Main traffic visualization */}
      <div className="mb-6">
        <LiveTrafficGraph />
      </div>

      {/* Traffic summary metrics */}
      <div className="mb-6">
        <TrafficSummary />
      </div>

      {/* Live connections table */}
      <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Live Network Connections</h3>
        </div>
        <LiveConnectionsTable />
      </Card>
    </DashboardLayout>
  );
};

export default LiveTraffic;
