// @/components/animations/RevealWithBorder.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

interface RevealWithBorderProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientVia?: string;
  borderColor?: string;
  blurIntensity?: string;
  hoverScale?: number;
  innerBgLight?: string;
  innerBgDark?: string;
  backdropBlur?: string;
  floatingElements?: boolean;
  rotatingCircle?: boolean;
}

export default function RevealWithBorder({
  children,
  className = "",
  gradientFrom = "from-yellow-400",
  gradientTo = "to-green-400",
  gradientVia = "via-yellow-400",
  borderColor = "border-yellow-400/20",
  blurIntensity = "opacity-90",
  hoverScale = 1.02,
  innerBgLight = "bg-white/90",
  innerBgDark = "dark:bg-gray-900/90",
  backdropBlur = "backdrop-blur-xl",
  floatingElements = true,
  rotatingCircle = true,
}: RevealWithBorderProps) {
  return (
    <Reveal>
      <motion.div
        whileHover={{ scale: hoverScale }}
        className={`relative overflow-hidden rounded-3xl ${className}`}
      >
        {/* Animated Background Gradient */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} ${blurIntensity}`}
        />

        {/* Content Container with Border Effect */}
        <div className={`relative ${innerBgLight} ${innerBgDark} ${backdropBlur} rounded-3xl p-8 m-1 ${className}`}>
          {/* Floating Animated Elements */}
          {floatingElements && (
            <>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl pointer-events-none"
              />
            </>
          )}

          {/* Rotating Circle Border */}
          {rotatingCircle && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 ${borderColor} rounded-full pointer-events-none`}
            />
          )}

          {/* Children Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}
