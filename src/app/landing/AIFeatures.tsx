import React, { useState } from "react";
import {
  MessageSquare,
  ChevronRight,
  BarChart2,
  Zap,
  Award,
  Eye,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import AnimatedGradient from "@/components/AnimatedGradient";

const AIFeatures = () => {
  const [expandedModel, setExpandedModel] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"performance" | "features">(
    "performance"
  );
  const mouseX = useMotionValue(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Animation variants for container elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for individual elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Enhanced animation for card hover
  const cardVariants = {
    initial: { y: 0, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  // Models data with enhanced information
  const models = [
    {
      name: "ChatGPT",
      description: "Excels at general knowledge tasks with fast response times",
      scores: { accuracy: 92, creativity: 87, speed: 95, context: 89 },
      color: "#10a37f",
      strengths: [
        "Broad knowledge base",
        "Fast responses",
        "Good documentation",
      ],
      weaknesses: ["Limited reasoning", "Occasional factual errors"],
      bestFor: ["Content creation", "Code assistance", "Educational tasks"],
    },
    {
      name: "Claude",
      description: "Strong analytical abilities with high accuracy and safety",
      scores: { accuracy: 94, creativity: 90, speed: 88, context: 96 },
      color: "#8e44ad",
      strengths: ["Context handling", "Factual accuracy", "Nuanced reasoning"],
      weaknesses: ["Slower processing", "Limited code generation"],
      bestFor: [
        "Document analysis",
        "Complex reasoning",
        "Safety-critical applications",
      ],
    },
    {
      name: "xAI",
      description: "Creative and innovative with strong reasoning capabilities",
      scores: { accuracy: 89, creativity: 95, speed: 91, context: 87 },
      color: "#e74c3c",
      strengths: [
        "Creative solutions",
        "Problem-solving",
        "Innovative approaches",
      ],
      weaknesses: ["Less reliable for factual answers", "Inconsistent results"],
      bestFor: [
        "Creative writing",
        "Brainstorming",
        "Novel approach generation",
      ],
    },
    {
      name: "Mistral",
      description:
        "Fast and efficient with strong performance on technical tasks",
      scores: { accuracy: 90, creativity: 85, speed: 97, context: 88 },
      color: "#3498db",
      strengths: [
        "Processing speed",
        "Technical knowledge",
        "Efficient responses",
      ],
      weaknesses: ["Less creative", "Weaker with ambiguity"],
      bestFor: ["Technical documentation", "Data analysis", "Quick responses"],
    },
  ];

  // Calculate background gradient based on mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    mouseX.set(x);
  };

  const gradientPosition = useTransform(mouseX, [0, 1], ["0%", "100%"]);

  // Function to calculate score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 95) return "#10b981"; // green
    if (score >= 90) return "#3b82f6"; // blue
    if (score >= 85) return "#8b5cf6"; // purple
    return "#f59e0b"; // amber
  };

  return (
    <section
      id="compare"
      className="py-20 md:py-32 bg-gray-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(80px)",
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 10 + 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, backgroundColor: "#dbeafe" }}
          >
            AI Comparison
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            Make Informed AI Decisions
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Different AI models have unique strengths and limitations.
            ChatCompare helps you identify which model excels at your specific
            tasks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-4"
              variants={itemVariants}
            >
              Optimize Your AI Workflow
            </motion.h3>
            <motion.p className="text-gray-600 mb-6" variants={itemVariants}>
              Stop wasting time with the wrong AI tools. Our platform lets you
              compare all major AI models side-by-side to find the perfect fit
              for your needs.
            </motion.p>

            <motion.ul className="space-y-3" variants={containerVariants}>
              {[
                {
                  text: "Save time by testing multiple models simultaneously",
                  icon: <Zap className="w-3 h-3 text-white" />,
                },
                {
                  text: "Identify which model provides the most accurate information",
                  icon: <Award className="w-3 h-3 text-white" />,
                },
                {
                  text: "See how different models interpret ambiguous prompts",
                  icon: <Eye className="w-3 h-3 text-white" />,
                },
                {
                  text: "Discover unique creative approaches from each AI",
                  icon: <MessageSquare className="w-3 h-3 text-white" />,
                },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <motion.span
                    className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="text-gray-700">{item.text}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              className="mt-8 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(66, 153, 225, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              Start comparing models
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            onMouseMove={handleMouseMove}
          >
            <AnimatedGradient className="absolute -inset-4 rounded-xl opacity-20 blur-xl -z-10" />

            {/* Tabs for switching views */}
            <div className="flex mb-6 bg-white rounded-lg p-1 shadow-sm max-w-xs mx-auto">
              {["performance", "features"].map((tab) => (
                <motion.button
                  key={tab}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                    activeTab === tab ? "text-white" : "text-gray-600"
                  }`}
                  onClick={() =>
                    setActiveTab(tab as "performance" | "features")
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab === "performance" ? "Performance" : "Features"}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md -z-10"
                      layoutId="activeTab"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.div
              className="glass-panel p-6 md:p-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg"
              style={{
                background: `linear-gradient(${gradientPosition}, rgba(255,255,255,0.97), rgba(245,245,250,0.97))`,
              }}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {activeTab === "performance" ? (
                    <BarChart2 className="w-5 h-5 text-blue-500 mr-2" />
                  ) : (
                    <MessageSquare className="w-5 h-5 text-purple-500 mr-2" />
                  )}
                </motion.div>
                <h4 className="font-semibold text-gray-800">
                  {activeTab === "performance"
                    ? "AI Model Performance"
                    : "Model Features Comparison"}
                </h4>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "performance" && (
                  <motion.div
                    key="performance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-5"
                  >
                    {models.map((model, i) => (
                      <motion.div
                        key={i}
                        className="space-y-3 p-3 rounded-lg transition-all duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        style={{
                          backgroundColor:
                            hoveredCard === i
                              ? "rgba(0,0,0,0.02)"
                              : "transparent",
                          borderLeft:
                            hoveredCard === i
                              ? `3px solid ${model.color}`
                              : "3px solid transparent",
                        }}
                        onMouseEnter={() => setHoveredCard(i)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() =>
                          setExpandedModel(expandedModel === i ? null : i)
                        }
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <motion.div
                              className="w-2 h-2 rounded-full mr-2"
                              style={{ backgroundColor: model.color }}
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                                delay: i * 0.5,
                              }}
                            />
                            <span className="font-medium">{model.name}</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                          >
                            Details
                          </motion.button>
                        </div>

                        <AnimatePresence>
                          {(expandedModel === i || hoveredCard === i) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-xs text-gray-500 overflow-hidden"
                            >
                              {model.description}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(model.scores).map(
                            ([key, value], scoreIndex) => (
                              <div key={scoreIndex} className="space-y-1">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="capitalize">{key}</span>
                                  <span
                                    className="font-medium"
                                    style={{ color: getScoreColor(value) }}
                                  >
                                    {value}%
                                  </span>
                                </div>
                                <motion.div
                                  className="h-2 bg-gray-200 rounded-full overflow-hidden"
                                  whileInView={{ scale: [0.9, 1] }}
                                  viewport={{ once: true }}
                                  transition={{ delay: i * 0.1 + 0.8 }}
                                >
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                      backgroundColor: getScoreColor(value),
                                    }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${value}%` }}
                                    viewport={{ once: true }}
                                    transition={{
                                      delay: i * 0.1 + scoreIndex * 0.1,
                                      duration: 1,
                                      ease: "easeOut",
                                    }}
                                  />
                                </motion.div>
                              </div>
                            )
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "features" && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-5 gap-2 text-xs font-medium text-gray-500 pb-2 border-b">
                      <div className="col-span-1">Model</div>
                      <div className="col-span-1">Best For</div>
                      <div className="col-span-1">Strengths</div>
                      <div className="col-span-1">Weaknesses</div>
                      <div className="col-span-1">Overall</div>
                    </div>

                    {models.map((model, i) => (
                      <motion.div
                        key={i}
                        className="grid grid-cols-5 gap-2 py-2 text-xs"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{
                          backgroundColor: "rgba(0,0,0,0.02)",
                          borderRadius: "0.5rem",
                        }}
                      >
                        <div className="col-span-1 font-medium flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: model.color }}
                          />
                          {model.name}
                        </div>
                        <div className="col-span-1 text-gray-600">
                          {model.bestFor[0]}
                        </div>
                        <div className="col-span-1 text-gray-600">
                          {model.strengths[0]}
                        </div>
                        <div className="col-span-1 text-gray-600">
                          {model.weaknesses[0]}
                        </div>
                        <div className="col-span-1">
                          <motion.div
                            className="h-1.5 bg-gray-200 rounded-full overflow-hidden"
                            whileInView={{ scale: [0.9, 1] }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(to right, ${model.color}80, ${model.color})`,
                              }}
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${
                                  Object.values(model.scores).reduce(
                                    (sum, curr) => sum + curr,
                                    0
                                  ) / Object.values(model.scores).length
                                }%`,
                              }}
                              viewport={{ once: true }}
                              transition={{
                                delay: i * 0.1,
                                duration: 1,
                                ease: "easeOut",
                              }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}

                    <motion.div
                      className="flex justify-end mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <motion.button
                        className="text-xs font-medium px-3 py-1.5 rounded-lg text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        whileHover={{ x: 3 }}
                      >
                        View full comparison
                        <ChevronRight className="w-3 h-3" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
