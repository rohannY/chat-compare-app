import { ChevronRight, type LucideIcon } from "lucide-react";
import { Search } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      method?: string;
      url: string;
    }[];
  }[];
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <SidebarGroup className="dark">
      <div
        className={`w-full h-8 flex items-center px-3 border rounded-md transition-all ${
          focused
            ? "border-blue-500 ring-2 ring-blue-100"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <Search className="text-gray-400 mr-2" size={16} />
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full h-full outline-none text-gray-800 placeholder-gray-400 text-[12px]"
          aria-label="Search"
        />

        {value && (
          <button
            onClick={() => setValue("")}
            className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label="Clear search"
          >
            ×
          </button>
        )}

        {!value && !focused && (
          <div className="flex items-center">
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>/
            </kbd>
          </div>
        )}
      </div>

      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="pl-2.5 mr-0 pr-1">
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url} className="flex justify-between">
                          <span>{subItem.title}</span>
                          <span className="text-blue-400 font-medium">
                            {subItem.method}
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
