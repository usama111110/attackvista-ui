
import { DashboardLayout } from "@/components/dashboard-layout";
import { Bell } from "lucide-react";

const Notifications = () => {
  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-gray-400">System alerts and notifications</p>
      </header>

      <div className="bg-card p-6 rounded-lg backdrop-blur-lg bg-gray-800/20 border border-gray-700/50 mb-6">
        <div className="flex flex-col items-center justify-center py-12">
          <Bell className="h-16 w-16 text-gray-600 mb-4" />
          <p className="text-gray-400">Notifications will appear here</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
