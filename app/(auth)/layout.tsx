"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative w-screen min-h-screen bg-[#0B0F1A] flex justify-center items-center px-4 sm:px-6 py-12 overflow-auto">

      {/* ============================
          Background Floating Blobs
      ============================ */}
      <div className="absolute -top-24 -left-24 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl animate-float pointer-events-none z-0"></div>
      <div className="absolute -top-24 -right-24 w-40 h-40 bg-green-400/30 rounded-full blur-3xl animate-float animation-delay-1000 pointer-events-none z-0"></div>
      <div className="absolute -bottom-24 -left-24 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl animate-float animation-delay-2000 pointer-events-none z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-40 h-40 bg-green-400/30 rounded-full blur-3xl animate-float animation-delay-3000 pointer-events-none z-0"></div>

      {/* ============================
          Modal Card
      ============================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-gradient-to-br from-yellow-400/20 via-green-400/20 to-green-400/20 
                   dark:from-yellow-500/20 dark:via-green-500/20 dark:to-green-500/20
                   backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 overflow-hidden"
      >
        {/* ============================
            Top Hero / Live Stats
        ============================ */}
        <div className="text-center mb-6 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
            Earn Rewards Instantly
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            Join Cashog, complete tasks, play games, and cash out instantly.
          </p>
          {/* Live counter / stats */}
          <div className="flex justify-center gap-4 mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-green-600 dark:text-green-400">120,000+</span> signups
            <span className="font-semibold text-green-600 dark:text-green-400">$25</span> avg earnings
          </div>
        </div>

        {/* ============================
            Bonus Badge
        ============================ */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2 mb-6 text-center text-sm text-yellow-800 dark:text-yellow-200">
          🎁 Signup Bonus: 10 points instantly!
        </div>

        {/* ============================
            Children (Signup/Login/Reset Forms)
        ============================ */}
        {children}

        {/* ============================
            Footer Links
        ============================ */}
        <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          <span>Need help? </span>
          <a href="/support" className="text-green-500 font-semibold hover:underline">
            Contact Support
          </a>
        </div>
      </motion.div>
    </div>
  );
}
