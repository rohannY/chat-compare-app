import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageSquare, MoonIcon, SunIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Only show the theme toggle after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-subtle"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-1 font-medium text-xl">
            <MessageSquare className="w-6 h-6 text-primary animate-pulse" />
            <span className="font-semibold dark:text-white">ChatCompare</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="#features" className="dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">Features</a>
          <a href="#compare" className="dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">Compare</a>
          <a href="/docs" className="dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">Docs</a>
          <a href="#faq" className="dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">FAQ</a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex dark:border-gray-700 dark:text-gray-200">
            Sign In
          </Button>
          <Button size="sm" className="bg-primary/90 hover:bg-primary">
            Get Started
          </Button>
          {mounted && (
            <Button
              size="sm"
              className="rounded-lg cursor-pointer relative overflow-hidden w-8 h-8 p-0"
              variant="outline"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme === 'dark' ? "moon" : "sun"}
                  initial={{ opacity: 0, rotate: -30 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center w-full h-full"
                >
                  {theme === 'dark' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
                </motion.div>
              </AnimatePresence>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;