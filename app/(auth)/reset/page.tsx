"use client";

import React, { useState } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";

export default function ResetPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset Email:", email);
    // 🔥 Add your password reset API logic here
  };

  return (
    <AuthLayout>
      <SeoEngine title="Reset Password - Cashog" description="Enter your email to receive a secure password reset link for your Cashog account." />

      <div className="w-full max-w-sm bg-white dark:bg-[#0B0E1A] rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">Reset Your Password</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
          Enter your email to receive a secure reset link
        </p>

        {/* Reset form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-bold hover:scale-105 transition duration-200">
            Send Reset Link
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/login" className="hover:underline">
            Back to Login
          </Link>
          <Link href="/signup" className="hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
