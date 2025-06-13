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
  plan: 'free' | 'pro' | 'enterprise';
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
    security?: {
      requireTwoFactor: boolean;
      sessionTimeout: number;
    };
  };
  billing?: {
    subscriptionId?: string;
    currentPeriodEnd?: string;
    status: 'active' | 'cancelled' | 'past_due';
  };
  limits: {
    maxMembers: number;
    maxProjects: number;
    storageLimit: number; // in GB
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
  invitedBy?: number;
  lastActiveAt?: string;
}

// Real-world role hierarchy with proper permissions
const roleHierarchy = {
  owner: ['*'], // All permissions
  admin: [
    'org.manage', 'org.billing', 'org.settings',
    'members.invite', 'members.remove', 'members.manage',
    'projects.create', 'projects.delete', 'projects.manage',
    'analytics.view', 'analytics.export',
    'security.view', 'security.configure',
    'compliance.view', 'compliance.manage'
  ],
  manager: [
    'members.invite', 'members.view',
    'projects.create', 'projects.manage',
    'analytics.view', 'analytics.export',
    'security.view',
    'compliance.view'
  ],
  analyst: [
    'analytics.view', 'analytics.export',
    'security.view',
    'compliance.view',
    'projects.view'
  ],
  viewer: [
    'analytics.view',
    'security.view',
    'compliance.view',
    'projects.view'
  ]
};

const planLimits = {
  free: { maxMembers: 3, maxProjects: 1, storageLimit: 1 },
  pro: { maxMembers: 25, maxProjects: 10, storageLimit: 50 },
  enterprise: { maxMembers: 1000, maxProjects: 100, storageLimit: 1000 }
};

const initialOrganizations: Organization[] = [
  {
    id: "org-1",
    name: "Acme Security Corp",
    slug: "acme-security",
    description: "Leading cybersecurity solutions provider",
    industry: "Cybersecurity",
    size: "51-200",
    plan: "enterprise",
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
      },
      security: {
        requireTwoFactor: true,
        sessionTimeout: 8
      }
    },
    billing: {
      status: "active",
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    limits: planLimits.enterprise
  },
  {
    id: "org-2", 
    name: "Global Finance Inc",
    slug: "global-finance",
    description: "International financial services",
    industry: "Financial Services",
    size: "201-1000",
    plan: "pro",
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
      },
      security: {
        requireTwoFactor: false,
        sessionTimeout: 4
      }
    },
    billing: {
      status: "active",
      currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    limits: planLimits.pro
  }
];

const initialMembers: OrganizationMember[] = [
  {
    id: "mem-1",
    userId: 1,
    organizationId: "org-1",
    role: "owner",
    permissions: roleHierarchy.owner,
    joinedAt: new Date().toISOString(),
    isActive: true,
    lastActiveAt: new Date().toISOString()
  },
  {
    id: "mem-2",
    userId: 2,
    organizationId: "org-1",
    role: "admin",
    permissions: roleHierarchy.admin,
    joinedAt: new Date().toISOString(),
    isActive: true,
    invitedBy: 1,
    lastActiveAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "mem-3",
    userId: 1,
    organizationId: "org-2",
    role: "owner",
    permissions: roleHierarchy.owner,
    joinedAt: new Date().toISOString(),
    isActive: true,
    lastActiveAt: new Date().toISOString()
  }
];

interface OrganizationStore {
  organizations: Organization[];
  members: OrganizationMember[];
  currentOrganization: Organization | null;
  
  // Organization management
  createOrganization: (org: Omit<Organization, 'id' | 'createdAt' | 'ownerId' | 'limits'>, userId: number) => string;
  updateOrganization: (id: string, updates: Partial<Organization>) => void;
  deleteOrganization: (id: string) => void;
  setCurrentOrganization: (orgId: string) => void;
  
  // Member management with role validation
  inviteMember: (email: string, orgId: string, role: string, invitedBy: number) => Promise<boolean>;
  updateMemberRole: (memberId: string, newRole: string) => boolean;
  removeMember: (id: string) => void;
  deactivateMember: (id: string) => void;
  
  // Permission system
  getUserOrganizations: (userId: number) => Organization[];
  getUserRole: (userId: number, orgId: string) => string | null;
  hasPermission: (userId: number, orgId: string, permission: string) => boolean;
  canInviteMembers: (userId: number, orgId: string) => boolean;
  getOrganizationMembers: (orgId: string) => OrganizationMember[];
  
  // Organization limits and billing
  canAddMember: (orgId: string) => boolean;
  getUsageStats: (orgId: string) => {
    memberCount: number;
    projectCount: number;
    storageUsed: number;
  };
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
          plan: 'free' as const,
          createdAt: new Date().toISOString(),
          limits: planLimits.free,
          billing: {
            status: 'active' as const
          }
        };
        
        set((state) => ({
          organizations: [...state.organizations, newOrg]
        }));
        
        const ownerMember: OrganizationMember = {
          id: `mem-${Date.now()}`,
          userId,
          organizationId: orgId,
          role: "owner",
          permissions: roleHierarchy.owner,
          joinedAt: new Date().toISOString(),
          isActive: true,
          lastActiveAt: new Date().toISOString()
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
      
      inviteMember: async (email, orgId, role, invitedBy) => {
        const state = get();
        const org = state.organizations.find(o => o.id === orgId);
        if (!org) return false;
        
        // Check if user can invite members
        if (!state.canInviteMembers(invitedBy, orgId)) return false;
        
        // Check member limits
        if (!state.canAddMember(orgId)) return false;
        
        // In real app, this would send an email invitation
        // For now, we'll simulate finding the user by email
        // This would normally be an API call
        
        return true;
      },
      
      updateMemberRole: (memberId, newRole) => {
        const validRoles = Object.keys(roleHierarchy);
        if (!validRoles.includes(newRole)) return false;
        
        set((state) => ({
          members: state.members.map(member =>
            member.id === memberId 
              ? { 
                  ...member, 
                  role: newRole as any,
                  permissions: roleHierarchy[newRole as keyof typeof roleHierarchy]
                } 
              : member
          )
        }));
        
        return true;
      },
      
      removeMember: (id) => {
        set((state) => ({
          members: state.members.filter(member => member.id !== id)
        }));
      },
      
      deactivateMember: (id) => {
        set((state) => ({
          members: state.members.map(member =>
            member.id === id ? { ...member, isActive: false } : member
          )
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
      
      canInviteMembers: (userId, orgId) => {
        return get().hasPermission(userId, orgId, "members.invite");
      },
      
      getOrganizationMembers: (orgId) => {
        return get().members.filter(m => m.organizationId === orgId && m.isActive);
      },
      
      canAddMember: (orgId) => {
        const org = get().organizations.find(o => o.id === orgId);
        if (!org) return false;
        
        const currentMembers = get().getOrganizationMembers(orgId);
        return currentMembers.length < org.limits.maxMembers;
      },
      
      getUsageStats: (orgId) => {
        const members = get().getOrganizationMembers(orgId);
        return {
          memberCount: members.length,
          projectCount: 0, // Would be calculated from projects
          storageUsed: 0 // Would be calculated from actual usage
        };
      }
    }),
    {
      name: "organization-storage"
    }
  )
);
