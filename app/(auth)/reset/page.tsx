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
        description="Reset your Cashog password and get back to earning rewards instantly."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col items-center gap-6"
      >
        {/* Header */}
        <div className="text-center w-full">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Reset Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Enter your email to receive a secure reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="peer w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-transparent"
            />
            <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm transition-opacity peer-focus:opacity-0 peer-placeholder-shown:opacity-100">
              Email
            </label>
          </div>

          <button className="mt-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-extrabold shadow-lg hover:scale-105 transition-transform duration-200">
            Send Reset Link
          </button>
        </form>

        {/* Prohibited Actions Notice */}
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-yellow-800 dark:text-yellow-200 text-center">
            Users are prohibited from using multiple accounts, completing offers on another user's account, or using any type of VPN, VPS, or Emulator software.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-400">
          <Link href="/login" className="hover:underline font-medium text-green-500">
            ← Back to Login
          </Link>
          <Link href="/signup" className="hover:underline font-medium text-green-500">
            Create Account →
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
