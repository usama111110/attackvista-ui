
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
  Legend
} from "recharts";
import { Shield, Clock, Zap } from "lucide-react";

// Sample DNS data structure based on the provided sample
interface DNSData {
  sourceIP: string;
  destinationIP: string;
  sourcePorts: number[];
  destinationPorts: number[];
  duration: number;
  flowBytesSent: number;
  flowBytesReceived: number;
  packetLengthMean: number;
  prediction: string;
}

// Simulated data based on the sample provided
const dnsData: DNSData = {
  sourceIP: "10.0.1.42",
  destinationIP: "10.0.1.179",
  sourcePorts: [4940, 4941, 4942, 4943, 4944],
  destinationPorts: [53, 53, 53, 53, 53],
  duration: 3.43,
  flowBytesSent: 120,
  flowBytesReceived: 0,
  packetLengthMean: 60,
  prediction: "attack"
};

// Transform data for visualization
const portFrequencyData = [
  { name: "Port 53", value: 95 },
  { name: "Port 80", value: 3 },
  { name: "Port 443", value: 2 },
];

const packetSizeData = [
  { name: "<50 bytes", value: 15 },
  { name: "50-100 bytes", value: 75 },
  { name: ">100 bytes", value: 10 },
];

const predictionData = [
  { name: "Normal", value: 30 },
  { name: "Attack", value: 70 },
];

const COLORS = ["#2DD4BF", "#9333EA", "#F43F5E", "#FB923C"];

export function DNSDataVisualization() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">DNS Analysis Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Prediction</span>
              <span className={`text-xs px-2 py-1 rounded-full ${dnsData.prediction === "attack" ? "bg-red-900/40 text-red-400" : "bg-green-900/40 text-green-400"}`}>
                {dnsData.prediction.toUpperCase()}
              </span>
            </div>
            <p className="text-2xl font-semibold mt-2">DNS Request</p>
          </div>
          
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="h-4 w-4" />
              <span>Duration</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{dnsData.duration.toFixed(2)}s</p>
          </div>
          
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Zap className="h-4 w-4" />
              <span>Bytes Sent</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{dnsData.flowBytesSent} B</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Connection Details</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-gray-500">Source IP</span>
                <p className="text-sm font-medium">{dnsData.sourceIP}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Destination IP</span>
                <p className="text-sm font-medium">{dnsData.destinationIP}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Source Port</span>
                <p className="text-sm font-medium">{dnsData.sourcePorts[0]}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Destination Port</span>
                <p className="text-sm font-medium">{dnsData.destinationPorts[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
        <h3 className="text-lg font-semibold mb-4">DNS Request Pattern</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portFrequencyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {portFrequencyData.map((entry, index) => (
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
        <h3 className="text-lg font-semibold mb-4">Packet Size Distribution</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={packetSizeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
              <Bar 
                dataKey="value" 
                fill="#2DD4BF" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
                background={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
        <h3 className="text-lg font-semibold mb-4">Prediction Distribution</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={predictionData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {predictionData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.name === "Attack" ? "#F43F5E" : "#2DD4BF"} 
                  />
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
