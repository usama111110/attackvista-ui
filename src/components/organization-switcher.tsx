
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
          className="w-64 justify-between"
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="truncate">
              {currentOrganization?.name || "Select organization..."}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Command>
          <CommandInput placeholder="Search organizations..." />
          <CommandList>
            <CommandEmpty>No organizations found.</CommandEmpty>
            <CommandGroup heading="Organizations">
              {userOrganizations.map((org) => (
                <CommandItem
                  key={org.id}
                  onSelect={() => handleSelect(org.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <Building2 className="h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{org.name}</div>
                      <div className="text-xs text-muted-foreground">{org.industry}</div>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentOrganization?.id === org.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  navigate("/organizations/new");
                }}
                className="cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Organization
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  navigate("/organizations");
                }}
                className="cursor-pointer"
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
