"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";
import FloatingCTA from "@/components/cta/FloatingCTA";

export default function HeroSection() {
  return (
    <section className="relative py-28 px-4 text-center bg-white dark:bg-[#070A14] transition-colors duration-300 overflow-hidden rounded-b-[50px] shadow-xl">
      <div className="max-w-4xl mx-auto">

        {/* HEADLINE */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          Get Paid Instantly By
        </h1>

        {/* TYPING TEXT */}
        <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
          <TypingText />
        </div>

        {/* SUBTEXT */}
        <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Complete tasks, surveys, watch videos, and earn rewards securely from anywhere.
        </p>

        {/* HERO CTA BUTTON (Observer Wrapper) */}
        <div className="cta-observer inline-block">
          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-xl text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Start Earning Now <ArrowRight />
            </motion.span>
          </Link>
        </div>

      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      {/* Floating CTA */}
      <FloatingCTA />
    </section>
  );
}
