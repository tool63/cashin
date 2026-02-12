"use client";

import {
  ShieldCheck,
  Lock,
  Server,
  Eye,
  BadgeCheck,
  Users,
  Globe,
  Activity,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";

const features = [
  {
    icon: <ShieldCheck size={30} />,
    title: "Enterprise-Level Security",
    desc: "Advanced multi-layer security protecting accounts and rewards.",
  },
  {
    icon: <Lock size={30} />,
    title: "SSL Encrypted Data",
    desc: "All data transmissions secured with 256-bit encryption.",
  },
  {
    icon: <Server size={30} />,
    title: "Secure Cloud Infrastructure",
    desc: "Hosted on high-availability global cloud systems.",
  },
  {
    icon: <Eye size={30} />,
    title: "Privacy First",
    desc: "We never sell your personal data. Ever.",
  },
  {
    icon: <BadgeCheck size={30} />,
    title: "Verified Offers",
    desc: "Every offer is reviewed before publishing.",
  },
  {
    icon: <Users size={30} />,
    title: "Fraud Prevention AI",
    desc: "Smart systems detect and block abuse automatically.",
  },
  {
    icon: <Globe size={30} />,
    title: "Global Compliance",
    desc: "GDPR-aligned privacy and international safety standards.",
  },
  {
    icon: <Activity size={30} />,
    title: "24/7 Monitoring",
    desc: "Continuous platform activity monitoring for safety.",
  },
];

export default function TrustSafetyPage() {
  return (
    <>
      <Meta
        title="Trust & Safety - Cashog"
        description="Cashog ensures secure, encrypted, and fraud-free earning experience."
      />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white">

        {/* ================= HERO ================= */}
        <section className="relative py-32 px-6 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto">

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 bg-clip-text text-transparent"
            >
              Security. Transparency. Trust.
            </motion.h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
              Cashog is built with enterprise-level protection to keep your earnings,
              data, and activity secure at all times.
            </p>

            <a
              href="/signup"
              className="cta-observer inline-block bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Join Securely Today
            </a>

          </div>
        </section>

        {/* ================= TRUST METRICS ================= */}
        <section className="py-20 bg-gray-100 dark:bg-[#0F111B]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center px-6">
            <div>
              <h3 className="text-4xl font-bold text-yellow-500">256-bit</h3>
              <p className="text-gray-600 dark:text-gray-400">SSL Encryption</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-yellow-500">99.99%</h3>
              <p className="text-gray-600 dark:text-gray-400">Platform Uptime</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-yellow-500">24/7</h3>
              <p className="text-gray-600 dark:text-gray-400">Security Monitoring</p>
            </div>
          </div>
        </section>

        {/* ================= SECURITY FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-6 py-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-gray-50 dark:bg-[#111827] p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-800 transition-all"
            >
              <div className="text-yellow-500 mb-4">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= ANTI FRAUD ================= */}
        <section className="py-24 px-6 bg-gray-100 dark:bg-[#0F111B] text-center">
          <h2 className="text-3xl font-bold mb-6">
            Intelligent Fraud Protection
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
            Our advanced AI-driven fraud detection ensures fair rewards for legitimate users.
            Suspicious activities are automatically flagged and reviewed in real-time,
            maintaining a safe and trusted ecosystem.
          </p>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Earn With Confidence
          </h2>

          <a
            href="/signup"
            className="cta-observer inline-block bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-14 py-6 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            Create Free Account
          </a>
        </section>

      </main>
    </>
  );
}
