"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";

export default function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section
      className={`text-white transition-colors duration-500 ${
        theme === "dark" ? "bg-[#070A14]" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center text-center">
        
        {/* MAIN HEADLINE */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Earn Real Money Online
        </h1>

        {/* TYPING TEXT */}
        <div
          className={`text-lg sm:text-xl md:text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500`}
        >
          <TypingText />
        </div>

        {/* SUBTEXT */}
        <p
          className={`text-sm sm:text-base md:text-lg mb-8 max-w-2xl ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Complete tasks, surveys, watch videos, and earn rewards securely from anywhere.
        </p>

        {/* CTA BUTTON */}
        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-8 sm:px-10 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition"
          >
            Get Started Now <ArrowRight />
          </motion.span>
        </Link>
      </div>
    </section>
  );
}
