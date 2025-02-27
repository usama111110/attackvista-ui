
import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Generate random traffic data for demonstration
const generateTrafficData = () => {
  const now = new Date();
  const data = [];
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      traffic: Math.floor(Math.random() * 80) + 20,
      malicious: Math.floor(Math.random() * 30)
    });
  }
  return data;
};

export function LiveTrafficGraph() {
  const [data, setData] = useState(generateTrafficData());

  // Calculate trends
  const trafficTrend = data.length > 1 ? 
    ((data[data.length-1].traffic - data[0].traffic) / data[0].traffic * 100).toFixed(1) : 
    "0.0";
  
  const maliciousTrend = data.length > 1 ? 
    ((data[data.length-1].malicious - data[0].malicious) / data[0].malicious * 100).toFixed(1) : 
    "0.0";

  const isTrafficUp = parseFloat(trafficTrend) >= 0;
  const isMaliciousUp = parseFloat(maliciousTrend) >= 0;

  // Update data every 5 seconds to simulate live traffic
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...data.slice(1)];
      const now = new Date();
      newData.push({
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        traffic: Math.floor(Math.random() * 80) + 20,
        malicious: Math.floor(Math.random() * 30)
      });
      setData(newData);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50 h-[400px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Live Network Traffic</h3>
        <div className="flex gap-4 mt-2 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/80"></div>
            <span className="text-sm text-gray-300">Total Traffic</span>
            <div className={`flex items-center text-xs font-medium ${isTrafficUp ? 'text-green-400' : 'text-red-400'}`}>
              {isTrafficUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(parseFloat(trafficTrend))}%</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <span className="text-sm text-gray-300">Malicious</span>
            <div className={`flex items-center text-xs font-medium ${!isMaliciousUp ? 'text-green-400' : 'text-red-400'}`}>
              {isMaliciousUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(parseFloat(maliciousTrend))}%</span>
            </div>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMalicious" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.1)" 
            vertical={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(17, 24, 39, 0.9)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
              color: "#fff",
            }}
            itemStyle={{
              color: "#fff",
            }}
            labelStyle={{
              color: "#9CA3AF",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          />
          <Area 
            type="monotone" 
            dataKey="traffic" 
            stroke="#2DD4BF" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorTraffic)" 
            name="Total Traffic"
          />
          <Area 
            type="monotone" 
            dataKey="malicious" 
            stroke="#F43F5E" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorMalicious)" 
            name="Malicious Traffic"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
