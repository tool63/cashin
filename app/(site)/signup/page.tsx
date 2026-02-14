"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import { ArrowRight, User, Lock } from "lucide-react";

/* ================= SEO ================= */
const pageTitle = "Cashog - Sign Up";
const pageDescription =
  "Join Cashog today and start earning rewards instantly. Sign up for free and unlock cashback, gift cards, and exclusive offers.";

/* ================= ANIMATION ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function SignUpPage() {
  const [formData, setFormData] = useState({ email: "", password: "", referral: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);
    // Add API signup logic here
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
            Create Your Free Account
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
          >
            <TypingText
              words={[
                "Start Earning Instantly",
                "Get Cashback & Rewards",
                "Access Exclusive Offers",
              ]}
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Sign up now to unlock high-paying offers, cashback, and exclusive rewards. It's completely free and only takes a minute.
          </motion.p>
        </motion.section>

        {/* ================= SIGN UP FORM ================= */}
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
              <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Password */}
            <div className="mb-6 relative">
              <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Referral (Optional) */}
            <div className="mb-6">
              <input
                type="text"
                name="referral"
                placeholder="Referral Code (Optional)"
                value={formData.referral}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black py-3 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform duration-300 cta-observer"
            >
              Sign Up & Start Earning <ArrowRight size={20} />
            </button>

            {/* Disclaimer */}
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              By signing up, you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </motion.form>
        </motion.section>
      </main>
    </>
  );
}
