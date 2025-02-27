
import { Shield, AlertTriangle, Activity, Network, Database, Lock } from "lucide-react";
import { MetricsCard } from "@/components/metrics-card";
import { AttackChart } from "@/components/attack-chart";
import { LiveTrafficGraph } from "@/components/live-traffic-graph";
import { DashboardLayout } from "@/components/dashboard-layout";

const Index = () => {
  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Security Dashboard</h1>
        <p className="text-gray-400">Real-time network security monitoring</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Attacks"
          value="1,234"
          icon={<Shield />}
          trend={{ value: 12, isPositive: false }}
        />
        <MetricsCard
          title="Critical Threats"
          value="23"
          icon={<AlertTriangle className="text-destructive" />}
          trend={{ value: 5, isPositive: false }}
        />
        <MetricsCard
          title="Network Status"
          value="Stable"
          icon={<Activity className="text-green-400" />}
        />
        <MetricsCard
          title="Protected Systems"
          value="156"
          icon={<Database />}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LiveTrafficGraph />
        <AttackChart />
      </div>

      <div className="bg-card p-6 rounded-lg backdrop-blur-sm mb-6">
        <h3 className="text-lg font-semibold mb-4">Recent Attacks</h3>
        <div className="space-y-4">
          {[
            { type: "DDoS Attack", ip: "192.168.1.1", time: "2 min ago", severity: "High" },
            { type: "SQL Injection", ip: "192.168.1.45", time: "15 min ago", severity: "Critical" },
            { type: "Brute Force", ip: "192.168.2.12", time: "1 hour ago", severity: "Medium" }
          ].map((attack, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
              <div className="flex items-center gap-4">
                <Network className="text-primary" />
                <div>
                  <p className="font-medium">{attack.type}</p>
                  <p className="text-sm text-gray-400">{attack.ip}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  attack.severity === "Critical" ? "bg-red-900/50 text-red-400" :
                  attack.severity === "High" ? "bg-orange-900/50 text-orange-400" :
                  "bg-yellow-900/50 text-yellow-400"
                }`}>
                  {attack.severity}
                </span>
                <span className="text-sm text-gray-400">{attack.time}</span>
                <button className="p-1.5 bg-primary/20 text-primary rounded-md hover:bg-primary/30 transition-colors">
                  <Lock size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Index;
