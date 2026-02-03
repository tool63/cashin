"use client"

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

  return (
    <main className="transition-colors duration-300">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[85vh] pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 text-gray-900 dark:text-gray-100">
          {/* LEFT */}
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-extrabold leading-tight">
              Earn Real Money
              <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Playing Games & Apps
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Complete offers, play games, answer surveys and cash out instantly.
              Trusted by millions worldwide.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link href="/signup">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 px-7 py-3.5 rounded-xl font-semibold shadow-xl text-white cursor-pointer">
                  Start Earning Now <ArrowRight />
                </motion.span>
              </Link>

              <Link href="/how-it-works">
                <motion.span whileHover={{ scale: 1.04 }}
                  className="inline-flex items-center px-7 py-3.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer">
                  How It Works
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT – LIVE EARNINGS */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6 }}
              className="bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Live Earnings</p>
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

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <Step number="1" title="Sign Up" desc="Create your free account in seconds." />
            <Step number="2" title="Complete Tasks" desc="Play games, answer surveys or install apps." />
            <Step number="3" title="Cash Out" desc="Withdraw instantly via PayPal, crypto or gift cards." />
          </div>
        </div>
      </section>

      {/* ================= PAYMENT METHODS ================= */}
      <section className="py-16 bg-black/5 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-8">Payment Methods</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-300">
            <Badge>PayPal</Badge>
            <Badge>USDT</Badge>
            <Badge>Bitcoin</Badge>
            <Badge>Gift Cards</Badge>
            <Badge>Local Payouts</Badge>
          </div>
        </div>
      </section>

      {/* ================= OFFER CARDS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {earningOptions.map(([icon, title, href]) => (
          <Link key={title} href={href}
            className="bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition">
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
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <Feature icon={<Zap />} title="Instant Withdrawals" />
          <Feature icon={<ShieldCheck />} title="Secure & Trusted" />
          <Feature icon={<Wallet />} title="Multiple Payment Options" />
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">What Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial text="Withdrew in under 2 minutes. Legit site!" />
            <Testimonial text="Best rewards platform I’ve used so far." />
            <Testimonial text="Perfect for daily side income." />
          </div>
        </div>
      </section>

    </main>
  )
}

/* ---------- SMALL COMPONENTS ---------- */

const Stat = ({ title, value }: any) => (
  <div className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl p-6">
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{title}</p>
  </div>
)

const Step = ({ number, title, desc }: any) => (
  <div className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-8">
    <span className="text-indigo-400 font-bold text-xl">Step {number}</span>
    <h3 className="text-xl font-semibold mt-3">{title}</h3>
    <p className="mt-2 text-gray-600 dark:text-gray-400">{desc}</p>
  </div>
)

const Badge = ({ children }: any) => (
  <span className="px-4 py-2 rounded-full bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10">
    {children}
  </span>
)

const Feature = ({ icon, title }: any) => (
  <div className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl p-8 text-center">
    <div className="flex justify-center mb-4 text-indigo-400">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
  </div>
)

const Testimonial = ({ text }: any) => (
  <div className="bg-white/10 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl p-6 text-sm text-gray-600 dark:text-gray-300">
    “{text}”
  </div>
)
