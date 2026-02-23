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

export default function WatchVideosPage() {
  return (
    <>
      <Meta
        title="Watch Videos & Earn | Cashooz"
        description="Watch short videos and earn rewards instantly. Safe, fast and secure."
      />

      <div className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-6xl mx-auto px-4 py-20">

          {/* HERO SECTION — Same Logic as How It Works */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <TypingText
              subtitleWords={[
                "Watch Videos",
                "Earn Rewards",
                "Withdraw Securely"
              ]}
            />

            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Earn real rewards by watching sponsored videos from trusted partners.
              Simple. Transparent. Reliable.
            </p>

            <div className="mt-8 flex justify-center">
              <PrimaryCTA
                href="/dashboard"
                className="px-7 py-3 text-sm rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Watching
              </PrimaryCTA>
            </div>
          </div>

          {/* FEATURES SECTION — Same Card Style */}
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
                  Verified Video Providers
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We work only with premium advertising partners to ensure
                  safe and legitimate earning opportunities.
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
                  Instant Reward System
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Points are credited immediately after successful completion.
                  Withdraw securely anytime.
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
                  question: "How do I earn by watching videos?",
                  answer:
                    "Simply watch sponsored videos fully. Once completed, rewards are credited automatically.",
                },
                {
                  question: "Why was a video not credited?",
                  answer:
                    "Make sure you watched the entire video and did not switch tabs or close early.",
                },
                {
                  question: "How fast are rewards credited?",
                  answer:
                    "Rewards are usually credited instantly. Some offers may take a few minutes to verify.",
                },
                {
                  question: "Is this safe?",
                  answer:
                    "Yes. We partner with verified advertising networks and use advanced security systems.",
                },
                {
                  question: "Can I withdraw anytime?",
                  answer:
                    "Yes. Once you reach the minimum withdrawal threshold, you can request payout.",
                },
                {
                  question: "Is there any cost to join?",
                  answer:
                    "No. Joining and earning on Cashooz is completely free.",
                },
              ]}
            />
          </div>

        </section>
      </div>
    </>
  );
}
