"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import { ArrowRight, Mail } from "lucide-react";

/* ================= SEO ================= */
const pageTitle = "Cashog - Reset Password";
const pageDescription =
  "Reset your Cashog account password quickly and securely. Get back to earning rewards instantly.";

/* ================= ANIMATION ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset Email:", email);
    // Add API logic to send reset password email
  };

  return (
    <>
      <Meta title={pageTitle} description={pageDescription} />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white min-h-screen transition-colors duration-300 flex flex-col items-center">

        {/* ================= HERO ================= */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full py-24 px-4 text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
          >
            Reset Your Password
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
          >
            <TypingText
              words={[
                "Secure & Instant",
                "Get Back to Earning",
                "Reset Your Cashog Password",
              ]}
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Enter your email below and we'll send you a secure link to reset your password.
          </motion.p>
        </motion.section>

        {/* ================= RESET FORM ================= */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-md px-6 pb-24"
        >
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-gray-100 dark:bg-[#1A1F2B] rounded-3xl p-8 shadow-lg"
          >
            {/* Email */}
            <div className="mb-6 relative">
              <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform duration-300 cta-observer"
            >
              Send Reset Link <ArrowRight size={20} />
            </button>

            {/* Links */}
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              Remembered your password?{" "}
              <Link href="/signin" className="text-green-400 font-semibold hover:underline">
                Login
              </Link>
            </p>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              Don't have an account?{" "}
              <Link href="/signup" className="text-green-400 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </motion.form>
        </motion.section>
      </main>
    </>
  );
}
