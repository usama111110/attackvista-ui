import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { ArrowLeft, Shield, Activity, Clock, MapPin } from "lucide-react";
import { AttackLogTable, generateMockAttackLogs } from "./attack-log-table";

type AttackDetailProps = {
  attack: {
    id: string;
    name: string;
    value: number;
    description: string;
  };
  timeRange: string;
  onBack: () => void;
};

const generateMockData = (attackId: string, timeRange: string) => {
  const dataPoints = timeRange === "1h" ? 12 : 
                     timeRange === "6h" ? 24 : 
                     timeRange === "24h" ? 24 : 
                     timeRange === "7d" ? 14 : 30;
  
  const timeLabels = [];
  const now = new Date();
  
  if (timeRange === "1h") {
    for (let i = dataPoints - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * (5 * 60 * 1000));
      timeLabels.push(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  } else if (timeRange === "6h" || timeRange === "24h") {
    for (let i = dataPoints - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * (timeRange === "6h" ? 15 : 60) * 60 * 1000);
      timeLabels.push(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  } else {
    for (let i = dataPoints - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      timeLabels.push(`${d.getMonth() + 1}/${d.getDate()}`);
    }
  }

  const baseMultiplier = {
    "ddos": 4.5,
    "dns": 3.2,
    "exfil": 2.8,
    "ransomware": 2.2,
    "lateral": 1.8,
    "encrypted": 1.5,
    "mitre": 1.2,
    "anomaly": 1.0,
    "worm": 0.8
  }[attackId] || 1;

  return timeLabels.map((time, i) => {
    const multiplier = (i < dataPoints / 3) 
      ? i / (dataPoints / 3) 
      : (i > 2 * dataPoints / 3) 
        ? (dataPoints - i) / (dataPoints / 3) 
        : 1;
    
    const attackCount = Math.floor(Math.random() * 5 * baseMultiplier * multiplier) + 1;
    const normalTraffic = Math.floor(Math.random() * 30) + 20;
    
    return {
      time,
      attacks: attackCount,
      normal: normalTraffic,
      total: attackCount + normalTraffic
    };
  });
};

const generateSubnetData = (attackId: string) => {
  const subnets = [
    "192.168.1.0/24",
    "192.168.2.0/24",
    "10.0.0.0/24",
    "10.0.1.0/24",
    "172.16.0.0/24"
  ];
  
  return subnets.map(subnet => ({
    name: subnet,
    value: Math.floor(Math.random() * 40) + 5
  }));
};

const generateSeverityData = () => {
  return [
    { name: "Critical", value: Math.floor(Math.random() * 15) + 5 },
    { name: "High", value: Math.floor(Math.random() * 20) + 10 },
    { name: "Medium", value: Math.floor(Math.random() * 30) + 10 },
    { name: "Low", value: Math.floor(Math.random() * 20) + 5 },
  ];
};

export function AttackDetailView({ attack, timeRange, onBack }: AttackDetailProps) {
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [subnetData, setSubnetData] = useState<any[]>([]);
  const [severityData, setSeverityData] = useState<any[]>([]);
  const [attackLogs, setAttackLogs] = useState<any[]>([]);
  const [victimIp, setVictimIp] = useState<string>("");

  useEffect(() => {
    setTimelineData(generateMockData(attack.id, timeRange));
    setSubnetData(generateSubnetData(attack.id));
    setSeverityData(generateSeverityData());
    
    const { logs, victimIp } = generateMockAttackLogs(attack.id);
    setAttackLogs(logs);
    setVictimIp(victimIp);
  }, [attack.id, timeRange]);

  const COLORS = ["#F43F5E", "#FB923C", "#FACC15", "#2DD4BF"];

  return (
    <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-3 p-1 rounded-full hover:bg-gray-700/30"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold flex items-center">
              <Shield className="h-5 w-5 text-primary mr-2" />
              {attack.name} Attack Analysis
            </h2>
            <p className="text-gray-400 text-sm mt-1">{attack.description}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Attack Timeline ({timeRange === "1h" ? "5 minute intervals" : 
                              timeRange === "6h" ? "15 minute intervals" : 
                              timeRange === "24h" ? "Hourly" : "Daily"})
          </h3>
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
                <Line 
                  type="monotone" 
                  dataKey="attacks" 
                  stroke="#F43F5E" 
                  strokeWidth={2} 
                  name={`${attack.name} Attacks`} 
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="normal" 
                  stroke="#2DD4BF" 
                  strokeWidth={2} 
                  name="Normal Traffic" 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Subnet Distribution 
              {victimIp && (
                <span className="ml-2 text-sm font-normal bg-gray-800/70 px-2 py-0.5 rounded text-red-400 font-mono">
                  Target: {victimIp}
                </span>
              )}
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={subnetData} 
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
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Severity Distribution</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {severityData.map((entry, index) => (
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
          </div>
        </div>

        <AttackLogTable 
          attackId={attack.id}
          logs={attackLogs}
          victimIp={victimIp}
        />

        <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50">
          <h3 className="font-semibold mb-2">Attack Summary</h3>
          <p className="text-sm text-gray-300">
            {attack.name} attacks have been detected across multiple subnets with various severity levels. 
            The timeline shows attack patterns over the selected time period ({timeRange}). 
            Most attacks are concentrated in the {subnetData[0]?.name} subnet, with {severityData[0]?.name.toLowerCase()} severity being the most common.
            The primary victim IP address is <span className="font-mono">{victimIp}</span>, which has received {attackLogs.length} recorded attacks.
          </p>
        </div>
      </div>
    </Card>
  );
}
