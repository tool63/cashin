"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import SocialButtons from "../SocialButtons";
import AuthLayout from "../layout";
import SeoEngine from "@/components/seo/SeoEngine";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", form);
    // 🔥 Add API call here (register user)
  };

  return (
    <>
      {/* SEO */}
      <SeoEngine
        title="Sign Up - Cashog"
        description="Create your Cashog account and start earning real rewards, cashback, and gift cards instantly."
      />

      <AuthLayout>
        {/* Centered card */}
        <div className="w-full max-w-md bg-white dark:bg-[#1A1F2B] rounded-3xl shadow-xl p-6 sm:p-8 mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
              Start earning real rewards today
            </p>
          </div>

          {/* Social login buttons */}
          <SocialButtons className="mb-6" />

          {/* Email Signup Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-400 outline-none bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-400 outline-none bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 p-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-400 outline-none bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-bold transition hover:scale-105"
            >
              Sign Up
            </button>
          </form>

          {/* Links */}
          <div className="flex flex-col sm:flex-row justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/login" className="hover:underline mb-2 sm:mb-0">
              Already have an account? Login
            </Link>
            <Link href="/reset" className="hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
