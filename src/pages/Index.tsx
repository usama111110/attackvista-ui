
import { Shield, AlertTriangle, Activity, Network, Database } from "lucide-react";
import { MetricsCard } from "@/components/metrics-card";
import { AttackChart } from "@/components/attack-chart";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Security Dashboard</h1>
        <p className="text-gray-400">Real-time network security monitoring</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Attacks"
          value="1,234"
          icon={<Shield className="animate-pulse" />}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttackChart />
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-card p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Attacks</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Network className="text-primary" />
                    <div>
                      <p className="font-medium">DDoS Attack Detected</p>
                      <p className="text-sm text-gray-400">192.168.1.1</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">2 min ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
