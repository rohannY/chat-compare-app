import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import logo from "../../../public/logo.svg";

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
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#compare", label: "Compare" },
    { href: "#footer", label: "Contact" },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-subtle"
          : "bg-transparent dark:bg-black"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <div className="flex items-center">
          <div className="flex items-center space-x-1 font-medium text-xl">
            <img src={logo} className="w-6 h-6 text-primary" />
            <span className="font-semibold dark:text-white text-md font-inter">
              Compare
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{
                backgroundColor:
                  theme === "light"
                    ? "rgba(0,0,0,0.05)"
                    : "rgba(255,255,255,0.1)",
                scale: 1.02,
                transition: { duration: 0.05 },
              }}
              whileTap={{ scale: 0.98 }}
              className="relative text-gray-700 dark:text-gray-200 hover:text-primary px-3 py-1 rounded-md transition-all duration-300 hover:bg-gray-200/50 dark:hover:bg-white/10"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            size="sm"
            className="bg-primary/90 hover:bg-primary dark:bg-neutral-800 cursor-pointer"
          >
            Get Started
          </Button>
          {mounted && (
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;