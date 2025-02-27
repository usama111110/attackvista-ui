
import { DashboardLayout } from "@/components/dashboard-layout";
import { AlertTriangle } from "lucide-react";

const Threats = () => {
  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Threat Detection</h1>
        <p className="text-gray-400">Monitor and respond to security threats</p>
      </header>

      <div className="bg-card p-6 rounded-lg backdrop-blur-lg bg-gray-800/20 border border-gray-700/50 mb-6">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertTriangle className="h-16 w-16 text-gray-600 mb-4" />
          <p className="text-gray-400">Threat detection data will appear here</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Threats;
