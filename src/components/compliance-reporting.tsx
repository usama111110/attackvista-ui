
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@/providers/ThemeProvider";
import { FileCheck, FileText, Download, CalendarClock, CheckSquare, AlertTriangle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for compliance reports
const mockComplianceReports = [
  {
    id: "report-001",
    name: "GDPR Compliance",
    status: "compliant",
    lastScan: "2023-04-10T15:30:00Z",
    nextScan: "2023-05-10T15:30:00Z",
    complianceScore: 92,
    criticalIssues: 0,
    majorIssues: 2,
    minorIssues: 5
  },
  {
    id: "report-002",
    name: "PCI DSS",
    status: "non-compliant",
    lastScan: "2023-04-05T10:15:00Z",
    nextScan: "2023-04-19T10:15:00Z",
    complianceScore: 78,
    criticalIssues: 2,
    majorIssues: 4,
    minorIssues: 7
  },
  {
    id: "report-003",
    name: "HIPAA",
    status: "compliant",
    lastScan: "2023-04-12T08:45:00Z",
    nextScan: "2023-05-12T08:45:00Z",
    complianceScore: 95,
    criticalIssues: 0,
    majorIssues: 1,
    minorIssues: 3
  },
  {
    id: "report-004",
    name: "ISO 27001",
    status: "warning",
    lastScan: "2023-04-08T14:20:00Z",
    nextScan: "2023-04-22T14:20:00Z",
    complianceScore: 85,
    criticalIssues: 0,
    majorIssues: 3,
    minorIssues: 8
  },
];

// Mock data for compliance requirements
const mockComplianceRequirements = [
  {
    id: "req-001",
    reportId: "report-001",
    name: "Data Protection Impact Assessment",
    status: "compliant",
    description: "DPIA must be conducted for high-risk processing activities"
  },
  {
    id: "req-002",
    reportId: "report-001",
    name: "Breach Notification",
    status: "compliant",
    description: "Data breaches must be reported within 72 hours"
  },
  {
    id: "req-003",
    reportId: "report-001",
    name: "Data Subject Access Rights",
    status: "warning",
    description: "Processes for handling data subject requests need improvement"
  },
  {
    id: "req-004",
    reportId: "report-002",
    name: "Network Security",
    status: "non-compliant",
    description: "Firewall configuration does not meet requirements"
  },
  {
    id: "req-005",
    reportId: "report-002",
    name: "Data Encryption",
    status: "compliant",
    description: "All cardholder data is properly encrypted"
  },
  {
    id: "req-006",
    reportId: "report-003",
    name: "Access Control",
    status: "compliant",
    description: "Proper access controls are in place for PHI"
  },
];

interface ComplianceReportingProps {
  selectedFramework?: string;
}

export function ComplianceReporting({ selectedFramework }: ComplianceReportingProps) {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'requirements'>('overview');
  
  // Filter reports based on selected framework
  const filteredReports = selectedFramework 
    ? mockComplianceReports.filter(report => report.name === selectedFramework)
    : mockComplianceReports;
  
  // Get requirements for the selected reports
  const relevantRequirements = selectedFramework
    ? mockComplianceRequirements.filter(req => {
        const reportId = mockComplianceReports.find(r => r.name === selectedFramework)?.id;
        return req.reportId === reportId;
      })
    : mockComplianceRequirements;
  
  // Calculate overall compliance score
  const overallScore = filteredReports.reduce((sum, report) => sum + report.complianceScore, 0) / filteredReports.length;
  
  // Total issues count
  const totalCritical = filteredReports.reduce((sum, report) => sum + report.criticalIssues, 0);
  const totalMajor = filteredReports.reduce((sum, report) => sum + report.majorIssues, 0);
  const totalMinor = filteredReports.reduce((sum, report) => sum + report.minorIssues, 0);
  
  // Handler for generating reports
  const handleGenerateReport = (reportId: string) => {
    const report = mockComplianceReports.find(r => r.id === reportId);
    
    toast({
      title: `Generating ${report?.name} report`,
      description: "Your report will be ready for download shortly"
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report ready",
        description: `${report?.name} compliance report is ready for download`,
        action: (
          <Button size="sm" variant="outline" onClick={() => handleDownloadReport(reportId)}>
            Download
          </Button>
        )
      });
    }, 2000);
  };
  
  // Handler for downloading reports
  const handleDownloadReport = (reportId: string) => {
    const report = mockComplianceReports.find(r => r.id === reportId);
    
    toast({
      title: "Report downloaded",
      description: `${report?.name} compliance report has been downloaded`
    });
  };
  
  // Handler for scheduling a new scan
  const handleScheduleScan = (reportId: string) => {
    const report = mockComplianceReports.find(r => r.id === reportId);
    
    toast({
      title: "Scan scheduled",
      description: `${report?.name} compliance scan has been scheduled`
    });
  };

  return (
    <div className="space-y-6">
      <Card className={`p-6 shadow-lg ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-indigo-100"}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Compliance Reporting</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50"
              onClick={() => handleScheduleScan(filteredReports[0]?.id)}
            >
              <CalendarClock size={14} />
              <span>Schedule Scan</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50"
              onClick={() => handleGenerateReport(filteredReports[0]?.id)}
            >
              <FileText size={14} />
              <span>Generate Report</span>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'overview' | 'reports' | 'requirements')}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className={`p-4 rounded-xl border ${isDarkMode ? 
                "bg-gray-800/50 border-gray-700" : 
                "bg-white border-indigo-100"}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Overall Score</h4>
                  <span className={`p-1.5 rounded-full ${
                    overallScore >= 90 
                      ? "bg-green-100 dark:bg-green-900/30" 
                      : overallScore >= 80 
                        ? "bg-yellow-100 dark:bg-yellow-900/30" 
                        : "bg-red-100 dark:bg-red-900/30"
                  }`}>
                    <CheckSquare size={14} className={
                      overallScore >= 90 
                        ? "text-green-500" 
                        : overallScore >= 80 
                          ? "text-yellow-500" 
                          : "text-red-500"
                    } />
                  </span>
                </div>
                <div className="text-2xl font-bold">{Math.round(overallScore)}%</div>
                <Progress 
                  value={overallScore} 
                  className={`h-1.5 mt-2 ${
                    overallScore >= 90 
                      ? "bg-green-100 dark:bg-green-900/50" 
                      : overallScore >= 80 
                        ? "bg-yellow-100 dark:bg-yellow-900/50" 
                        : "bg-red-100 dark:bg-red-900/50"
                  }`}
                />
              </div>
              
              <div className={`p-4 rounded-xl border ${isDarkMode ? 
                "bg-gray-800/50 border-gray-700" : 
                "bg-white border-indigo-100"}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Critical Issues</h4>
                  <span className={`p-1.5 rounded-full ${
                    totalCritical === 0 
                      ? "bg-green-100 dark:bg-green-900/30" 
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}>
                    <AlertTriangle size={14} className={
                      totalCritical === 0 
                        ? "text-green-500" 
                        : "text-red-500"
                    } />
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{totalCritical}</span>
                  <span className="text-sm text-muted-foreground ml-1">issues</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {totalCritical === 0 
                    ? "No critical issues found" 
                    : "Requires immediate attention"}
                </div>
              </div>
              
              <div className={`p-4 rounded-xl border ${isDarkMode ? 
                "bg-gray-800/50 border-gray-700" : 
                "bg-white border-indigo-100"}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Major Issues</h4>
                  <span className={`p-1.5 rounded-full ${
                    totalMajor === 0 
                      ? "bg-green-100 dark:bg-green-900/30" 
                      : "bg-yellow-100 dark:bg-yellow-900/30"
                  }`}>
                    <AlertTriangle size={14} className={
                      totalMajor === 0 
                        ? "text-green-500" 
                        : "text-yellow-500"
                    } />
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{totalMajor}</span>
                  <span className="text-sm text-muted-foreground ml-1">issues</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {totalMajor === 0 
                    ? "No major issues found" 
                    : "Should be addressed soon"}
                </div>
              </div>
              
              <div className={`p-4 rounded-xl border ${isDarkMode ? 
                "bg-gray-800/50 border-gray-700" : 
                "bg-white border-indigo-100"}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Minor Issues</h4>
                  <span className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <AlertTriangle size={14} className="text-blue-500" />
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{totalMinor}</span>
                  <span className="text-sm text-muted-foreground ml-1">issues</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {totalMinor === 0 
                    ? "No minor issues found" 
                    : "Can be addressed gradually"}
                </div>
              </div>
            </div>
            
            <div className={`p-5 rounded-xl border ${isDarkMode ? 
              "bg-gray-800/50 border-gray-700" : 
              "bg-white border-indigo-100"}`}
            >
              <h4 className="font-medium mb-4">Compliance Frameworks</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockComplianceReports.map(report => (
                  <div 
                    key={report.id} 
                    className={`p-4 rounded-lg border ${
                      report.status === "compliant"
                        ? isDarkMode ? "border-green-500/30 bg-green-900/10" : "border-green-200 bg-green-50"
                        : report.status === "warning"
                          ? isDarkMode ? "border-yellow-500/30 bg-yellow-900/10" : "border-yellow-200 bg-yellow-50"
                          : isDarkMode ? "border-red-500/30 bg-red-900/10" : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex justify-between">
                      <h5 className="font-medium">{report.name}</h5>
                      <Badge variant="outline" className={`
                        ${report.status === "compliant"
                          ? "border-green-500 text-green-500" 
                          : report.status === "warning"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-red-500 text-red-500"
                        }`}
                      >
                        {report.status === "compliant" ? "Compliant" : report.status === "warning" ? "Warning" : "Non-Compliant"}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 flex items-center">
                      <Progress 
                        value={report.complianceScore} 
                        className={`h-2 flex-1 ${
                          report.complianceScore >= 90 
                            ? "bg-green-100 dark:bg-green-900/50" 
                            : report.complianceScore >= 80 
                              ? "bg-yellow-100 dark:bg-yellow-900/50" 
                              : "bg-red-100 dark:bg-red-900/50"
                        }`}
                      />
                      <span className="ml-2 text-sm font-medium">{report.complianceScore}%</span>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>Last scan: {new Date(report.lastScan).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleGenerateReport(report.id)}>
                          <FileText size={14} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleScheduleScan(report.id)}>
                          <CalendarClock size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <Table className="rounded-xl overflow-hidden border">
              <TableHeader>
                <TableRow>
                  <TableHead>Framework</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Last Scan</TableHead>
                  <TableHead>Next Scan</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map(report => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>
                      <Badge className={`${
                        report.status === "compliant"
                          ? isDarkMode ? "bg-green-900/40 text-green-400" : "bg-green-100 text-green-600"
                          : report.status === "warning"
                            ? isDarkMode ? "bg-yellow-900/40 text-yellow-400" : "bg-yellow-100 text-yellow-600"
                            : isDarkMode ? "bg-red-900/40 text-red-400" : "bg-red-100 text-red-600"
                      }`}>
                        {report.status === "compliant" ? "Compliant" : report.status === "warning" ? "Warning" : "Non-Compliant"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={report.complianceScore} 
                          className={`h-2 w-24 ${
                            report.complianceScore >= 90 
                              ? "bg-green-200 dark:bg-green-950" 
                              : report.complianceScore >= 80 
                                ? "bg-yellow-200 dark:bg-yellow-950" 
                                : "bg-red-200 dark:bg-red-950"
                          }`} 
                        />
                        <span>{report.complianceScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(report.lastScan).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(report.nextScan).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        {report.criticalIssues > 0 && (
                          <Badge variant="destructive" className="gap-0.5">
                            {report.criticalIssues} C
                          </Badge>
                        )}
                        {report.majorIssues > 0 && (
                          <Badge variant="outline" className="gap-0.5 border-yellow-500 text-yellow-500">
                            {report.majorIssues} M
                          </Badge>
                        )}
                        {report.minorIssues > 0 && (
                          <Badge variant="outline" className="gap-0.5 border-blue-500 text-blue-500">
                            {report.minorIssues} m
                          </Badge>
                        )}
                        {report.criticalIssues === 0 && report.majorIssues === 0 && report.minorIssues === 0 && (
                          <Badge variant="outline" className="gap-0.5 border-green-500 text-green-500">
                            No issues
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1.5 px-2 h-8" onClick={() => handleGenerateReport(report.id)}>
                          <FileText size={14} />
                          <span>Report</span>
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1.5 px-2 h-8" onClick={() => handleScheduleScan(report.id)}>
                          <CalendarClock size={14} />
                          <span>Schedule</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex justify-end mt-4">
              <Button onClick={() => handleDownloadReport(filteredReports[0]?.id)} className="gap-1.5 bg-indigo-600 hover:bg-indigo-700">
                <Download size={14} />
                <span>Export All Reports</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="requirements">
            <Table className="rounded-xl overflow-hidden border">
              <TableHeader>
                <TableRow>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Framework</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relevantRequirements.map(req => {
                  const report = mockComplianceReports.find(r => r.id === req.reportId);
                  return (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.name}</TableCell>
                      <TableCell>{report?.name || "Unknown"}</TableCell>
                      <TableCell>
                        <Badge className={`${
                          req.status === "compliant"
                            ? isDarkMode ? "bg-green-900/40 text-green-400" : "bg-green-100 text-green-600"
                            : req.status === "warning"
                              ? isDarkMode ? "bg-yellow-900/40 text-yellow-400" : "bg-yellow-100 text-yellow-600"
                              : isDarkMode ? "bg-red-900/40 text-red-400" : "bg-red-100 text-red-600"
                        }`}>
                          {req.status === "compliant" ? "Compliant" : req.status === "warning" ? "Warning" : "Non-Compliant"}
                        </Badge>
                      </TableCell>
                      <TableCell>{req.description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
