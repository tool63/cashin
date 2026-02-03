"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Wallet, Zap } from "lucide-react"
import Link from "next/link"

import LiveEarnings from "../components/LiveEarnings"
import LiveWithdrawals from "../components/LiveWithdrawals"
import LiveOfferCompletion from "../components/LiveOfferCompletion"
import { SectionTitle, Stat, Badge, Feature } from "../components/SmallComponents"

/* ---------- ANIMATION ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
}

/* ---------- HOME PAGE ---------- */
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

  const paymentMethods = [
    { name: "PayPal", icon: "/icons/paypal.svg" },
    { name: "USDT", icon: "/icons/usdt.svg" },
    { name: "Bitcoin", icon: "/icons/bitcoin.svg" },
    { name: "Gift Cards", icon: "/icons/giftcard.svg" },
    { name: "Local Payouts", icon: "/icons/localpayout.svg" },
  ]

  return (
    <main className="transition-colors duration-300">

      {/* ================= HERO ================= */}
      <HeroSection />

      {/* ================= LIVE SECTIONS ================= */}
      <LiveEarnings />
      <LiveOfferCompletion />
      <LiveWithdrawals />

      {/* ================= TRUST / STATS ================= */}
      <section className="py-16 bg-black/5 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Trusted by Millions Worldwide</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Cashog is one of the most trusted earning platforms, paying users daily
            across the globe with fast and secure withdrawals.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <Stat title="Total Users" value="25M+" description="Active users earning rewards daily" />
            <Stat title="Users Paid" value="3.2M+" description="Members who successfully withdrew earnings" />
            <Stat title="Total Payouts" value="$12M+" description="Rewards paid to our community" />
            <Stat title="Trust Rating" value="4.8 ★" description="Average user rating across platforms" />
          </div>
        </div>
      </section>

      {/* ================= PAYMENT METHODS ================= */}
<section className="py-20 bg-gray-50 dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-6 text-center">
    {/* Section Title */}
    <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
      Payment Methods
    </h2>
    <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
      Choose from multiple trusted payout methods for secure and instant withdrawals.
    </p>

    {/* Cards Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
      {paymentMethods.map((method) => (
        <div
          key={method.name}
          className="relative bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 backdrop-blur-md cursor-pointer group"
        >
          <div className="bg-gradient-to-tr from-emerald-400 to-cyan-500 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4 group-hover:from-indigo-500 group-hover:to-pink-500 transition-colors duration-500">
            <img
              src={method.icon}
              alt={method.name}
              className="w-10 h-10 object-contain"
            />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-emerald-400 transition-colors duration-300">
            {method.name}
          </span>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
            Fast & secure payouts
          </p>
          {/* Optional overlay icon for modern feel */}
          <div className="absolute -top-3 -right-3 bg-emerald-400 dark:bg-cyan-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ✓
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ================= OFFER CARDS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <SectionTitle icon="🎯" text="Earn Money Tasks" />
        {earningOptions.map(([icon, title, href]) => (
          <Link
            key={title}
            href={href}
            className="bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition"
          >
            <div className="text-4xl">{icon}</div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              {title === "Surveys"
                ? "Answer & get paid"
                : title === "Surveywall"
                ? "Complete multiple surveys"
                : `Earn by ${title.toLowerCase()}`}
            </p>
          </Link>
        ))}
      </section>

      {/* ================= FEATURE HIGHLIGHTS ================= */}
      <section className="py-20 bg-black/5 dark:bg-white/5">
        <SectionTitle icon="🌟" text="Why Choose Us" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <Feature
            icon={<Zap />}
            title="Instant Withdrawals"
            description="Receive your earnings immediately after completing tasks."
          />
          <Feature
            icon={<ShieldCheck />}
            title="Secure & Trusted"
            description="Your data and payments are safe with our verified platform."
          />
          <Feature
            icon={<Wallet />}
            title="Multiple Payment Options"
            description="Withdraw via PayPal, USDT, Bitcoin, gift cards, and more."
          />
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 bg-emerald-500 text-white text-center rounded-2xl mx-6 md:mx-20 lg:mx-40">
        <h2 className="text-4xl font-bold mb-6">Start Earning Real Money Today!</h2>
        <p className="mb-8 text-lg">Join millions of users who are already earning daily.</p>
        <Link href="/signup">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-10 py-4 rounded-xl font-semibold shadow-lg cursor-pointer"
          >
            Get Started Now <ArrowRight />
          </motion.span>
        </Link>
      </section>

    </main>
  )
}

/* ---------- HERO SECTION ---------- */
const HeroSection = () => {
  const phrases = ["Surveys", "App Installs", "Playing Games", "Watching Videos"]
  const [current, setCurrent] = useState(0)
  const [text, setText] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      const phrase = phrases[current]
      setText((prev) => phrase.slice(0, prev.length + 1))
      i++
      if (i > phrase.length) {
        setTimeout(() => {
          setText("")
          setCurrent((prev) => (prev + 1) % phrases.length)
        }, 800)
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [current])

  return (
    <section className="relative min-h-[85vh] pt-20 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 text-gray-900 dark:text-gray-100">
        <motion.div initial="hidden" animate="visible" className="space-y-6">
          <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-extrabold leading-tight">
            Earn Real Money By
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {text}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Complete offers, play games, answer surveys and cash out instantly. Trusted by millions worldwide.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-emerald-500 px-7 py-3.5 rounded-xl font-semibold shadow-xl text-white cursor-pointer"
              >
                Start Earning Now <ArrowRight />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
