"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen h-screen bg-gray-50 dark:bg-[#070A14] overflow-auto">
      {/* ============================
          Animated Background Layers
      ============================ */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-20 dark:opacity-10"></div>
      <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10"></div>
      <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>

      {/* ============================
          Full Screen Content
      ============================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start pt-16 px-4 sm:px-8 pb-16"
      >
        {children}
      </motion.div>
    </div>
  );
}
