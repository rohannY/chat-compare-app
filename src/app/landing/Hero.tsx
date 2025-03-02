import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import AnimatedGradient from '@/components/AnimatedGradient';
import { Check, MessageSquare, ArrowRight, Play, Award, ShieldCheck } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  useEffect(() => {
    const createBubble = () => {
      if (!containerRef.current) return;
      
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      
      // Random size between 10px and 60px
      const size = Math.random() * 50 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      
      // Random position within the container
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const posX = Math.random() * containerWidth;
      const posY = Math.random() * containerHeight;
      
      bubble.style.left = `${posX}px`;
      bubble.style.top = `${posY}px`;
      
      // Random color with very light opacity
      const hue = Math.floor(Math.random() * 360);
      bubble.style.backgroundColor = `hsla(${hue}, 70%, 70%, 0.2)`;
      
      // Animation
      bubble.style.opacity = '0';
      bubble.style.transform = 'scale(0)';
      bubble.style.transition = 'all 1.5s ease-out, opacity 1.5s ease-out';
      
      containerRef.current.appendChild(bubble);
      
      // Start animation after a small delay
      setTimeout(() => {
        bubble.style.opacity = '0.2';
        bubble.style.transform = 'scale(1)';
      }, 10);
      
      // Remove bubble after animation completes
      setTimeout(() => {
        if (containerRef.current && containerRef.current.contains(bubble)) {
          containerRef.current.removeChild(bubble);
        }
      }, 3000);
    };
    
    // Create bubbles periodically
    const interval = setInterval(createBubble, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
      }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const models = [
    { name: "ChatGPT", icon: MessageSquare, color: "bg-green-100 text-green-800 border-green-200/50" },
    { name: "Claude", icon: ShieldCheck, color: "bg-purple-100 text-purple-800 border-purple-200/50" },
    { name: "xAI", icon: Award, color: "bg-blue-100 text-blue-800 border-blue-200/50" },
    { name: "Mistral", icon: Check, color: "bg-orange-100 text-orange-800 border-orange-200/50" }
  ];
  
  return (
    <div 
      ref={sectionRef}
      className="relative overflow-hidden pt-20 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white"
    >
      {/* Abstract background shapes with parallax effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ opacity: bgOpacity }}
      >
        <motion.div style={{ y }} className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></motion.div>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }} className="absolute top-10 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></motion.div>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }} className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></motion.div>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 120]) }} className="absolute right-20 bottom-20 w-56 h-56 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></motion.div>
      </motion.div>
      
      {/* Floating bubbles container */}
      <div className="absolute inset-0 overflow-hidden" ref={containerRef}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-24 md:pt-20 md:pb-32 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-sm font-medium mb-6 backdrop-blur-sm border border-blue-200/50 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            <span>Introducing ChatCompare</span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl"
          >
            <motion.span 
              className="inline"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Compare 
            </motion.span>
            <AnimatedGradient className="inline-block text-transparent bg-clip-text pb-1">
              AI Responses
            </AnimatedGradient>
            <motion.span 
              className="inline"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              {" "}from Top LLMs
            </motion.span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8 md:mb-10"
          >
            See how ChatGPT, Claude, xAI, and Mistral respond to the same prompts, side by side, in real-time. Find the best AI for your specific needs.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                size="lg" 
                className="shadow-xl shadow-blue-500/10 relative overflow-hidden group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.span 
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100"
                  animate={isHovering ? { scale: [1, 1.5], opacity: [0, 1] } : {}}
                  transition={{ duration: 0.7 }}
                ></motion.span>
                <span className="relative flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Start Comparing Now
                </span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="group"
              >
                <span className="relative flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  See How It Works
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  >
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={staggerChildren}
            className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-gray-600"
          >
            {models.map((model, index) => (
              <motion.div 
                key={model.name}
                variants={fadeInUp}
                className={`flex items-center px-3 py-1.5 rounded-full border shadow-sm hover:shadow-md transition-all duration-300 ${model.color} backdrop-blur-sm`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + (index * 0.1) }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
                }}
              >
                <model.icon className="w-4 h-4 mr-2" />
                <span>{model.name}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Animated counter section */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-8 mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {[
              { label: "Comparisons Made", value: "10,000+", color: "text-blue-600" },
              { label: "Average Time Saved", value: "2.5 hrs", color: "text-purple-600" },
              { label: "User Satisfaction", value: "98%", color: "text-green-600" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.span
                  className={`text-2xl font-bold ${stat.color}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.6 + (i * 0.2), duration: 0.5 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    
    </div>
  );
};

export default Hero;