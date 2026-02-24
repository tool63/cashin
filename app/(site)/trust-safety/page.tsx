"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
} from "lucide-react";

/* ================= FAQ DATA ================= */
const faqs = [
  {
    q: "Is my data safe?",
    a: "Yes. All data is encrypted and monitored 24/7 using enterprise security standards.",
  },
  {
    q: "Do you share user data?",
    a: "No. User data is never sold or shared with third parties.",
  },
  {
    q: "How does fraud prevention work?",
    a: "AI-driven monitoring detects anomalies and suspicious behavior in real time.",
  },
  {
    q: "Can I delete my account?",
    a: "Yes. You can request account deletion from your settings at any time.",
  },
  {
    q: "Is two-factor authentication available?",
    a: "Yes. MFA is available to enhance account security and prevent unauthorized access.",
  },
];

/* ================= EXPANDABLE CARD ================= */
function ExpandableCard({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      className="cursor-pointer"
      transition={{ layout: { duration: 0.35, type: "spring" } }}
    >
      <motion.div
        layout
        className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
          open ? "shadow-xl" : "shadow-md"
        }`}
      >
        {/* Chevron Indicator */}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 text-gray-400"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>

        {children}

        <AnimatePresence>
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm text-gray-600 dark:text-gray-300 px-6 pb-6"
            >
              Click card again to collapse.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ================= SECURITY FEATURES ================= */
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

/* ================= STATS ================= */
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

        <section className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          {/* HERO */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Trust & Safety
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
                Security is at the core of everything we build. Your data is protected
                by enterprise-grade systems and real-time monitoring.
              </p>

              <PrimaryCTA href="/signup" />

              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Secure platform built for modern users.
              </p>
            </div>
          </Reveal>

          {/* STATS SECTION */}
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Platform Security Metrics
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Real-time operational performance
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {stats.map((stat) => (
              <Reveal key={stat.label}>
                <ExpandableCard>
                  <motion.div
                    layout
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800"
                  >
                    <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </h3>
                    <div className="text-4xl font-extrabold mt-2 gradient-text">
                      {stat.number}
                      {stat.label.includes("Uptime") && "%"}
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                      {stat.description}
                    </div>
                  </motion.div>
                </ExpandableCard>
              </Reveal>
            ))}
          </div>

          {/* SECURITY FEATURES */}
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Security Features
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Enterprise-grade protection and monitoring
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {securityFeatures.map((feature) => (
              <Reveal key={feature.title}>
                <ExpandableCard>
                  <motion.div
                    layout
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex justify-center mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {feature.desc}
                    </p>
                  </motion.div>
                </ExpandableCard>
              </Reveal>
            ))}
          </div>

          {/* FAQ SECTION */}
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Transparency and support
