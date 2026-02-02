"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [earnOpen, setEarnOpen] = useState(false)

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 bg-[#070A14]/90 dark:bg-gray-100/90 backdrop-blur border-b border-white/10 dark:border-gray-300/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-white dark:text-gray-900">
          Cashog
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300 dark:text-gray-900">
          <Link href="/how-it-works" className="hover:text-white dark:hover:text-gray-700 transition">
            How it Works
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-white dark:hover:text-gray-700 transition">
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
                  className="absolute top-8 left-0 bg-[#0B1020] dark:bg-gray-200 border border-white/10 dark:border-gray-300 rounded-lg shadow-xl p-4 w-56 grid grid-cols-2 gap-2"
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

        {/* CTA BUTTONS */}
        <div className="hidden md:flex items-center gap-3">

  {/* THEME TOGGLE FIRST */}
  <button
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className="p-2 rounded-lg border border-white/20 dark:border-gray-700 hover:bg-white/10 dark:hover:bg-gray-300/20 transition"
    aria-label="Toggle Theme"
  >
    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
  </button>

  {/* LOGIN */}
  <Link
    href="/login"
    className="px-4 py-2 text-sm text-white dark:text-gray-900 hover:text-gray-200 dark:hover:text-gray-700 transition"
  >
    Login
  </Link>

  {/* SIGN UP */}
  <Link
    href="/register"
    className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition"
  >
    Sign Up
  </Link>
</div>


        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white dark:text-gray-900"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
