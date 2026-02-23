"use client";

import React from "react";
import {
  Trophy,
  User,
  Gift,
  ClipboardList,
  DollarSign,
  Shield,
  TrendingUp,
  Joystick,
} from "lucide-react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";

/* ================= GAME DATA ================= */
type Game = {
  id: number;
  name: string;
  category: string;
  reward: string;
  rating: number;
  players: string;
};

const games: Game[] = [
  { id: 1, name: "Crypto Racer", category: "Racing", reward: "$3", rating: 4.8, players: "50K+" },
  { id: 2, name: "Puzzle Mania", category: "Puzzle", reward: "$2", rating: 4.7, players: "75K+" },
  { id: 3, name: "Battle Arena", category: "Action", reward: "$4", rating: 4.9, players: "120K+" },
  { id: 4, name: "Brain Teasers", category: "Educational", reward: "$2", rating: 4.6, players: "40K+" },
  { id: 5, name: "Fantasy Quest", category: "Adventure", reward: "$3", rating: 4.8, players: "60K+" },
  { id: 6, name: "Word Wizard", category: "Word Game", reward: "$2", rating: 4.7, players: "55K+" },
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
          <TrendingUp key={`full-${i}`} className="w-5 h-5 text-yellow-400" />
        ))}
      {halfStar && <TrendingUp className="w-5 h-5 text-yellow-400 opacity-60" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <TrendingUp key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
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

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How do I earn rewards?",
    a: "Play games and complete challenges to earn rewards instantly.",
  },
  {
    q: "Are rewards real money?",
    a: "Yes. You can withdraw rewards via PayPal or gift cards.",
  },
  {
    q: "Is it free to play?",
    a: "Yes. All games and challenges are free to play.",
  },
  {
    q: "How fast are rewards credited?",
    a: "Most rewards are credited instantly after completion.",
  },
  {
    q: "How do I withdraw earnings?",
    a: "You can withdraw once you reach the minimum payout threshold.",
  },
];

export default function PlayGamesPage() {
  return (
    <>
      <Meta
        title="Play Games & Earn | Cashog"
        description="Play premium games and earn real rewards instantly."
      />

      <main className="min-h-screen text-gray-900 dark:text-white">

        {/* ================= HERO SECTION ================= */}
        <section className="relative py-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-br
            from-yellow-400/20 via-green-400/10 to-yellow-600/20
            dark:from-yellow-900/20 dark:via-green-900/10 dark:to-yellow-800/20
            blur-3xl" />

          <motion.div
            className="relative max-w-4xl mx-auto px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-2">
              Premium Play & Earn
            </h1>
            <p className="text-sm uppercase tracking-widest text-green-600 mb-6">
              Play | Earn | Enjoy
            </p>

            <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10">
              Play premium games, complete challenges, and earn real rewards.
            </p>

            <PrimaryCTA href="/signup">
              Start Playing
            </PrimaryCTA>
          </motion.div>
        </section>

        {/* ================= FEATURED GAMES ================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Premium Games
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Hand-picked games with real earning opportunities
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {games.map((game) => (
              <motion.div
                key={game.id}
                className="bg-white/90 dark:bg-[#0c111b]/90 backdrop-blur-xl
                border border-gray-200 dark:border-gray-800
                rounded-2xl p-6 shadow-sm hover:shadow-xl
                transition-all duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div>
                  {/* Category Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <ClipboardList className="text-yellow-500 w-5 h-5" />
                    <span className="text-xs px-3 py-1 rounded-full
                      bg-yellow-500/10 text-yellow-600 dark:text-yellow-400
                      border border-yellow-500/20">
                      {game.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2">{game.name}</h3>

                  {/* Details */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Players: {game.players}
                  </p>

                  {/* Rating */}
                  <StarRating rating={game.rating} />
                </div>

                {/* CTA (SMALL & MODERN) */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-green-600 font-bold">{game.reward}</span>

                  <motion.a
                    href="/signup"
                    className="px-4 py-1.5 text-xs font-semibold rounded-lg
                    bg-gradient-to-r from-yellow-400 to-green-400
                    text-black shadow-sm hover:shadow-md
                    transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Play Now
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 bg-gray-50 dark:bg-[#0c111b]">
  <h2 className="text-3xl md:text-4xl font-bold text-center">
    Platform Performance
  </h2>
  <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
    Real-time insights from our growing community
  </p>

  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {stats.map((stat, index) => (
      <motion.div
        key={index}
        className="bg-white/90 dark:bg-[#0c111b]/90 backdrop-blur-xl
        border border-gray-200 dark:border-gray-800
        rounded-2xl p-6 text-center shadow-sm hover:shadow-xl
        transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-center items-center mb-4">
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>

        <h3 className="text-4xl font-extrabold text-green-500">
          <CountUp end={stat.number} />
          {stat.label === "Average Reward" && "$"}
        </h3>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {stat.label}
        </p>
      </motion.div>
    ))}
  </div>
</section>

        <section className="py-24 px-6 max-w-6xl mx-auto text-center">
  <h2 className="text-3xl md:text-4xl font-bold">
    How It Works
  </h2>
  <p className="text-gray-600 dark:text-gray-400 mb-12">
    Start earning in three simple steps
  </p>

  <div className="grid md:grid-cols-3 gap-8">
    {[
      {
        icon: <User className="w-8 h-8 text-yellow-400" />,
        title: "Sign Up",
        desc: "Create your account in seconds.",
      },
      {
        icon: <Trophy className="w-8 h-8 text-green-400" />,
        title: "Play Games",
        desc: "Complete challenges and earn rewards.",
      },
      {
        icon: <Gift className="w-8 h-8 text-yellow-400" />,
        title: "Withdraw",
        desc: "Redeem earnings instantly.",
      },
    ].map((step) => (
      <motion.div
        key={step.title}
        className="bg-white/90 dark:bg-[#0c111b]/90 backdrop-blur-xl
        border border-gray-200 dark:border-gray-800
        rounded-2xl p-6 shadow-sm hover:shadow-xl
        transition-all duration-300 text-center"
      >
        {/* Icon in the middle */}
        <div className="flex justify-center items-center mb-4">
          {step.icon}
        </div>

        <h3 className="text-lg font-semibold">{step.title}</h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
          {step.desc}
        </p>
      </motion.div>
    ))}
  </div>
</section>

        {/* ================= FAQ ================= */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Everything you need to know about Play & Earn
          </p>

          <FAQ faqs={faqs} />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Play & Earn?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of players earning rewards today
          </p>

          <PrimaryCTA href="/signup">
            Start Playing
          </PrimaryCTA>
        </section>
      </main>
    </>
  );
}
