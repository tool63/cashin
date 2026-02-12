"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FinalCTASection() {
  return (
    <section className="py-32 px-6 text-center bg-gray-100 dark:bg-[#0F111B] transition-colors duration-300">
      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
        Start Earning Real Money Today!
      </h2>

      {/* Subtitle */}
      <p className="mb-12 text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
        Join millions of users already earning daily. Complete surveys, tasks, and high-paying offers securely from anywhere.
      </p>

      {/* CTA Button */}
      <Link href="/signup" className="inline-block">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-4 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black dark:text-white px-16 py-6 rounded-3xl font-bold shadow-xl text-lg md:text-xl transition-all duration-300 hover:shadow-2xl"
        >
          Get Started Now <ArrowRight size={20} />
        </motion.div>
      </Link>
    </section>
  );
}
