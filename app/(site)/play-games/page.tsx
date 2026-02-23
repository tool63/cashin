"use client";

import React from "react";
import {
  Trophy,
  User,
  Gift,
  ClipboardList,
  TrendingUp,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";

/* ================= PREMIUM GAMES ================= */
const games = [
  { id: 1, name: "Crypto Racer", category: "Racing", reward: "$3", rating: 4.8, players: "50K+" },
  { id: 2, name: "Puzzle Mania", category: "Puzzle", reward: "$2", rating: 4.7, players: "75K+" },
  { id: 3, name: "Battle Arena", category: "Action", reward: "$4", rating: 4.9, players: "120K+" },
  { id: 4, name: "Brain Teasers", category: "Educational", reward: "$2", rating: 4.6, players: "40K+" },
  { id: 5, name: "Fantasy Quest", category: "Adventure", reward: "$3", rating: 4.8, players: "60K+" },
  { id: 6, name: "Word Wizard", category: "Word Game", reward: "$2", rating: 4.7, players: "55K+" },
  { id: 7, name: "Sky Runner", category: "Arcade", reward: "$2", rating: 4.6, players: "80K+" },
  { id: 8, name: "Tower Builder", category: "Strategy", reward: "$3", rating: 4.7, players: "90K+" },
  { id: 9, name: "Space Defender", category: "Action", reward: "$4", rating: 4.9, players: "110K+" },
];

/* ================= COUNT UP ================= */
function CountUp({ end }: { end: number }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= STAR RATING ================= */
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex justify-center items-center mt-1">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400" />
        ))}
      {halfStar && <Star className="w-4 h-4 text-yellow-400 opacity-60" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
        ))}
    </div>
  );
}

/* ================= PLATFORM STATS ================= */
const stats = [
  { label: "Games Played", number: 500000 },
  { label: "Happy Players", number: 200000 },
  { label: "Average Reward", number: 3.2 },
];

/* ================= FAQ DATA ================= */
const faqs = [
  { q: "How do I earn rewards?", a: "Play games and complete challenges to earn rewards." },
  { q: "Are rewards real money?", a: "Yes. You can withdraw rewards via PayPal or gift cards." },
  { q: "Is it free to play?", a: "Yes. All games are free to play." },
  { q: "How fast are rewards credited?", a: "Rewards are credited instantly after completion." },
  { q: "How do I withdraw earnings?", a: "Withdraw once you reach minimum payout." },
];

export default function PlayGamesPage() {
  return (
    <>
      <Meta
        title="Play Games & Earn | Cashog"
        description="Premium games with real rewards. Play, earn, and withdraw instantly."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Premium Play & Earn
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Engage with premium games and earn real rewards instantly.
              </p>

              <PrimaryCTA href="/signup">
                Start Playing
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* GAMES GRID */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Premium Games
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Hand-picked games with real earning opportunities
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {games.map((game) => (
              <Reveal key={game.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <ClipboardList className="text-green-400 w-5 h-5" />
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                      {game.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{game.name}</h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Players: {game.players}
                  </p>

                  <StarRating rating={game.rating} />

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-green-500 font-bold">{game.reward}</span>

                    <motion.a
                      href="/signup"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="
                        px-3 py-1.5 text-xs font-semibold
                        rounded-lg
                        bg-gradient-to-r from-yellow-400 to-green-400
                        text-black
                        shadow-sm
                        hover:shadow-md
                        transition-all duration-200
                      "
                    >
                      Play Now
                    </motion.a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* PLATFORM STATS */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Platform Performance
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Real numbers from our growing community
            </p>
          </Reveal>

          <Reveal>
            <div className="grid gap-6 md:grid-cols-3 mb-24">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
                >
                  <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </h3>
                  <div className="text-3xl font-extrabold mt-2">
                    <CountUp end={stat.number} />
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* HOW IT WORKS */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              How It Works
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Start earning in three simple steps
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {[
              { icon: <User className="w-8 h-8 text-yellow-400" />, title: "Sign Up", desc: "Create account in seconds." },
              { icon: <Trophy className="w-8 h-8 text-green-400" />, title: "Play Games", desc: "Complete challenges and earn rewards." },
              { icon: <Gift className="w-8 h-8 text-yellow-400" />, title: "Withdraw", desc: "Redeem earnings instantly." },
            ].map((step) => (
              <Reveal key={step.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
                >
                  <div className="flex justify-center items-center mb-4">
                    {step.icon}
                  </div>

                  <h3 className="text-lg font-semibold">{step.title}</h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {step.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* FAQ */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Frequently Asked Questions
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to know about Play & Earn
            </p>
          </Reveal>

          <div className="mb-24">
            <FAQ faqs={faqs} />
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Ready to Play & Earn?
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Join Cashog today and unlock unlimited earning opportunities.
              </p>

              <PrimaryCTA href="/signup">
                Join Now
              </PrimaryCTA>
            </div>
          </Reveal>

        </section>
      </main>
    </>
  );
}
