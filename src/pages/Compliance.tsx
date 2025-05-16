
import { DashboardLayout } from "@/components/dashboard-layout";
import { ComplianceReporting } from "@/components/compliance-reporting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/providers/ThemeProvider";
import { FileText, FileCheck } from "lucide-react";

export default function Compliance() {
  const { isDarkMode } = useTheme();

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Compliance & Reporting</h1>
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-indigo-500" />
          <FileCheck className="h-5 w-5 text-green-500" />
        </div>
      </div>
      
      <div className="space-y-6">
        <Card className={isDarkMode ? "bg-gray-900/50 border-gray-700" : "bg-white border-gray-200"}>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Compliance Frameworks</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Frameworks</TabsTrigger>
                <TabsTrigger value="gdpr">GDPR</TabsTrigger>
                <TabsTrigger value="pci">PCI DSS</TabsTrigger>
                <TabsTrigger value="hipaa">HIPAA</TabsTrigger>
                <TabsTrigger value="iso">ISO 27001</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <ComplianceReporting />
              </TabsContent>
              
              <TabsContent value="gdpr">
                <ComplianceReporting selectedFramework="GDPR Compliance" />
              </TabsContent>
              
              <TabsContent value="pci">
                <ComplianceReporting selectedFramework="PCI DSS" />
              </TabsContent>
              
              <TabsContent value="hipaa">
                <ComplianceReporting selectedFramework="HIPAA" />
              </TabsContent>
              
              <TabsContent value="iso">
                <ComplianceReporting selectedFramework="ISO 27001" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
