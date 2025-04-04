
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TimeFilter } from "@/components/time-filter";
import { useTheme } from "@/providers/ThemeProvider";
import { Clock, Shield, AlertTriangle } from "lucide-react";

// Mock data for charts
const attackData = [
  { name: "Mon", ddos: 4, sqlInjection: 2, xss: 1, bruteForce: 3 },
  { name: "Tue", ddos: 3, sqlInjection: 1, xss: 2, bruteForce: 2 },
  { name: "Wed", ddos: 2, sqlInjection: 3, xss: 3, bruteForce: 1 },
  { name: "Thu", ddos: 5, sqlInjection: 2, xss: 2, bruteForce: 4 },
  { name: "Fri", ddos: 3, sqlInjection: 4, xss: 1, bruteForce: 2 },
  { name: "Sat", ddos: 2, sqlInjection: 1, xss: 1, bruteForce: 1 },
  { name: "Sun", ddos: 1, sqlInjection: 2, xss: 0, bruteForce: 2 }
];

const trafficData = [
  { name: "00:00", traffic: 2100 },
  { name: "04:00", traffic: 1200 },
  { name: "08:00", traffic: 4500 },
  { name: "12:00", traffic: 5800 },
  { name: "16:00", traffic: 6200 },
  { name: "20:00", traffic: 4300 },
  { name: "23:59", traffic: 3100 }
];

const threatSourceData = [
  { name: "USA", value: 35 },
  { name: "China", value: 25 },
  { name: "Russia", value: 20 },
  { name: "Other", value: 20 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Component for metric card
const MetricCard = ({ 
  title, 
  value, 
  trend, 
  icon 
}: { 
  title: string; 
  value: string | number; 
  trend?: { value: number; isPositive: boolean }; 
  icon: React.ReactNode 
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <Card className={`p-5 ${isDarkMode ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <p className={`text-sm flex items-center gap-1 ${
              trend.isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </p>
          )}
        </div>
        <div className="bg-primary/10 p-3 rounded-lg text-primary">
          {icon}
        </div>
      </div>
    </Card>
  );
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const { isDarkMode } = useTheme();
  
  const cardClassName = isDarkMode
    ? "p-6 backdrop-blur-lg bg-gray-900/50 border border-gray-700/50"
    : "p-6 backdrop-blur-lg bg-white/90 border border-gray-200";
  
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold dark:text-gradient mb-2">Security Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive security metrics and trends</p>
        </div>
        
        <TimeFilter value={timeRange} onChange={setTimeRange} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard 
            title="Total Attacks"
            value="1,284"
            trend={{ value: 12, isPositive: false }}
            icon={<Clock size={24} />}
          />
          
          <MetricCard 
            title="Critical Vulnerabilities"
            value="23"
            trend={{ value: 5, isPositive: false }}
            icon={<AlertTriangle size={24} />}
          />
          
          <MetricCard 
            title="Security Score"
            value="78/100"
            trend={{ value: 4, isPositive: true }}
            icon={<Shield size={24} />}
          />
        </div>
        
        <Card className={cardClassName}>
          <h2 className="text-lg font-semibold mb-4">Attack Types Distribution</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attackData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', borderColor: isDarkMode ? '#374151' : '#e5e7eb' }} />
                <Legend />
                <Bar dataKey="ddos" name="DDoS Attacks" fill="#8884d8" />
                <Bar dataKey="sqlInjection" name="SQL Injection" fill="#82ca9d" />
                <Bar dataKey="xss" name="XSS Attacks" fill="#ffc658" />
                <Bar dataKey="bruteForce" name="Brute Force" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className={cardClassName}>
            <h2 className="text-lg font-semibold mb-4">Network Traffic</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', borderColor: isDarkMode ? '#374151' : '#e5e7eb' }} />
                  <Legend />
                  <Line type="monotone" dataKey="traffic" name="Traffic (requests)" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className={cardClassName}>
            <h2 className="text-lg font-semibold mb-4">Threat Sources by Country</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {threatSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', borderColor: isDarkMode ? '#374151' : '#e5e7eb' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
