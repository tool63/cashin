"use client";

import React, { useState } from "react";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import SeoEngine from "@/components/seo/SeoEngine";

export default function ResetPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset Email:", email);
    // 🔥 Add reset API logic here
  };

  return (
    <>
      <SeoEngine
        title="Cashog - Reset Password"
        description="Enter your email to receive a secure reset link for your Cashog account."
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Reset Your Password
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
          Enter your email to receive a secure reset link
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="flex justify-between mt-4 w-full text-sm text-gray-600 dark:text-gray-400">
          <Link href="/login" className="hover:underline">
            Back to Login
          </Link>
          <Link href="/signup" className="hover:underline">
            Create Account
          </Link>
        </div>
      </Modal>
    </>
  );
}
