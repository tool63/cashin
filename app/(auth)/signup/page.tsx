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
  const [counter, setCounter] = useState(110780);
  const [showForm, setShowForm] = useState(false);

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

  const handleContinueEmail = () => setShowForm(true);

  return (
    <AuthLayout>
      <SeoEngine
        title="Sign Up - Cashog"
        description="Create a free Cashog account and start earning rewards instantly."
      />

      <div className="w-full flex justify-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md flex flex-col items-center gap-6 px-4 sm:px-0 relative"
        >
          {/* =========================
              BONUS BADGE
          ========================= */}
          <div className="absolute -top-10 right-0 bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-lg text-sm animate-bounce z-20">
            DAILY BONUS +5 Coins
          </div>

          {/* =========================
              FREECASH-STYLE HERO SECTION
          ========================= */}
          <div className="flex flex-col items-center text-center gap-2 mt-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Earn Real Rewards Instantly!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Join Cashog and start earning coins by completing simple tasks.
            </p>
          </div>

          {/* Social login buttons */}
          <div className="w-full flex flex-col gap-3 mt-4">
            <SocialButtons className="w-full" />
          </div>

          {/* OR divider */}
          <div className="w-full flex items-center my-2">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-2 text-sm text-gray-500 dark:text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Continue with Email */}
          {!showForm && (
            <button
              onClick={handleContinueEmail}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Continue with Email
            </button>
          )}

          {/* Signup Form */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="w-full flex flex-col gap-4 mt-2"
              >
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

                <button className="mt-6 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-extrabold shadow-lg hover:scale-105 transition-transform duration-200">
                  Sign Up
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Terms & Privacy */}
          <div className="text-xs text-center text-gray-600 dark:text-gray-400 mt-4">
            By signing up you agree to our{" "}
            <Link href="/privacy" className="text-green-500 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-green-500 hover:underline">
              Terms of Service
            </Link>
            .
          </div>

          {/* Live Counter */}
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
            <span className="font-bold text-green-500">
              {counter.toLocaleString()}+
            </span>{" "}
            sign ups in the past 24 hours
          </div>

          {/* Footer login link */}
          <div className="flex justify-center w-full text-sm text-gray-600 dark:text-gray-400 mt-6">
            <span>Already have an account? </span>
            <Link
              href="/login"
              className="ml-1 font-medium text-green-500 hover:underline"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
}
