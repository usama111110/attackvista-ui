
import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

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
    <Card className="p-6 backdrop-blur-sm bg-card h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Live Network Traffic</h3>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
          <XAxis dataKey="time" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} />
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "none",
              borderRadius: "4px",
            }}
          />
          <Area 
            type="monotone" 
            dataKey="traffic" 
            stroke="#2DD4BF" 
            fillOpacity={1} 
            fill="url(#colorTraffic)" 
            name="Total Traffic"
          />
          <Area 
            type="monotone" 
            dataKey="malicious" 
            stroke="#F43F5E" 
            fillOpacity={1} 
            fill="url(#colorMalicious)" 
            name="Malicious Traffic"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
