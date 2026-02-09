"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";

export default function HeroSection() {
  return (
    <section className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="font-extrabold text-[20px] sm:text-[20px] md:text-[20px] mb-4 text-white">
          Earn Real Money Online
        </h1>

        <div className="text-[20px] sm:text-[20px] md:text-[20px] mb-6 font-semibold bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 bg-clip-text text-transparent">
          <TypingText />
        </div>

        <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-xl mx-auto">
          Join millions of users worldwide and start earning rewards instantly.
        </p>

        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-10 py-4 rounded-xl font-semibold shadow-lg text-sm sm:text-base"
          >
            Get Started Now <ArrowRight />
          </motion.span>
        </Link>
      </div>
    </section>
  );
}
