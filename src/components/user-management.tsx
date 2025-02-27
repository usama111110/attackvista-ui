
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { User, UserPlus, Trash2, Shield } from "lucide-react";

// Mock users for demonstration
const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin", lastActive: "2 hours ago" },
  { id: 2, name: "Security Analyst", email: "analyst@example.com", role: "Analyst", lastActive: "5 min ago" },
  { id: 3, name: "Network Manager", email: "manager@example.com", role: "Manager", lastActive: "1 day ago" },
  { id: 4, name: "Guest User", email: "guest@example.com", role: "Guest", lastActive: "1 week ago" },
];

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);

  // This would connect to a real backend in a production app
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">User Management</h3>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm">
          <UserPlus size={16} />
          Add User
        </button>
      </div>
      
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="bg-gray-800 p-2 rounded-full">
                <User className="text-primary" size={20} />
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-sm text-gray-400">
                <Shield size={14} />
                {user.role}
              </span>
              <span className="text-sm text-gray-400">Last active: {user.lastActive}</span>
              <button 
                className="p-1.5 bg-red-900/30 text-red-400 rounded-md hover:bg-red-900/50 transition-colors"
                onClick={() => handleDeleteUser(user.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
