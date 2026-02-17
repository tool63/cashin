"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-50 dark:bg-[#070A14] transition-colors duration-300">

      {/* ============================
          Animated Background
      ============================ */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        {/* Moving Gradient */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-15 dark:opacity-10"></div>

        {/* Floating Blob 1 */}
        <div className="absolute w-72 h-72 bg-green-400/25 rounded-full blur-3xl animate-float top-20 left-10"></div>

        {/* Floating Blob 2 */}
        <div className="absolute w-96 h-96 bg-yellow-400/25 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>

      </div>

      {/* ============================
          Content Layer
      ============================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 py-16"
      >
        {children}
      </motion.div>

    </div>
  );
}
