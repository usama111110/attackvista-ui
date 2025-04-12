
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FilePdf, Download, Calendar, BarChart, Shield, Settings } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Sample report data
const securityIncidents = [
  { id: 1, type: "DDoS Attack", severity: "High", date: "2025-04-10", status: "Resolved", source: "192.168.1.45" },
  { id: 2, type: "SQL Injection", severity: "Critical", date: "2025-04-09", status: "Resolved", source: "203.45.78.32" },
  { id: 3, type: "Brute Force", severity: "Medium", date: "2025-04-08", status: "Resolved", source: "192.168.2.12" },
  { id: 4, type: "XSS Attack", severity: "High", date: "2025-04-07", status: "Resolved", source: "192.168.3.78" },
  { id: 5, type: "Ransomware", severity: "Critical", date: "2025-04-05", status: "Ongoing", source: "209.85.231.104" },
  { id: 6, type: "Phishing", severity: "Medium", date: "2025-04-03", status: "Resolved", source: "192.168.5.22" },
];

const networkMetrics = [
  { id: 1, metric: "Network Uptime", value: "99.98%", trend: "Stable", period: "Last 30 days" },
  { id: 2, metric: "Average Response Time", value: "120ms", trend: "Improved", period: "Last 30 days" },
  { id: 3, metric: "Bandwidth Usage", value: "684 GB", trend: "Increased", period: "Last 30 days" },
  { id: 4, metric: "Packet Loss Rate", value: "0.02%", trend: "Stable", period: "Last 30 days" },
  { id: 5, metric: "Security Score", value: "87/100", trend: "Improved", period: "Last 30 days" },
];

