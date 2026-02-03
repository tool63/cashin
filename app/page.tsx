"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Wallet, Zap } from "lucide-react"
import Link from "next/link"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
}

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

  // ======= TYPING EFFECT =======
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
    <main className="transition-colors duration-300">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[85vh] pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 text-gray-900 dark:text-gray-100">
          {/* LEFT */}
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-extrabold leading-tight">
              Earn Real Money By
              <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {text}
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Complete offers, play games, answer surveys and cash out instantly.
              Trusted by millions worldwide.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link href="/signup">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-emerald-500 px-7 py-3.5 rounded-xl font-semibold shadow-xl text-white cursor-pointer">
                  Start Earning Now <ArrowRight />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT – LIVE EARNINGS */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
            <SectionTitle icon="💸" text="Live Earnings" />
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6 }}
              className="bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
              <div className="space-y-4">
                {["$2.45", "$6.10", "$12.00"].map((amt, i) => (
                  <div key={i} className="flex justify-between bg-black/10 dark:bg-white/5 rounded-lg px-5 py-3">
                    <span>User #{1200 + i}</span>
                    <span className="text-emerald-400 font-semibold">{amt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= TRUST / STATS ================= */}
      <section className="py-16 bg-black/5 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-center">
          <Stat title="Users Paid" value="3.2M+" />
          <Stat title="Total Payouts" value="$12M+" />
          <Stat title="Trust Rating" value="4.8 ★" />
        </div>
      </section>

      {/* ================= PAYMENT METHODS ================= */}
      <section className="py-16 bg-black/5 dark:bg-white/5">
        <SectionTitle icon="🏦" text="Payment Methods" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-300">
            <Badge>PayPal</Badge>
            <Badge>USDT</Badge>
            <Badge>Bitcoin</Badge>
            <Badge>Gift Cards</Badge>
            <Badge>Local Payouts</Badge>
          </div>
        </div>
      </section>

      {/* ================= LIVE OFFER COMPLETION ================= */}
      <section className="py-14 bg-black/5 dark:bg-white/5">
        <SectionTitle icon="🔥" text="Live Offer Completions" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            ["User #4821", "Completed Survey", "+$1.20"],
            ["User #1932", "Installed App", "+$3.50"],
            ["User #7720", "Played Game", "+$5.00"],
          ].map(([user, action, amount], i) => (
            <div key={i} className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 flex justify-between">
              <div>
                <p className="font-medium">{user}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{action}</p>
              </div>
              <span className="text-emerald-400 font-semibold">{amount}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= LIVE WITHDRAWALS ================= */}
      <section className="py-14">
        <SectionTitle icon="🏦" text="Live Withdrawals" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            ["User #6501", "PayPal", "$10.00"],
            ["User #2290", "USDT", "$25.00"],
            ["User #8842", "Gift Card", "$5.00"],
          ].map(([user, method, amount], i) => (
            <div key={i} className="bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 flex justify-between">
              <div>
                <p className="font-medium">{user}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Withdraw via {method}</p>
              </div>
              <span className="text-indigo-400 font-semibold">{amount}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OFFER CARDS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <SectionTitle icon="🎯" text="Earn Money Tasks" />
        {earningOptions.map(([icon, title, href]) => (
          <Link key={title} href={href} className="bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition">
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
          <Feature icon={<Zap />} title="Instant Withdrawals" />
          <Feature icon={<ShieldCheck />} title="Secure & Trusted" />
          <Feature icon={<Wallet />} title="Multiple Payment Options" />
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 bg-emerald-500 text-white text-center rounded-2xl mx-6 md:mx-20 lg:mx-40">
        <h2 className="text-4xl font-bold mb-6">
          Start Earning Real Money Today!
        </h2>
        <p className="mb-8 text-lg">
          Join millions of users who are already earning daily.
        </p>
        <Link href="/signup">
          <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-10 py-4 rounded-xl font-semibold shadow-lg cursor-pointer">
            Get Started Now <ArrowRight />
          </motion.span>
        </Link>
      </section>

    </main>
  )
}

/* ---------- SMALL COMPONENTS ---------- */

const SectionTitle = ({ icon, text }: { icon?: string; text: string }) => (
  <div className="text-center mb-8 relative">
    <h2 className="inline-flex items-center justify-center text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </h2>
    <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-[pulse_2s_ease-in-out_infinite]"></span>
  </div>
)

const Stat = ({ title, value }: any) => (
  <div className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl p-6">
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{title}</p>
  </div>
)

const Badge = ({ children }: any) => (
  <span className="px-4 py-2 rounded-full bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10">{children}</span>
)

const Feature = ({ icon, title }: any) => (
  <div className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-8 text-center">
    <div className="flex justify-center mb-4 text-indigo-400">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
  </div>
)
