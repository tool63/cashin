"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";
import SocialButtons from "../SocialButtons";
import CloseButton from "@/components/ui/CloseButton";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Sparkles, Gift, TrendingUp } from "lucide-react";

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#111827]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800/50 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-green-500/5 to-green-600/5"></div>
        
        <CloseButton />

        <div className="relative p-8">
          {/* Header with live counter */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 mb-3">
              Join Cashog
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F2937] border border-gray-700">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-xs font-semibold text-gray-300">
                <span className="text-green-500">{counter.toLocaleString()}+</span> joined today
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1F2937] hover:bg-[#2D3748] transition-all border border-gray-700/50">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="font-medium text-gray-200">Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1877F2] hover:bg-[#0a5fd7]">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-medium text-white">Facebook</span>
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-2 my-6">
            <div className="flex-1 border-t border-gray-800"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-800"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1">
                <Mail size={12} className="text-yellow-500" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 text-sm rounded-xl bg-[#1F2937] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1">
                <Lock size={12} className="text-green-500" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 text-sm rounded-xl bg-[#1F2937] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center">
              By signing up, you agree to our{" "}
              <Link href="/privacy" className="text-green-500 hover:text-yellow-500">
                Terms
              </Link>
            </p>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black font-bold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={16} />
                Create Account
              </span>
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-400 mt-6 pt-4 border-t border-gray-800">
            <span>Have an account? </span>
            <Link
              href="/login"
              className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
            >
              Sign In
            </Link>
          </div>

          {/* Live Counter */}
          <div className="mt-4 text-xs text-gray-500 text-center flex items-center justify-center gap-2">
            <Gift size={12} className="text-yellow-500" />
            <span>{counter.toLocaleString()}+ people joined today</span>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
