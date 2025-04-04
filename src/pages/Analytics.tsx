
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { LineChart, BarChart, Gauge, PieChart, Calendar, Download, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";

// Sample data for charts
const attackTrendData = [
  { name: "Jan", ddos: 40, sql: 24, xss: 18 },
  { name: "Feb", ddos: 30, sql: 28, xss: 22 },
  { name: "Mar", ddos: 20, sql: 26, xss: 23 },
  { name: "Apr", ddos: 27, sql: 30, xss: 26 },
  { name: "May", ddos: 18, sql: 28, xss: 24 },
  { name: "Jun", ddos: 23, sql: 34, xss: 29 },
  { name: "Jul", ddos: 34, sql: 36, xss: 33 },
  { name: "Aug", ddos: 45, sql: 32, xss: 30 },
];

const threatSourceData = [
  { name: "North America", value: 35 },
  { name: "Europe", value: 25 },
  { name: "Asia", value: 30 },
  { name: "Other", value: 10 },
];

const mitigationData = [
  { name: "Blocked", value: 840 },
  { name: "Quarantined", value: 350 },
  { name: "Logged Only", value: 190 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const THREAT_COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

const Analytics = () => {
  const { isDarkMode } = useTheme();
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <DashboardLayout>
      <header className="mb-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-gradient">Security Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced insights and threat intelligence
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 animate-fade-in">
        <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Attacks</p>
              <p className="text-2xl font-bold mt-1">1,384</p>
            </div>
            <div className="p-3 rounded-full bg-red-500/10">
              <Gauge className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="mt-3 text-xs text-red-500">
            +12.5% from last period
          </div>
        </Card>
        
        <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Response Time</p>
              <p className="text-2xl font-bold mt-1">3.2 min</p>
            </div>
            <div className="p-3 rounded-full bg-blue-500/10">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-3 text-xs text-green-500">
            -8.3% from last period
          </div>
        </Card>
        
        <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Threat Score</p>
              <p className="text-2xl font-bold mt-1">72/100</p>
            </div>
            <div className="p-3 rounded-full bg-amber-500/10">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
          </div>
          <div className="mt-3 text-xs text-amber-500">
            +5.2% from last period
          </div>
        </Card>
        
        <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mitigated</p>
              <p className="text-2xl font-bold mt-1">1,190</p>
            </div>
            <div className="p-3 rounded-full bg-green-500/10">
              <Shield className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="mt-3 text-xs text-green-500">
            +9.7% from last period
          </div>
        </Card>
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className={`lg:col-span-2 p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              Attack Trends
            </h3>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="h-8 px-2">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={attackTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                <XAxis dataKey="name" stroke={isDarkMode ? "#888" : "#333"} />
                <YAxis stroke={isDarkMode ? "#888" : "#333"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "rgba(17, 24, 39, 0.9)" : "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    color: isDarkMode ? "#fff" : "#000",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="ddos" stroke="#FF6384" strokeWidth={2} activeDot={{ r: 8 }} name="DDoS Attacks" />
                <Line type="monotone" dataKey="sql" stroke="#36A2EB" strokeWidth={2} name="SQL Injections" />
                <Line type="monotone" dataKey="xss" stroke="#FFCE56" strokeWidth={2} name="XSS Attacks" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Threat Sources
            </h3>
          </div>
          
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={threatSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {threatSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={THREAT_COLORS[index % THREAT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "rgba(17, 24, 39, 0.9)" : "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    color: isDarkMode ? "#fff" : "#000",
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Secondary charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Mitigation Actions
            </h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={mitigationData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                <XAxis dataKey="name" stroke={isDarkMode ? "#888" : "#333"} />
                <YAxis stroke={isDarkMode ? "#888" : "#333"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "rgba(17, 24, 39, 0.9)" : "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    color: isDarkMode ? "#fff" : "#000",
                  }}
                />
                <Legend />
                <Bar dataKey="value" fill="#4BC0C0" radius={[4, 4, 0, 0]} name="Count" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Security Events Timeline</h3>
            <Button variant="outline" size="sm" className="h-8">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </div>
          
          <div className="space-y-4">
            {[
              { time: "09:45 AM", event: "Firewall blocked suspicious IP", severity: "Medium" },
              { time: "11:23 AM", event: "Multiple failed login attempts", severity: "High" },
              { time: "01:12 PM", event: "System update completed", severity: "Info" },
              { time: "03:57 PM", event: "Data exfiltration attempt detected", severity: "Critical" },
              { time: "06:30 PM", event: "Scheduled security scan completed", severity: "Info" },
            ].map((event, index) => (
              <div key={index} className="flex items-start">
                <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 mr-3 ${
                  event.severity === "Critical" ? "bg-red-500" :
                  event.severity === "High" ? "bg-orange-500" :
                  event.severity === "Medium" ? "bg-yellow-500" :
                  "bg-blue-500"
                }`}></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{event.event}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{event.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Severity: {event.severity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
