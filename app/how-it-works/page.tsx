"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Zap,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Users,
  Briefcase,
  TrendingUp,
} from "lucide-react";

/* ================= DESIGN SYSTEM ================= */
const ds = {
  bg: "#020617",
  surface: "#0f172a",
  border: "border-white/10",
};

/* ================= FLOATING CTA ================= */
function FloatingCTA({ topRef, bottomRef }: { topRef: any; bottomRef: any }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        setVisible(!anyVisible);
      },
      { threshold: 0.6 }
    );

    if (topRef.current) observer.observe(topRef.current);
    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [topRef, bottomRef]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button className="group flex items-center gap-4 px-8 py-4 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-2xl">
        <div className="w-10 h-10 rounded-lg bg-black/20 flex items-center justify-center">
          <Zap size={18} />
        </div>
        <div className="text-left leading-tight">
          <div className="text-xs opacity-80">Get started</div>
          <div className="text-sm font-semibold">Start Earning in 60 Seconds</div>
        </div>
        <ArrowRight className="opacity-0 group-hover:opacity-100 transition" />
      </button>
    </motion.div>
  );
}

/* ================= FAQ ITEM ================= */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl bg-[${ds.surface}] border ${ds.border}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-6 pb-6 text-gray-400 text-sm"
        >
          {a}
        </motion.div>
      )}
    </div>
  );
}

/* ================= PAGE ================= */
export default function CashogHowItWorks() {
  const topCTARef = useRef(null);
  const bottomCTARef = useRef(null);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  return (
    <main className={`bg-[${ds.bg}] text-white min-h-screen relative`}>
      {/* FLOATING CTA */}
      <FloatingCTA topRef={topCTARef} bottomRef={bottomCTARef} />

      {/* HERO */}
      <section ref={topCTARef} className="relative px-6 py-40 overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-transparent to-transparent"
        />
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-sm text-indigo-400 mb-6">
              <CheckCircle2 size={16} /> Trusted Global Rewards Platform
            </span>
            <h1 className="text-6xl font-semibold tracking-tight">
              Earn Smarter.<br />
              Get Paid Faster.
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-xl">
              Cashog connects users and advertisers through a secure, performance-driven rewards ecosystem.
            </p>
            <div className="mt-12 flex gap-6">
              <button className="px-10 py-5 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 font-semibold">
                Create Free Account
              </button>
              <button className="px-10 py-5 rounded-xl bg-white/5 hover:bg-white/10">
                For Advertisers
              </button>
            </div>
          </motion.div>

          {/* HERO CARD */}
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}>
            <div className={`rounded-3xl bg-[${ds.surface}] p-10 border ${ds.border} shadow-2xl`}>
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm text-gray-400">Realtime Earnings</span>
                <TrendingUp className="text-emerald-400" />
              </div>
              <div className="text-5xl font-semibold mb-6">$1,284.40</div>
              <div className="space-y-4">
                {["Verified offers", "Instant tracking", "Fast payouts"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-indigo-400" size={16} />
                    <span className="text-gray-300 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* USERS vs ADVERTISERS */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className={`rounded-3xl bg-[${ds.surface}] border ${ds.border} p-12`}>
            <Users className="text-indigo-400 mb-6" />
            <h3 className="text-3xl font-semibold mb-4">For Users</h3>
            <ul className="space-y-4 text-gray-300">
              <li>• Earn from verified global brands</li>
              <li>• Transparent tracking & instant credit</li>
              <li>• Withdraw via PayPal, Crypto, Gift Cards</li>
            </ul>
            <button className="mt-8 flex items-center gap-2 text-indigo-400">
              Start earning <ArrowRight size={16} />
            </button>
          </div>
          <div className={`rounded-3xl bg-[${ds.surface}] border ${ds.border} p-12`}>
            <Briefcase className="text-cyan-400 mb-6" />
            <h3 className="text-3xl font-semibold mb-4">For Advertisers</h3>
            <ul className="space-y-4 text-gray-300">
              <li>• Performance-based acquisition</li>
              <li>• Fraud-protected traffic</li>
              <li>• Real-time analytics & scaling</li>
            </ul>
            <button className="mt-8 flex items-center gap-2 text-cyan-400">
              Advertise with Cashog <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem q="Is Cashog legitimate?" a="Yes. Cashog partners only with vetted advertisers and applies advanced fraud prevention systems." />
            <FAQItem q="How fast can I earn?" a="Most users earn within the first minute after signup." />
            <FAQItem q="How do advertisers benefit?" a="Advertisers receive high-intent traffic with performance-only billing." />
            <FAQItem q="Is my data secure?" a="Enterprise-grade encryption and compliance standards are enforced." />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section ref={bottomCTARef} className="py-36 text-center bg-gradient-to-br from-indigo-700 to-cyan-600">
        <h2 className="text-5xl font-semibold">Start Earning in 60 Seconds</h2>
        <p className="mt-6 text-xl opacity-90">Join a trusted rewards platform built for scale.</p>
        <button className="mt-12 px-16 py-6 rounded-xl bg-black text-white font-semibold">Create Free Account</button>
      </section>
    </main>
  );
}

/* ================= FIXED revalidate ================= */
export const revalidate = 0; // ✅ Number only, never an object
