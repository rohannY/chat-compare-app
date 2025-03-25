import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
  variant?:
    | "blue"
    | "purple"
    | "multi"
    | "gray"
    | "warm"
    | "cool"
    | "softPink"
    | "subtleGreen";
}

const AnimatedGradient = ({
  className,
  children,
  variant = "multi",
}: AnimatedGradientProps) => {
  const gradients = {
    blue: "bg-gradient-to-r from-blue-500 to-blue-600",
    purple: "bg-gradient-to-r from-purple-500 to-purple-600",
    multi: "bg-gradient-to-r from-blue-500 to-purple-500",
    gray: "bg-gradient-to-r from-gray-200 to-gray-300",
    warm: "bg-gradient-to-r from-amber-200 to-orange-300",
    cool: "bg-gradient-to-r from-teal-200 to-blue-300",
    softPink: "bg-gradient-to-r from-pink-200 to-rose-300",
    subtleGreen: "bg-gradient-to-r from-green-200 to-emerald-300",
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
