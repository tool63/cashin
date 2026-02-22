"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Gamepad2,
  Smartphone,
  Star,
  ShieldCheck,
  Zap,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Meta from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";

export default function StartEarningPage() {
  const faqs = [
    {
      question: "How can I earn money online with Cashog?",
      answer:
        "You can earn money online by completing offers, playing games, taking surveys, and testing apps. Once you earn enough points, you can withdraw your rewards instantly.",
    },
    {
      question: "Is Cashog legit and safe to use worldwide?",
      answer:
        "Yes, Cashog is a secure and trusted rewards platform available globally. All offers and surveys are verified, and payments are processed safely.",
    },
    {
      question: "How fast can I withdraw my earnings?",
      answer:
        "Most withdrawals are processed instantly or within a few hours after reaching the minimum payout threshold.",
    },
    {
      question: "Do I need to pay to join Cashog?",
      answer:
        "No, Cashog is completely free to join. You can create an account and start earning without paying anything.",
    },
    {
      question: "Can I earn money from my mobile phone?",
      answer:
        "Yes! Cashog is fully mobile-friendly. You can complete offers, play games, and take surveys directly from your smartphone.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "Cashog supports PayPal, gift cards, and other global payout methods depending on your region.",
    },
  ];

  return (
    <>
      <Meta
        title="Start Earning | Cashog"
        description="Start earning real money online with Cashog. Complete offers, play games, take surveys, and withdraw instantly worldwide."
      />

      {/* FAQ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto">

            <Reveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Earn Real Money Online
              </h1>
            </Reveal>

            {/* Typing Effect */}
            <Reveal>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
                <TypingText />
              </div>
            </Reveal>

            <Reveal>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
                Turn your free time into real income by completing simple tasks,
                playing games, and answering surveys from anywhere in the world.
              </p>
            </Reveal>

            <PrimaryCTA href="/signup">
              Start Earning Now <ArrowRight size={20} />
            </PrimaryCTA>

          </div>
        </section>

        {/* ================= WAYS YOU CAN EARN ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-3">
          {[
            {
              icon: <Gift size={40} />,
              title: "Complete Offers",
              desc: "Install apps, sign up, or try new services and get rewarded instantly.",
            },
            {
              icon: <Gamepad2 size={40} />,
              title: "Play Games",
              desc: "Earn money by reaching levels or completing missions in games.",
            },
            {
              icon: <Smartphone size={40} />,
              title: "Take Surveys",
              desc: "Share your opinion and earn cash from trusted survey partners.",
            },
          ].map((item, i) => (
            <Reveal key={i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-800 shadow"
              >
                <div className="mb-4 text-yellow-500">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </section>

        {/* ================= WHY CHOOSE CASHOG ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">

          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Cashog
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <DollarSign size={32} />,
                title: "High Rewards",
                desc: "Competitive payouts for every completed task.",
              },
              {
                icon: <Zap size={32} />,
                title: "Instant Tracking",
                desc: "Your earnings are tracked in real-time.",
              },
              {
                icon: <ShieldCheck size={32} />,
                title: "Secure & Trusted",
                desc: "Safe withdrawals and verified offer partners.",
              },
              {
                icon: <Star size={32} />,
                title: "Global Access",
                desc: "Users from around the world can join and earn.",
              },
            ].map((item, i) => (
              <Reveal key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 text-center shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-4 text-yellow-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-16">

          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i}>
                <details className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-4 cursor-pointer">
                  <summary className="font-semibold text-lg">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">

          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 gradient-text">
              Ready to Start Earning Today?
            </h2>
          </Reveal>

          <PrimaryCTA href="/signup">
            Create Free Account <ArrowRight size={20} />
          </PrimaryCTA>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog today and start turning your spare time into daily earnings.
          </p>
        </section>

      </main>
    </>
  );
}
