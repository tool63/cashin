"use client"; // MUST be the very first line

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen min-h-screen bg-gray-50 dark:bg-[#070A14] flex items-center justify-center overflow-auto px-4 sm:px-6">
      
      {/* Background Layers */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-20 dark:opacity-10"></div>
      <div className="absolute w-60 sm:w-72 h-60 sm:h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10"></div>
      <div className="absolute w-80 sm:w-96 h-80 sm:h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative z-10 w-full max-w-md
          bg-white dark:bg-[#0F111A]
          rounded-2xl shadow-xl
          p-8 sm:p-10
          flex flex-col items-center
          ring-1 ring-white/10
          backdrop-blur-md
        "
      >
        {children}
      </motion.div>
    </div>
  );
}
