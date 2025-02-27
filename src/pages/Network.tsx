
import { DashboardLayout } from "@/components/dashboard-layout";
import { Network as NetworkIcon } from "lucide-react";

const Network = () => {
  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Network Management</h1>
        <p className="text-gray-400">Manage your network infrastructure</p>
      </header>

      <div className="bg-card p-6 rounded-lg backdrop-blur-lg bg-gray-800/20 border border-gray-700/50 mb-6">
        <div className="flex flex-col items-center justify-center py-12">
          <NetworkIcon className="h-16 w-16 text-gray-600 mb-4" />
          <p className="text-gray-400">Network management tools will appear here</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Network;
