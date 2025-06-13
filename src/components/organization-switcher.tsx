
import { useState } from "react";
import { Check, ChevronsUpDown, Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrganizationStore } from "@/utils/organizationDatabase";
import { useUserStore } from "@/utils/userDatabase";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function OrganizationSwitcher() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useUserStore();
  const { 
    currentOrganization, 
    setCurrentOrganization, 
    getUserOrganizations 
  } = useOrganizationStore();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const userOrganizations = getUserOrganizations(currentUser.id);

  const handleSelect = (orgId: string) => {
    setCurrentOrganization(orgId);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-background hover:bg-accent border-border"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Building2 className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <span className="truncate font-medium text-foreground">
              {currentOrganization?.name || "Select organization..."}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-64 p-0 bg-background border border-border shadow-lg z-50" 
        align="start"
        sideOffset={4}
      >
        <Command className="bg-background">
          <CommandInput placeholder="Search organizations..." className="h-9 border-0" />
          <CommandList className="bg-background">
            <CommandEmpty className="text-muted-foreground">No organizations found.</CommandEmpty>
            <CommandGroup>
              {userOrganizations.map((org) => (
                <CommandItem
                  key={org.id}
                  onSelect={() => handleSelect(org.id)}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Building2 className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-foreground">{org.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{org.industry}</div>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4 flex-shrink-0 text-primary",
                      currentOrganization?.id === org.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator className="bg-border" />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  navigate("/organizations/new");
                }}
                className="cursor-pointer text-primary hover:bg-accent hover:text-accent-foreground"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Organization
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  navigate("/organizations");
                }}
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Manage Organizations
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
