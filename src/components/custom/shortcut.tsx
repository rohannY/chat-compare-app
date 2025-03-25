import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search, ArrowRight } from "lucide-react";

export const Shortcut = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock search results - replace with your actual implementation
  const searchResults = [
    {
      id: 1,
      title: "Documentation Overview",
      description: "Comprehensive guide to getting started with our platform",
      href: "/docs",
    },
    {
      id: 2,
      title: "Chat API Integration",
      description: "Detailed documentation for implementing and using the Chat API",
      href: "/docs/chat",
    },
    {
      id: 3,
      title: "OpenAI Model Guide",
      description: "Comprehensive overview of OpenAI model capabilities and implementation",
      href: "/docs/models/openai",
    },
    {
      id: 4,
      title: "Claude Model Integration",
      description: "In-depth guide to integrating and utilizing Claude AI models",
      href: "/docs/models/claude",
    },
  ];

  // Filter results based on search query
  const filteredResults = searchQuery
    ? searchResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchResults;

  // Handle keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
      }

      // Close with escape key
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      {/* Keyboard shortcut indicator */}
      <div className="dark font-geist fixed bottom-4 right-4 bg-background shadow-lg rounded-full px-3 py-2 border flex items-center gap-2 text-sm text-muted-foreground">
        <span>Press</span>
        <kbd className="px-2 py-1 bg-muted rounded text-xs font-semibold">
          /
        </kbd>
        <span>for search</span>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden font-geist dark">
          <Command className="rounded-lg border shadow-md">
            <div className="flex items-center border-b px-3">
              <CommandInput
                placeholder="Search documentation..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm font-geist outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <CommandList className="max-h-[400px] overflow-y-auto py-2">
              <CommandEmpty className="py-6 text-center text-sm">
                <div className="flex flex-col items-center gap-2">
                  <Search className="h-10 w-10 text-muted-foreground/50" />
                  <p className="text-muted-foreground font-medium">
                    No results found
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Try searching for components, guides, or examples
                  </p>
                </div>
              </CommandEmpty>
              {filteredResults.length > 0 && (
                <CommandGroup heading="Documentation" className="px-2">
                  {filteredResults.map((result) => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => {
                        window.location.href = result.href;
                        setOpen(false);
                      }}
                      className="flex items-center justify-between px-4 py-3 cursor-pointer rounded-md hover:bg-accent transition-colors duration-200"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {result.title}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {result.description}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <ArrowRight className="h-4 w-4 text-muted-foreground/70" />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              <div className="mt-4 border-t pt-4 px-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">
                      ↑
                    </kbd>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">
                      ↓
                    </kbd>
                    <span>to navigate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">
                      Enter
                    </kbd>
                    <span>to select</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">
                      Esc
                    </kbd>
                    <span>to close</span>
                  </div>
                </div>
              </div>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};