import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

// Generate traffic flow data similar to your script metrics
const generateTrafficFlowData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3 * 60000); // 3-minute intervals
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: time.getTime(),
      ingress_rate: Math.floor(Math.random() * 150) + 20, // KB/s
      egress_rate: Math.floor(Math.random() * 120) + 15,  // KB/s
      total_connections: Math.floor(Math.random() * 500) + 100,
      active_connections: Math.floor(Math.random() * 300) + 50,
    });
  }
  return data;
};

export function TrafficFlowChart() {
  const [data, setData] = useState(generateTrafficFlowData());
  const { isDarkMode } = useTheme();

  // Calculate trends
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];
  
  const ingressTrend = previousData ? 
    ((latestData.ingress_rate - previousData.ingress_rate) / previousData.ingress_rate * 100).toFixed(1) : 
    "0.0";
  const egressTrend = previousData ? 
    ((latestData.egress_rate - previousData.egress_rate) / previousData.egress_rate * 100).toFixed(1) : 
    "0.0";
  const connectionsTrend = previousData ? 
    ((latestData.total_connections - previousData.total_connections) / previousData.total_connections * 100).toFixed(1) : 
    "0.0";

  const isIngressUp = parseFloat(ingressTrend) >= 0;
  const isEgressUp = parseFloat(egressTrend) >= 0;
  const isConnectionsUp = parseFloat(connectionsTrend) >= 0;

  // Update data every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timestamp: now.getTime(),
          ingress_rate: Math.floor(Math.random() * 150) + 20,
          egress_rate: Math.floor(Math.random() * 120) + 15,
          total_connections: Math.floor(Math.random() * 500) + 100,
          active_connections: Math.floor(Math.random() * 300) + 50,
        });
        return newData;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const cardClassName = isDarkMode
    ? "p-6 backdrop-blur-lg bg-gray-900/50 border border-gray-700/50 h-[500px]"
    : "p-6 backdrop-blur-lg bg-gray-50 border border-gray-200 h-[500px]";

  return (
    <Card className={cardClassName + " animate-fade-in hover-lift"}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
          Traffic Flow Overview
        </h3>
        <div className="flex gap-4 mt-2 md:mt-0 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Ingress</span>
            <div className={`flex items-center text-xs font-medium ${isIngressUp ? 
              (isDarkMode ? 'text-green-400' : 'text-green-600') : 
              (isDarkMode ? 'text-red-400' : 'text-red-600')
            }`}>
              {isIngressUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(parseFloat(ingressTrend))}%</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Egress</span>
            <div className={`flex items-center text-xs font-medium ${isEgressUp ? 
              (isDarkMode ? 'text-green-400' : 'text-green-600') : 
              (isDarkMode ? 'text-red-400' : 'text-red-600')
            }`}>
              {isEgressUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(parseFloat(egressTrend))}%</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Connections</span>
            <div className={`flex items-center text-xs font-medium ${isConnectionsUp ? 
              (isDarkMode ? 'text-green-400' : 'text-green-600') : 
              (isDarkMode ? 'text-red-400' : 'text-red-600')
            }`}>
              {isConnectionsUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(parseFloat(connectionsTrend))}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 
            vertical={false}
          />
          <XAxis 
            dataKey="time" 
            stroke={isDarkMode ? "#888888" : "#666666"} 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            yAxisId="traffic"
            stroke={isDarkMode ? "#888888" : "#666666"} 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} KB/s`}
          />
          <YAxis 
            yAxisId="connections"
            orientation="right"
            stroke={isDarkMode ? "#888888" : "#666666"} 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "rgba(17, 24, 39, 0.9)" : "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
            }}
            labelStyle={{
              color: isDarkMode ? "#9CA3AF" : "#666666",
              fontWeight: "bold",
            }}
          />
          <Legend 
            wrapperStyle={{
              fontSize: "12px",
              color: isDarkMode ? "#9CA3AF" : "#666666"
            }}
          />
          
          <Line 
            yAxisId="traffic"
            type="monotone" 
            dataKey="ingress_rate" 
            stroke="#2DD4BF" 
            strokeWidth={2}
            dot={false}
            name="Ingress Rate (KB/s)"
          />
          <Line 
            yAxisId="traffic"
            type="monotone" 
            dataKey="egress_rate" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={false}
            name="Egress Rate (KB/s)"
          />
          <Line 
            yAxisId="connections"
            type="monotone" 
            dataKey="total_connections" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            dot={false}
            name="Total Connections"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}