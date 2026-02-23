"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import {
  Sparkles,
  Cpu,
  Globe,
  Shield,
  Cloud,
  BarChart3,
  Database,
  Rocket,
  Layers,
  Zap,
  ChevronDown,
} from "lucide-react";

/* ============================= */
/* Offer Card Component */
/* ============================= */

function OfferCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: any;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative"
    >
      <div
        onClick={() => setOpen(!open)}
        className="
          group
          relative
          p-8
          rounded-3xl
          cursor-pointer
          bg-white dark:bg-[#0a0d16]
          border border-gray-200 dark:border-gray-800
          shadow-md
          hover:shadow-xl
          transition-all
          duration-300
        "
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-green-400/0 opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-400 to-green-400 text-white shadow-lg">
              <Icon size={26} />
            </div>

            <ChevronDown
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>

          <h3 className="text-xl font-bold mb-3">{title}</h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {description}
          </p>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-sm text-gray-500 dark:text-gray-400 overflow-hidden"
              >
                This premium module integrates seamlessly with enterprise
                systems and delivers scalable architecture designed for
                performance and growth.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================= */
/* PAGE COMPONENT */
/* ============================= */

export default function TestProductsPage() {
  return (
    <>
      <Meta
        title="Premium Products | Cashog"
        description="Discover premium digital products designed for professionals."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO SECTION ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-green-400/20 border border-yellow-400/30 mb-6">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-sm font-medium">
                Premium Digital Marketplace
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
              Power Your Business With
            </h1>

            <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-8">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Advanced digital solutions crafted for scalability,
              automation, and enterprise-grade performance.
            </p>

            <PrimaryCTA href="/signup">Explore Products</PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= OFFERS SECTION ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Featured Premium Offers
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Expand cards to learn more about each solution
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            <OfferCard
              title="AI Automation Suite"
              description="Automate workflows using intelligent AI systems."
              icon={Cpu}
            />
            <OfferCard
              title="Global CDN Network"
              description="High-speed content delivery across the globe."
              icon={Globe}
            />
            <OfferCard
              title="Enterprise Security"
              description="Advanced threat detection and protection layers."
              icon={Shield}
            />
            <OfferCard
              title="Cloud Infrastructure"
              description="Scalable and reliable cloud deployment systems."
              icon={Cloud}
            />
            <OfferCard
              title="Data Intelligence"
              description="Real-time analytics and growth dashboards."
              icon={BarChart3}
            />
            <OfferCard
              title="Database Optimization"
              description="High-performance database tuning solutions."
              icon={Database}
            />
            <OfferCard
              title="SaaS Growth Engine"
              description="Conversion-focused automation frameworks."
              icon={Rocket}
            />
            <OfferCard
              title="Modular API Systems"
              description="Enterprise-level API integration modules."
              icon={Layers}
            />
            <OfferCard
              title="Performance Boost Pack"
              description="Frontend acceleration and smart caching tools."
              icon={Zap}
            />
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 pb-28 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-10">
              Everything you need to know before purchasing
            </p>
          </Reveal>

          <FAQ
            faqs={[
              { q: "Are these lifetime products?", a: "Yes. One-time purchase with lifetime access." },
              { q: "Do I get updates?", a: "Yes. All updates are included for free." },
              { q: "Is support available?", a: "Premium support is included." },
            ]}
          />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 text-center pb-32">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Upgrade Your Digital Experience
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              Join professionals using Cashog premium solutions today.
            </p>

            <PrimaryCTA href="/signup">Get Started</PrimaryCTA>
          </Reveal>
        </section>

      </main>
    </>
  );
}
