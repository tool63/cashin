"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, User, Mail, Lock } from "lucide-react";
import AuthLayout from "../layout";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", form);
    // 🔥 Add signup API call here
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold mb-2 text-center">Join Cashog</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Create your free account and start earning rewards instantly
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B0E1A] focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition flex justify-center items-center gap-2"
        >
          🎁 Claim My Free Account <ArrowRight size={18} />
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-green-400 font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
