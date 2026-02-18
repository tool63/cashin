"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";
import SocialButtons from "../SocialButtons";
import CloseButton from "@/components/ui/CloseButton";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [counter, setCounter] = useState(93095);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", form);
  };

  useEffect(() => {
    const updateCounter = () => {
      const randomIncrement = Math.floor(Math.random() * 6) + 1;
      setCounter((prev) => prev + randomIncrement);
      const randomDelay = Math.random() * (300000 - 5000) + 5000;
      setTimeout(updateCounter, randomDelay);
    };
    const initialDelay = Math.random() * (300000 - 5000) + 5000;
    const timer = setTimeout(updateCounter, initialDelay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthLayout>
      <SeoEngine
        title="Sign Up - Cashog"
        description="Create a free Cashog account and start earning rewards instantly."
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-[#0b0e1a] rounded-2xl shadow-2xl overflow-hidden relative"
      >
        <CloseButton />

        <div className="p-6">
          <h2 className="text-center font-semibold text-gray-900 dark:text-white mb-4">
            Sign up
          </h2>

          {/* Social Buttons */}
          <SocialButtons />

          {/* OR Divider */}
          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 border-t border-gray-200 dark:border-gray-800"></div>
            <span className="text-xs text-gray-400 dark:text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-200 dark:border-gray-800"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
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
                placeholder="Type here..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Type here..."
                  className="w-full px-3 py-2 pr-10 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-green-500 dark:hover:text-green-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              By signing up you agree to the{" "}
              <Link href="/privacy" className="text-green-600 dark:text-green-400 hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-green-600 dark:text-green-400 hover:underline">
                Terms of Service
              </Link>
            </p>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white font-semibold text-sm transition-colors shadow-md"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            <span>Got an account? </span>
            <Link
              href="/login"
              className="font-medium text-green-600 dark:text-green-400 hover:underline"
            >
              Log in
            </Link>
          </div>

          {/* Prohibited Notice */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-500 text-center leading-tight">
            Users are prohibited from using multiple accounts, completing offers on another user's account, or using any type of VPN, VPS, or Emulator software.
          </div>

          {/* Live Counter */}
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-500 text-center">
            <span className="font-bold text-green-600 dark:text-green-400">
              {counter.toLocaleString()}+
            </span>{" "}
            sign ups in the past 24 hours
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
