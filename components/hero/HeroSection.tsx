"use client";

import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

          {/* HEADLINE */}
          <h1
            className="
              font-extrabold
              text-[20px] sm:text-[22px] md:text-[24px]
              mb-4
              text-black dark:text-white
            "
          >
            Earn Real Money Online
          </h1>

          {/* TYPING TEXT */}
          <div
            className="
              text-[18px] sm:text-[18px] md:text-[18px]
              mb-6
              font-semibold
              bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
              bg-clip-text text-transparent
            "
          >
            <TypingText />
          </div>

          {/* SUBTEXT */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Join millions of users worldwide and start earning rewards instantly.
          </p>

          {/* CTA */}
          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="
                inline-flex items-center justify-center
                bg-green-500 hover:bg-green-600
                text-black
                px-8 py-3
                rounded-xl
                font-semibold
                shadow-lg
                text-sm sm:text-base
              "
            >
              Get Started Now
            </motion.span>
          </Link>

        </div>
      </section>

      {/* STATS / NUMBERS SECTION */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Total Users */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform">
              <span className="text-4xl font-extrabold text-green-500">25M+</span>
              <span className="mt-2 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Total Users
              </span>
            </div>

            {/* Total Offers */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform">
              <span className="text-4xl font-extrabold text-green-500">12K+</span>
              <span className="mt-2 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Total Offers
              </span>
            </div>

            {/* Amount Paid This Month */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform">
              <span className="text-4xl font-extrabold text-green-500">$350K+</span>
              <span className="mt-2 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Paid This Month
              </span>
            </div>

            {/* Total Amount Paid */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform">
              <span className="text-4xl font-extrabold text-green-500">$12M+</span>
              <span className="mt-2 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Total Paid
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
