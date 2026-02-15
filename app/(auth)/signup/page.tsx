"use client";

import React, { useState } from "react";
import Link from "next/link";
import SeoEngine from "@/components/seo/SeoEngine";
import AuthLayout from "../layout";
import SocialButtons from "../SocialButtons";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", form);
    // 🔥 Add your signup API logic here
  };

  return (
    <AuthLayout>
      <SeoEngine title="Sign Up - Cashog" description="Create a free Cashog account and start earning rewards instantly." />

      <div className="w-full max-w-sm bg-white dark:bg-[#0B0E1A] rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
          Start earning real rewards today
        </p>

        {/* Social login buttons */}
        <SocialButtons className="mb-6" />

        {/* Email signup form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#070A14] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-bold hover:scale-105 transition duration-200">
            Sign Up
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/login" className="hover:underline">
            Already have an account? Login
          </Link>
          <Link href="/reset" className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
