"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import {
  ShieldCheck,
  Lock,
  Eye,
  AlertTriangle,
  Fingerprint,
  Server,
} from "lucide-react";

// ========================== SECURITY FEATURES ===========================
const securityFeatures = [
  {
    icon: <Lock className="h-8 w-8 text-green-600" />,
    title: "Advanced Encryption",
    desc: "Bank-level AES-256 encryption protects your data and transactions.",
  },
  {
    icon: <Fingerprint className="h-8 w-8 text-yellow-500" />,
    title: "Multi-Factor Authentication",
    desc: "Layered identity verification prevents unauthorized access.",
  },
  {
    icon: <Eye className="h-8 w-8 text-blue-600" />,
    title: "Real-Time Monitoring",
    desc: "AI-driven monitoring detects suspicious activity instantly.",
  },
  {
    icon: <Server className="h-8 w-8 text-purple-600" />,
    title: "Secure Infrastructure",
    desc: "Enterprise-grade cloud systems with global redundancy.",
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
    title: "Fraud Prevention",
    desc: "Behavioral analysis and risk scoring to stop threats early.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-emerald-600" />,
    title: "Compliance & Standards",
    desc: "Aligned with international security requirements.",
  },
];

// ========================== STATS ===========================
const stats = [
  {
    label: "System Uptime",
    number: 99.99,
    description: "Uptime percentage across all services.",
  },
  {
    label: "Encryption Power",
    number: 256,
    description: "AES-256 encryption securing all data.",
  },
  {
    label: "Security Monitoring",
    number: 24,
    description: "Hours of continuous threat monitoring.",
  },
];

export default function TrustSafetyPage() {
  return (
    <>
      <SeoEngine
        title="Trust & Safety | Cashog"
        description="Cashog protects user data with enterprise-grade security and fraud prevention."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO SECTION */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Trust & Safety</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
                Security is at the core of everything we build. Your data is protected
                by enterprise-grade systems and real-time monitoring.
              </p>
              <PrimaryCTA href="/signup">Start Earning Now</PrimaryCTA>
            </div>
          </Reveal>
        </section>

        {/* SECURITY STATS */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Platform Security Metrics</h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Real-time operational performance
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <Reveal key={stat.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                >
                  <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">{stat.label}</h3>
                  <div className="text-4xl font-extrabold mt-2 gradient-text">
                    {stat.number}
                    {stat.label.includes("Uptime") && "%"}
                  </div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{stat.description}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECURITY FEATURES */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Security Features</h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Enterprise-grade protection and monitoring
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {securityFeatures.map((feature) => (
              <Reveal key={feature.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Secure Your Data with Cashog
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
                Join Cashog today and experience our cutting-edge security systems.
              </p>
              <PrimaryCTA href="/signup">Start Earning Now</PrimaryCTA>
            </>
          </Reveal>
        </section>

      </main>
    </>
  );
}
