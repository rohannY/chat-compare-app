import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import AnimatedGradient from "@/components/AnimatedGradient";
import {
  Check,
  MessageSquare,
  ArrowRight,
  Play,
  Award,
  ShieldCheck,
} from "lucide-react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const x1 = useMotionValue(0);
  const y1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const y2 = useMotionValue(0);

  useEffect(() => {
    const animateBlob = (motionValue: any, range: number[]) => {
      animate(motionValue, range, {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 5 + Math.random() * 3,
        ease: "easeInOut",
      });
    };

    animateBlob(x1, [-50, 50]);
    animateBlob(y1, [-30, 30]);
    animateBlob(x2, [-40, 40]);
    animateBlob(y2, [-20, 20]);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const models = [
    {
      name: "ChatGPT",
      icon: MessageSquare,
      color: "bg-green-100 text-green-800 border-green-200/50",
    },
    {
      name: "Claude",
      icon: ShieldCheck,
      color: "bg-purple-100 text-purple-800 border-purple-200/50",
    },
    {
      name: "xAI",
      icon: Award,
      color: "bg-blue-100 text-blue-800 border-blue-200/50",
    },
    {
      name: "Mistral",
      icon: Check,
      color: "bg-orange-100 text-orange-800 border-orange-200/50",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden pt-20 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white dark:bg-gradient-to-b dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-t-2xl dark:rounded-b-2xl"
    >
      <motion.div className="absolute inset-0 opacity-60 dark:opacity-20">
        <motion.div
          style={{ x: x1, y: y1 }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 dark:bg-purple-700 dark:mix-blend-screen rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          style={{ x: x2, y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
          className="absolute top-10 right-20 w-72 h-72 bg-yellow-300 dark:bg-yellow-600 dark:mix-blend-screen rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          style={{
            x: -x2,
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          }}
          className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 dark:bg-pink-600 dark:mix-blend-screen rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          style={{ x: x1, y: useTransform(scrollYProgress, [0, 1], [0, 120]) }}
          className="absolute right-20 bottom-20 w-56 h-56 bg-blue-300 dark:bg-blue-700 dark:mix-blend-screen rounded-full mix-blend-multiply filter blur-3xl animate-blob"
        />
      </motion.div>

      <div
        className="absolute inset-0 overflow-hidden"
        ref={containerRef}
      ></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-24 md:pt-20 md:pb-32 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-sm font-medium mb-6 backdrop-blur-sm border border-blue-200/50 shadow-sm dark:bg-blue-900/80 dark:text-blue-300 dark:border-blue-600/50 space-x-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            </span>
            <span>Introducing ChatCompare</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl dark:text-neutral-100"
          >
            <motion.span
              className="inline"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Compare
            </motion.span>
            <AnimatedGradient className="inline-block text-transparent bg-clip-text pb-1 px-4">
              AI Responses
            </AnimatedGradient>
            <motion.span
              className="inline"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              {" "}
              from Top LLMs
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 dark:text-neutral-300 max-w-2xl mb-8 md:mb-10"
          >
            See how ChatGPT, Claude, xAI, and Mistral respond to the same
            prompts, side by side, in real-time. Find the best AI for your
            specific needs.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className="shadow-lg shadow-blue-500/10 dark:shadow-gray-500/20 relative overflow-hidden group"
              >
                <span className="relative flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Start Comparing Now
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="lg"
                className="group dark:border-neutral-700 dark:text-neutral-600"
              >
                <span className="relative flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  See How It Works
                  <motion.div animate={{ x: [0, 5, 0] }}>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-gray-600 dark:text-neutral-400"
          >
            {models.map((model) => (
              <motion.div
                key={model.name}
                variants={fadeInUp}
                className={`flex items-center px-3 py-1.5 rounded-full border shadow-sm hover:shadow-md transition-all duration-300 ${model.color} backdrop-blur-sm dark:border-neutral-700`}
              >
                <model.icon className="w-4 h-4 mr-2 dark:text-neutral-600" />
                <span>{model.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-neutral-900 dark:to-transparent"></div>
    </div>
  );
};

export default Hero;
