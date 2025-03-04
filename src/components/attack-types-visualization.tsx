import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from "recharts";
import { Shield, AlertTriangle, Bug, Eye, Worm, Lock, Network, Zap, Radiation, ServerCrash } from "lucide-react";

// Attack type data for visualization
const attackTypeData = [
  { name: "DDoS", value: 45, icon: Zap },
  { name: "DNS", value: 32, icon: Network },
  { name: "DNS Exfiltration", value: 28, icon: Bug },
  { name: "Ransomware", value: 22, icon: Lock },
  { name: "Lateral Movement", value: 18, icon: Network },
  { name: "Encrypted Attack", value: 15, icon: Shield },
  { name: "MITRE Attack", value: 12, icon: Shield },
  { name: "Anomaly", value: 10, icon: AlertTriangle },
  { name: "Network Worm", value: 8, icon: Worm },
  { name: "APT", value: 17, icon: Shield },
  { name: "ARP Poisoning", value: 14, icon: Network },
  { name: "XSS", value: 25, icon: Bug },
  { name: "SQL Injection", value: 30, icon: ServerCrash },
];

// Timeline data
const timelineData = [
  { time: "00:00", ddos: 5, dns: 3, exfil: 2, ransomware: 1, lateral: 2, encrypted: 1, mitre: 1, anomaly: 1, worm: 0, apt: 2, arp: 1, xss: 3, sql: 4 },
  { time: "04:00", ddos: 3, dns: 4, exfil: 3, ransomware: 2, lateral: 1, encrypted: 2, mitre: 1, anomaly: 0, worm: 1, apt: 3, arp: 2, xss: 4, sql: 5 },
  { time: "08:00", ddos: 7, dns: 6, exfil: 5, ransomware: 4, lateral: 3, encrypted: 2, mitre: 2, anomaly: 2, worm: 1, apt: 4, arp: 3, xss: 5, sql: 6 },
  { time: "12:00", ddos: 10, dns: 8, exfil: 6, ransomware: 5, lateral: 4, encrypted: 3, mitre: 3, anomaly: 2, worm: 2, apt: 5, arp: 4, xss: 7, sql: 8 },
  { time: "16:00", ddos: 12, dns: 7, exfil: 8, ransomware: 6, lateral: 5, encrypted: 4, mitre: 3, anomaly: 3, worm: 2, apt: 4, arp: 3, xss: 6, sql: 7 },
  { time: "20:00", ddos: 8, dns: 4, exfil: 4, ransomware: 4, lateral: 3, encrypted: 3, mitre: 2, anomaly: 2, worm: 2, apt: 3, arp: 2, xss: 5, sql: 6 },
];

const severity = [
  { name: "Critical", value: 15 },
  { name: "High", value: 25 },
  { name: "Medium", value: 35 },
  { name: "Low", value: 25 },
];

const COLORS = ["#F43F5E", "#FB923C", "#FACC15", "#2DD4BF"];

export function AttackTypesVisualization() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50 col-span-1 md:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Attack Timeline (24h)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timelineData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(17, 24, 39, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="ddos" stroke="#F43F5E" strokeWidth={2} name="DDoS" dot={false} />
              <Line type="monotone" dataKey="dns" stroke="#2DD4BF" strokeWidth={2} name="DNS" dot={false} />
              <Line type="monotone" dataKey="exfil" stroke="#FACC15" strokeWidth={2} name="DNS Exfiltration" dot={false} />
              <Line type="monotone" dataKey="ransomware" stroke="#9333EA" strokeWidth={2} name="Ransomware" dot={false} />
              <Line type="monotone" dataKey="lateral" stroke="#FB923C" strokeWidth={2} name="Lateral Movement" dot={false} />
              <Line type="monotone" dataKey="encrypted" stroke="#3B82F6" strokeWidth={2} name="Encrypted Attack" dot={false} />
              <Line type="monotone" dataKey="mitre" stroke="#A1E3CB" strokeWidth={2} name="MITRE Attack" dot={false} />
              <Line type="monotone" dataKey="anomaly" stroke="#A855F7" strokeWidth={2} name="Anomaly" dot={false} />
              <Line type="monotone" dataKey="worm" stroke="#EC4899" strokeWidth={2} name="Network Worm" dot={false} />
              <Line type="monotone" dataKey="apt" stroke="#10B981" strokeWidth={2} name="APT" dot={false} />
              <Line type="monotone" dataKey="arp" stroke="#6366F1" strokeWidth={2} name="ARP Poisoning" dot={false} />
              <Line type="monotone" dataKey="xss" stroke="#D946EF" strokeWidth={2} name="XSS" dot={false} />
              <Line type="monotone" dataKey="sql" stroke="#F97316" strokeWidth={2} name="SQL Injection" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
        <h3 className="text-lg font-semibold mb-4">Attack Type Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={attackTypeData} 
              layout="vertical" 
              margin={{ top: 5, right: 5, left: 40, bottom: 5 }}
            >
              <XAxis 
                type="number" 
                domain={[0, 'dataMax + 10']}
                stroke="#888888" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(17, 24, 39, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                  color: "#fff",
                }}
                formatter={(value: number) => [`${value} incidents`, 'Count']}
                cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
              />
              <Bar 
                dataKey="value" 
                fill="#2DD4BF"
                radius={[0, 4, 4, 0]}
                barSize={20}
                background={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
        <h3 className="text-lg font-semibold mb-4">Severity Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={severity}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {severity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(17, 24, 39, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
