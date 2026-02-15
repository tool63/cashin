"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, User, Lock } from "lucide-react";
import AuthLayout from "../layout";
import SocialButtons from "../SocialButtons";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", form);
  };

  return (
    <AuthLayout title="Login - Cashog">
      <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Login to access your rewards
      </p>

      <SocialButtons />

      <div className="text-center text-gray-500 dark:text-gray-400 mb-4">— OR —</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B0E1A] focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B0E1A] focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        <button className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition flex justify-center items-center gap-2">
          Login <ArrowRight size={18} />
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Forgot password?{" "}
        <Link href="/auth/reset" className="text-green-400 font-semibold hover:underline">
          Reset here
        </Link>
      </p>

      <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
        No account?{" "}
        <Link href="/auth/signup" className="text-green-400 font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
