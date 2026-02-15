"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import AuthLayout from "../layout";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset Email:", email);
    // 🔥 Add password reset API here
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold mb-2 text-center">Reset Your Password</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Enter your email to receive a secure reset link
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B0E1A] focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition flex justify-center items-center gap-2"
        >
          Send Reset Link <ArrowRight size={18} />
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Remembered your password?{" "}
        <Link href="/auth/login" className="text-green-400 font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
