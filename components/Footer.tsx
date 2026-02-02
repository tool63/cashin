"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react"

type LinkItem = {
  label: string
  href?: string
  children?: LinkItem[]
}

type Section = {
  title: string
  items: LinkItem[]
}

export default function Footer() {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (key: string) =>
    setOpen(open === key ? null : key)

  const sections: Section[] = [
    {
      title: "Get Started",
      items: [
        { label: "How Cashog Works", href: "/how-it-works" },
        { label: "How to Start Earning", href: "/start-earning" },
        { label: "Cashout Methods", href: "/cashout" },
        { label: "Withdrawal Proofs", href: "/withdrawals" },
        { label: "Trust & Safety", href: "/trust-safety" },
      ],
    },
    {
      title: "Ways To Earn",
      items: [
        { label: "Surveys", href: "/surveys" },
        { label: "App Installs", href: "/app-installs" },
        { label: "Playing Games", href: "/play-games" },
        {
          label: "Extra Earning",
          children: [
            { label: "Watching Ads", href: "/watch-ads" },
            { label: "Micro Tasks", href: "/micro-tasks" },
            { label: "Free Trials", href: "/complete-free-trials" },
            { label: "Spinning Wheel", href: "/spinning-wheel" },
          ],
        },
      ],
    },
    {
      title: "Guides & Tips",
      items: [
        { label: "Make Money Online", href: "/make-money-online" },
        { label: "Earn from Home", href: "/earn-money-from-home" },
        {
          label: "All Guides",
          children: [
            {
              label: "Passive Income Online",
              href: "/passive-income-online",
            },
            {
              label: "Earn as a Student",
              href: "/earn-money-as-a-student",
            },
          ],
        },
      ],
    },
    {
      title: "Rewards & Payments",
      items: [
        { label: "Earn PayPal Money", href: "/earn-paypal-money" },
        {
          label: "Earn Crypto",
          children: [
            { label: "Bitcoin", href: "/earn-bitcoin-online" },
            { label: "Ethereum", href: "/earn-ethereum-online" },
          ],
        },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Blog", href: "/blog" },
        { label: "Help Center", href: "/help" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact Support", href: "/contact" },
      ],
    },
    {
      title: "Business",
      items: [
        { label: "Affiliate Program", href: "/affiliate" },
        { label: "Partners", href: "/partners" },
        { label: "Advertise with Cashooz", href: "/advertise" },
      ],
    },
    {
      title: "Cashback & Deals",
      items: [
        { label: "Cashback Offers", href: "/cashback-offers" },
        { label: "Shopping Rewards", href: "/shopping-rewards" },
        { label: "Promo Codes", href: "/promo-codes" },
      ],
    },
    {
      title: "Legal",
      items: [
        {
          label: "Terms & Conditions",
          href: "https://cashog.com/terms-and-conditions",
        },
        {
          label: "Privacy Policy",
          href: "https://cashog.com/privacy-policy",
        },
        {
          label: "Cookie Policy",
          href: "https://cashog.com/cookie-policy",
        },
      ],
    },
  ]

  return (
    <footer className="bg-[#060914] border-t border-white/10 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {sections.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggle(section.title)}
              className="flex items-center justify-between w-full text-white font-semibold mb-4"
            >
              {section.title}
              <span>{open === section.title ? "−" : "+"}</span>
            </button>

            <AnimatePresence>
              {open === section.title && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2 text-sm overflow-hidden"
                >
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="hover:text-white transition"
                      >
                        {item.label}
                      </a>

                      {item.children && (
                        <ul className="ml-4 mt-2 space-y-1 text-gray-400">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                className="hover:text-white"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* SOCIAL */}
      <div className="border-t border-white/10 py-6">
        <div className="flex justify-center gap-6 text-gray-400">
          <Facebook className="hover:text-white cursor-pointer" />
          <Twitter className="hover:text-white cursor-pointer" />
          <Youtube className="hover:text-white cursor-pointer" />
          <Instagram className="hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-gray-500 pb-6">
        © {new Date().getFullYear()} Cashog. All rights reserved.
      </div>
    </footer>
  )
}
