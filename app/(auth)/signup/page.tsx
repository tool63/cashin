"use client";

import React, { useState } from "react";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import SocialButtons from "../SocialButtons";
import SeoEngine from "@/components/seo/SeoEngine";

export default function SignupPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", form);
    // 🔥 Add signup API here
  };

  return (
    <>
      <SeoEngine
        title="Cashog - Sign Up"
        description="Join Cashog to earn real rewards instantly. Complete offers, play games, answer surveys, and cash out!"
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
          Start earning real rewards today
        </p>

        <SocialButtons className="mb-6" />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
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
            Sign Up
          </button>
        </form>

        <div className="flex justify-between mt-4 w-full text-sm text-gray-600 dark:text-gray-400">
          <Link href="/login" className="hover:underline">
            Already have an account? Login
          </Link>
          <Link href="/reset" className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </Modal>
    </>
  );
}
