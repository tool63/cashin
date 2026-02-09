"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";

export default function HeroSection() {
  return (
    <section className="py-16 bg-[#070A14] text-white"> {/* Reduced padding top/bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* HEADLINE */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          Earn Real Money Online
        </h1>

        {/* TYPING TEXT */}
        <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
          <TypingText />
        </div>

        {/* SUBTEXT */}
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300">
          Complete tasks, surveys, watch videos, and earn rewards securely from anywhere.
        </p>

        {/* HERO CTA BUTTON */}
        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-10 py-4 rounded-xl font-semibold shadow-lg"
          >
            Get Started Now <ArrowRight />
          </motion.span>
        </Link>

      </div>
    </section>
  );
}
