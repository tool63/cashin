"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react"

type Toggle = Record<string, boolean>

export default function Footer() {
  const [open, setOpen] = useState<Toggle>({})
  const [sub, setSub] = useState<Toggle>({})
  const [sub2, setSub2] = useState<Toggle>({})

  const t = (k: string) => setOpen(p => ({ ...p, [k]: !p[k] }))
  const s = (k: string) => setSub(p => ({ ...p, [k]: !p[k] }))
  const s2 = (k: string) => setSub2(p => ({ ...p, [k]: !p[k] }))

  const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
      <Link href={href} className="block hover:text-white transition">
        {children}
      </Link>
    </motion.div>
  )

  const Section = ({
    id,
    title,
    children,
  }: {
    id: string
    title: string
    children: React.ReactNode
  }) => (
    <div>
      <button
        onClick={() => t(id)}
        className="w-full flex justify-between items-center text-white font-semibold mb-3"
      >
        {title}
        <span>{open[id] ? "−" : "+"}</span>
      </button>

      <AnimatePresence>
        {open[id] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-2 text-sm text-gray-400"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const Sub = ({
    id,
    title,
    children,
    level = 1,
  }: {
    id: string
    title: string
    children: React.ReactNode
    level?: number
  }) => (
    <div
      className="mt-2"
      style={{ paddingLeft: `${level * 8}px` }} // ✅ FIX (same look)
    >
      <button
        onClick={() => (level === 1 ? s(id) : s2(id))}
        className="w-full flex justify-between text-gray-300 font-medium"
      >
        {title}
        <span>{(level === 1 ? sub[id] : sub2[id]) ? "−" : "+"}</span>
      </button>

      <AnimatePresence>
        {(level === 1 ? sub[id] : sub2[id]) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 space-y-2 pl-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <footer className="bg-[#070A14] border-t border-white/10 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* COLUMN 1 */}
        <Section id="start" title="Get Started">
          <A href="/how-it-works">How Cashog Works</A>
          <A href="/start-earning">How to Start Earning</A>
          <A href="/cashout">Cashout Methods</A>
          <A href="/withdrawals">Withdrawal Proofs</A>
          <A href="/trust-safety">Trust & Safety</A>
        </Section>

        {/* COLUMN 2 */}
        <Section id="earn" title="Ways To Earn">
          <A href="/surveys">Surveys</A>
          <A href="/app-installs">App Installs</A>
          <A href="/play-games">Playing Games</A>
          <A href="/watch-videos">Watching Videos</A>
          <A href="/mining-rewards">Mining Rewards</A>
          <A href="/complete-offers">Completing Offers</A>
          <A href="/offerwall">Offerwall</A>
          <A href="/surveywall">Surveywall</A>

          <Sub id="extra" title="Extra Earning">
            <A href="/watch-ads">Watching Ads</A>
            <A href="/micro-tasks">Micro Tasks</A>
            <A href="/complete-free-trials">Free Trials</A>
            <A href="/test-products">Testing Products</A>
            <A href="/read-emails">Reading Emails</A>
            <A href="/visit-websites">Visiting Websites</A>
            <A href="/review-tasks">Review Tasks</A>
            <A href="/spinning-wheel">Spinning Wheel</A>
            <A href="/loyalty">Loyalty</A>
            <A href="/vouchers">Vouchers</A>
          </Sub>
        </Section>

        {/* COLUMN 3 */}
        <Section id="guides" title="Guides & Tips">
          <A href="/make-money-online">Make Money Online</A>
          <A href="/earn-money-from-home">Earn Money from Home</A>
          <A href="/earn-without-investment">Earn Without Investment</A>
          <A href="/get-paid-to-play-games">Get Paid to Play Games</A>
          <A href="/install-apps-for-cash">Install Apps for Cash</A>
          <A href="/watch-videos-for-money">Watch Videos for Money</A>
          <A href="/complete-offers-online">Complete Offers Online</A>
          <A href="/work-from-home-jobs">Work from Home Jobs</A>
          <A href="/online-earning-methods">Online Earning Methods</A>
          <A href="/earn-money-online-fast">Earn Money Online Fast</A>

          <Sub id="allGuides" title="All Guides">
            <A href="/passive-income-online">Passive Income Online</A>
            <A href="/online-jobs-for-beginners">Online Jobs for Beginners</A>
            <A href="/earn-money-as-a-student">Earn Money as a Student</A>
            <A href="/earn-money-without-skills">Earn Without Skills</A>
            <A href="/earn-money-using-mobile">Earn Using Mobile</A>
            <A href="/earn-money-online-worldwide">Earn Worldwide</A>
            <A href="/cashback-rewards">Cashback Rewards</A>
            <A href="/legit-ways-to-make-money-online">Legit Ways</A>
            <A href="/free-ways-to-make-money-online">Free Ways</A>
          </Sub>
        </Section>

        {/* COLUMN 4 */}
        <Section id="payments" title="Rewards & Payments">
          <A href="/earn-paypal-money">Earn PayPal Money</A>

          <Sub id="giftcards" title="Earn Gift Cards">
            <A href="/earn-amazon-gift-card">Amazon</A>
            <A href="/earn-apple-gift-card">Apple</A>
            <A href="/earn-google-play-gift-card">Google Play</A>
          </Sub>

          <Sub id="crypto" title="Earn Crypto">
            <A href="/earn-bitcoin-online">Bitcoin</A>
            <A href="/earn-litecoin-online">Litecoin</A>
            <A href="/earn-ethereum-online">Ethereum</A>
            <A href="/earn-dogecoin-online">Dogecoin</A>
          </Sub>

          <Sub id="gaming" title="Earn Gaming Gift Cards">
            <A href="/earn-free-robux">Robux</A>
            <A href="/earn-steam-gift-cards">Steam</A>
            <A href="/earn-xbox-gift-cards">Xbox</A>
            <A href="/earn-psn-gift-cards">PlayStation</A>
          </Sub>

          <A href="/earn-spotify-premium">Earn Spotify Premium</A>
        </Section>

        {/* COLUMN 5 */}
        <Section id="resources" title="Resources">
          <A href="/blog">Blog</A>
          <A href="/help">Help Center</A>
          <A href="/faq">FAQ</A>
          <A href="/contact">Contact Support</A>
          <A href="/about">About Cashooz</A>
        </Section>

        {/* COLUMN 6 */}
        <Section id="business" title="Business">
          <A href="/affiliate">Affiliate Program</A>
          <A href="/partners">Partners</A>
          <A href="/advertise">Advertise with Cashooz</A>
        </Section>

        {/* COLUMN 7 */}
        <Section id="cashback" title="Cashback & Deals">
          <A href="/cashback-offers">Cashback Offers</A>

          <Sub id="shopping" title="Shopping & Rewards">
            <A href="/shopping-rewards/electronics">Electronics Cashback</A>
            <A href="/shopping-rewards/fashion">Fashion Cashback</A>
            <A href="/shopping-rewards/home-garden">Home & Garden Cashback</A>
            <A href="/shopping-rewards/grocery">Grocery Cashback</A>
            <A href="/shopping-rewards/beauty">Beauty Cashback</A>
            <A href="/shopping-rewards/mobile">Mobile Cashback</A>

            <Sub id="travel" title="Travel Cashback" level={2}>
              <A href="/shopping-rewards/travel/hotels">Hotels</A>
              <A href="/shopping-rewards/travel/flights">Flights</A>
            </Sub>

            <A href="/shopping-rewards/finance">Finance Cashback</A>
          </Sub>

          <A href="/promo-codes">Promo Codes & Coupons</A>
          <A href="/daily-deals">Daily Deals</A>
          <A href="/banking-finance-offers">Banking & Finance Offers</A>
        </Section>

        {/* COLUMN 8 */}
        <Section id="legal" title="Legal">
          <A href="https://cashog.com/terms-and-conditions">Terms & Conditions</A>
          <A href="https://cashog.com/privacy-policy">Privacy Policy</A>
          <A href="https://cashog.com/cookie-policy">Cookie Policy</A>
        </Section>

      </div> {/* ✅ FIXED: grid closed */}

      {/* SOCIAL */}
      <div className="border-t border-white/10 py-6 flex justify-center gap-6">
        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <Twitter />
        </a>
        <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook />
        </a>
        <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram />
        </a>
        <a href="https://youtube.com/@yourchannel" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <Youtube />
        </a>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-gray-500 pb-6">
        © {new Date().getFullYear()} Cashog. All rights reserved.
      </div>
    </footer>
  )
}
