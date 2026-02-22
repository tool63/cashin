"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import { ClipboardList, Star } from "lucide-react";

export default function SurveysPage() {
  return (
    <>
      <Meta
        title="Paid Surveys | Cashooz"
        description="Complete surveys, earn rewards, and withdraw real money securely."
      />

      <div className="relative min-h-screen overflow-hidden text-gray-900 dark:text-white">

        {/* Same Background Logic */}
        <Background />

        <section className="relative z-10 max-w-6xl mx-auto px-4 py-20">

          {/* HERO */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <TypingText
              text="Complete Surveys & Earn Instantly"
              className="text-4xl md:text-5xl font-bold mb-6"
            />

            <p className="text-lg text-gray-600 dark:text-gray-400">
              Answer simple surveys from trusted partners and earn real rewards.
              Secure. Fast. Reliable.
            </p>

            {/* Premium Resized CTA */}
            <div className="mt-8 flex justify-center">
              <PrimaryCTA
                href="/dashboard"
                className="
                  px-8 py-3 
                  text-base 
                  rounded-xl 
                  shadow-lg 
                  hover:shadow-xl 
                  transition-all 
                  duration-300 
                  font-semibold
                "
              >
                Start Survey
              </PrimaryCTA>
            </div>
          </div>

          {/* FEATURES SECTION */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">

            <Reveal>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="
                  bg-white 
                  dark:bg-[#0a0d16] 
                  rounded-2xl 
                  p-8 
                  border 
                  border-gray-200 
                  dark:border-gray-800 
                  shadow-md
                "
              >
                <ClipboardList className="w-10 h-10 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-3">
                  Verified Survey Providers
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We partner only with trusted survey networks to ensure safe
                  and legitimate earning opportunities.
                </p>
              </motion.div>
            </Reveal>

            <Reveal>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="
                  bg-white 
                  dark:bg-[#0a0d16] 
                  rounded-2xl 
                  p-8 
                  border 
                  border-gray-200 
                  dark:border-gray-800 
                  shadow-md
                "
              >
                <Star className="w-10 h-10 mb-4 text-yellow-500" />
                <h3 className="text-xl font-semibold mb-3">
                  Fast & Secure Payments
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Earn points instantly after completion and withdraw securely
                  via your preferred payment method.
                </p>
              </motion.div>
            </Reveal>

          </div>

          {/* FAQ SECTION */}
          <div className="max-w-4xl mx-auto">

            <h2 className="text-3xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>

            <FAQ
              items={[
                {
                  question: "How do I qualify for surveys?",
                  answer:
                    "Survey eligibility depends on your profile. Complete your account information accurately to receive more matches.",
                },
                {
                  question: "Why was I disqualified from a survey?",
                  answer:
                    "Some surveys require specific demographics. If your answers don't match the criteria, you may be screened out.",
                },
                {
                  question: "When do I receive my rewards?",
                  answer:
                    "Rewards are usually credited instantly after successful completion. In rare cases, it may take a few hours.",
                },
                {
                  question: "Is Cashooz safe and legitimate?",
                  answer:
                    "Yes. We work with verified survey providers and use advanced security systems to protect user data.",
                },
                {
                  question: "How can I increase my earnings?",
                  answer:
                    "Complete your profile fully, check daily for new surveys, and participate consistently to maximize earnings.",
                },
                {
                  question: "What payment methods are available?",
                  answer:
                    "We support multiple secure withdrawal methods depending on your region.",
                },
                {
                  question: "Do surveys cost anything?",
                  answer:
                    "No. All surveys are completely free to participate in.",
                },
              ]}
            />
          </div>

        </section>
      </div>
    </>
  );
}
