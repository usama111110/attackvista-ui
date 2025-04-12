
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Filter, Calendar } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("security");
  
  const generatePDF = (reportType: string) => {
    const doc = new jsPDF();
    const title = `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`;
    
    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    
    // Add date
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Add logo or header image
    // If you have a logo, you can add it here
    // doc.addImage(logoDataUrl, 'PNG', 170, 10, 25, 25);
    
    // Add table with sample data
    autoTable(doc, {
      startY: 40,
      head: [['ID', 'Date', 'Description', 'Severity', 'Status']],
      body: [
        ['SEC-001', '2025-04-01', 'Unauthorized access attempt', 'High', 'Resolved'],
        ['SEC-002', '2025-04-02', 'SQL Injection attempt', 'Critical', 'Resolved'],
        ['SEC-003', '2025-04-05', 'Unusual login pattern', 'Medium', 'Investigating'],
        ['SEC-004', '2025-04-08', 'Suspicious file download', 'High', 'Mitigated'],
        ['SEC-005', '2025-04-10', 'Brute force attack', 'High', 'Resolved'],
      ],
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] },
    });
    
    // Save the PDF
    doc.save(`${reportType}_report_${new Date().toISOString().split('T')[0]}.pdf`);
  };
  
  const reportTypes = [
    { id: "security", name: "Security Incidents", count: 24 },
    { id: "network", name: "Network Activity", count: 156 },
    { id: "user", name: "User Activity", count: 87 },
    { id: "compliance", name: "Compliance", count: 12 },
  ];
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Generate and download security reports.</p>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="mb-6">
          {reportTypes.map(report => (
            <TabsTrigger 
              key={report.id}
              value={report.id}
              onClick={() => setActiveTab(report.id)}
            >
              {report.name} ({report.count})
            </TabsTrigger>
          ))}
        </TabsList>
        
        {reportTypes.map(report => (
          <TabsContent key={report.id} value={report.id} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Daily Report</h3>
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Last 24 hours of {report.name.toLowerCase()} data and metrics.
                </p>
                <Button 
                  className="w-full mt-2" 
                  onClick={() => generatePDF(`${report.id}_daily`)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Weekly Summary</h3>
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Weekly overview with trends and key metrics.
                </p>
                <Button 
                  className="w-full mt-2" 
                  onClick={() => generatePDF(`${report.id}_weekly`)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Monthly Analysis</h3>
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive monthly report with detailed analysis.
                </p>
                <Button 
                  className="w-full mt-2" 
                  onClick={() => generatePDF(`${report.id}_monthly`)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
};

export default Reports;
