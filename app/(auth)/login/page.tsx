"use client";

import React, { useState } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";
import SocialButtons from "../SocialButtons";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", form);
    // 🔥 Add your login API logic here
  };

  return (
    <AuthLayout>
      <SeoEngine title="Login - Cashog" description="Login to your Cashog account and continue earning rewards instantly." />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 dark:bg-[#0B0E1A]/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center"
      >
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
          Login to access your rewards instantly
        </p>

        {/* Social login */}
        <SocialButtons className="mb-6 w-full" />

        {/* Divider */}
        <div className="relative w-full my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm text-gray-500 dark:text-gray-400">
            OR
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="peer w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-transparent"
            />
            <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-xs transition-all">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="peer w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-transparent"
            />
            <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-xs transition-all">
              Password
            </label>
          </div>

          <button className="mt-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-extrabold shadow-lg hover:scale-105 transition-transform duration-200">
            Login
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex justify-between mt-6 w-full text-sm text-gray-600 dark:text-gray-400">
          <Link href="/signup" className="hover:underline font-medium">
            Don't have an account? Sign Up
          </Link>
          <Link href="/reset" className="hover:underline font-medium">
            Forgot Password?
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
