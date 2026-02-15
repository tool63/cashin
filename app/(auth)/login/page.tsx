"use client";

import React, { useState } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";
import SocialButtons from "../SocialButtons";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", form);
    // 🔥 Add login API logic
  };

  return (
    <AuthLayout>
      <SeoEngine
        title="Login - Cashog"
        description="Login to your Cashog account and continue earning rewards instantly."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md flex flex-col items-center gap-6 px-4 sm:px-0"
      >
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Login to access your rewards instantly
        </p>

        {/* Social login */}
        <SocialButtons className="w-full" />

        {/* Divider */}
        <div className="w-full flex items-center my-4">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-2 text-sm text-gray-500 dark:text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 relative">
          {/* Email Input */}
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
            <label
              className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm transition-opacity
                peer-focus:opacity-0
                peer-placeholder-shown:opacity-100"
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="peer w-full p-4 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-transparent"
            />
            <label
              className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm transition-opacity
                peer-focus:opacity-0
                peer-placeholder-shown:opacity-100"
            >
              Password
            </label>

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-green-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {/* Forgot Password link */}
            <Link
              href="/reset"
              className="absolute right-4 top-full mt-2 text-sm text-green-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button className="mt-6 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-extrabold shadow-lg hover:scale-105 transition-transform duration-200">
            Login
          </button>
        </form>

        {/* Footer signup link */}
        <div className="flex justify-center w-full text-sm text-gray-600 dark:text-gray-400 mt-6">
          <span>Don't have an account? </span>
          <Link href="/signup" className="ml-1 font-medium text-green-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
