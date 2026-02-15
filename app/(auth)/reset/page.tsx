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
    // 🔥 Add reset password API logic here
  };

  return (
    <AuthLayout>
      <SeoEngine title="Reset Password - Cashog" description="Reset your Cashog password and get back to earning rewards instantly." />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 dark:bg-[#0B0E1A]/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center"
      >
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
          Reset Your Password
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
          Enter your email to receive a secure reset link
        </p>

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
            <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-xs transition-all">
              Email
            </label>
          </div>

          <button className="mt-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-extrabold shadow-lg hover:scale-105 transition-transform duration-200">
            Send Reset Link
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex justify-between mt-6 w-full text-sm text-gray-600 dark:text-gray-400">
          <Link href="/login" className="hover:underline font-medium">
            Back to Login
          </Link>
          <Link href="/signup" className="hover:underline font-medium">
            Create Account
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
