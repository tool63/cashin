"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import SeoEngine from "@/components/seo/SeoEngine";
import ModalRoot from "@/components/modals/ModalRoot";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", form);
    // 🔥 Add signup API logic here
  };

  return (
    <>
      <SeoEngine
        title="Sign Up - Cashog"
        description="Create a free Cashog account and start earning rewards instantly."
      />

      {/* =========================
          FULL BACKGROUND
      ========================= */}
      <div className="relative w-screen min-h-screen overflow-hidden bg-[#0B0F1A]">

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-green-400 to-green-500 opacity-70"></div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Floating glowy blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-400/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-500/40 rounded-full blur-3xl animate-float animation-delay-2000"></div>

        {/* =========================
            MODAL CONTAINER
        ========================= */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
          <ModalRoot>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md p-8 bg-white dark:bg-[#0B0F1A]/90 backdrop-blur-md rounded-3xl shadow-2xl text-white"
            >
              {/* Header */}
              <h1 className="text-4xl font-extrabold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
                Create Your Account
              </h1>
              <p className="text-center text-gray-200 mb-6">
                Sign up to start earning rewards instantly
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="peer w-full p-4 rounded-xl border border-gray-600 bg-white dark:bg-[#0B0F1A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-transparent"
                  />
                  <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-xs">
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
                    placeholder="Email"
                    required
                    className="peer w-full p-4 rounded-xl border border-gray-600 bg-white dark:bg-[#0B0F1A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-transparent"
                  />
                  <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-xs">
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
                    placeholder="Password"
                    required
                    className="peer w-full p-4 pr-12 rounded-xl border border-gray-600 bg-white dark:bg-[#0B0F1A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-transparent"
                  />
                  <label className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-green-400 peer-focus:text-xs">
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

                {/* Sign Up Button */}
                <button className="mt-4 py-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black font-bold rounded-xl shadow-lg hover:scale-105 transition-transform duration-200">
                  Sign Up
                </button>
              </form>

              {/* Footer */}
              <p className="text-center text-gray-400 mt-6 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-green-400 hover:underline">
                  Log In
                </Link>
              </p>
            </motion.div>
          </ModalRoot>
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
}
