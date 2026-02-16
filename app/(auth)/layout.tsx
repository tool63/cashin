"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-screen h-screen bg-gray-50 dark:bg-[#070A14] overflow-auto flex items-center justify-center px-4 sm:px-6">

      {/* ============================
          Animated Gradient Background
      ============================ */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 opacity-20 dark:opacity-10"></div>
      <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10"></div>
      <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>
      <div className="absolute w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-float animation-delay-4000 top-1/2 left-1/3"></div>

      {/* ============================
          Centered Pop-up Card
      ============================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white dark:bg-[#1A1F2B] rounded-3xl shadow-2xl p-8 sm:p-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
