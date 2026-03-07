"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";

export default function FinalCTASection() {
  return (
    <OpeningStyle delay={0.2}>
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Single container matching TasksSection card style */}
        <div className="relative rounded-3xl p-12 md:p-16 flex flex-col items-center
          bg-gray-100 dark:bg-white/5
          border border-gray-200 dark:border-white/10
          hover:border-blue-500/40
          hover:shadow-xl
          transition-all duration-300
          group"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Start Earning Real Money Today!
            </span>
          </h2>

          <p className="mb-12 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join millions of users already earning daily. Complete surveys, tasks, and high-paying offers securely from anywhere.
          </p>

          {/* CTA BUTTON - Original gradient background */}
          <div className="cta-observer">
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-xl text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                Get Started Now <ArrowRight />
              </motion.span>
            </Link>
          </div>

          {/* Optional trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> 1M+ Happy Users
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> $10M+ Paid Out
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> 4.8/5 Trustpilot
            </div>
          </div>
        </div>
      </section>
    </OpeningStyle>
  );
}
