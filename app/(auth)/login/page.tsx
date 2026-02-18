"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import CloseButton from "@/components/modals/CloseButton";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", form);
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
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Welcome Back
        </h1>

        {/* Social Login */}
        <div className="space-y-3 mb-4">
          <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FcGoogle size={20} />
            <span className="font-medium text-gray-700 dark:text-gray-300">Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FaFacebook size={20} className="text-[#1877F2]" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Facebook</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FaApple size={20} className="text-gray-900 dark:text-white" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Apple</span>
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 border-t border-gray-200 dark:border-gray-800"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-200 dark:border-gray-800"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0F1219] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="**********"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0F1219] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className="text-right">
            <Link href="/reset" className="text-xs text-green-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-sm transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          <span>Don't have an account? </span>
          <Link href="/signup" className="text-green-600 hover:underline font-medium">
            Sign Up
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
