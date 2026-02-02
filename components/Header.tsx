"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [earnOpen, setEarnOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#070A14]/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-white">
          Cashog
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link href="/how-it-works" className="hover:text-white transition">
            How it Works
          </Link>

          {/* DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-white transition">
              Earn
              <ChevronDown size={14} />
            </button>

            <AnimatePresence>
              {earnOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-8 left-0 bg-[#0B1020] border border-white/10 rounded-lg shadow-xl p-4 w-56"
                >
                  <Link href="/surveys" className="dropdown-link">Surveys</Link>
                  <Link href="/app-installs" className="dropdown-link">App Installs</Link>
                  <Link href="/play-games" className="dropdown-link">Play Games</Link>
                  <Link href="/watch-videos" className="dropdown-link">Watch Videos</Link>
                  <Link href="/offerwall" className="dropdown-link">Offerwall</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/cashout" className="hover:text-white transition">
            Cashout
          </Link>

          <Link href="/blog" className="hover:text-white transition">
            Blog
          </Link>

          <Link href="/help" className="hover:text-white transition">
            Help
          </Link>
        </nav>

        {/* CTA BUTTONS */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm text-white hover:text-gray-200 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#070A14] border-t border-white/10 px-6 py-6 space-y-4 text-gray-300"
          >
            <Link href="/how-it-works" className="block">How it Works</Link>
            <Link href="/surveys" className="block">Surveys</Link>
            <Link href="/app-installs" className="block">App Installs</Link>
            <Link href="/play-games" className="block">Play Games</Link>
            <Link href="/watch-videos" className="block">Watch Videos</Link>
            <Link href="/offerwall" className="block">Offerwall</Link>
            <Link href="/cashout" className="block">Cashout</Link>
            <Link href="/blog" className="block">Blog</Link>
            <Link href="/help" className="block">Help</Link>

            <div className="pt-4 border-t border-white/10 flex gap-3">
              <Link href="/login" className="flex-1 text-center py-2 border border-white/20 rounded-lg">
                Login
              </Link>
              <Link href="/register" className="flex-1 text-center py-2 bg-indigo-600 rounded-lg text-white">
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
