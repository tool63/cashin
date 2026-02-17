"use client";

import React, { useState } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";
import { motion } from "framer-motion";

export default function ResetPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset Email:", email);
  };

  return (
    <AuthLayout>
      <SeoEngine
        title="Reset Password - Cashog"
        description="Reset your password and get back to earning."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col items-center gap-4"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reset Password
        </h1>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Enter your email to receive a secure reset link
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Type here..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-sm transition-colors shadow-md"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500 text-center max-w-xs">
          Users are prohibited from using multiple accounts, completing offers on another user's account, or using any type of VPN, VPS, or Emulator software.
        </div>

        <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-400">
          <Link href="/login" className="text-green-600 hover:underline font-medium">
            ← Back to Login
          </Link>
          <Link href="/signup" className="text-green-600 hover:underline font-medium">
            Create Account →
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
