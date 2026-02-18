"use client";

import React, { useState } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";
import SocialButtons from "../SocialButtons";
import CloseButton from "@/components/ui/CloseButton";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Sparkles, Shield, Zap } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", form);
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
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white dark:bg-[#0b0e1a] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative"
      >
        {/* Gradient background elements - matching HeroSection */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-green-500/5 to-green-600/5"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <CloseButton />

        <div className="relative p-8">
          {/* Header with gradient text - matching HeroSection */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
              <Shield size={14} className="text-green-500" />
              <span>Secure & Instant Access</span>
              <Zap size={14} className="text-yellow-500" />
            </p>
          </div>

          {/* Social Buttons with gradient hover */}
          <div className="flex flex-col gap-3 w-full">
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b0e1a] hover:bg-gradient-to-r hover:from-yellow-400/10 hover:via-green-400/10 hover:to-green-500/10 transition-all duration-300 text-sm group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Continue with Google
              </span>
            </button>

            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1877F2] hover:bg-[#0a5fd7] transition-colors text-sm">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-medium text-white">
                Continue with Facebook
              </span>
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-2 my-6">
            <div className="flex-1 border-t border-gray-200 dark:border-gray-800"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-200 dark:border-gray-800"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                <Mail size={12} className="text-yellow-500" />
                Email
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, email: true })}
                  onBlur={() => setIsFocused({ ...isFocused, email: false })}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/10 via-green-400/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                <Lock size={12} className="text-green-500" />
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => setIsFocused({ ...isFocused, password: false })}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/10 via-green-400/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                href="/reset"
                className="text-xs text-green-600 hover:text-yellow-600 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button - Matching HeroSection gradient */}
            <button
              type="submit"
              className="w-full relative group overflow-hidden py-3.5 px-4 rounded-xl bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Lock size={16} />
                Sign In
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <span>New to Cashog? </span>
            <Link
              href="/signup"
              className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 hover:from-yellow-500 hover:via-green-500 hover:to-green-600 transition-all duration-300"
            >
              Create Account
            </Link>
          </div>

          {/* Prohibited Notice */}
          <div className="mt-4 text-[10px] text-gray-400 text-center">
            Users are prohibited from using multiple accounts, completing offers on another user's account, or using any type of VPN, VPS, or Emulator software.
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
