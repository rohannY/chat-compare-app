import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Shortcut } from "./shortcut";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

function toPascalCase(str: string) {
  return str
    .toLowerCase() // Convert everything to lowercase
    .split(/[^a-zA-Z0-9]+/) // Split by non-alphanumeric characters
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(""); // Join without spaces
}

export default function Page({ children }: { children: ReactNode }) {
  const location = useLocation();
  const path = location.pathname;
  const parts = path.split("/");

  return (
    <>
      <SidebarProvider className="font-geist tracking-wide dark max-w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/models">
                      {/* {toPascalCase(parts[1])} */}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    {/* <BreadcrumbPage> {toPascalCase(parts[2])}</BreadcrumbPage> */}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <Shortcut />
    </>
  );
}
