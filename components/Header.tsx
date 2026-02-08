"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/switch/LanguageSwitcher";
import DarkLightToggle from "@/components/switch/DarkLightToggle";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const [mobileEarnOpen, setMobileEarnOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b bg-white/90 dark:bg-[#070A14]/90 border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-start justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          Cashog
        </Link>

        {/* DESKTOP COLUMN MENU */}
        <nav className="hidden md:flex flex-col gap-3 text-sm font-medium">
          <Link href="/how-it-works">How it works</Link>

          {/* EARN */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setEarnOpen(!earnOpen)}
              className="flex items-center gap-1 font-medium"
            >
              Earn
              <ChevronDown
                size={14}
                className={`transition ${
                  earnOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {earnOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex flex-col gap-2 pl-4"
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

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex flex-col gap-3 items-end">
          <LanguageSwitcher />
          <DarkLightToggle />

          <Link href="/login" className="text-sm font-medium">
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
          >
            Sign up
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU (UNCHANGED STRUCTURE) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-6 py-6 space-y-4 border-t bg-white dark:bg-[#070A14] border-gray-200 dark:border-white/10"
          >
            <Link href="/how-it-works">How it works</Link>

            {/* MOBILE EARN */}
            <button
              onClick={() => setMobileEarnOpen(!mobileEarnOpen)}
              className="flex w-full items-center justify-between font-medium"
            >
              Earn
              <ChevronDown
                size={16}
                className={`transition ${
                  mobileEarnOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileEarnOpen && (
              <div className="flex flex-col gap-3 pl-4 text-sm">
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

            {/* MOBILE SWITCHES */}
            <div className="flex items-center justify-between pt-3">
              <LanguageSwitcher />
              <DarkLightToggle />
            </div>

            {/* MOBILE CTA */}
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/login"
                className="text-center py-2 border rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-center py-2 rounded-lg bg-indigo-600 text-white"
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
