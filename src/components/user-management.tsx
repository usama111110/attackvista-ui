
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, UserPlus, Trash2, Shield, Pencil, Check, X, Key } from "lucide-react";
import { useUserStore, User as UserType } from "@/utils/userDatabase";
import { useToast } from "@/hooks/use-toast";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export function UserManagement() {
  const { users, addUser, updateUser, deleteUser } = useUserStore();
  const { toast } = useToast();
  
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [changingPasswordId, setChangingPasswordId] = useState<number | null>(null);
  
  // Form data for adding or editing users
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    role: "Guest"
  });
  
  // Form data for changing password
  const [newPassword, setNewPassword] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "Guest"
    });
    setNewPassword("");
  };
  
  // Handle form submit for adding a user
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }
    
    // Add user
    addUser(formData);
    
    // Show success toast
    toast({
      title: "Success",
      description: "User was added successfully"
    });
    
    // Reset form and state
    resetForm();
    setIsAddingUser(false);
  };
  
  // Handle updating a user
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingUserId) return;
    
    // Basic validation for name and email
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }
    
    // Update user (exclude password if empty)
    const userData: Partial<UserType> = {
      name: formData.name,
      email: formData.email,
      role: formData.role
    };
    
    updateUser(editingUserId, userData);
    
    // Show success toast
    toast({
      title: "Success",
      description: "User was updated successfully"
    });
    
    // Reset state
    setEditingUserId(null);
    resetForm();
  };
  
  // Handle changing password
  const handleChangePassword = (userId: number) => {
    if (!newPassword) {
      toast({
        title: "Error",
        description: "Please enter a password",
        variant: "destructive"
      });
      return;
    }
    
    updateUser(userId, { password: newPassword });
    
    toast({
      title: "Success",
      description: "Password was updated successfully"
    });
    
    setChangingPasswordId(null);
    setNewPassword("");
  };
  
  // Start editing a user
  const startEditingUser = (user: UserType) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // Don't populate password for security
      role: user.role
    });
  };
  
  // Handle delete user
  const handleDeleteUser = (id: number) => {
    deleteUser(id);
    
    toast({
      title: "Success",
      description: "User was deleted successfully"
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">User Management</CardTitle>
          {!isAddingUser && (
            <button 
              className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm"
              onClick={() => setIsAddingUser(true)}
            >
              <UserPlus size={16} />
              Add User
            </button>
          )}
        </CardHeader>
        <CardContent>
          {isAddingUser && (
            <form onSubmit={handleAddUser} className="mb-6 p-4 bg-gray-800/30 rounded-lg">
              <h3 className="text-md font-medium mb-4">Add New User</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md bg-gray-900/50 border border-gray-700"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md bg-gray-900/50 border border-gray-700"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md bg-gray-900/50 border border-gray-700"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md bg-gray-900/50 border border-gray-700"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Manager">Manager</option>
                    <option value="Guest">Guest</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingUser(false);
                    resetForm();
                  }}
                  className="px-3 py-1.5 bg-gray-700 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm"
                >
                  Add User
                </button>
              </div>
            </form>
          )}
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-b border-gray-800">
                    {editingUserId === user.id ? (
                      <>
                        <TableCell colSpan={4}>
                          <form onSubmit={handleUpdateUser} className="p-2 bg-gray-800/40 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                              <div>
                                <label className="block text-xs text-gray-400 mb-1">Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  className="w-full p-1.5 text-sm rounded-md bg-gray-900/50 border border-gray-700"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-400 mb-1">Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  className="w-full p-1.5 text-sm rounded-md bg-gray-900/50 border border-gray-700"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-400 mb-1">Role</label>
                                <select
                                  name="role"
                                  value={formData.role}
                                  onChange={handleInputChange}
                                  className="w-full p-1.5 text-sm rounded-md bg-gray-900/50 border border-gray-700"
                                >
                                  <option value="Admin">Admin</option>
                                  <option value="Analyst">Analyst</option>
                                  <option value="Manager">Manager</option>
                                  <option value="Guest">Guest</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingUserId(null);
                                  resetForm();
                                }}
                                className="px-2 py-1 bg-gray-700 rounded-md text-xs flex items-center gap-1"
                              >
                                <X size={12} />
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-2 py-1 bg-primary/80 text-primary-foreground rounded-md text-xs flex items-center gap-1"
                              >
                                <Check size={12} />
                                Save
                              </button>
                            </div>
                          </form>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-800 p-2 rounded-full">
                              <User className="text-primary" size={16} />
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1 text-sm text-gray-400">
                            <Shield size={14} />
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-400">{user.lastActive}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {changingPasswordId === user.id ? (
                              <div className="flex items-center gap-2 bg-gray-800/40 p-1 rounded-md">
                                <input
                                  type="password"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  className="w-24 md:w-32 p-1 text-xs rounded-md bg-gray-900/50 border border-gray-700"
                                  placeholder="New password"
                                />
                                <button
                                  onClick={() => handleChangePassword(user.id)}
                                  className="p-1 bg-primary/80 text-primary-foreground rounded-md"
                                >
                                  <Check size={14} />
                                </button>
                                <button
                                  onClick={() => {
                                    setChangingPasswordId(null);
                                    setNewPassword("");
                                  }}
                                  className="p-1 bg-gray-700 rounded-md"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <button 
                                className="p-1.5 bg-blue-900/30 text-blue-400 rounded-md hover:bg-blue-900/50 transition-colors"
                                onClick={() => setChangingPasswordId(user.id)}
                                title="Change Password"
                              >
                                <Key size={16} />
                              </button>
                            )}
                            
                            <button 
                              className="p-1.5 bg-amber-900/30 text-amber-400 rounded-md hover:bg-amber-900/50 transition-colors"
                              onClick={() => startEditingUser(user)}
                              title="Edit User"
                            >
                              <Pencil size={16} />
                            </button>
                            
                            <button 
                              className="p-1.5 bg-red-900/30 text-red-400 rounded-md hover:bg-red-900/50 transition-colors"
                              onClick={() => handleDeleteUser(user.id)}
                              title="Delete User"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
