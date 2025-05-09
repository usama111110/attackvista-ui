
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { memo } from "react";

const data = [
  { name: "DDoS", value: 45 },
  { name: "Malware", value: 32 },
  { name: "Phishing", value: 28 },
  { name: "SQL Inj.", value: 22 },
  { name: "XSS", value: 18 },
];

// Use memo to prevent unnecessary re-renders
export const AttackChart = memo(() => {
  return (
    <Card className="p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 h-[400px] data-card hover-lift transition-all duration-300 animate-fade-in">
      <h3 className="text-lg font-semibold mb-6 text-gradient dark:text-gradient">Attack Distribution</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 5, left: 20, bottom: 5 }}>
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
            formatter={(value: number) => [`${value} attacks`, 'Count']}
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          />
          <Bar 
            dataKey="value" 
            fill="#FF7B00"
            radius={[0, 4, 4, 0]}
            barSize={24}
            background={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
});

AttackChart.displayName = "AttackChart";
