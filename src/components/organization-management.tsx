
import { useState } from "react";
import { Plus, Settings, Users, Trash2, Edit, Crown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useOrganizationStore } from "@/utils/organizationDatabase";
import { useUserStore } from "@/utils/userDatabase";
import { useToast } from "@/hooks/use-toast";

export function OrganizationManagement() {
  const { currentUser } = useUserStore();
  const {
    organizations,
    currentOrganization,
    getUserOrganizations,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    setCurrentOrganization
  } = useOrganizationStore();
  
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<any>(null);

  const [newOrgForm, setNewOrgForm] = useState({
    name: "",
    slug: "",
    description: "",
    industry: "",
    size: "",
    website: "",
    plan: "free" as const
  });

  if (!currentUser) return null;

  const userOrganizations = getUserOrganizations(currentUser.id);

  const handleCreateOrg = () => {
    try {
      const orgId = createOrganization({
        ...newOrgForm,
        settings: {
          theme: "light",
          branding: {
            primaryColor: "#FF7B00",
            companyName: newOrgForm.name
          },
          features: [],
          notifications: {
            email: true,
            sms: false
          }
        }
      }, currentUser.id);
      
      setCurrentOrganization(orgId);
      setIsCreateDialogOpen(false);
      setNewOrgForm({
        name: "",
        slug: "",
        description: "",
        industry: "",
        size: "",
        website: "",
        plan: "free"
      });
      
      toast({
        title: "Success",
        description: "Organization created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create organization",
        variant: "destructive"
      });
    }
  };

  const handleEditOrg = (org: any) => {
    setEditingOrg(org);
    setIsEditDialogOpen(true);
  };

  const handleUpdateOrg = () => {
    if (!editingOrg) return;
    
    try {
      updateOrganization(editingOrg.id, editingOrg);
      setIsEditDialogOpen(false);
      setEditingOrg(null);
      
      toast({
        title: "Success",
        description: "Organization updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update organization",
        variant: "destructive"
      });
    }
  };

  const handleDeleteOrg = (orgId: string) => {
    try {
      deleteOrganization(orgId);
      toast({
        title: "Success",
        description: "Organization deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete organization",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with enhanced animations */}
      <div className="flex justify-between items-center animate-slide-in-right">
        <div>
          <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Organizations
          </h1>
          <p className="text-muted-foreground">Manage your organizations and settings</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Create Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="animate-scale-in">
            <DialogHeader>
              <DialogTitle>Create New Organization</DialogTitle>
              <DialogDescription>
                Set up a new organization to collaborate with your team.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <Label htmlFor="name">Organization Name</Label>
                <Input
                  id="name"
                  value={newOrgForm.name}
                  onChange={(e) => setNewOrgForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter organization name"
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>
              
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={newOrgForm.slug}
                  onChange={(e) => setNewOrgForm(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="organization-slug"
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>
              
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newOrgForm.description}
                  onChange={(e) => setNewOrgForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your organization"
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={newOrgForm.industry} onValueChange={(value) => setNewOrgForm(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger className="transition-all duration-300 hover:scale-[1.02]">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
                  <Label htmlFor="size">Company Size</Label>
                  <Select value={newOrgForm.size} onValueChange={(value) => setNewOrgForm(prev => ({ ...prev, size: value }))}>
                    <SelectTrigger className="transition-all duration-300 hover:scale-[1.02]">
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
              
              <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={newOrgForm.website}
                  onChange={(e) => setNewOrgForm(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://example.com"
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>
              
              <div className="flex justify-end space-x-2 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateOrg} className="hover:scale-105 transition-transform duration-200">
                  Create Organization
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Organizations Grid with staggered animations */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userOrganizations.map((org, index) => (
          <Card 
            key={org.id} 
            className={`transition-all duration-500 hover:scale-[1.02] hover:shadow-xl cursor-pointer animate-slide-up ${
              currentOrganization?.id === org.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-lg'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {org.name}
                    {org.ownerId === currentUser.id && (
                      <Crown className="w-4 h-4 text-yellow-500 animate-pulse" />
                    )}
                  </CardTitle>
                  <CardDescription>{org.description}</CardDescription>
                </div>
                
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEditOrg(org)}
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  {org.ownerId === currentUser.id && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteOrg(org.id)}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Plan</span>
                  <Badge 
                    variant={org.plan === 'enterprise' ? 'default' : 'secondary'}
                    className="animate-pulse"
                  >
                    {org.plan}
                  </Badge>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Industry</span>
                  <span className="capitalize">{org.industry}</span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full hover:scale-105 transition-all duration-300"
                  onClick={() => setCurrentOrganization(org.id)}
                >
                  {currentOrganization?.id === org.id ? (
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Current
                    </span>
                  ) : (
                    'Switch to'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="animate-scale-in">
          <DialogHeader>
            <DialogTitle>Edit Organization</DialogTitle>
            <DialogDescription>
              Update your organization details.
            </DialogDescription>
          </DialogHeader>
          
          {editingOrg && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Organization Name</Label>
                <Input
                  id="edit-name"
                  value={editingOrg.name}
                  onChange={(e) => setEditingOrg({...editingOrg, name: e.target.value})}
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingOrg.description}
                  onChange={(e) => setEditingOrg({...editingOrg, description: e.target.value})}
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateOrg} className="hover:scale-105 transition-transform duration-200">
                  Update Organization
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
