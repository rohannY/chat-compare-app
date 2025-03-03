import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-subtle"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-1 font-medium text-xl">
            <MessageSquare className="w-6 h-6 text-primary animate-pulse" />
            <span className="font-semibold">ChatCompare</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="#features">
            Features
          </a>
          <a href="#compare">
            Compare
          </a>
          <a href="/docs">
            Docs
          </a>
          <a href="#faq">
            FAQ
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button size="sm" className="bg-primary/90 hover:bg-primary">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
