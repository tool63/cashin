"use client";

import React from "react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import { Video, Star, Gift, User, ClipboardList, Trophy } from "lucide-react";

/* ================= VIDEO DATA ================= */
const videos = [
  { id: 1, title: "Crypto Insights", category: "Finance", reward: "$2", rating: 4.8, views: "50K+" },
  { id: 2, title: "Brain Training", category: "Education", reward: "$1.5", rating: 4.7, views: "75K+" },
  { id: 3, title: "Action Highlights", category: "Entertainment", reward: "$3", rating: 4.9, views: "120K+" },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "Is it free to watch videos?",
    a: "Yes. Watching videos and earning rewards is completely free.",
  },
  {
    q: "How much can I earn per video?",
    a: "Rewards typically range from $1 to $5 depending on the video.",
  },
  {
    q: "When do I receive rewards?",
    a: "Rewards are credited instantly after successful completion.",
  },
  {
    q: "Can I watch videos on mobile?",
    a: "Yes. Our platform is fully mobile optimized.",
  },
  {
    q: "Is there a daily earning limit?",
    a: "Some videos may have limits, but new content is added regularly.",
  },
];

/* ================= STAR RATING ================= */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center mt-2">
      {Array(Math.floor(rating))
        .fill(0)
        .map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400" />
        ))}
    </div>
  );
}

/* ================= PAGE ================= */
export default function WatchVideosPage() {
  return (
    <>
      <Meta
        title="Watch Videos & Earn | Cashog"
        description="Watch engaging videos and earn real rewards instantly."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Watch Videos & Earn Rewards
            </h1>

            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
              Enjoy curated content, learn new things, and earn real rewards instantly.
            </p>

            <PrimaryCTA href="/signup">
              Start Watching
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= VIDEO GRID ================= */}
        <section className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Top Rewarding Videos
            </h2>
          </Reveal>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ y: -4 }}
                className="
                  bg-white
                  dark:bg-[#0a0d16]
                  rounded-2xl
                  p-6
                  border
                  border-gray-200
                  dark:border-gray-800
                  shadow-md
                "
              >
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="text-yellow-500 w-5 h-5" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {video.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold">{video.title}</h3>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Views: {video.views}
                </p>

                <StarRating rating={video.rating} />

                <div className="flex items-center justify-between mt-4">
                  <span className="text-green-600 font-bold">
                    {video.reward}
                  </span>

                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      text-xs
                      px-4
                      py-2
                      rounded-full
                      bg-green-600
                      text-white
                      font-semibold
                      shadow-sm
                      hover:bg-green-700
                    "
                  >
                    Watch Now
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="relative z-10 py-24 px-4 max-w-6xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              How It Works
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <User className="w-8 h-8 text-yellow-400 mb-4 mx-auto" />,
                title: "Sign Up",
                desc: "Create a free account and access video rewards.",
              },
              {
                icon: <Trophy className="w-8 h-8 text-green-400 mb-4 mx-auto" />,
                title: "Watch Videos",
                desc: "Enjoy selected videos designed for earning.",
              },
              {
                icon: <Gift className="w-8 h-8 text-yellow-500 mb-4 mx-auto" />,
                title: "Earn Rewards",
                desc: "Withdraw instantly via PayPal or gift cards.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="
                  bg-white
                  dark:bg-[#0a0d16]
                  rounded-2xl
                  p-6
                  border
                  border-gray-200
                  dark:border-gray-800
                  shadow-md
                "
              >
                {step.icon}
                <h3 className="text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to know about watching & earning
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
              Ready to Start Earning?
            </h2>

            <PrimaryCTA href="/signup">
              Join Now
            </PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
