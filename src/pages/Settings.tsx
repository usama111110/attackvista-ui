
import { DashboardLayout } from "@/components/dashboard-layout";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Configure system settings and preferences</p>
      </header>

      <div className="bg-card p-6 rounded-lg backdrop-blur-sm mb-6">
        <div className="flex flex-col items-center justify-center py-12">
          <SettingsIcon className="h-16 w-16 text-gray-600 mb-4" />
          <p className="text-gray-400">Settings options will appear here</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
