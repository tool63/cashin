"use client";

import React, { useState } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";
import CloseButton from "@/components/ui/CloseButton";
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
        description="Reset your Cashog password and get back to earning rewards instantly."
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-[#0b0e1a] rounded-2xl shadow-2xl overflow-hidden relative"
      >
        <CloseButton />

        <div className="p-6">
          <h2 className="text-center font-semibold text-gray-900 dark:text-white mb-2">
            Reset password
          </h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
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
                placeholder="Type here..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white font-semibold text-sm transition-colors shadow-md"
            >
              Send Reset Link
            </button>
          </form>

          {/* Prohibited Notice */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-500 text-center leading-tight">
            Users are prohibited from using multiple accounts, completing offers on another user's account, or using any type of VPN, VPS, or Emulator software.
          </div>

          {/* Footer Links */}
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-4">
            <Link
              href="/login"
              className="text-green-600 dark:text-green-400 hover:underline font-medium"
            >
              ← Back to Login
            </Link>
            <Link
              href="/signup"
              className="text-green-600 dark:text-green-400 hover:underline font-medium"
            >
              Create Account →
            </Link>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
