"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import TypingText from "@/components/typing/home";
import OpeningStyle from "@/components/animations/openingstyle";

export default function HeroSection() {
  return (
    <OpeningStyle delay={0.1}>
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
        
        {/* HEADLINE */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
          Get Paid Instantly By
        </h1>

        {/* TYPING GRADIENT TEXT */}
        <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            <TypingText />
          </span>
        </div>

        {/* SUBTEXT */}
        <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Complete tasks, surveys, watch videos, and earn rewards securely from anywhere.
        </p>

        {/* CTA BUTTON */}
        <div className="inline-block">
          <Link href="/?auth=signup" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center rounded-3xl px-16 py-6
                         bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
                         text-black font-bold text-lg md:text-xl
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-300 cursor-pointer"
              role="button"
            >
              Start Earning Now
              <ArrowRight className="ml-2 text-black group-hover:translate-x-1 transition-transform duration-300" />

              {/* Hover CTA indicator */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                Join free today <ArrowRight size={16} />
              </div>
            </motion.a>
          </Link>
        </div>

        {/* TRUST BADGES */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> 100% Free to Join
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Instant Payouts
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> 1M+ Happy Users
          </div>
        </div>
      </section>
    </OpeningStyle>
  );
}
