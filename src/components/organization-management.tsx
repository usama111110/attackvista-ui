
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
  UserPlus
} from "lucide-react";
import { useOrganizationStore, Organization } from "@/utils/organizationDatabase";
import { useUserStore } from "@/utils/userDatabase";
import { useToast } from "@/hooks/use-toast";

export function OrganizationManagement() {
  const { toast } = useToast();
  const { currentUser } = useUserStore();
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
    hasPermission
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

    createOrganization({
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
    });

    // Add the current user as owner
    addMember({
      userId: currentUser.id,
      organizationId: `org-${Date.now()}`, // This would be the actual ID in real implementation
      role: "owner",
      permissions: ["*"],
      isActive: true
    });

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

  const handleInviteMember = () => {
    if (!currentOrganization || !inviteEmail) return;

    // In a real app, this would send an invitation email
    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteEmail} as ${inviteRole}`
    });

    setInviteEmail("");
    setInviteRole("viewer");
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
                    onChange={(e) => setNewOrgData({...newOrgData, slug: e.target.value})}
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
                      <div>
                        <h3 className="font-semibold text-lg">{org.name}</h3>
                        <p className="text-muted-foreground">{org.description}</p>
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
                      {hasPermission(currentUser.id, org.id, "org.manage") && (
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
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
                  Invite Member
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
                    Send Invite
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
                  {members
                    .filter(m => m.organizationId === currentOrganization.id && m.isActive)
                    .map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">User {member.userId}</p>
                            <p className="text-sm text-muted-foreground">Joined {new Date(member.joinedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getRoleBadgeColor(member.role)}>
                            <div className="flex items-center gap-1">
                              {getRoleIcon(member.role)}
                              {member.role}
                            </div>
                          </Badge>
                          {member.role !== "owner" && (
                            <Button variant="outline" size="sm">
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
