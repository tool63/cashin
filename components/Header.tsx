"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [earnOpen, setEarnOpen] = useState(false)
  const [mobileEarnOpen, setMobileEarnOpen] = useState(false)

  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === "dark" : true

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur border-b transition-colors duration-300
        ${isDark
          ? "bg-[#070A14]/90 border-white/10 text-white"
          : "bg-gray-100/90 border-gray-300/10 text-gray-900"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold">
          Cashog
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/how-it-works" className="hover:opacity-80">
            How it Works
          </Link>

          {/* DESKTOP EARN DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <button className="flex items-center gap-1 hover:opacity-80">
              Earn <ChevronDown size={14} />
            </button>

            <AnimatePresence>
              {earnOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-8 left-0 rounded-lg shadow-xl p-4 w-56 grid grid-cols-2 gap-2
                    ${isDark
                      ? "bg-[#0B1020] border border-white/10"
                      : "bg-gray-200 border border-gray-300"
                    }`}
                >
                  <Link href="/surveys">Surveys</Link>
                  <Link href="/app-installs">App Installs</Link>
                  <Link href="/play-games">Play Games</Link>
                  <Link href="/watch-videos">Watch Videos</Link>
                  <Link href="/offerwall">Offerwall</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/cashout">Cashout</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/help">Help</Link>
        </nav>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-2 rounded-lg border
              ${isDark
                ? "border-white/20 hover:bg-white/10"
                : "border-gray-700 hover:bg-gray-300/20"
              }`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link href="/login" className="px-4 py-2 text-sm hover:opacity-80">
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden px-6 py-6 space-y-4 border-t
              ${isDark
                ? "bg-[#070A14] border-white/10"
                : "bg-white border-gray-200"
              }`}
          >
            <Link href="/how-it-works" onClick={() => setMobileOpen(false)}>
              How it Works
            </Link>

            {/* MOBILE EARN ACCORDION */}
            <button
              onClick={() => setMobileEarnOpen(!mobileEarnOpen)}
              className="flex items-center justify-between w-full"
            >
              Earn
              <ChevronDown
                size={16}
                className={`${mobileEarnOpen ? "rotate-180" : ""} transition`}
              />
            </button>

            {mobileEarnOpen && (
              <div className="pl-4 space-y-2 text-sm">
                <Link href="/surveys">Surveys</Link>
                <Link href="/app-installs">App Installs</Link>
                <Link href="/play-games">Play Games</Link>
                <Link href="/watch-videos">Watch Videos</Link>
                <Link href="/offerwall">Offerwall</Link>
              </div>
            )}

            <Link href="/cashout">Cashout</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/help">Help</Link>

            <div className="pt-4 flex gap-3">
              <Link href="/login" className="flex-1 text-center py-2 border rounded-lg">
                Login
              </Link>
              <Link
                href="/register"
                className="flex-1 text-center py-2 rounded-lg bg-indigo-600 text-white"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
