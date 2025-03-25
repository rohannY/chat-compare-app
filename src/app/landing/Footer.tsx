import { Github, Twitter, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../../public/logo.svg";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="footer">
      <footer className="bg-gray-50 dark:bg-neutral-900 rounded-b-2xl dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div
              className="col-span-2 md:col-span-5"
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center space-x-2 mb-4 group"
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src={logo}
                  className="w-6 h-6 text-primary transition-all duration-300"
                />
                <span className="font-semibold text-xl group-hover:text-primary transition-colors duration-300 dark:text-neutral-100">
                  ChatCompare
                </span>
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 md:max-w-md text-start">
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
                  <motion.a
                    key={i}
                    href="#"
                    aria-label={item.label}
                    className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-gray-200 transition-all duration-300"
                    whileTap={{ scale: 0.9 }}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <div className="col-span-3"></div>

            <motion.div
              className="col-span-1 md:col-span-2"
              variants={itemVariants}
            >
              <h3 className="font-medium text-sm text-start uppercase text-gray-500 dark:text-gray-400 mb-4">
                Product
              </h3>
              <ul className="space-y-1 text-start">
                {[
                  "Features",
                  "Pricing",
                  "Integrations",
                  "API",
                  "Documentation",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm inline-block"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="col-span-1 md:col-span-2"
              variants={itemVariants}
            >
              <h3 className="font-medium text-sm text-start uppercase text-gray-500 dark:text-gray-400 mb-4">
                Company
              </h3>
              <ul className="space-y-1 text-start">
                {[
                  "About",
                  "Blog",
                  "Careers",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm inline-block"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="col-span-2 md:col-span-4 text-sm text-gray-500 dark:text-gray-400 text-start">
              © {new Date().getFullYear()} ChatCompare. All rights reserved.
            </p>
            <div className="col-span-1 md:col-span-4"></div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              {["Privacy", "Terms", "Cookies", "Sitemap"].map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 dark:bg-primary/80 dark:hover:bg-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </footer>
    </section>
  );
};

export default Footer;
