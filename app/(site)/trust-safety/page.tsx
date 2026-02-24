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

/* ================= STATS (NAME + TITLE) ================= */
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

        <section className="relative z-10 max-w-6xl mx-auto px-4 py-20">

          {/* HERO (TITLE ADDED) */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Trust & Safety
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
                Security is at the core of everything we build. Your data is protected
                by enterprise-grade systems and real-time monitoring.
              </p>

              <PrimaryCTA href="/signup">
                Start Earning Now
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* STATS SECTION (NAME + TITLE) */}
          <div className="mb-20">
            <Reveal>
              <div className="text-center mb-8">
                <h2 className="text-sm uppercase tracking-widest text-gray-500">
                  Statistics
                </h2>
                <h3 className="text-3xl font-bold">Platform Security Metrics</h3>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {stats.map((stat) => {
                const { count, ref } = useCountUp(stat.number);

                return (
                  <Reveal key={stat.title}>
                    <motion.div
                      ref={ref}
                      whileHover={{ y: -6 }}
                      className="
                        bg-white 
                        dark:bg-[#0a0d16] 
                        rounded-2xl 
                        p-6 
                        border 
                        border-gray-200 
                        dark:border-gray-800 
                        shadow-md
                        text-center
                      "
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
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* SECURITY FEATURES (TITLE ADDED) */}
          <div className="mb-24">
            <Reveal>
              <div className="text-center mb-10">
                <h2 className="text-sm uppercase tracking-widest text-gray-500">
                  Security
                </h2>
                <h3 className="text-3xl font-bold">Our Security Framework</h3>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {securityFeatures.map((feature) => (
                <Reveal key={feature.title}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="
                      bg-white 
                      dark:bg-[#0a0d16] 
                      rounded-2xl 
                      p-6 
                      border 
                      border-gray-200 
                      dark:border-gray-800 
                      shadow-md
                      text-center
                    "
                  >
                    <div className="mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {feature.desc}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* FAQ (TITLE ADDED) */}
          <div className="mb-24">
            <Reveal>
              <div className="text-center mb-6">
                <h2 className="text-sm uppercase tracking-widest text-gray-500">
                  Support
                </h2>
                <h3 className="text-3xl font-bold">
                  Frequently Asked Questions
                </h3>
              </div>
            </Reveal>

            <FAQ faqs={faqs} />
          </div>

          {/* FINAL CTA (RESPONSIVE BUTTON SIZE) */}
          <div className="text-center">
            <Reveal>
              <h2 className="text-3xl font-bold mb-6">
                Ready to Take Action?
              </h2>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={animateCTA ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="max-w-xs w-full">
                <PrimaryCTA href="/signup">
                  Start Earning in 60 Seconds
                </PrimaryCTA>
              </div>
            </motion.div>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Join our community and start earning daily rewards.
            </p>
          </div>

        </section>
      </main>
    </>
  );
}
