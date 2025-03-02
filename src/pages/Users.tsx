
import { UserManagement } from "@/components/user-management";
import { DashboardLayout } from "@/components/dashboard-layout";

const Users = () => {
  return (
    <DashboardLayout>
      <header className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2 dark:text-gradient">User Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage users and permissions</p>
      </header>

      <UserManagement />
    </DashboardLayout>
  );
};

export default Users;
