
import { DashboardLayout } from "@/components/dashboard-layout";
import { DNSDataVisualization } from "@/components/dns-data-visualization";
import { AttackTypesVisualization } from "@/components/attack-types-visualization";
import { AttackInsights } from "@/components/attack-insights";
import { AttackChart } from "@/components/attack-chart";
import { LiveTrafficGraph } from "@/components/live-traffic-graph";
import { Shield, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

// Generate mock data for the attack metrics cards
const attackMetrics = [
  { name: "Active Threats", value: 27, change: 12, status: "negative" },
  { name: "Attack Types", value: 9, change: 3, status: "negative" },
  { name: "Mitigated", value: 132, change: 8, status: "positive" },
  { name: "Pending Review", value: 15, change: 5, status: "negative" },
];

const Detection = () => {
  return (
    <DashboardLayout>
      <header className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Attack Detection</h1>
            <p className="text-gray-400">Monitor and analyze security threats across your network</p>
          </div>
          <div className="flex items-center gap-2 bg-red-900/20 px-4 py-2 rounded-lg border border-red-700/50">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <span className="text-sm font-medium text-red-400">27 Active Threats Detected</span>
          </div>
        </div>
      </header>

      {/* Attack Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {attackMetrics.map((metric, index) => (
          <Card key={index} className="p-4 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">{metric.name}</span>
              <span className="text-2xl font-bold mt-1">{metric.value}</span>
              <div className="flex items-center mt-2">
                <span
                  className={`text-xs ${
                    metric.status === "positive"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {metric.status === "positive" ? "↓" : "↑"} {metric.change}%
                </span>
                <span className="text-gray-500 text-xs ml-1">vs last week</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main attack visualization section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <LiveTrafficGraph />
        </div>
        <div>
          <AttackChart />
        </div>
      </div>

      {/* Attack types visualization */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        Attack Types Analysis
      </h2>
      <AttackTypesVisualization />

      {/* Attack insights and DNS analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <AttackInsights />
        <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">DNS Attack Investigation</h3>
          </div>
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 mb-4">
            <p className="text-sm text-gray-300">
              The DNS analysis shows suspicious patterns with high rates of requests to domain names
              that appear to be randomly generated. This is a common sign of DNS exfiltration or
              communication with command and control servers.
            </p>
          </div>
          <DNSDataVisualization />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Detection;
