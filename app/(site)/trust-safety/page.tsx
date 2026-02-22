"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  AlertTriangle,
  Fingerprint,
  Server,
  User,
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
      { threshold: 0.3 }
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
    desc: "Bank-level AES-256 encryption and secure SSL protocols safeguard transactions.",
  },
  {
    icon: <Fingerprint className="h-8 w-8 text-yellow-500" />,
    title: "Multi-Factor Authentication",
    desc: "Layered identity verification ensures only authorized access.",
  },
  {
    icon: <Eye className="h-8 w-8 text-blue-600" />,
    title: "Real-Time Monitoring",
    desc: "AI-driven monitoring detects and blocks suspicious activity instantly.",
  },
  {
    icon: <Server className="h-8 w-8 text-purple-600" />,
    title: "Secure Infrastructure",
    desc: "Enterprise-grade cloud infrastructure with global redundancy.",
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
    title: "Fraud Prevention",
    desc: "Behavioral analysis and risk scoring to stop threats early.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-emerald-600" />,
    title: "Compliance & Standards",
    desc: "Aligned with global security and financial regulations.",
  },
];

const stats = [
  { number: 99.99, label: "System Uptime (%)" },
  { number: 256, label: "Encryption Strength (Bit)" },
  { number: 24, label: "Security Monitoring (Hours)" },
];

const faqs = [
  { q: "Is my data safe?", a: "Yes. All transactions are encrypted and monitored 24/7." },
  { q: "How fast are withdrawals?", a: "Most payouts are processed instantly or within hours." },
  { q: "Can I earn on mobile?", a: "Absolutely. The platform is fully mobile-friendly." },
  { q: "Is joining free?", a: "Yes — signing up and earning requires no payment." },
];

/* ================= COMPONENT ================= */
export default function TrustSafetyPage() {
  const [animateCTA, setAnimateCTA] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCTA(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SeoEngine
        title="Trust & Safety | Cashog"
        description="Cashog protects user data with enterprise-grade security, encryption, and fraud prevention systems."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <Reveal>
          <section className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trust & Safety
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Security is at the core of everything we build. Your data and transactions
              are protected by enterprise-grade systems.
            </p>

            <PrimaryCTA href="/signup">
              Start Earning Now
            </PrimaryCTA>
          </section>
        </Reveal>

        {/* STATS */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Performance Metrics
            </h2>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const { count, ref } = useCountUp(stat.number);

              return (
                <motion.div
                  key={stat.label}
                  className="relative p-8 rounded-3xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-xl text-center"
                  whileHover={{ scale: 1.03 }}
                >
                  <h2
                    ref={ref}
                    className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent"
                  >
                    {count.toLocaleString()}
                    {stat.label.includes("%") && "%"}
                  </h2>

                  <p className="mt-3 text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECURITY FEATURES */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-900">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Security Framework
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Multi-layered defense systems built for maximum protection.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            {securityFeatures.map((feature) => (
              <Reveal key={feature.title}>
                <motion.div
                  className="p-8 rounded-3xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-lg"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-5 p-4 rounded-2xl bg-green-50 dark:bg-zinc-700">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* FINAL CTA */}
        <section className="text-center py-28 bg-white dark:bg-black">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Ready to Take Action?
            </h2>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animateCTA ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <PrimaryCTA href="/signup">
              Start Earning in 60 Seconds
            </PrimaryCTA>
          </motion.div>

          <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
            Become part of our community and start earning daily rewards.
          </p>
        </section>
      </main>
    </>
  );
}
