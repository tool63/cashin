"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto bg-white dark:bg-[#0B0E1A] border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-6 sm:p-12"
    >
      {children}
    </motion.div>
  );
}
