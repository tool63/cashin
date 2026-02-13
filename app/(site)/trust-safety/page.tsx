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

/* ================= COUNT UP COMPONENT ================= */
function CountUp({ end }: { end: number }) {
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
    const duration = 2000;
    const increment = end / (duration / 16);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(counter);
  }, [visible, end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= PAGE COMPONENT ================= */
export default function TrustSafetyPage() {
  const securityFeatures = [
    {
      icon: <Lock className="h-8 w-8 text-green-600" />,
      title: "Advanced Encryption",
      desc: "Bank-level AES-256 encryption and secure SSL protocols safeguard every transaction.",
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
      desc: "Advanced risk scoring and behavioral analysis systems.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-emerald-600" />,
      title: "Compliance & Regulations",
      desc: "Aligned with international regulatory and financial compliance standards.",
    },
  ];

  const stats = [
    { number: 99.99, label: "System Uptime (%)" },
    { number: 256, label: "Bit Encryption Standard" },
    { number: 24, label: "Security Monitoring (Hours)" },
  ];

  const faqs = [
    { q: "Is my data safe?", a: "Yes, all transactions are encrypted and monitored 24/7 for security." },
    { q: "How fast are withdrawals?", a: "Most withdrawals are processed instantly or within a few hours." },
    { q: "Can I earn from mobile?", a: "Absolutely! Our platform is fully mobile-friendly." },
    { q: "Is there a minimum age to join?", a: "You must be at least 13 years old to create an account." },
    { q: "Do I need to pay to join?", a: "No, signing up is completely free." },
  ];

  // Animate CTA buttons on page load
  const [animateCTA, setAnimateCTA] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setAnimateCTA(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <SeoEngine
        title="Trust & Safety | Cashog"
        description="Cashog ensures enterprise-grade security with encryption, fraud detection, and compliance systems to protect every transaction."
      />

      <div className="bg-white dark:bg-black text-gray-900 dark:text-white relative">

        {/* ================= HERO ================= */}
        <motion.section
          className="py-24 px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trust & Safety</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Security is at the core of everything we build. Your data and transactions are protected by enterprise-grade systems.
            </p>
            <motion.a
              href="/signup"
              className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-xl text-lg hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={animateCTA ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Start Earning Now <User size={20} />
            </motion.a>
          </div>
        </motion.section>

        {/* ================= STATS ================= */}
        <motion.section
          className="py-20 px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative p-8 rounded-3xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-xl text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-400 to-yellow-400 rounded-full blur-3xl opacity-20" />
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                  <CountUp end={stat.number} />
                  {stat.label.includes("%") && "%"}
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================= SECURITY FEATURES ================= */}
        <motion.section
          className="py-24 px-6 bg-gray-50 dark:bg-zinc-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Security Framework</h2>
            <p className="text-gray-600 dark:text-gray-400">Multi-layered defense systems built for maximum protection.</p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-8 rounded-3xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-5 p-4 rounded-2xl bg-green-50 dark:bg-zinc-700">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================= FAQ ================= */}
        <motion.section
          className="max-w-4xl mx-auto px-6 py-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-100 dark:bg-zinc-800 rounded-xl p-4 cursor-pointer group"
              >
                <summary className="font-semibold text-lg">{faq.q}</summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </motion.section>

        {/* ================= FINAL CTA ================= */}
        <motion.section
          className="text-center py-28 bg-white dark:bg-black w-full transition-colors duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.a
            href="/signup"
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={animateCTA ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Start Earning in 60 Seconds <User size={20} />
          </motion.a>
          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto transition-colors duration-300">
            Become part of our community and start earning daily rewards instantly.
          </p>
        </motion.section>
      </div>
    </>
  );
}
