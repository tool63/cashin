"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, User, CreditCard, Gift, CheckCircle, ShieldCheck, Trophy } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import TypingText from "@/components/typing/TypingText";

/* =========================
   Dynamic Metadata (Server-Side)
========================= */
export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
      route: "/earn-money-from-home",
      locale: SEO_CONFIG.defaultLocale,
    });

    return {
      ...seo.metadata,
      alternates: {
        canonical: seo.canonical,
        languages: seo.hreflang,
      },
      robots: seo.metadata?.robots,
    };
  } catch (error) {
    console.error("Metadata generation failed:", error);

    return {
      title: SEO_CONFIG.defaultTitle,
      description: SEO_CONFIG.defaultDescription,
    };
  }
}

/* =========================
   Performance & SEO Metrics (Optional)
========================= */
function useSEOMetrics(seo: SEOOutput | null) {
  useEffect(() => {
    if (!seo?.metrics) return;

    console.log("[SEO Metrics]", {
      score: seo.metrics.seoScore ?? "n/a",
      pageType: seo.pageType?.type,
      generationTime: seo.metrics.generationTime,
    });
  }, [seo]);
}

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={36} className="text-yellow-400" />,
    title: "Sign Up Instantly",
    description: "Create your account in minutes and join our trusted global community.",
  },
  {
    icon: <CreditCard size={36} className="text-green-400" />,
    title: "Complete Tasks & Offers",
    description: "Play games, watch videos, install apps, or complete surveys to earn points quickly.",
  },
  {
    icon: <Gift size={36} className="text-yellow-400" />,
    title: "Earn Rewards",
    description: "Redeem points for cash via PayPal, gift cards, or mobile top-ups instantly.",
  },
  {
    icon: <CheckCircle size={36} className="text-green-400" />,
    title: "Withdraw Easily",
    description: "Secure, fast payouts once you reach the minimum threshold.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { icon: <ShieldCheck size={28} className="text-yellow-500" />, title: "Trusted Platform", description: "Millions of users rely on our platform daily." },
  { icon: <Trophy size={28} className="text-yellow-500" />, title: "High-Paying Offers", description: "Top offers that maximize your earnings." },
  { icon: <CreditCard size={28} className="text-yellow-500" />, title: "Instant Payouts", description: "Get paid quickly via PayPal or gift cards." },
  { icon: <User size={28} className="text-yellow-500" />, title: "User-Friendly Interface", description: "Simple, intuitive platform designed for everyone." },
  { icon: <Gift size={28} className="text-yellow-500" />, title: "Mobile-Ready", description: "Earn anywhere with fully responsive design." },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "How do I cash out?", a: "Withdraw instantly via PayPal, gift cards, or mobile top-ups once you reach the minimum threshold." },
  { q: "Is the platform secure?", a: "Yes! We use enterprise-grade security for all user data and transactions." },
  { q: "Can I join from anywhere?", a: "Yes, our platform supports global users." },
  { q: "Is there a minimum age?", a: "You must be at least 13 years old to join." },
  { q: "Do I need to pay?", a: "No, registration and earning are completely free." },
];

/* ================= PAGE COMPONENT ================= */
export default function EarnMoneyFromHome() {
  const [seo, setSeo] = useState<SEOOutput | null>(null);

  /* SEO Metrics Hook */
  useSEOMetrics(seo);

  /* =========================
     Hydrate SEO Client-Side (Non-Blocking)
  ========================== */
  useEffect(() => {
    let mounted = true;

    buildSEO({
      route: "/earn-money-from-home",
      locale: SEO_CONFIG.defaultLocale,
    })
      .then((result) => {
        if (mounted) setSeo(result);
      })
      .catch((err) => console.error("SEO hydration failed:", err));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {/* Structured Data & Meta Tags */}
      {seo && <SeoRenderer seo={seo} />}

      <main className="transition-colors duration-300 bg-white dark:bg-[#0B0E1A] text-gray-900 dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="py-24 px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
              Earn Money From Home
            </h1>
            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users and start earning instantly from the comfort of your home.
            </p>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-14 py-6 rounded-3xl font-bold shadow-2xl text-xl"
              >
                Start Earning Now <ArrowRight size={24} />
              </motion.span>
            </Link>
          </div>
        </section>

        {/* ===== REST OF YOUR FILE REMAINS EXACTLY SAME ===== */}
