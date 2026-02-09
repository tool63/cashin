"use client";

import { useParams } from "next/navigation";
import { earningOptions } from "@/components/earning/earningOptions";
import { SectionTitle, Stat } from "@/components/live/SmallComponents";
import { ArrowRight, ShieldCheck, Wallet, Zap } from "lucide-react";
import Link from "next/link";
import Meta from "@/components/seo/SeoEngine";
import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";

// High Paying Offers Data
const highPayingOffers = [
  { name: "Survey Max", flag: "🇺🇸", amount: "$15" },
  { name: "App Cash", flag: "🇬🇧", amount: "$12" },
  { name: "Video Rewards", flag: "🇨🇦", amount: "$10" },
  { name: "Daily Survey", flag: "🇦🇺", amount: "$18" },
  { name: "Task Master", flag: "🇮🇳", amount: "$20" },
  { name: "Offer Wall", flag: "🇪🇺", amount: "$25" },
  { name: "Crypto Miner", flag: "🇺🇸", amount: "$22" },
  { name: "App Install Pro", flag: "🇬🇧", amount: "$17" },
  { name: "Game Rewards", flag: "🇨🇦", amount: "$19" },
  { name: "Premium Survey", flag: "🇦🇺", amount: "$21" },
  { name: "Quick Tasks", flag: "🇮🇳", amount: "$16" },
  { name: "Video Cash", flag: "🇪🇺", amount: "$14" },
  { name: "Survey King", flag: "🇺🇸", amount: "$23" },
  { name: "App Bonus", flag: "🇬🇧", amount: "$18" },
  { name: "Gaming Hub", flag: "🇨🇦", amount: "$20" },
  { name: "Offer Pro", flag: "🇦🇺", amount: "$26" },
  { name: "Task Hero", flag: "🇮🇳", amount: "$19" },
  { name: "Survey Star", flag: "🇪🇺", amount: "$22" },
  { name: "Video Max", flag: "🇺🇸", amount: "$15" },
  { name: "App Rewards", flag: "🇬🇧", amount: "$17" },
];

export default function DynamicPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const option = earningOptions.find(([, , href]) => href === `/${slug}`);

  const title = option
    ? `${option[1]} - Earn Real Money | Cashog`
    : slug
    ? `${slug.replace("-", " ").charAt(0).toUpperCase() + slug.slice(1)} - Cashog`
    : "Cashog - Earn Rewards Online";

  const description = option
    ? `Discover how to earn real money by ${option[1].toLowerCase()} on Cashog. Fast, secure, and trusted ways to earn rewards online.`
    : slug
    ? `Learn more about ${slug.replace("-", " ")} and start earning real money on Cashog today!`
    : "Cashog - Earn rewards, complete offers, watch videos, and get paid instantly.";

  const earningDescriptions: Record<string, string> = {
    Surveys: "Share your opinions and get rewarded instantly",
    "App Installs": "Install apps and earn money easily",
    "Play Games": "Have fun while earning rewards",
    "Watch Videos": "Watch short videos and get paid",
    "Mining Rewards": "Earn crypto while mining rewards",
    "Complete Offers": "Finish tasks and get instant payouts",
    Offerwall: "Complete multiple offers for bonuses",
    Surveywall: "Explore surveys with higher payouts",
  };

  return (
    <>
      <Meta title={title} description={description} />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white">

        {/* =================== HERO SECTION =================== */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

            {/* HEADLINE — MATCHES BOTTOM CTA SIZE */}
            <h1 className="font-extrabold text-3xl sm:text-4xl mb-4">
              Earn Real Money Online
            </h1>

            {/* TYPING TEXT — SAME SIZE */}
            <div className="text-3xl sm:text-4xl mb-6 font-semibold bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 bg-clip-text text-transparent">
              <TypingText />
            </div>

            <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-xl mx-auto">
              Join millions of users worldwide and start earning rewards instantly.
            </p>

            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-10 py-4 rounded-xl font-semibold shadow-lg"
              >
                Get Started Now <ArrowRight />
              </motion.span>
            </Link>

            {/* =================== HIGH PAYING OFFERS =================== */}
            <div className="mt-12 max-w-4xl mx-auto overflow-y-auto h-[360px] border border-gray-700 rounded-xl bg-gray-800 p-4">
              <h3 className="text-lg font-bold mb-4 text-white">
                🔥 High Paying Offers
              </h3>

              <div className="grid grid-cols-3 gap-4 text-sm text-gray-200 font-medium">
                <span>Offer</span>
                <span>Country</span>
                <span>Amount</span>
              </div>

              <div className="mt-2 divide-y divide-gray-700">
                {highPayingOffers.map((offer, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 gap-4 py-2 items-center hover:bg-gray-700 transition rounded-md px-2"
                  >
                    <span>{offer.name}</span>
                    <span>{offer.flag}</span>
                    <span className="text-green-400 font-semibold">
                      {offer.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* =================== TASKS GRID =================== */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <SectionTitle icon="🎯" text="Earn Money Tasks" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {earningOptions.map(([icon, title, href]) => (
              <Link
                key={title}
                href={href}
                className="rounded-2xl p-6 flex flex-col items-center text-center bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:scale-105 transition"
              >
                <div className="text-4xl">{icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {earningDescriptions[title] ||
                    `Earn rewards with ${title.toLowerCase()}`}
                </p>
                <ArrowRight className="mt-3 text-blue-500" size={18} />
              </Link>
            ))}
          </div>
        </section>

        {/* =================== TRUST =================== */}
        <section className="py-16 bg-gray-100 dark:bg-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Trusted by Millions Worldwide
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Cashog is one of the most trusted earning platforms, paying users
              daily across the globe.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Stat title="Total Users" value="25M+" />
              <Stat title="Users Paid" value="3.2M+" />
              <Stat title="Total Payouts" value="$12M+" />
              <Stat title="Trust Rating" value="4.8 ★" />
            </div>
          </div>
        </section>

        {/* =================== PAYMENT METHODS =================== */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-4">
              Payment Methods
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-14 max-w-2xl mx-auto">
              Fast, secure, and trusted payout options.
            </p>

            <div className="flex justify-center flex-wrap gap-8">
              {[
                { name: "PayPal", emoji: "💸" },
                { name: "USDT", emoji: "🪙" },
                { name: "Bitcoin", emoji: "₿" },
                { name: "Gift Cards", emoji: "🎁" },
              ].map((method) => (
                <div
                  key={method.name}
                  className="w-36 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-6 py-8 flex flex-col items-center hover:scale-105 transition"
                >
                  <span className="text-4xl mb-3">{method.emoji}</span>
                  <span className="text-lg font-semibold">{method.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Instant payout
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================== WHY CHOOSE US =================== */}
        <section className="py-20 bg-gray-100 dark:bg-white/5">
          <SectionTitle icon="🌟" text="Why Choose Us" />
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
            <Feature icon={<Zap />} title="Instant Withdrawals" />
            <Feature icon={<ShieldCheck />} title="Secure & Trusted" />
            <Feature icon={<Wallet />} title="Multiple Payment Options" />
          </div>
        </section>

        {/* =================== FINAL CTA =================== */}
        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Earning Real Money Today!
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
            Join millions of users who are already earning daily.
          </p>
          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-10 py-4 rounded-xl font-semibold shadow-lg"
            >
              Get Started Now <ArrowRight />
            </motion.span>
          </Link>
        </section>

      </main>
    </>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-[#0f111b] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">
      <div className="text-green-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center">
        Reliable, fast, and user-friendly experience for everyone.
      </p>
    </div>
  );
}
