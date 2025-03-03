
import { Shield, AlertTriangle, Activity, Network, Database, Lock, Zap, AreaChart, Gauge, Globe, Loader2 } from "lucide-react";
import { MetricsCard } from "@/components/metrics-card";
import { AttackChart } from "@/components/attack-chart";
import { LiveTrafficGraph } from "@/components/live-traffic-graph";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { SecurityScore } from "@/components/security-score";
import { ThreatMap } from "@/components/threat-map";
import { Link } from "react-router-dom";
import { useTheme } from "@/providers/ThemeProvider";

const Index = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <DashboardLayout>
      <header className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold dark:text-gradient">Security Dashboard</h1>
          <div className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-800/40 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700/50">
            <Loader2 size={14} className="animate-spin text-primary" />
            <span className="text-gray-700 dark:text-gray-300">Live monitoring active</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Real-time network security monitoring</p>
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
          icon={<Activity className="text-green-600 dark:text-green-400" />}
        />
        <MetricsCard
          title="Protected Systems"
          value="156"
          icon={<Database />}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <LiveTrafficGraph />
        </div>
        <SecurityScore score={78} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className={`p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 h-[400px] hover-lift animate-fade-in ${
            isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Global Threat Map</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Live attacks</span>
              </div>
            </div>
            <ThreatMap />
          </Card>
        </div>
        <AttackChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className={`p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 hover-lift animate-fade-in ${
            isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
          }`}>
          <h3 className="text-lg font-semibold mb-4">Network Performance</h3>
          <div className="space-y-4">
            {[
              { name: "Main Gateway", value: 92, icon: <Globe size={18} /> },
              { name: "Database Server", value: 88, icon: <Database size={18} /> },
              { name: "Application Server", value: 95, icon: <Zap size={18} /> },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-200/70"}`}>
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-36 h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700/50" : "bg-gray-200/70"}`}>
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className={`p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 hover-lift animate-fade-in ${
            isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
          }`}>
          <h3 className="text-lg font-semibold mb-4">System Health</h3>
          <div className="space-y-4">
            {[
              { name: "CPU Usage", value: 42, icon: <Gauge size={18} /> },
              { name: "Memory Usage", value: 65, icon: <AreaChart size={18} /> },
              { name: "Disk Space", value: 28, icon: <Database size={18} /> },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-200/70"}`}>
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-36 h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700/50" : "bg-gray-200/70"}`}>
                    <div 
                      className={`h-full rounded-full ${
                        item.value > 80 ? 'bg-red-500' : 
                        item.value > 60 ? 'bg-orange-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className={`p-6 rounded-lg backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 mb-6 hover-lift animate-fade-in ${
        isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Attacks</h3>
          <Link to="/live-traffic" className="text-xs text-primary hover:underline">View all</Link>
        </div>
        <div className="space-y-4">
          {[
            { type: "DDoS Attack", ip: "192.168.1.1", time: "2 min ago", severity: "High" },
            { type: "SQL Injection", ip: "192.168.1.45", time: "15 min ago", severity: "Critical" },
            { type: "Brute Force", ip: "192.168.2.12", time: "1 hour ago", severity: "Medium" }
          ].map((attack, i) => (
            <div key={i} className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
              isDarkMode 
                ? "bg-black/20 hover:bg-black/30" 
                : "bg-gray-100/70 hover:bg-gray-200/70"
            }`}>
              <div className="flex items-center gap-4">
                <Network className="text-primary" />
                <div>
                  <p className="font-medium">{attack.type}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{attack.ip}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  attack.severity === "Critical" ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400" :
                  attack.severity === "High" ? "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400" :
                  "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400"
                }`}>
                  {attack.severity}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{attack.time}</span>
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
