
import { DashboardLayout } from "@/components/dashboard-layout";
import { BarChart, AreaChart } from "lucide-react";

const Analytics = () => {
  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-400">Advanced security analytics and trends</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg backdrop-blur-sm h-60 flex flex-col items-center justify-center">
          <BarChart className="h-16 w-16 text-gray-600 mb-4" />
          <p className="text-gray-400">Analytics charts will appear here</p>
        </div>
        <div className="bg-card p-6 rounded-lg backdrop-blur-sm h-60 flex flex-col items-center justify-center">
          <AreaChart className="h-16 w-16 text-gray-600 mb-4" />
          <p className="text-gray-400">Traffic analysis will appear here</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
