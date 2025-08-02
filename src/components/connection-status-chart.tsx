import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";

// Generate connection status data similar to your script tracking
const generateConnectionData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 15; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 2 * 60000); // 2-minute intervals
    const established = Math.floor(Math.random() * 200) + 50;
    const active = Math.floor(Math.random() * 100) + 20;
    const closed = Math.floor(Math.random() * 50) + 5;
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: time.getTime(),
      established,
      active,
      closed,
      total: established + active + closed
    });
  }
  return data;
};

export function ConnectionStatusChart() {
  const [data, setData] = useState(generateConnectionData());
  const { isDarkMode } = useTheme();

  // Update data every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const now = new Date();
        const established = Math.floor(Math.random() * 200) + 50;
        const active = Math.floor(Math.random() * 100) + 20;
        const closed = Math.floor(Math.random() * 50) + 5;
        
        newData.push({
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timestamp: now.getTime(),
          established,
          active,
          closed,
          total: established + active + closed
        });
        return newData;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const cardClassName = isDarkMode
    ? "p-6 backdrop-blur-lg bg-gray-900/50 border border-gray-700/50 h-[400px]"
    : "p-6 backdrop-blur-lg bg-gray-50 border border-gray-200 h-[400px]";

  return (
    <Card className={cardClassName + " animate-fade-in hover-lift"}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
          Connection Status Intensity
        </h3>
        <div className="flex gap-4 mt-2 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Established</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Closed</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEstablished" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorClosed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F97316" stopOpacity={0.1} />
            </linearGradient>
          </defs>
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
          
          <Area 
            type="monotone" 
            dataKey="established" 
            stackId="1"
            stroke="#10B981" 
            fill="url(#colorEstablished)"
            name="Established Connections"
          />
          <Area 
            type="monotone" 
            dataKey="active" 
            stackId="1"
            stroke="#3B82F6" 
            fill="url(#colorActive)"
            name="Active Connections"
          />
          <Area 
            type="monotone" 
            dataKey="closed" 
            stackId="1"
            stroke="#F97316" 
            fill="url(#colorClosed)"
            name="Closed Connections"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}