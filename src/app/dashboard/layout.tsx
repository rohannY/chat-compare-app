import { AppSidebar } from "@/components/custom/app-sidebar";
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
import { Shortcut } from "../../components/custom/shortcut";
import { Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

function toPascalCase(str: string) {
  return str
    .toLowerCase() // Convert everything to lowercase
    .split(/[^a-zA-Z0-9]+/) // Split by non-alphanumeric characters
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(""); // Join without spaces
}

export default function Page() {
  const location = useLocation();
  const path = location.pathname;
  const parts = path.split("/");
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <SidebarProvider className="font-geist tracking-wide dark max-w-full bg-[#09090B] font-geist">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
                  </BreadcrumbItem>

                  {parts[1] && parts[1] !== "docs" && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href={`/docs/${parts[1]}`}>
                          {toPascalCase(parts[1])}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  )}

                  {parts[2] && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {parts[2] === "models" && parts[3]
                            ? toPascalCase(parts[3])
                            : toPascalCase(parts[2])}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="text-white pr-16">
              <Button
                size="sm"
                className="rounded-lg cursor-pointer relative overflow-hidden w-8 h-8 p-0 border border-gray-200 dark:border-gray-800 dark:bg-black/90 dark:text-white"
                variant="outline"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme === "dark" ? "moon" : "sun"}
                    initial={{ opacity: 0, rotate: -30 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 30 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center w-full h-full"
                  >
                    {theme === "dark" ? (
                      <MoonIcon size={16} />
                    ) : (
                      <SunIcon size={16} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
      <Shortcut />
    </>
  );
}
