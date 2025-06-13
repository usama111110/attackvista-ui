
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  industry?: string;
  size?: string;
  createdAt: string;
  ownerId: number;
  settings: {
    theme?: string;
    branding?: {
      primaryColor?: string;
      logoUrl?: string;
      companyName?: string;
    };
    features?: string[];
    notifications?: {
      email: boolean;
      sms: boolean;
      webhook?: string;
    };
  };
}

export interface OrganizationMember {
  id: string;
  userId: number;
  organizationId: string;
  role: 'owner' | 'admin' | 'manager' | 'analyst' | 'viewer';
  permissions: string[];
  joinedAt: string;
  isActive: boolean;
}

const initialOrganizations: Organization[] = [
  {
    id: "org-1",
    name: "Acme Security Corp",
    slug: "acme-security",
    description: "Leading cybersecurity solutions provider",
    industry: "Cybersecurity",
    size: "51-200",
    ownerId: 1,
    createdAt: new Date().toISOString(),
    settings: {
      theme: "dark",
      branding: {
        primaryColor: "#3b82f6",
        companyName: "Acme Security"
      },
      features: ["advanced-analytics", "threat-hunting", "compliance"],
      notifications: {
        email: true,
        sms: false
      }
    }
  },
  {
    id: "org-2", 
    name: "Global Finance Inc",
    slug: "global-finance",
    description: "International financial services",
    industry: "Financial Services",
    size: "201-1000",
    ownerId: 1,
    createdAt: new Date().toISOString(),
    settings: {
      theme: "light",
      branding: {
        primaryColor: "#059669",
        companyName: "Global Finance"
      },
      features: ["compliance", "reporting"],
      notifications: {
        email: true,
        sms: true
      }
    }
  }
];

const initialMembers: OrganizationMember[] = [
  {
    id: "mem-1",
    userId: 1,
    organizationId: "org-1",
    role: "owner",
    permissions: ["*"],
    joinedAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: "mem-2",
    userId: 2,
    organizationId: "org-1",
    role: "admin",
    permissions: ["users.manage", "settings.view", "analytics.view", "org.manage"],
    joinedAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: "mem-3",
    userId: 1,
    organizationId: "org-2",
    role: "owner",
    permissions: ["*"],
    joinedAt: new Date().toISOString(),
    isActive: true
  }
];

interface OrganizationStore {
  organizations: Organization[];
  members: OrganizationMember[];
  currentOrganization: Organization | null;
  
  // Organization management
  createOrganization: (org: Omit<Organization, 'id' | 'createdAt' | 'ownerId'>, userId: number) => string;
  updateOrganization: (id: string, updates: Partial<Organization>) => void;
  deleteOrganization: (id: string) => void;
  setCurrentOrganization: (orgId: string) => void;
  
  // Member management
  addMember: (member: Omit<OrganizationMember, 'id' | 'joinedAt'>) => void;
  updateMember: (id: string, updates: Partial<OrganizationMember>) => void;
  removeMember: (id: string) => void;
  
  // Utility functions
  getUserOrganizations: (userId: number) => Organization[];
  getUserRole: (userId: number, orgId: string) => string | null;
  hasPermission: (userId: number, orgId: string, permission: string) => boolean;
  getOrganizationMembers: (orgId: string) => OrganizationMember[];
}

export const useOrganizationStore = create<OrganizationStore>()(
  persist(
    (set, get) => ({
      organizations: initialOrganizations,
      members: initialMembers,
      currentOrganization: initialOrganizations[0],
      
      createOrganization: (org, userId) => {
        const orgId = `org-${Date.now()}`;
        const newOrg = {
          ...org,
          id: orgId,
          ownerId: userId,
          createdAt: new Date().toISOString()
        };
        
        // Create the organization
        set((state) => ({
          organizations: [...state.organizations, newOrg]
        }));
        
        // Add the creator as owner
        const ownerMember: OrganizationMember = {
          id: `mem-${Date.now()}`,
          userId,
          organizationId: orgId,
          role: "owner",
          permissions: ["*"],
          joinedAt: new Date().toISOString(),
          isActive: true
        };
        
        set((state) => ({
          members: [...state.members, ownerMember]
        }));
        
        return orgId;
      },
      
      updateOrganization: (id, updates) => {
        set((state) => ({
          organizations: state.organizations.map(org =>
            org.id === id ? { ...org, ...updates } : org
          ),
          currentOrganization: state.currentOrganization?.id === id 
            ? { ...state.currentOrganization, ...updates }
            : state.currentOrganization
        }));
      },
      
      deleteOrganization: (id) => {
        set((state) => ({
          organizations: state.organizations.filter(org => org.id !== id),
          members: state.members.filter(member => member.organizationId !== id),
          currentOrganization: state.currentOrganization?.id === id ? null : state.currentOrganization
        }));
      },
      
      setCurrentOrganization: (orgId) => {
        const org = get().organizations.find(o => o.id === orgId);
        set({ currentOrganization: org || null });
      },
      
      addMember: (member) => {
        const newMember = {
          ...member,
          id: `mem-${Date.now()}`,
          joinedAt: new Date().toISOString()
        };
        
        set((state) => ({
          members: [...state.members, newMember]
        }));
      },
      
      updateMember: (id, updates) => {
        set((state) => ({
          members: state.members.map(member =>
            member.id === id ? { ...member, ...updates } : member
          )
        }));
      },
      
      removeMember: (id) => {
        set((state) => ({
          members: state.members.filter(member => member.id !== id)
        }));
      },
      
      getUserOrganizations: (userId) => {
        const userMemberships = get().members.filter(m => m.userId === userId && m.isActive);
        return get().organizations.filter(org => 
          userMemberships.some(m => m.organizationId === org.id)
        );
      },
      
      getUserRole: (userId, orgId) => {
        const membership = get().members.find(m => 
          m.userId === userId && m.organizationId === orgId && m.isActive
        );
        return membership?.role || null;
      },
      
      hasPermission: (userId, orgId, permission) => {
        const membership = get().members.find(m => 
          m.userId === userId && m.organizationId === orgId && m.isActive
        );
        
        if (!membership) return false;
        if (membership.permissions.includes("*")) return true;
        return membership.permissions.includes(permission);
      },

      getOrganizationMembers: (orgId) => {
        return get().members.filter(m => m.organizationId === orgId && m.isActive);
      }
    }),
    {
      name: "organization-storage"
    }
  )
);
