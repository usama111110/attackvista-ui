
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { DNSDataVisualization } from "@/components/dns-data-visualization";
import { AttackTypesVisualization } from "@/components/attack-types-visualization";
import { AttackInsights } from "@/components/attack-insights";
import { AttackChart } from "@/components/attack-chart";
import { Shield, AlertTriangle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AttackDetailView } from "@/components/attack-detail-view";
import { TimeFilter } from "@/components/time-filter";

// Define the attack types
export const attackTypes = [
  { id: "ddos", name: "DDoS", value: 45, description: "Distributed Denial of Service attacks targeting network availability" },
  { id: "dns", name: "DNS", value: 32, description: "DNS-based attacks targeting domain name resolution" },
  { id: "exfil", name: "DNS Exfiltration", value: 28, description: "Data exfiltration through DNS queries" },
  { id: "ransomware", name: "Ransomware", value: 22, description: "Malware designed to block access to systems until a ransom is paid" },
  { id: "lateral", name: "Lateral Movement", value: 18, description: "Techniques used to move through a network while searching for assets and data" },
  { id: "encrypted", name: "Encrypted Attack", value: 15, description: "Attacks using encryption to evade detection" },
  { id: "mitre", name: "MITRE Attack", value: 12, description: "Attacks documented in the MITRE ATT&CK framework" },
  { id: "anomaly", name: "Anomaly", value: 10, description: "Unusual behavior detected that may indicate a security threat" },
  { id: "worm", name: "Network Worm", value: 8, description: "Self-replicating malware that spreads across networks" },
];

// Generate mock data for the attack metrics cards
const attackMetrics = [
  { name: "Active Threats", value: 27, change: 12, status: "negative" },
  { name: "Attack Types", value: 9, change: 3, status: "negative" },
  { name: "Mitigated", value: 132, change: 8, status: "positive" },
  { name: "Pending Review", value: 15, change: 5, status: "negative" },
];

const Detection = () => {
  const [selectedAttackId, setSelectedAttackId] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("24h");
  
  const selectedAttack = selectedAttackId 
    ? attackTypes.find(attack => attack.id === selectedAttackId) 
    : null;

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

      {/* Time Filter */}
      <div className="mb-6">
        <TimeFilter value={timeRange} onChange={setTimeRange} />
      </div>

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
          {selectedAttack ? (
            <AttackDetailView 
              attack={selectedAttack} 
              timeRange={timeRange} 
              onBack={() => setSelectedAttackId(null)}
            />
          ) : (
            <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Select an attack type to view detailed analysis
              </h3>
              <p className="text-gray-400 mb-4">
                Click on any attack type from the list to view detailed graphs and analysis for that specific attack.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {attackTypes.map((attack) => (
                  <button
                    key={attack.id}
                    onClick={() => setSelectedAttackId(attack.id)}
                    className="p-4 rounded-lg border border-gray-700/50 hover:bg-gray-700/30 transition-colors text-left"
                  >
                    <div className="font-medium">{attack.name}</div>
                    <div className="text-sm text-gray-400 mt-1">{attack.value} incidents</div>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
        <div>
          <AttackChart />
        </div>
      </div>

      {/* Attack types visualization */}
      {!selectedAttack && (
        <>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Attack Types Analysis
          </h2>
          <AttackTypesVisualization />
        </>
      )}

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
