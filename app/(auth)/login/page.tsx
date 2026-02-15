"use client";

import React, { useState } from "react";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import SocialButtons from "../SocialButtons";
import SeoEngine from "@/components/seo/SeoEngine";

export default function LoginPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", form);
    // 🔥 Add login API here
  };

  return (
    <>
      <SeoEngine
        title="Cashog - Login"
        description="Login to Cashog to access your rewards, cashback, and exclusive offers instantly."
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
          Login to access your rewards
        </p>

        <SocialButtons className="mb-6" />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 w-full text-sm text-gray-600 dark:text-gray-400">
          <Link href="/signup" className="hover:underline">
            Don't have an account? Sign Up
          </Link>
          <Link href="/reset" className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </Modal>
    </>
  );
}
