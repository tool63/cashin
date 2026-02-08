"use client";

import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

        {/* HEADLINE — SIZE 20 */}
        <h1
          className="font-extrabold uppercase mb-6"
          style={{ fontSize: "20px" }}
        >
          Earn Real Money Online
        </h1>

        {/* TYPING TEXT — SIZE 18 */}
        <p
          className="mb-6 min-h-[2rem] flex justify-center"
          style={{ fontSize: "18px" }}
        >
          <TypingText className="font-semibold yellow-green-text text-center" />
        </p>

        {/* SUBTEXT */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
          Join millions of users worldwide and start earning rewards instantly.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-xl font-semibold shadow-lg"
            >
              Get Started Now
            </motion.span>
          </Link>
        </div>

      </div>
    </section>
  );
}
