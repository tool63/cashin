"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-[#070A14] overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-20 dark:opacity-10"></div>
      <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10"></div>
      <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>

      {/* Centered Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-md mx-4 bg-white/90 dark:bg-[#0B0E1A]/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-6 sm:p-12"
      >
        {children}
      </motion.div>
    </div>
  );
}
