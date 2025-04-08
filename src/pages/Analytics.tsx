
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Cell,
  AreaChart,
  Area
} from "recharts";
import { TimeFilter } from "@/components/time-filter";
import { useTheme } from "@/providers/ThemeProvider";
import { 
  Clock, 
  Shield, 
  AlertTriangle,
  Download,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  RefreshCw,
  Filter,
  Calendar,
  ChevronDown,
  Layers
} from "lucide-react";
import { toast } from "sonner";
import { SecurityScore } from "@/components/security-score";
import { AttackTypesVisualization } from "@/components/attack-types-visualization";
import { AttackInsights } from "@/components/attack-insights";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsCard } from "@/components/metrics-card";
import MetricToggle from "@/components/metric-toggle";

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

const areaChartData = [
  { name: "Jan", blocked: 4000, detected: 2400, amt: 2400 },
  { name: "Feb", blocked: 3000, detected: 1398, amt: 2210 },
  { name: "Mar", blocked: 2000, detected: 9800, amt: 2290 },
  { name: "Apr", blocked: 2780, detected: 3908, amt: 2000 },
  { name: "May", blocked: 1890, detected: 4800, amt: 2181 },
  { name: "Jun", blocked: 2390, detected: 3800, amt: 2500 },
  { name: "Jul", blocked: 3490, detected: 4300, amt: 2100 },
];

