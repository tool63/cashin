"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Wallet, Zap } from "lucide-react"
import Link from "next/link"

/* ================= LIVE SECTIONS ================= */
import LiveEarnings from "@/components/live/LiveEarnings"
import LiveWithdrawals from "@/components/live/LiveWithdrawals"
import LiveOfferCompletion from "@/components/live/LiveOfferCompletion"
import LiveJoining from "@/components/live/LiveJoining"

/* ================= SMALL COMPONENTS ================= */
import {
  SectionTitle,
  Stat,
  Feature,
} from "@/components/live/SmallComponents"

/* ================= HERO SECTION ================= */
const HeroSection = () => {
  const phrases = ["Surveys", "App Installs", "Playing Games", "Watching Videos"]
  const [current, setCurrent] = useState(0)
  const [text, setText] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      const phrase = phrases[current]
      setText(phrase.slice(0, i + 1))
      i++
      if (i > phrase.length) {
        setTimeout(() => {
          setText("")
          setCurrent((prev) => (prev + 1) % phrases.length)
        }, 700)
        clearInterval(interval)
      }
    }, 90)

    return () => clearInterval(interval)
  }, [current])

  return (
    <section className="py-24 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
          Earn Real Money By
        </h1>

        <div className="relative h-[56px] md:h-[64px] mb-4">
          <span className="invisible text-3xl md:text-5xl font-extrabold">
            Watching Videos
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-extrabold text-cyan-400">
            {text}
          </span>
        </div>

        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Complete offers, play games, answer surveys and cash out instantly.
        </p>

        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-10 py-4 rounded-xl font-semibold shadow-lg"
          >
            Start Earning Now <ArrowRight />
          </motion.span>
        </Link>
      </div>
    </section>
  )
}

/* ================= HOME PAGE ================= */
export default function Home() {
  const earningOptions = [
    ["🧠", "Surveys", "/surveys"],
    ["📱", "App Installs", "/app-installs"],
    ["🎮", "Playing Games", "/play-games"],
    ["📺", "Watching Videos", "/watch-videos"],
    ["⛏️", "Mining Rewards", "/mining-rewards"],
    ["✅", "Completing Offers", "/complete-offers"],
    ["🧩", "Offerwall", "/offerwall"],
    ["📋", "Surveywall", "/surveywall"],
    ["🎬", "Watching Ads", "/watch-ads"],
    ["🛠️", "Micro Tasks", "/micro-tasks"],
    ["🎁", "Free Trials", "/complete-free-trials"],
    ["🧪", "Testing Products", "/test-products"],
    ["📧", "Reading Emails", "/read-emails"],
    ["🌐", "Visiting Websites", "/visit-websites"],
    ["⭐", "Review Tasks", "/review-tasks"],
    ["🎡", "Spinning Wheel", "/spinning-wheel"],
    ["🏆", "Loyalty", "/loyalty"],
    ["💳", "Vouchers", "/vouchers"],
  ]

  return (
    <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white">
      <HeroSection />

      {/* ================= LIVE SECTIONS ================= */}
      <section className="py-16 bg-gray-100 dark:bg-white/5">
        <LiveEarnings />
      </section>

      <section className="py-16 bg-gray-100 dark:bg-white/5">
        <LiveOfferCompletion />
      </section>

      <section className="py-16 bg-gray-100 dark:bg-white/5">
        <LiveWithdrawals />
      </section>

      <section className="py-16 bg-gray-100 dark:bg-white/5">
        <LiveJoining />
      </section>

      {/* ================= TRUST ================= */}
      <section className="py-16 bg-gray-100 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Trusted by Millions Worldwide
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Cashog is one of the most trusted earning platforms, paying users daily
            across the globe with fast and secure withdrawals.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat title="Total Users" value="25M+" />
            <Stat title="Users Paid" value="3.2M+" />
            <Stat title="Total Payouts" value="$12M+" />
            <Stat title="Trust Rating" value="4.8 ★" />
          </div>
        </div>
      </section>

      {/* ================= PAYMENTS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Payment Methods</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-14 max-w-2xl mx-auto">
            Fast, secure, and trusted payout options.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {[
              { name: "PayPal", emoji: "💸" },
              { name: "USDT", emoji: "🪙" },
              { name: "Bitcoin", emoji: "₿" },
              { name: "Gift Cards", emoji: "🎁" },
              { name: "Local Payouts", emoji: "🏦" },
            ].map((method) => (
              <div
                key={method.name}
                className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-6 py-8 flex flex-col items-center hover:scale-105 transition"
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

      {/* ================= TASKS ================= */}
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
                Earn by {title.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-gray-100 dark:bg-white/5">
        <SectionTitle icon="🌟" text="Why Choose Us" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <Feature icon={<Zap />} title="Instant Withdrawals" />
          <Feature icon={<ShieldCheck />} title="Secure & Trusted" />
          <Feature icon={<Wallet />} title="Multiple Payment Options" />
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
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
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-10 py-4 rounded-xl font-semibold shadow-lg"
          >
            Get Started Now <ArrowRight />
          </motion.span>
        </Link>
      </section>
    </main>
  )
}