const Reports = () => {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [reportType, setReportType] = useState<"incidents" | "metrics">("incidents");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [timeRange, setTimeRange] = useState("30days");
  
  const generatePDF = () => {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(`SecureSentry ${reportType === "incidents" ? "Security Incidents" : "Network Metrics"} Report`, 14, 22);
    
    // Add timestamp
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Time Range: ${timeRange === "7days" ? "Last 7 Days" : timeRange === "30days" ? "Last 30 Days" : "Last 90 Days"}`, 14, 36);
    
    // Add summary if selected
    if (includeSummary) {
      doc.setFontSize(12);
      doc.text("Summary", 14, 46);
      doc.setFontSize(10);
      if (reportType === "incidents") {
        const critical = securityIncidents.filter(i => i.severity === "Critical").length;
        const high = securityIncidents.filter(i => i.severity === "High").length;
        const medium = securityIncidents.filter(i => i.severity === "Medium").length;
        doc.text(`Total Incidents: ${securityIncidents.length}`, 14, 54);
        doc.text(`Critical: ${critical}, High: ${high}, Medium: ${medium}`, 14, 60);
        doc.text(`Resolved: ${securityIncidents.filter(i => i.status === "Resolved").length}`, 14, 66);
        doc.text(`Ongoing: ${securityIncidents.filter(i => i.status === "Ongoing").length}`, 14, 72);
      } else {
        doc.text("Network performance has been stable over the selected period with 99.98% uptime.", 14, 54);
        doc.text("Security score has improved by 5 points compared to the previous period.", 14, 60);
      }
      
      // Add horizontal line after summary
      doc.line(14, 78, 196, 78);
    }
    
    // Add table data
    const startY = includeSummary ? 84 : 46;
    
    if (reportType === "incidents") {
      autoTable(doc, {
        startY,
        head: [['ID', 'Type', 'Severity', 'Date', 'Status', 'Source']],
        body: securityIncidents.map(incident => [
          incident.id,
          incident.type,
          incident.severity,
          incident.date,
          incident.status,
          incident.source
        ]),
        theme: isDarkMode ? 'grid' : 'striped',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [45, 55, 72] },
      });
    } else {
      autoTable(doc, {
        startY,
        head: [['ID', 'Metric', 'Value', 'Trend', 'Period']],
        body: networkMetrics.map(metric => [
          metric.id,
          metric.metric,
          metric.value,
          metric.trend,
          metric.period
        ]),
        theme: isDarkMode ? 'grid' : 'striped',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [45, 55, 72] },
      });
    }
    
    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text('SecureSentry - Confidential', 14, 290);
      doc.text(`Page ${i} of ${pageCount}`, 196, 290, { align: 'right' });
    }
    
    // Save the PDF
    doc.save(`SecureSentry-${reportType}-Report-${new Date().toISOString().slice(0, 10)}.pdf`);
    
    // Show success toast
    toast({
      title: "Report Generated",
      description: `Your ${reportType} report has been downloaded as a PDF file.`,
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400">Generate and export security and network reports</p>
            </div>
            <Button
              onClick={generatePDF}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <FilePdf size={16} />
              Export PDF
            </Button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={`col-span-1 p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 ${
            isDarkMode ? "bg-gray-900/50" : "bg-white/90"
          }`}>
            <h3 className="text-lg font-semibold mb-4">Report Options</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Report Type</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={reportType === "incidents" ? "default" : "outline"} 
                    className="justify-start gap-2"
                    onClick={() => setReportType("incidents")}
                  >
                    <Shield size={16} />
                    Security Incidents
                  </Button>
                  <Button 
                    variant={reportType === "metrics" ? "default" : "outline"} 
                    className="justify-start gap-2"
                    onClick={() => setReportType("metrics")}
                  >
                    <BarChart size={16} />
                    Network Metrics
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Time Range</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={timeRange === "7days" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeRange("7days")}
                  >
                    Last 7 Days
                  </Button>
                  <Button 
                    variant={timeRange === "30days" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeRange("30days")}
                  >
                    Last 30 Days
                  </Button>
                  <Button 
                    variant={timeRange === "90days" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeRange("90days")}
                  >
                    Last 90 Days
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Include in Report</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-charts" 
                      checked={includeCharts}
                      onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
                    />
                    <Label htmlFor="include-charts">Data Visualizations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-summary" 
                      checked={includeSummary}
                      onCheckedChange={(checked) => setIncludeSummary(checked as boolean)}
                    />
                    <Label htmlFor="include-summary">Executive Summary</Label>
                  </div>
                </div>
              </div>
              
              <Button onClick={generatePDF} className="w-full gap-2">
                <Download size={16} />
                Generate Report
              </Button>
            </div>
          </Card>
          
          <Card className={`col-span-1 md:col-span-2 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 ${
            isDarkMode ? "bg-gray-900/50" : "bg-white/90"
          }`}>
            <Tabs defaultValue="preview" className="w-full">
              <div className="flex items-center justify-between border-b px-6 py-3 dark:border-gray-700/50">
                <h3 className="font-semibold">Report Preview</h3>
                <TabsList className="bg-gray-100/80 dark:bg-gray-800/30 rounded-lg">
                  <TabsTrigger value="preview" className="rounded-md">Preview</TabsTrigger>
                  <TabsTrigger value="settings" className="rounded-md">Settings</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="preview" className="p-6">
                <div className={`border border-gray-200 dark:border-gray-700/50 rounded-lg p-6 ${
                  isDarkMode ? "bg-gray-800/20" : "bg-white"
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold">
                        {reportType === "incidents" ? "Security Incidents Report" : "Network Metrics Report"}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {timeRange === "7days" ? "Last 7 Days" : timeRange === "30days" ? "Last 30 Days" : "Last 90 Days"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar size={14} className="text-primary" />
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {includeSummary && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Executive Summary</h3>
                      <div className={`p-4 rounded-lg text-sm ${
                        isDarkMode ? "bg-gray-800/50" : "bg-gray-100/80"
                      }`}>
                        {reportType === "incidents" ? (
                          <p>
                            Over the selected period, we detected and responded to {securityIncidents.length} security incidents.
                            Of these, {securityIncidents.filter(i => i.status === "Resolved").length} were successfully resolved,
                            with {securityIncidents.filter(i => i.severity === "Critical").length} classified as critical severity.
                            The most common attack type was DDoS, accounting for 35% of all incidents.
                          </p>
                        ) : (
                          <p>
                            Network performance has been stable over the selected period with 99.98% uptime.
                            Average response times improved by 15% compared to the previous period.
                            Security score has improved by 5 points, currently at 87/100.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-semibold mb-3">Detailed {reportType === "incidents" ? "Incidents" : "Metrics"}</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          {reportType === "incidents" ? (
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Severity</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Source</TableHead>
                            </TableRow>
                          ) : (
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Metric</TableHead>
                              <TableHead>Value</TableHead>
                              <TableHead>Trend</TableHead>
                              <TableHead>Period</TableHead>
                            </TableRow>
                          )}
                        </TableHeader>
                        <TableBody>
                          {reportType === "incidents" ? (
                            securityIncidents.map((incident) => (
                              <TableRow key={incident.id}>
                                <TableCell>{incident.id}</TableCell>
                                <TableCell>{incident.type}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    incident.severity === "Critical" 
                                      ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400" 
                                      : incident.severity === "High" 
                                        ? "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400" 
                                        : "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400"
                                  }`}>
                                    {incident.severity}
                                  </span>
                                </TableCell>
                                <TableCell>{incident.date}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    incident.status === "Resolved" 
                                      ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400" 
                                      : "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                  }`}>
                                    {incident.status}
                                  </span>
                                </TableCell>
                                <TableCell>{incident.source}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            networkMetrics.map((metric) => (
                              <TableRow key={metric.id}>
                                <TableCell>{metric.id}</TableCell>
                                <TableCell>{metric.metric}</TableCell>
                                <TableCell className="font-medium">{metric.value}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    metric.trend === "Improved" 
                                      ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400" 
                                      : metric.trend === "Stable" 
                                        ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" 
                                        : "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400"
                                  }`}>
                                    {metric.trend}
                                  </span>
                                </TableCell>
                                <TableCell>{metric.period}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Report Template Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Settings size={16} className="text-primary" />
                          <h4 className="font-medium">Layout Options</h4>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Customize the appearance of your report</p>
                        <div className="flex items-center space-x-3">
                          <Button variant="outline" size="sm" className="text-xs">Compact</Button>
                          <Button variant="default" size="sm" className="text-xs">Standard</Button>
                          <Button variant="outline" size="sm" className="text-xs">Detailed</Button>
                        </div>
                      </Card>
                      
                      <Card className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText size={16} className="text-primary" />
                          <h4 className="font-medium">Custom Branding</h4>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Add your organization's logo and styling</p>
                        <Button variant="outline" size="sm" className="w-full text-xs">Upload Logo</Button>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Sharing Options</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-email" />
                        <Label htmlFor="auto-email">Automatically email report to team</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="schedule-report" />
                        <Label htmlFor="schedule-report">Schedule recurring reports</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
