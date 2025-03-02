
import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'blue' | 'purple' | 'multi';
}

const AnimatedGradient = ({ 
  className, 
  children, 
  variant = 'multi'
}: AnimatedGradientProps) => {
  const gradients = {
    blue: "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600",
    purple: "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600",
    multi: "bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600",
  };

  return (
    <div 
      className={cn(
        gradients[variant],
        "bg-[length:200%_100%] animate-gradient-shift",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedGradient;
