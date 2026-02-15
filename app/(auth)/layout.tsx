"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function AuthLayout({
  children,
  title = "Cashog - Earn Real Rewards",
  description = "Complete offers, play games, answer surveys and cash out instantly on Cashog.",
}: AuthLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {/* SEO for Auth Pages */}
      <SeoEngine title={title} description={description} />

      {/* Full-screen modal background */}
      <div className="fixed inset-0 z-50 flex justify-center items-center overflow-hidden bg-gray-50 dark:bg-[#070A14]">
        
        {/* ============================
            Ultra-Premium Animated Background
        ============================ */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-20 dark:opacity-10"></div>
        <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl animate-float top-20 left-10"></div>
        <div className="absolute w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 bottom-10 right-10"></div>

        {/* ============================
            Modal Container
        ============================ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md mx-4 bg-white/80 dark:bg-[#0B0E1A]/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-6 sm:p-12"
        >
          {children}
        </motion.div>
      </div>
    </ThemeProvider>
  );
}
