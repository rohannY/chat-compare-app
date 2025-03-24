import { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import AIFeatures from "./AIFeatures";
import Footer from "./Footer";

const Index = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const id = target.getAttribute("href")?.substring(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="dark:bg-black">
      <div className="min-h-screen bg-background text-foreground font-geist p-[2rem] max-w-[1280px] mx-auto dark:bg-black/80 border-dotted border-[#11101014] dark:border-[#ffffff14] border-x-2 space-y-2">
        <Navbar />
        <main className="pt-10">
          <Hero />
          <Features />
          <AIFeatures />
        </main>
        <div className="m y-2">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
