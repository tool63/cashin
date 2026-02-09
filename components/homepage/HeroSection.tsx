"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";

export default function NewHeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center">
        
        {/* MAIN HEADLINE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Earn Real Money Online Instantly
        </h1>

        {/* TYPING TEXT */}
        <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white/90 via-white to-white/80">
          <TypingText />
        </div>

        {/* SUBTEXT */}
        <p className="text-sm sm:text-base md:text-lg text-white/90 mb-8 max-w-2xl">
          Complete simple tasks, surveys, watch videos, and earn rewards securely.
        </p>

        {/* CTA BUTTON */}
        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-white text-black px-8 sm:px-10 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition"
          >
            Get Started Now <ArrowRight />
          </motion.span>
        </Link>

        {/* OPTIONAL HERO IMAGE OR DECORATIVE ELEMENT */}
        <div className="mt-12 w-full max-w-xl">
          <img
            src="/hero-image.png" // replace with your hero image
            alt="Earn Rewards"
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
