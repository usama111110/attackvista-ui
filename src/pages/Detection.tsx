import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AttackTypesVisualization } from "@/components/attack-types-visualization";
import { AttackInsights } from "@/components/attack-insights";
import { AttackChart } from "@/components/attack-chart";
import { Shield, AlertTriangle, Clock, LineChart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AttackDetailView } from "@/components/attack-detail-view";
import { TimeFilter } from "@/components/time-filter";
import { MetricsCard } from "@/components/metrics-card";

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
  { id: "apt", name: "APT", value: 17, description: "Advanced Persistent Threat - sophisticated, targeted cyber attacks" },
  { id: "arp", name: "ARP Poisoning", value: 14, description: "Address Resolution Protocol attacks that redirect network traffic" },
  { id: "xss", name: "XSS", value: 25, description: "Cross-Site Scripting attacks that inject malicious code into websites" },
  { id: "sql", name: "SQL Injection", value: 30, description: "Attacks that insert malicious SQL code into database queries" },
];

// Generate mock data for the attack metrics cards
const attackMetrics = [
  { name: "Active Threats", value: 27, change: 12, status: "negative", icon: <AlertTriangle className="h-5 w-5" /> },
  { name: "Attack Types", value: 9, change: 3, status: "negative", icon: <Shield className="h-5 w-5" /> },
  { name: "Mitigated", value: 132, change: 8, status: "positive", icon: <Shield className="h-5 w-5" /> },
  { name: "Pending Review", value: 15, change: 5, status: "negative", icon: <Clock className="h-5 w-5" /> },
];

const Detection = () => {
  const [selectedAttackId, setSelectedAttackId] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("24h");
  
  const selectedAttack = selectedAttackId 
    ? attackTypes.find(attack => attack.id === selectedAttackId) 
    : null;

  return (
    <DashboardLayout>
      <header className="mb-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-gradient">Attack Detection</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor and analyze security threats across your network</p>
          </div>
          <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/20 px-4 py-2 rounded-lg border border-red-200 dark:border-red-700/50 animate-pulse">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-red-600 dark:text-red-400">27 Active Threats Detected</span>
          </div>
        </div>
      </header>

      {/* Time Filter */}
      <div className="mb-6 animate-fade-in">
        <TimeFilter value={timeRange} onChange={setTimeRange} />
      </div>

      {/* Attack Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {attackMetrics.map((metric, index) => (
          <MetricsCard
            key={index}
            title={metric.name}
            value={metric.value}
            icon={metric.icon}
            className="hover-lift"
            trend={{
              value: metric.change,
              isPositive: metric.status === "positive"
            }}
          />
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
            <Card className="p-6 backdrop-blur-lg bg-white/90 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50 data-card hover-lift animate-fade-in">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Select an attack type to view detailed analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Click on any attack type from the list to view detailed graphs and analysis for that specific attack.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {attackTypes.map((attack) => (
                  <button
                    key={attack.id}
                    onClick={() => setSelectedAttackId(attack.id)}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-all duration-300 hover:scale-105 text-left hover-lift shadow-glow"
                  >
                    <div className="font-medium">{attack.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{attack.value} incidents</div>
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
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 animate-fade-in">
            <LineChart className="h-5 w-5 text-primary" />
            <span className="dark:text-gradient">Attack Types Analysis</span>
          </h2>
          <AttackTypesVisualization />
        </>
      )}

      {/* Attack insights section */}
      <div className="mt-6">
        <AttackInsights />
      </div>
    </DashboardLayout>
  );
};

export default Detection;
