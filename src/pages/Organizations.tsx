
import { OrganizationManagement } from "@/components/organization-management";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useTheme } from "@/providers/ThemeProvider";

const Organizations = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <DashboardLayout>
      <header className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2 dark:text-gradient">Organizations</h1>
        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          Manage your organizations and team members
        </p>
      </header>

      <OrganizationManagement />
    </DashboardLayout>
  );
};

export default Organizations;
