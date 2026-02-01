"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

export const revalidate = 0; // Important: number only

// --- FAQ Data ---
const faqData = [
  {
    question: "How do I start earning on Cashog?",
    answer: "Simply click the 'Start Earning' button, complete offers, surveys, or tasks, and watch your rewards accumulate instantly.",
  },
  {
    question: "How do withdrawals work?",
    answer: "You can withdraw your earnings via PayPal, crypto, or gift cards. Minimum payout depends on your chosen method.",
  },
  {
    question: "Is Cashog safe to use?",
    answer: "Absolutely. We use enterprise-level security to protect your data and ensure fair rewards.",
  },
  {
    question: "Can I earn from multiple devices?",
    answer: "Yes! You can log in from multiple devices, and your earnings will sync automatically.",
  },
];

// --- Page Component ---
export default function HowItWorksPage() {
  const [showCTA, setShowCTA] = useState(true);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // --- Scroll handler for floating CTA ---
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 300) {
        // Scrolling down
        setShowCTA(false);
      } else {
        // Scrolling up
        setShowCTA(true);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative bg-black text-white min-h-screen font-sans antialiased">
      {/* HERO */}
      <section className="text-center py-24 px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How Cashog Works
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Earn rewards instantly by completing tasks, surveys, and offers—all in one platform.
        </motion.p>
      </section>

      {/* STEPS */}
      <section className="max-w-5xl mx-auto py-16 px-6 grid gap-12 lg:grid-cols-3">
        {[
          { title: "Sign Up", desc: "Create your free Cashog account in seconds." },
          { title: "Complete Tasks", desc: "Surveys, offers, and simple tasks for instant rewards." },
          { title: "Withdraw Rewards", desc: "Cash out securely via PayPal, crypto, or gift cards." },
        ].map((step, i) => (
          <motion.div
            key={i}
            className="bg-gray-900 rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
            <p className="text-gray-400">{step.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <div key={i} className="bg-gray-900 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-4 font-medium text-left hover:bg-gray-800 transition-colors"
              >
                {faq.question}
                {expandedFAQ === i ? <ChevronUp /> : <ChevronDown />}
              </button>
              <AnimatePresence>
                {expandedFAQ === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-300"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FLOATING CTA */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <a
              href="/start-earning"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-4 rounded-xl shadow-xl transition-all flex items-center gap-2"
            >
              Start Earning in 60 Seconds <ArrowRight />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
