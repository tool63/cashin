"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CloseButton from "@/components/modals/CloseButton";

export default function ResetPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset Email:", email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-[#0F1219] rounded-xl shadow-2xl relative"
    >
      <CloseButton />

      <div className="p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Reset Password
        </h1>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
          Enter your email to receive a secure reset link
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0F1219] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-sm transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-6">
          <Link href="/login" className="text-green-600 hover:underline font-medium">
            ← Back to Login
          </Link>
          <Link href="/signup" className="text-green-600 hover:underline font-medium">
            Create Account →
          </Link>
        </div>

        {/* Prohibited Notice */}
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-500 text-center leading-tight">
          Users are prohibited from using multiple accounts, completing offers on another user's account, or using any type of VPN, UPS, or Emulator software.
        </div>
      </div>
    </motion.div>
  );
}
