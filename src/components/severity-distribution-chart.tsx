
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const severityData = [
  { name: 'Critical', value: 23, color: '#EF4444' },
  { name: 'High', value: 45, color: '#F97316' },
  { name: 'Medium', value: 78, color: '#EAB308' },
  { name: 'Low', value: 32, color: '#22C55E' },
];

const attackTypeData = [
  { type: 'DDoS', count: 45, severity: 'High' },
  { type: 'SQL Injection', count: 23, severity: 'Critical' },
  { type: 'Brute Force', count: 67, severity: 'Medium' },
  { type: 'XSS', count: 34, severity: 'High' },
  { type: 'Malware', count: 12, severity: 'Critical' },
  { type: 'Phishing', count: 28, severity: 'Medium' },
];

export function SeverityDistributionChart() {
  const { isDarkMode } = useTheme();
  const [selectedView, setSelectedView] = useState<'severity' | 'types'>('severity');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${
          isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <p className="font-medium">{payload[0].name || label}</p>
          <p className="text-sm">
            <span style={{ color: payload[0].color }}>●</span>
            {` ${payload[0].value} attacks`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`p-6 backdrop-blur-lg border hover-lift animate-fade-in ${
      isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Attack Analysis</h3>
        <div className="flex gap-2">
          <Badge 
            variant={selectedView === 'severity' ? 'default' : 'outline'}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => setSelectedView('severity')}
          >
            By Severity
          </Badge>
          <Badge 
            variant={selectedView === 'types' ? 'default' : 'outline'}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => setSelectedView('types')}
          >
            By Type
          </Badge>
        </div>
      </div>

      {selectedView === 'severity' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {severityData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg">{item.value}</span>
                  <p className="text-xs text-muted-foreground">
                    {((item.value / severityData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attackTypeData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="type" 
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
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              >
                {attackTypeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.severity === 'Critical' ? '#EF4444' :
                      entry.severity === 'High' ? '#F97316' :
                      entry.severity === 'Medium' ? '#EAB308' : '#22C55E'
                    } 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
