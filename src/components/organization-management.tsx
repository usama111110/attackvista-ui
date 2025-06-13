
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Users, 
  Settings, 
  Plus, 
  Pencil, 
  Trash2, 
  Shield,
  Crown,
  Eye,
  UserPlus,
  Save,
  X
} from "lucide-react";
import { useOrganizationStore, Organization } from "@/utils/organizationDatabase";
import { useUserStore } from "@/utils/userDatabase";
import { useToast } from "@/hooks/use-toast";

export function OrganizationManagement() {
  const { toast } = useToast();
  const { currentUser, users } = useUserStore();
  const { 
    organizations, 
    members, 
    currentOrganization,
    createOrganization, 
    updateOrganization,
    deleteOrganization,
    addMember,
    updateMember,
    removeMember,
    getUserOrganizations,
    getUserRole,
    hasPermission,
    getOrganizationMembers
  } = useOrganizationStore();

  const [isCreating, setIsCreating] = useState(false);
  const [editingOrg, setEditingOrg] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<string>("viewer");

  const [newOrgData, setNewOrgData] = useState({
    name: "",
    slug: "",
    description: "",
    industry: "",
    size: "",
    website: ""
  });

  const [editOrgData, setEditOrgData] = useState<Partial<Organization>>({});

  if (!currentUser) return null;

  const userOrganizations = getUserOrganizations(currentUser.id);
  const currentRole = currentOrganization ? getUserRole(currentUser.id, currentOrganization.id) : null;
  const canManageOrg = hasPermission(currentUser.id, currentOrganization?.id || "", "org.manage");

  const handleCreateOrganization = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newOrgData.name || !newOrgData.slug) {
      toast({
        title: "Error",
        description: "Name and slug are required",
        variant: "destructive"
      });
      return;
    }

    // Check if slug already exists
    const slugExists = organizations.some(org => org.slug === newOrgData.slug);
    if (slugExists) {
      toast({
        title: "Error",
        description: "URL slug already exists. Please choose a different one.",
        variant: "destructive"
      });
      return;
    }

    const orgId = createOrganization({
      ...newOrgData,
      settings: {
        theme: "dark",
        branding: {
          primaryColor: "#3b82f6",
          companyName: newOrgData.name
        },
        features: [],
        notifications: {
          email: true,
          sms: false
        }
      }
    }, currentUser.id);

    toast({
      title: "Success",
      description: "Organization created successfully"
    });

    setIsCreating(false);
    setNewOrgData({
      name: "",
      slug: "",
      description: "",
      industry: "",
      size: "",
      website: ""
    });
  };

  const handleUpdateOrganization = (orgId: string) => {
    if (editOrgData) {
      updateOrganization(orgId, editOrgData);
      setEditingOrg(null);
      setEditOrgData({});
      toast({
        title: "Success",
        description: "Organization updated successfully"
      });
    }
  };

  const handleInviteMember = () => {
    if (!currentOrganization || !inviteEmail) return;

    // Find user by email
    const inviteUser = users.find(u => u.email.toLowerCase() === inviteEmail.toLowerCase());
    if (!inviteUser) {
      toast({
        title: "Error",
        description: "User not found with this email",
        variant: "destructive"
      });
      return;
    }

    // Check if user is already a member
    const existingMember = members.find(m => 
      m.userId === inviteUser.id && m.organizationId === currentOrganization.id && m.isActive
    );
    if (existingMember) {
      toast({
        title: "Error",
        description: "User is already a member of this organization",
        variant: "destructive"
      });
      return;
    }

    // Add member with appropriate permissions
    const permissions = getRolePermissions(inviteRole);
    addMember({
      userId: inviteUser.id,
      organizationId: currentOrganization.id,
      role: inviteRole as any,
      permissions,
      isActive: true
    });

    toast({
      title: "Success",
      description: `${inviteUser.name} has been added as ${inviteRole}`
    });

    setInviteEmail("");
    setInviteRole("viewer");
  };

  const getRolePermissions = (role: string): string[] => {
    switch (role) {
      case "owner": return ["*"];
      case "admin": return ["users.manage", "settings.manage", "analytics.view", "org.manage"];
      case "manager": return ["users.view", "settings.view", "analytics.view"];
      case "analyst": return ["analytics.view", "security.view"];
      case "viewer": return ["analytics.view"];
      default: return ["analytics.view"];
    }
  };

  const getUserByIdName = (userId: number): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  const getUserByIdEmail = (userId: number): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.email : '';
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner": return <Crown className="h-4 w-4 text-yellow-500" />;
      case "admin": return <Shield className="h-4 w-4 text-red-500" />;
      case "manager": return <Users className="h-4 w-4 text-blue-500" />;
      case "analyst": return <Settings className="h-4 w-4 text-green-500" />;
      case "viewer": return <Eye className="h-4 w-4 text-gray-500" />;
      default: return <Eye className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner": return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "admin": return "bg-red-500/20 text-red-700 border-red-500/30";
      case "manager": return "bg-blue-500/20 text-blue-700 border-blue-500/30";
      case "analyst": return "bg-green-500/20 text-green-700 border-green-500/30";
      case "viewer": return "bg-gray-500/20 text-gray-700 border-gray-500/30";
      default: return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Organization Management</h2>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus size={16} />
          Create Organization
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateOrganization} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Organization Name *</Label>
                  <Input
                    id="name"
                    value={newOrgData.name}
                    onChange={(e) => setNewOrgData({...newOrgData, name: e.target.value})}
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={newOrgData.slug}
                    onChange={(e) => setNewOrgData({...newOrgData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                    placeholder="acme-corp"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={(value) => setNewOrgData({...newOrgData, industry: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="size">Company Size</Label>
                  <Select onValueChange={(value) => setNewOrgData({...newOrgData, size: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">201-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newOrgData.description}
                  onChange={(e) => setNewOrgData({...newOrgData, description: e.target.value})}
                  placeholder="Brief description of your organization"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Create Organization</Button>
                <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="organizations" className="w-full">
        <TabsList>
          <TabsTrigger value="organizations">My Organizations</TabsTrigger>
          {currentOrganization && canManageOrg && (
            <TabsTrigger value="members">Members</TabsTrigger>
          )}
          {currentOrganization && (
            <TabsTrigger value="settings">Settings</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="organizations" className="space-y-4">
          <div className="grid gap-4">
            {userOrganizations.map((org) => (
              <Card key={org.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        {editingOrg === org.id ? (
                          <div className="space-y-3">
                            <Input
                              value={editOrgData.name || org.name}
                              onChange={(e) => setEditOrgData({...editOrgData, name: e.target.value})}
                              className="font-semibold text-lg"
                            />
                            <Textarea
                              value={editOrgData.description || org.description || ''}
                              onChange={(e) => setEditOrgData({...editOrgData, description: e.target.value})}
                              placeholder="Organization description"
                            />
                          </div>
                        ) : (
                          <>
                            <h3 className="font-semibold text-lg">{org.name}</h3>
                            <p className="text-muted-foreground">{org.description}</p>
                          </>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className={getRoleBadgeColor(getUserRole(currentUser.id, org.id) || "")}>
                            <div className="flex items-center gap-1">
                              {getRoleIcon(getUserRole(currentUser.id, org.id) || "")}
                              {getUserRole(currentUser.id, org.id)}
                            </div>
                          </Badge>
                          {org.industry && <span className="text-sm text-muted-foreground">{org.industry}</span>}
                          {org.size && <span className="text-sm text-muted-foreground">{org.size}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {editingOrg === org.id ? (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleUpdateOrganization(org.id)}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => {setEditingOrg(null); setEditOrgData({})}}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        hasPermission(currentUser.id, org.id, "org.manage") && (
                          <Button variant="outline" size="sm" onClick={() => {setEditingOrg(org.id); setEditOrgData(org)}}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {currentOrganization && canManageOrg && (
          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Add Member
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleInviteMember}>
                    Add Member
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getOrganizationMembers(currentOrganization.id).map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{getUserByIdName(member.userId)}</p>
                          <p className="text-sm text-muted-foreground">{getUserByIdEmail(member.userId)}</p>
                          <p className="text-xs text-muted-foreground">Joined {new Date(member.joinedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getRoleBadgeColor(member.role)}>
                          <div className="flex items-center gap-1">
                            {getRoleIcon(member.role)}
                            {member.role}
                          </div>
                        </Badge>
                        {member.role !== "owner" && member.userId !== currentUser.id && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              removeMember(member.id);
                              toast({
                                title: "Member removed",
                                description: `${getUserByIdName(member.userId)} has been removed from the organization`
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {currentOrganization && (
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Organization Name</Label>
                  <Input value={currentOrganization.name} disabled={!canManageOrg} />
                </div>
                <div>
                  <Label>Industry</Label>
                  <Input value={currentOrganization.industry || ""} disabled={!canManageOrg} />
                </div>
                <div>
                  <Label>Company Size</Label>
                  <Input value={currentOrganization.size || ""} disabled={!canManageOrg} />
                </div>
                <Separator />
                <div>
                  <Label>Primary Brand Color</Label>
                  <Input 
                    type="color" 
                    value={currentOrganization.settings.branding?.primaryColor || "#3b82f6"} 
                    disabled={!canManageOrg}
                    className="w-20 h-10"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
