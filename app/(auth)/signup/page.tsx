"use client";

import React, { useState } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";
import SocialButtons from "../SocialButtons";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

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

      {/* Animate the content inside the modal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col items-center gap-6"
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
        <div className="relative w-full my-4">
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
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="peer w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-transparent"
            />
            <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-xs transition-all">
              Full Name
            </label>
          </div>

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
            <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-xs transition-all">
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
            <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-xs transition-all">
              Password
            </label>
          </div>

          <button className="mt-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-extrabold shadow-lg hover:scale-105 transition-transform duration-200">
            Sign Up
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-400 mt-4">
          <Link href="/login" className="hover:underline font-medium">
            Already have an account? Login
          </Link>
          <Link href="/reset" className="hover:underline font-medium">
            Forgot Password?
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
