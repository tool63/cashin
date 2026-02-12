"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FinalCTASection() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-6">Start Earning Real Money Today!</h2>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
        Join millions of users who are already earning daily.
      </p>

      {/* CTA OBSERVER WRAPPER */}
      <div className="cta-observer inline-block">
        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-10 py-4 rounded-xl font-semibold shadow-lg"
          >
            Get Started Now <ArrowRight />
          </motion.span>
        </Link>
      </div>
    </section>
  );
}
