"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";

export default function FinalCTASection() {
  return (
    <OpeningStyle delay={0.2}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Section container - matching FeaturesSection and TasksSection pattern */}
        <div className="text-center">
          {/* No extra container with card styling - just the section content */}
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Start Earning Real Money Today!
            </span>
          </h2>

          <p className="mb-12 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join millions of users already earning daily. Complete surveys, tasks, and high-paying offers securely from anywhere.
          </p>

          {/* CTA BUTTON - With hover effects matching card patterns */}
          <div className="cta-observer inline-block">
            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group relative rounded-3xl px-16 py-6 flex items-center gap-3
                  bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
                  hover:shadow-xl
                  transition-all duration-300
                  hover:-translate-y-1
                  cursor-pointer"
              >
                <span className="text-lg md:text-xl font-bold text-black">
                  Get Started Now
                </span>
                <ArrowRight className="text-black group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* CTA indicator - matching TasksSection style */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  Start earning today <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Trust indicators - with matching text colors */}
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
