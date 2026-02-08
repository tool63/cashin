"use client";

import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">

        {/* HEADLINE — BLACK, SIZE 20 */}
        <h1
          className="font-extrabold mb-6"
          style={{ fontSize: "20px", color: "#000" }}
        >
          Earn Real Money Online
        </h1>

        {/* TYPING TEXT — SIZE 18, YELLOW + GREEN */}
        <p
          className="mb-6 min-h-[1.8rem] flex justify-center"
          style={{ fontSize: "18px" }}
        >
          <TypingText className="typing-yellow-green font-semibold" />
        </p>

        {/* SUBTEXT — UNCHANGED */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Join millions of users worldwide and start earning rewards instantly.
        </p>

        {/* CTA — UNCHANGED */}
        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-10 py-4 rounded-xl font-semibold shadow-lg"
          >
            Get Started Now
          </motion.span>
        </Link>

      </div>
    </section>
  );
}
