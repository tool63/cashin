"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Globe,
  Activity,
  CheckCircle,
} from "lucide-react";

/* ================= MAIN PAGE ================= */
export default function TrustSafetyPage() {
  return (
    <div className="bg-gray-50 dark:bg-[#0F111B] text-gray-800 dark:text-gray-200 transition-colors duration-300">

      {/* ================= HERO ================= */}
      <section className="py-28 px-6 text-center bg-gradient-to-br from-yellow-400/10 via-green-400/10 to-green-500/10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
        >
          Your Security. Our Priority.
        </motion.h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10">
          Enterprise-level protection, real-time fraud detection, and encrypted
          infrastructure designed to keep every Cashog user safe.
        </p>

        <Link href="/signup">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 px-10 py-4 rounded-full font-bold text-black dark:text-white shadow-lg hover:scale-105 transition-all duration-300">
            Start Earning Safely
          </div>
        </Link>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8 place-items-center text-center">
        {[
          { icon: <Lock />, title: "256-bit SSL Encryption" },
          { icon: <Shield />, title: "AI Fraud Protection" },
          { icon: <Eye />, title: "Real-Time Monitoring" },
          { icon: <Globe />, title: "Global Compliance" },
          { icon: <Activity />, title: "Secure Tracking System" },
          { icon: <CheckCircle />, title: "Verified Payout Security" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-[#111827] p-8 rounded-2xl shadow-lg border border-yellow-200/20 w-full max-w-sm"
          >
            <div className="mb-4 text-yellow-500">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Advanced systems ensure maximum protection and transparency for all users.
            </p>
          </motion.div>
        ))}
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-white dark:bg-[#111827] py-20 text-center">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-4xl font-bold text-yellow-500">256-bit</h3>
            <p>SSL Encryption</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-green-500">99.9%</h3>
            <p>Uptime Guarantee</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-yellow-500">24/7</h3>
            <p>Monitoring</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-green-500">0</h3>
            <p>Data Breaches</p>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-28 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
          Join Cashog With Confidence
        </h2>
        <p className="max-w-2xl mx-auto mb-10 text-gray-600 dark:text-gray-400">
          Experience secure earning with enterprise-grade protection.
        </p>

        <Link href="/signup">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 px-14 py-6 rounded-3xl font-bold text-black dark:text-white shadow-xl hover:scale-105 transition-all duration-300">
            Create Free Account <motion.span><ArrowRight size={20} /></motion.span>
          </div>
        </Link>
      </section>

    </div>
  );
}
