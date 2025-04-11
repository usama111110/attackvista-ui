
import { useState, useEffect, memo } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useTheme } from "@/providers/ThemeProvider";

// Random data generation for our visualizations
const generateDailyData = () => {
  const data = [];
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  
  for (let i = 1; i <= daysInMonth; i++) {
    data.push({
      day: i,
      attacks: Math.floor(Math.random() * 100),
      blocked: Math.floor(Math.random() * 80),
      critical: Math.floor(Math.random() * 20),
    });
  }
  return data;
};

const generateHourlyData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: i,
      traffic: Math.floor(Math.random() * 200) + 100,
      malicious: Math.floor(Math.random() * 50),
    });
  }
  return data;
};

const generateAttackTypeData = () => [
  { name: "DDoS", value: Math.floor(Math.random() * 50) + 30 },
  { name: "SQL Injection", value: Math.floor(Math.random() * 40) + 20 },
  { name: "XSS", value: Math.floor(Math.random() * 30) + 15 },
  { name: "Brute Force", value: Math.floor(Math.random() * 25) + 10 },
  { name: "Malware", value: Math.floor(Math.random() * 20) + 15 },
];

const generateLocationData = () => [
  { name: "North America", value: Math.floor(Math.random() * 50) + 30 },
  { name: "Europe", value: Math.floor(Math.random() * 40) + 25 },
  { name: "Asia", value: Math.floor(Math.random() * 35) + 20 },
  { name: "South America", value: Math.floor(Math.random() * 20) + 10 },
  { name: "Australia", value: Math.floor(Math.random() * 15) + 5 },
  { name: "Africa", value: Math.floor(Math.random() * 10) + 5 },
];

// Colors for our charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Enhanced tooltip formatter
const tooltipFormatter = (value: number, name: string) => {
  // Customize label names for better readability
  const labelMap: Record<string, string> = {
    attacks: 'Total Attacks',
    blocked: 'Blocked Attacks',
    critical: 'Critical Threats',
    traffic: 'Network Traffic',
    malicious: 'Malicious Traffic',
  };
  
  return [value, labelMap[name] || name];
};

// The main visualization component
export const SecurityTrendsChart = memo(() => {
  const [dailyData, setDailyData] = useState(generateDailyData());
  const [hourlyData, setHourlyData] = useState(generateHourlyData());
  const [attackTypeData, setAttackTypeData] = useState(generateAttackTypeData());
  const [locationData, setLocationData] = useState(generateLocationData());
  const { isDarkMode } = useTheme();
  
  // Refresh data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setHourlyData(generateHourlyData());
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const axisStyle = {
    stroke: isDarkMode ? '#888888' : '#666666',
    fontSize: 12,
  };
  
  const gridStyle = {
    stroke: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    strokeDasharray: '3 3',
  };
  
  const tooltipStyle = {
    backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.95)',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    color: isDarkMode ? '#fff' : '#333',
  };
  
  return (
    <Card className={`w-full p-6 backdrop-blur-lg border ${
      isDarkMode 
        ? 'border-gray-700/50 bg-gray-900/50' 
        : 'border-gray-200 bg-white/90'
    } hover-lift transition-all duration-300 animate-fade-in h-[500px]`}>
      <Tabs defaultValue="daily">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Security Trends</h3>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="hourly">Hourly</TabsTrigger>
            <TabsTrigger value="types">Attack Types</TabsTrigger>
            <TabsTrigger value="geo">Geographic</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="daily" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF8042" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF8042" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" {...axisStyle} />
              <YAxis {...axisStyle} />
              <CartesianGrid {...gridStyle} vertical={false} />
              <Tooltip 
                contentStyle={tooltipStyle}
                formatter={tooltipFormatter}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="attacks" 
                stroke="#0088FE" 
                fillOpacity={1} 
                fill="url(#colorAttacks)" 
                activeDot={{ r: 6 }}
              />
              <Area 
                type="monotone" 
                dataKey="blocked" 
                stroke="#00C49F" 
                fillOpacity={1} 
                fill="url(#colorBlocked)" 
              />
              <Area 
                type="monotone" 
                dataKey="critical" 
                stroke="#FF8042" 
                fillOpacity={1} 
                fill="url(#colorCritical)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="hourly" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="hour" 
                {...axisStyle}
                tickFormatter={(hour) => `${hour}:00`}
              />
              <YAxis {...axisStyle} />
              <CartesianGrid {...gridStyle} vertical={false} />
              <Tooltip 
                contentStyle={tooltipStyle}
                formatter={tooltipFormatter}
                labelFormatter={(hour) => `${hour}:00 - ${(hour + 1) % 24}:00`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="traffic" 
                stroke="#0088FE" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="malicious" 
                stroke="#FF8042" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="types" className="h-[400px]">
          <div className="grid grid-cols-2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attackTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {attackTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={tooltipStyle}
                  formatter={(value) => [`${value} attacks`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={attackTypeData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" {...axisStyle} />
                <YAxis dataKey="name" type="category" {...axisStyle} />
                <Tooltip 
                  contentStyle={tooltipStyle}
                  formatter={(value) => [`${value} attacks`, 'Count']}
                />
                <Bar dataKey="value" fill="#8884d8" background={{ fill: 'rgba(255, 255, 255, 0.05)' }}>
                  {attackTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="geo" className="h-[400px]">
          <div className="grid grid-cols-2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={tooltipStyle}
                  formatter={(value) => [`${value} attacks`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={locationData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" {...axisStyle} />
                <YAxis dataKey="name" type="category" {...axisStyle} width={100} />
                <Tooltip 
                  contentStyle={tooltipStyle}
                  formatter={(value) => [`${value} attacks`, 'Count']}
                />
                <Bar dataKey="value" fill="#8884d8" background={{ fill: 'rgba(255, 255, 255, 0.05)' }}>
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
});

SecurityTrendsChart.displayName = "SecurityTrendsChart";
