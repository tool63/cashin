"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";

export default function FinalCTASection() {
  return (
    <OpeningStyle delay={0.2}>
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="relative rounded-3xl p-12 md:p-16 flex flex-col items-center
          bg-gray-100 dark:bg-white/5
          border border-gray-200 dark:border-white/10
          hover:border-blue-500/40
          hover:shadow-xl
          transition-all duration-300"
        >
          {/* Optional: Add a subtle gradient overlay on hover */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-green-500/5 group-hover:to-blue-500/5 transition-opacity duration-300"></div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Start Earning Real Money Today!
            </span>
          </h2>

          <p className="mb-12 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join millions of users already earning daily. Complete surveys, tasks, and high-paying offers securely from anywhere.
          </p>

          {/* CTA BUTTON - Styled like TasksSection cards with hover effect */}
          <div className="cta-observer">
            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group relative rounded-3xl px-16 py-6 flex items-center gap-3
                  bg-gray-100 dark:bg-white/5
                  border border-gray-200 dark:border-white/10
                  hover:border-blue-500/40
                  hover:shadow-xl
                  transition-all duration-300
                  hover:-translate-y-1
                  cursor-pointer"
              >
                {/* Icon/Text */}
                <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
                  Get Started Now
                </span>
                
                {/* Arrow with animation */}
                <ArrowRight className="text-yellow-500 group-hover:text-green-500 transition-colors duration-300 group-hover:translate-x-1" />
                
                {/* CTA indicator - matching TasksSection style */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  Start earning today <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Optional: Add subtle stats or trust indicators below CTA */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
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
