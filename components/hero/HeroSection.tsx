"use client";

import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-32 text-center">
        
        {/* ARROW + HEADLINE */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          {/* Arrow SVG */}
          <span className="w-12 h-12 sm:w-14 sm:h-14 text-red-600 dark:text-red-400 flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-full h-full"
            >
              <path d="M2 12L22 12M22 12L14 4M22 12L14 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-tight">
            Earn Real Money Online
          </h1>
        </div>

        {/* TYPING TEXT */}
        <p className="text-lg sm:text-xl md:text-2xl mb-6 min-h-[2.5rem] flex justify-center">
          <TypingText className="text-green-500 font-semibold text-center" />
        </p>

        {/* SUBTEXT */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl md:max-w-2xl mx-auto">
          Join millions of users worldwide and start earning rewards instantly.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black px-8 sm:px-10 py-4 rounded-xl font-semibold shadow-lg text-base sm:text-lg"
            >
              Get Started Now
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
}
