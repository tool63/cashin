"use client";

import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-black text-white w-full min-h-screen flex items-center justify-center">
      <div className="px-6 sm:px-10 lg:px-20 text-center space-y-6 md:space-y-8">

        {/* HEADLINE */}
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Earn Real Money Online
        </h1>

        {/* TYPING TEXT */}
        <div className="text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 bg-clip-text text-transparent">
          <TypingText />
        </div>

        {/* SUBTEXT */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Join millions of users worldwide and start earning rewards instantly.
        </p>

        {/* CTA */}
        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg text-base sm:text-lg md:text-xl mt-4"
          >
            Get Started Now
          </motion.span>
        </Link>

      </div>
    </section>
  );
}
