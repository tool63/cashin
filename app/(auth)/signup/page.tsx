"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "" });
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
        description="Create a free account and start earning rewards."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col items-center gap-4"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sign Up
        </h1>

        {/* Social Login */}
        <div className="w-full flex flex-col gap-3">
          <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B0E1A] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FcGoogle size={20} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sign up with Google
            </span>
          </button>

          <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#1877F2] hover:bg-[#1666d9] transition-colors">
            <FaFacebook size={20} className="text-white" />
            <span className="text-sm font-medium text-white">
              Sign up with Facebook
            </span>
          </button>
        </div>

        {/* OR Divider */}
        <div className="w-full flex items-center gap-2 my-2">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Type here..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Type here..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            By signing up you agree to the{" "}
            <Link href="/privacy" className="text-green-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-green-600 hover:underline">
              Terms of Service
            </Link>
          </p>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-sm transition-colors shadow-md"
          >
            Sign Up
          </button>
        </form>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span>Got an account? </span>
          <Link href="/login" className="text-green-600 hover:underline font-medium">
            Log in
          </Link>
        </div>

        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500 text-center max-w-xs">
          Users are prohibited from using multiple accounts, completing offers on another user's account, or using any type of VPN, VPS, or Emulator software.
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-500 text-center">
          <span className="font-bold text-green-600">{counter.toLocaleString()}+</span> sign ups in the past 24 hours
        </div>
      </motion.div>
    </AuthLayout>
  );
}
