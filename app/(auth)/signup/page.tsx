"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";
import SocialButtons from "../SocialButtons";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [count, setCount] = useState(110780);

  // Auto-increment signup counter
  useEffect(() => {
    const randomDelay = () =>
      Math.floor(Math.random() * (300000 - 5000) + 5000); // 5s–5min
    let timeout: NodeJS.Timeout;

    const updateCounter = () => {
      const randomIncrease = Math.floor(Math.random() * 6) + 1; // 1–6
      setCount((prev) => prev + randomIncrease);
      timeout = setTimeout(updateCounter, randomDelay());
    };

    timeout = setTimeout(updateCounter, randomDelay());
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", form);
  };

  return (
    <AuthLayout>
      <SeoEngine
        title="Sign Up - Cashog"
        description="Create a free Cashog account and start earning rewards instantly."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl mx-auto flex flex-col items-center gap-6 px-4 sm:px-6 py-8 sm:py-12 bg-white dark:bg-[#070A14] rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
          Create Your Account
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Join Cashog and start earning real rewards instantly.
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
        <AnimatePresence>
          {showForm && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col gap-4"
            >
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="peer w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-transparent"
                />
                <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm transition-opacity peer-focus:opacity-0 peer-placeholder-shown:opacity-100">
                  Full Name
                </label>
              </div>

              {/* Email */}
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
                <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm transition-opacity peer-focus:opacity-0 peer-placeholder-shown:opacity-100">
                  Email
                </label>
              </div>

              {/* Password */}
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
                <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm transition-opacity peer-focus:opacity-0 peer-placeholder-shown:opacity-100">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-green-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Sign Up */}
              <button className="mt-6 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-extrabold shadow-lg hover:scale-105 transition-transform duration-200">
                Sign Up
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Show form button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-3 rounded-xl font-extrabold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Continue with Email
          </button>
        )}

        {/* Live counter */}
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
          <span className="font-bold text-green-500">{count.toLocaleString()}</span> sign ups in the past 24 hours
        </div>

        {/* Footer login */}
        <div className="flex justify-center w-full text-sm text-gray-600 dark:text-gray-400 mt-6">
          <span>Already have an account? </span>
          <Link href="/login" className="ml-1 font-medium text-green-500 hover:underline">
            Login
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
