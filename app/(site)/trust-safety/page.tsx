"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  AlertTriangle,
  Fingerprint,
  Server,
} from "lucide-react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";

/* ================= COUNT UP HOOK ================= */
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const increment = end / (duration / 16);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [visible, end, duration]);

  return { count, ref };
}

/* ================= DATA ================= */
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
  { title: "System Uptime", number: 99.99, label: "Uptime (%)" },
  { title: "Encryption Power", number: 256, label: "Bit Strength" },
  { title: "Security Monitoring", number: 24, label: "Hours Active" },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "Is my data safe?", a: "Yes. Everything is encrypted and monitored 24/7." },
  { q: "How fast are withdrawals?", a: "Most payouts are processed instantly." },
  { q: "Can I earn on mobile?", a: "Yes — the platform is fully mobile-friendly." },
  { q: "Is joining free?", a: "Absolutely. Signing up costs nothing." },
];

export default function TrustSafetyPage() {
  const [animateCTA, setAnimateCTA] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCTA(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SeoEngine
        title="Trust & Safety | Cashog"
        description="Cashog protects user data with enterprise-grade security and fraud prevention."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Trust & Safety
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Security is at the core of everything we build.
              Your data is protected with enterprise-grade systems.
            </p>

            <PrimaryCTA href="/signup">
              Start Earning Now
            </PrimaryCTA>
          </Reveal>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Secure platform built for modern users.
          </p>
        </section>

        {/* ================= SECURITY METRICS ================= */}
        <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Security Metrics
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Real-time operational performance
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => {
              const { count, ref } = useCountUp(stat.number);

              return (
                <motion.div
                  key={stat.title}
                  ref={ref}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border shadow-md text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                    {stat.title}
                  </h3>

                  <h2 className="text-4xl font-extrabold gradient-text mt-2">
                    {count.toLocaleString()}
                    {stat.label.includes("%") && "%"}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                    {stat.label}
                  </p>

                  <p className="mt-4 text-xs text-gray-500">
                    Platform performance metrics
                  </p>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Enterprise-grade monitoring and uptime guarantees
          </p>
        </section>

        {/* ================= SECURITY FRAMEWORK ================= */}
        <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Security Framework
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Advanced protection and fraud prevention
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {securityFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 border shadow-md text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 flex justify-center">
                  <feature.icon className="w-8 h-8 text-green-500" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.desc}
                </p>

                <p className="mt-4 text-xs text-gray-500">
                  Security and compliance standards
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
              Everything about security and trust
            </p>
          </Reveal>

          <FAQ faqs={faqs} />

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Support and guidance available when you need it
          </p>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
              Join Cashog and experience secure earning with premium protection.
            </p>

            <PrimaryCTA href="/signup">
              Join Now
            </PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
