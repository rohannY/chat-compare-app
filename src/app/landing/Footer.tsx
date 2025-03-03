import React, { useState } from "react";
import {
  MessageSquare,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // In a real app, you would send this to your API
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="col-span-1 md:col-span-5">
            <div className="flex items-center space-x-2 mb-4 group">
              <MessageSquare className="w-6 h-6 text-primary transition-all duration-300 group-hover:scale-110" />
              <span className="font-semibold text-xl group-hover:text-primary transition-colors duration-300">
                ChatCompare
              </span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md text-start">
              Compare responses from the world's leading AI models to find the
              perfect assistant for your needs.
            </p>

            <div className="flex space-x-4">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "Email" },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={item.label}
                  className="text-gray-500 hover:text-primary transition-all duration-300 hover:scale-110 transform"
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3"></div>
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium text-sm uppercase text-gray-500 mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {[
                "Features",
                "Pricing",
                "Integrations",
                "API",
                "Documentation",
              ].map((item, i) => (
                <li
                  key={i}
                  className="transform translate-x-0 hover:translate-x-1 transition-transform duration-300"
                >
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors text-sm inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium text-sm uppercase text-gray-500 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                "About",
                "Blog",
                "Careers",
                "Privacy Policy",
                "Terms of Service",
              ].map((item, i) => (
                <li
                  key={i}
                  className="transform translate-x-0 hover:translate-x-1 transition-transform duration-300"
                >
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors text-sm inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ChatCompare. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {["Privacy", "Terms", "Cookies", "Sitemap"].map((item, i) => (
              <a
                key={i}
                href="#"
                className="text-sm text-gray-500 hover:text-primary transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
