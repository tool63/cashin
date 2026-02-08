"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SurveysPage() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Earn Rewards by Taking Surveys
        </motion.h1>
        <p className="text-lg md:text-2xl mb-8">
          Share your opinions and earn points or cash easily.
        </p>
        <Link 
          href="#active-surveys" 
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-indigo-500 transition"
        >
          View Surveys
        </Link>
      </section>
    </div>
  );
}
