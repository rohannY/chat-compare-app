import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  Scale,
  Zap,
  BarChart,
  RefreshCw,
  Mail,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const Features = () => {
  const [expandedTile, setExpandedTile] = useState<number | null>(null);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Auto-rotate feature highlights
  useEffect(() => {
    if (expandedTile === null) {
      const timer = setTimeout(() => {
        setActiveFeatureIndex((prev) => (prev + 1) % features.length);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeFeatureIndex, expandedTile]);

  // Track mouse position for parallax effects
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6 text-gray-300" />,
      title: "Live Prompting",
      description:
        "Adjust prompts in real-time and see how different AI models interpret your instructions. Our visual interface makes it easy to experiment with variations.",
      color: "bg-gradient-to-b from-red-900/40 to-black",
      primaryColor: "#ef4444",
    },
    {
      icon: <Scale className="w-6 h-6 text-gray-300" />,
      title: "Analysis Dashboard",
      description:
        "Track model performance metrics across various types of prompts and contexts. Get detailed insights into how your AI is performing with customizable reports.",
      color: "bg-gradient-to-b from-zinc-800 to-black",
      primaryColor: "#71717a",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gray-300" />,
      title: "Company Fine-tuning",
      description:
        "Customize model responses to align with your company's voice and knowledge base. Train on your data to create a truly personalized AI assistant.",
      color: "bg-gradient-to-b from-indigo-900/40 to-black",
      primaryColor: "#6366f1",
    },
    {
      icon: <Zap className="w-6 h-6 text-gray-300" />,
      title: "Fast Analysis",
      description:
        "Get instant comparisons of response quality, accuracy, and creativity across models. Compare up to 5 different AI providers simultaneously.",
      color: "bg-gradient-to-b from-gray-700 to-black",
      primaryColor: "#4ade80",
    },
    {
      icon: <BarChart className="w-6 h-6 text-gray-300" />,
      title: "Historical Averages",
      description:
        "Track performance over time to identify trends and improvements in AI responses. Use our advanced analytics to optimize your prompts for better results.",
      color: "bg-gradient-to-b from-purple-900/40 to-black",
      primaryColor: "#a855f7",
    },
  ];

  const backgroundX = useTransform(mouseX, [0, 1], [10, -10]);
  const backgroundY = useTransform(mouseY, [0, 1], [10, -10]);

  return (
    <section
      id="features"
      className="py-20 md:py-32 text-white relative overflow-hidden"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.div
          className="absolute inset-0"
          style={{ x: backgroundX, y: backgroundY }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 30 + 5,
                height: Math.random() * 30 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background:
                  i % 5 === 0
                    ? `radial-gradient(circle, ${
                        features[i % features.length].primaryColor
                      }20 0%, transparent 70%)`
                    : "rgba(255, 255, 255, 0.03)",
              }}
              animate={{
                x: [0, Math.random() * 150 - 75],
                y: [0, Math.random() * 150 - 75],
                opacity: [0.1, 0.4, 0.1],
                scale: [1, Math.random() * 0.5 + 0.8, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 20 + 15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black rounded-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
            <motion.span
              className="opacity-30 line-through"
              initial={{ x: -20 }}
              animate={isInView ? { x: 0 } : { x: -20 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              One
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {" "}
              <span className="relative">
                a few more things
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 rounded-full"
                  style={{
                    background: features[activeFeatureIndex].primaryColor,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </span>
              .
            </motion.span>
          </h2>
          <motion.p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            There's even more to discover. Our app brings you a collection of
            advanced tools designed to refine and elevate your workflow.
          </motion.p>
        </motion.div>

        <div className="flex flex-row flex-wrap justify-center gap-3 md:gap-4">
          {features.map((feature, index) => {
            const isExpanded = expandedTile === index;
            const isActive =
              activeFeatureIndex === index && expandedTile === null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        width: isExpanded ? "340px" : "152px",
                        border: isActive
                          ? `1px solid ${feature.primaryColor}50`
                          : "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: isActive
                          ? `0 0 20px ${feature.primaryColor}30`
                          : "none",
                      }
                    : { opacity: 0, y: 50 }
                }
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  width: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  },
                }}
                className={`relative overflow-hidden rounded-2xl ${feature.color} border border-white/10 group cursor-pointer`}
                style={{ height: "380px" }}
                onMouseEnter={() => {
                  setExpandedTile(index);
                  setActiveFeatureIndex(index);
                }}
                onMouseLeave={() => setExpandedTile(null)}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 25px ${feature.primaryColor}30`,
                }}
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                  animate={{ opacity: isExpanded ? 0.2 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: `radial-gradient(circle at center, ${feature.primaryColor}50 0%, transparent 70%)`,
                  }}
                />

                <div className="h-full w-full p-5 flex flex-col justify-between relative z-10">
                  {/* Vertical title (visible when collapsed) */}
                  <motion.div
                    className="writing-mode-vertical-rl transform rotate-180 text-sm font-medium text-gray-300"
                    animate={{
                      opacity: isExpanded ? 0 : 1,
                      x: isExpanded ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.title}
                  </motion.div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 p-5 flex flex-col justify-between"
                      >
                        <div className="mb-auto">
                          <motion.h3
                            className="text-xl font-semibold mb-3 flex items-center"
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <span
                              className="mr-2"
                              style={{ color: feature.primaryColor }}
                            >
                              {feature.icon}
                            </span>
                            {feature.title}
                          </motion.h3>
                          <motion.p
                            className="text-gray-300 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            {feature.description}
                          </motion.p>
                        </div>

                        <motion.div
                          className="mt-auto"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <button
                            className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                            style={{ color: feature.primaryColor }}
                          >
                            Learn more
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon position fixed to always be visible */}
                  <motion.div
                    className="mt-auto relative"
                    animate={{
                      scale: isExpanded ? 0 : 1,
                      opacity: isExpanded ? 0 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      animate={{
                        rotate: isActive ? [0, 10, 0] : 0,
                        scale: isActive ? [1, 1.2, 1] : 1,
                        color: isActive ? feature.primaryColor : "#9ca3af",
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isActive ? Infinity : 0,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                  </motion.div>

                  {/* Animated glow effect */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="absolute -inset-1 rounded-2xl z-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${feature.primaryColor} 0%, transparent 70%)`,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button
            className="px-6 py-3 bg-white/10 rounded-lg font-medium flex items-center gap-2 mx-auto hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore all features
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
