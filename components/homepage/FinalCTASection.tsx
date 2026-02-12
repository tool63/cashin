"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FinalCTASection() {
  return (
    <section className="py-28 text-center bg-gray-100 dark:bg-[#0f111b] transition-colors duration-300">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
        Start Earning Real Money Today!
      </h2>
      <p className="mb-10 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Join millions of users who are already earning daily. Complete tasks, surveys, and high-paying offers securely from anywhere.
      </p>

      {/* CTA OBSERVER WRAPPER */}
      <div className="cta-observer inline-block">
        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black dark:text-black px-16 py-6 rounded-3xl font-bold shadow-xl text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Get Started Now <ArrowRight />
          </motion.span>
        </Link>
      </div>
    </section>
  );
}
