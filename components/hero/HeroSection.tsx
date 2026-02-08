"use client";

import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Earn Real Money Online
        </h1>

        <p className="text-xl md:text-2xl mb-6">
          <TypingText
            className="text-green-500 font-semibold"
          />
        </p>

        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Join millions of users worldwide and start earning rewards instantly.
        </p>

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
