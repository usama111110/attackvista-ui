
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

// Generate attack trends data
const generateAttackTrends = () => {
  const hours = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    hours.push({
      time: hour.getHours().toString().padStart(2, '0') + ':00',
      attacks: Math.floor(Math.random() * 50) + 10,
      blocked: Math.floor(Math.random() * 45) + 8,
      threats: Math.floor(Math.random() * 30) + 5,
    });
  }
  return hours;
};

export function AttackTrendsChart() {
  const [data, setData] = useState(generateAttackTrends());
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateAttackTrends());
    }, 60000); // Update every 60 seconds for better performance

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={`p-6 backdrop-blur-lg border hover-lift animate-fade-in ${
      isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">24-Hour Attack Trends</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          Live Data
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
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
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "rgba(17, 24, 39, 0.9)" : "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                color: isDarkMode ? "#fff" : "#333",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="attacks"
              stackId="1"
              stroke="#FF6B6B"
              fill="#FF6B6B"
              fillOpacity={0.3}
              name="Total Attacks"
            />
            <Area
              type="monotone"
              dataKey="blocked"
              stackId="2"
              stroke="#4ECDC4"
              fill="#4ECDC4"
              fillOpacity={0.3}
              name="Blocked"
            />
            <Area
              type="monotone"
              dataKey="threats"
              stackId="3"
              stroke="#45B7D1"
              fill="#45B7D1"
              fillOpacity={0.3}
              name="Threats"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