const comparisonData = [
  { name: "Mon", current: 4, previous: 2 },
  { name: "Tue", current: 3, previous: 4 },
  { name: "Wed", current: 5, previous: 3 },
  { name: "Thu", current: 7, previous: 5 },
  { name: "Fri", current: 6, previous: 4 },
  { name: "Sat", current: 4, previous: 3 },
  { name: "Sun", current: 3, previous: 2 }
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [chartType, setChartType] = useState("bar");
  const [realtimeUpdates, setRealtimeUpdates] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [chartData, setChartData] = useState(attackData);
  const [visibleMetrics, setVisibleMetrics] = useState<string[]>(["ddos", "sqlInjection", "xss", "bruteForce"]);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    if (!realtimeUpdates) return;
    
    const interval = setInterval(() => {
      const newData = attackData.map(item => ({
        ...item,
        ddos: item.ddos + Math.floor(Math.random() * 3) - 1,
        sqlInjection: item.sqlInjection + Math.floor(Math.random() * 3) - 1,
        xss: item.xss + Math.floor(Math.random() * 2),
        bruteForce: item.bruteForce + Math.floor(Math.random() * 3) - 1
      }));
      
      setChartData(newData);
      
      if (Math.random() > 0.7) {
        toast.info("Attack pattern change detected", {
          description: "Unusual activity detected in the network",
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [realtimeUpdates]);
  
  const cardClassName = isDarkMode
    ? "backdrop-blur-xl bg-gray-900/50 border border-gray-700/50 shadow-lg"
    : "backdrop-blur-xl bg-white/90 border border-gray-200 shadow-md";
  
  const exportData = (dataType: string) => {
    toast.success(`Analytics data exported`, {
      description: `${dataType} data has been exported to CSV`,
    });
  };
  
  const toggleMetric = (metric: string) => {
    setVisibleMetrics(current => 
      current.includes(metric) 
        ? current.filter(m => m !== metric)
        : [...current, metric]
    );
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold dark:text-gradient mb-1">Security Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive security metrics and trends</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-2 bg-muted/50 rounded-md px-3 py-1.5">
              <Switch 
                id="realtime-updates" 
                checked={realtimeUpdates}
                onCheckedChange={setRealtimeUpdates}
              />
              <label 
                htmlFor="realtime-updates" 
                className="text-sm font-medium cursor-pointer flex items-center gap-1"
              >
                <RefreshCw size={14} />
                Realtime
              </label>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Download size={16} />
                  Export
                  <ChevronDown size={14} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="p-0">
                <div className="p-1">
                  <div className="cursor-pointer px-2 py-1.5 hover:bg-accent rounded-sm" onClick={() => exportData("Attack")}>
                    Export Attack Data
                  </div>
                  <div className="cursor-pointer px-2 py-1.5 hover:bg-accent rounded-sm" onClick={() => exportData("Traffic")}>
                    Export Traffic Data
                  </div>
                  <div className="cursor-pointer px-2 py-1.5 hover:bg-accent rounded-sm" onClick={() => exportData("Threats")}>
                    Export Threat Sources
                  </div>
                  <div className="cursor-pointer px-2 py-1.5 hover:bg-accent rounded-sm" onClick={() => exportData("All")}>
                    Export All Data
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TimeFilter value={timeRange} onChange={setTimeRange} />
          
          <Card className={`${cardClassName} flex items-center justify-between px-4 py-2`}>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-primary" />
              <span className="text-sm font-medium">Visualization:</span>
            </div>
            <div className="flex">
              <Button 
                variant={chartType === "bar" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-r-none"
                onClick={() => setChartType("bar")}
              >
                <BarChart3 size={16} />
              </Button>
              <Button 
                variant={chartType === "line" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-none border-x border-background"
                onClick={() => setChartType("line")}
              >
                <LineChartIcon size={16} />
              </Button>
              <Button 
                variant={chartType === "pie" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-l-none"
                onClick={() => setChartType("pie")}
              >
                <PieChartIcon size={16} />
              </Button>
            </div>
          </Card>
          
          <Card className={`${cardClassName} flex items-center justify-between px-4 py-2`}>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              <span className="text-sm font-medium">Compare:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Previous period</span>
              <Switch 
                checked={comparisonMode}
                onCheckedChange={setComparisonMode}
              />
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricsCard 
            title="Total Attacks"
            value="1,284"
            trend={{ value: 12, isPositive: false }}
            icon={<AlertTriangle size={24} />}
          />
          
          <MetricsCard 
            title="Critical Vulnerabilities"
            value="23"
            trend={{ value: 5, isPositive: false }}
            icon={<Shield size={24} />}
          />
          
          <MetricsCard 
            title="Average Response Time"
            value="284ms"
            trend={{ value: 4, isPositive: true }}
            icon={<Clock size={24} />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className={`${cardClassName} lg:col-span-3`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Attack Types Distribution</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Layers size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="end">
                  <div className="p-1">
                    <MetricToggle 
                      label="DDoS Attacks" 
                      metricKey="ddos" 
                      checked={visibleMetrics.includes("ddos")} 
                      onToggle={toggleMetric} 
                    />
                    <MetricToggle 
                      label="SQL Injection" 
                      metricKey="sqlInjection" 
                      checked={visibleMetrics.includes("sqlInjection")} 
                      onToggle={toggleMetric} 
                    />
                    <MetricToggle 
                      label="XSS Attacks" 
                      metricKey="xss" 
                      checked={visibleMetrics.includes("xss")} 
                      onToggle={toggleMetric} 
                    />
                    <MetricToggle 
                      label="Brute Force" 
                      metricKey="bruteForce" 
                      checked={visibleMetrics.includes("bruteForce")} 
                      onToggle={toggleMetric} 
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "bar" && (
                    <BarChart data={comparisonMode ? comparisonData : chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', borderColor: isDarkMode ? '#374151' : '#e5e7eb' }} />
                      <Legend />
                      {comparisonMode ? (
                        <>
                          <Bar dataKey="current" name="Current Period" fill="#8884d8" />
                          <Bar dataKey="previous" name="Previous Period" fill="#82ca9d" />
                        </>
                      ) : (
                        <>
                          {visibleMetrics.includes("ddos") && <Bar dataKey="ddos" name="DDoS Attacks" fill="#8884d8" />}
                          {visibleMetrics.includes("sqlInjection") && <Bar dataKey="sqlInjection" name="SQL Injection" fill="#82ca9d" />}
                          {visibleMetrics.includes("xss") && <Bar dataKey="xss" name="XSS Attacks" fill="#ffc658" />}
                          {visibleMetrics.includes("bruteForce") && <Bar dataKey="bruteForce" name="Brute Force" fill="#ff8042" />}
                        </>
                      )}
                    </BarChart>
                  )}
                  
                  {chartType === "line" && (
                    <LineChart data={comparisonMode ? comparisonData : chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', borderColor: isDarkMode ? '#374151' : '#e5e7eb' }} />
                      <Legend />
                      {comparisonMode ? (
                        <>
                          <Line type="monotone" dataKey="current" name="Current Period" stroke="#8884d8" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="previous" name="Previous Period" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        </>
                      ) : (
                        <>
                          {visibleMetrics.includes("ddos") && <Line type="monotone" dataKey="ddos" name="DDoS Attacks" stroke="#8884d8" activeDot={{ r: 8 }} />}
                          {visibleMetrics.includes("sqlInjection") && <Line type="monotone" dataKey="sqlInjection" name="SQL Injection" stroke="#82ca9d" activeDot={{ r: 8 }} />}
                          {visibleMetrics.includes("xss") && <Line type="monotone" dataKey="xss" name="XSS Attacks" stroke="#ffc658" activeDot={{ r: 8 }} />}
                          {visibleMetrics.includes("bruteForce") && <Line type="monotone" dataKey="bruteForce" name="Brute Force" stroke="#ff8042" activeDot={{ r: 8 }} />}
                        </>
                      )}
                    </LineChart>
                  )}
                  
                  {chartType === "pie" && (
                    <PieChart>
                      <Pie
                        data={[
                          { name: "DDoS Attacks", value: attackData.reduce((sum, item) => sum + item.ddos, 0) },
                          { name: "SQL Injection", value: attackData.reduce((sum, item) => sum + item.sqlInjection, 0) },
                          { name: "XSS Attacks", value: attackData.reduce((sum, item) => sum + item.xss, 0) },
                          { name: "Brute Force", value: attackData.reduce((sum, item) => sum + item.bruteForce, 0) }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {attackData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', borderColor: isDarkMode ? '#374151' : '#e5e7eb' }} />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <SecurityScore score={78} />
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="threats">Threat Analytics</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
            <TabsTrigger value="insights">Attack Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className={cardClassName}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Network Traffic</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
              
              <Card className={cardClassName}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Threat Sources by Country</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="threats" className="space-y-6">
            <AttackTypesVisualization />
          </TabsContent>
          
          <TabsContent value="traffic" className="space-y-6">
            <Card className={cardClassName}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">Blocked vs Detected Attacks</CardTitle>
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={areaChartData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', borderColor: isDarkMode ? '#374151' : '#e5e7eb' }} />
                      <Legend />
                      <Area type="monotone" dataKey="blocked" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="detected" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6">
            <AttackInsights />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
