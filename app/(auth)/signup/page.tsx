"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white dark:bg-[#0b0e1a] rounded-xl shadow-xl p-6"
    >
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Sign Up
      </h1>

      {/* Social Buttons */}
      <div className="space-y-2">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0b0e1a] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">
          <FcGoogle size={18} />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Sign up with Google
          </span>
        </button>

        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#1877F2] hover:bg-[#1666d9] transition-colors text-sm">
          <FaFacebook size={18} className="text-white" />
          <span className="font-medium text-white">
            Sign up with Facebook
          </span>
        </button>
      </div>

      {/* OR Divider */}
      <div className="flex items-center gap-2 my-3">
        <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
        <span className="text-xs text-gray-500 dark:text-gray-400">OR</span>
        <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Type here..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Type here..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
          className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-sm transition-colors shadow-md"
        >
          Sign Up
        </button>
      </form>

      {/* Login Link */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
        <span>Got an account? </span>
        <Link href="/login" className="text-green-600 hover:underline font-medium">
          Log in
        </Link>
      </div>

      {/* Prohibited Notice */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-500 text-center leading-tight">
        Users are prohibited from using multiple accounts, completing offers on another user's account, or using any type of VPN, VPS, or Emulator software.
      </div>

      {/* Live Counter */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-500 text-center">
        <span className="font-bold text-green-600">{counter.toLocaleString()}+</span> sign ups in the past 24 hours
      </div>
    </motion.div>
  );
}
