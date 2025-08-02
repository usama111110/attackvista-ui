import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";

// Generate protocol distribution data similar to your script
const generateProtocolData = () => {
  const protocols = ['HTTP', 'HTTPS', 'TCP', 'UDP', 'ICMP', 'DNS', 'FTP', 'SSH'];
  const hours = [];
  
  for (let i = 23; i >= 0; i--) {
    const hour = new Date();
    hour.setHours(hour.getHours() - i, 0, 0, 0);
    
    const dataPoint: any = {
      time: hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: hour.getTime(),
    };
    
    let total = 100;
    protocols.forEach((protocol, index) => {
      if (index === protocols.length - 1) {
        dataPoint[protocol] = total;
      } else {
        const value = Math.floor(Math.random() * (total * 0.3)) + 5;
        dataPoint[protocol] = value;
        total -= value;
      }
    });
    
    hours.push(dataPoint);
  }
  
  return hours;
};

const protocolColors = {
  HTTP: "#3B82F6",
  HTTPS: "#10B981", 
  TCP: "#8B5CF6",
  UDP: "#F59E0B",
  ICMP: "#EF4444",
  DNS: "#06B6D4",
  FTP: "#84CC16",
  SSH: "#F97316"
};

export function ProtocolDistributionChart() {
  const [data, setData] = useState(generateProtocolData());
  const { isDarkMode } = useTheme();

  // Update data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const now = new Date();
        const protocols = Object.keys(protocolColors);
        
        const dataPoint: any = {
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timestamp: now.getTime(),
        };
        
        let total = 100;
        protocols.forEach((protocol, index) => {
          if (index === protocols.length - 1) {
            dataPoint[protocol] = total;
          } else {
            const value = Math.floor(Math.random() * (total * 0.3)) + 5;
            dataPoint[protocol] = value;
            total -= value;
          }
        });
        
        newData.push(dataPoint);
        return newData;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const cardClassName = isDarkMode
    ? "p-6 backdrop-blur-lg bg-gray-900/50 border border-gray-700/50 h-[400px]"
    : "p-6 backdrop-blur-lg bg-gray-50 border border-gray-200 h-[400px]";

  return (
    <Card className={cardClassName + " animate-fade-in hover-lift"}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
          Protocol Distribution Mix
        </h3>
        <div className="text-xs text-muted-foreground">
          Last 24 hours • Live updates
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke={isDarkMode ? "#888888" : "#666666"} 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
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
          
          {Object.entries(protocolColors).map(([protocol, color]) => (
            <Bar 
              key={protocol}
              dataKey={protocol} 
              stackId="protocols"
              fill={color}
              stroke="none"
              name={protocol}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}