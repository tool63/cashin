"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/switch/LanguageSwitcher";
import DarkLightToggle from "@/components/switch/DarkLightToggle";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const [mobileEarnOpen, setMobileEarnOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<"none" | "signup" | "login">("none");

  const headerRef = useRef<HTMLDivElement>(null);
  const ctaGradient = "bg-gradient-to-r from-yellow-400 to-green-500 text-black";

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
        setEarnOpen(false);
        setMobileEarnOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className={`${ctaGradient} text-2xl font-bold px-3 py-1 rounded-lg`}
        >
          Cashog
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-primary">
          <Link href="/how-it-works">How it works</Link>

          {/* EARN DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <button className="flex items-center gap-1">
              Earn
              <ChevronDown size={14} className={`transition ${earnOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {earnOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="
                    absolute top-full left-0 mt-2 w-48
                    flex flex-col gap-1 p-3 rounded-xl
                    border border-gray-200 dark:border-white/10
                    shadow-xl
                  "
                >
                  <Link href="/surveys" className="hover:opacity-80 transition">Surveys</Link>
                  <Link href="/app-installs" className="hover:opacity-80 transition">App Installs</Link>
                  <Link href="/play-games" className="hover:opacity-80 transition">Play Games</Link>
                  <Link href="/watch-videos" className="hover:opacity-80 transition">Watch Videos</Link>
                  <Link href="/offerwall" className="hover:opacity-80 transition">Offerwall</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/cashout">Cashout</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/help">Help</Link>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <DarkLightToggle />

          <Link href="/?auth=login">
            <button
              onClick={() => setActiveButton("login")}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeButton === "login" ? ctaGradient : "border text-primary"
              }`}
            >
              Login
            </button>
          </Link>

          <Link href="/?auth=signup">
            <button
              onClick={() => setActiveButton("signup")}
              className={`px-5 py-2 rounded-lg text-sm transition ${
                activeButton === "signup" || activeButton === "none"
                  ? ctaGradient
                  : "border border-gray-300 text-black dark:text-white"
              }`}
            >
              Sign up
            </button>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button className="md:hidden text-primary" onClick={() => setMobileOpen(!mobileOpen)}>
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
            className="md:hidden px-6 py-6 space-y-4 border-t border-gray-200 dark:border-white/10 shadow-xl relative z-50"
          >
            <Link href="/how-it-works" className="block hover:opacity-80 transition">How it works</Link>

            {/* MOBILE EARN */}
            <button
              onClick={() => setMobileEarnOpen(!mobileEarnOpen)}
              className="flex w-full items-center justify-between font-medium"
            >
              Earn
              <ChevronDown size={16} className={`transition ${mobileEarnOpen ? "rotate-180" : ""}`} />
            </button>

            {mobileEarnOpen && (
              <div className="flex flex-col gap-3 pl-4 text-sm">
                <Link href="/surveys" className="hover:opacity-80 transition">Surveys</Link>
                <Link href="/app-installs" className="hover:opacity-80 transition">App Installs</Link>
                <Link href="/play-games" className="hover:opacity-80 transition">Play Games</Link>
                <Link href="/watch-videos" className="hover:opacity-80 transition">Watch Videos</Link>
                <Link href="/offerwall" className="hover:opacity-80 transition">Offerwall</Link>
              </div>
            )}

            {/* MOBILE LINKS */}
            <div className="flex flex-col gap-3 pt-2">
              <Link href="/cashout" className="hover:opacity-80 transition">Cashout</Link>
              <Link href="/blog" className="hover:opacity-80 transition">Blog</Link>
              <Link href="/help" className="hover:opacity-80 transition">Help</Link>
            </div>

            {/* SWITCHES */}
            <div className="flex items-center justify-between pt-3">
              <LanguageSwitcher />
              <DarkLightToggle />
            </div>

            {/* MOBILE ACTIONS */}
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/login">
                <button className="border border-gray-300 py-2 rounded-lg w-full">Login</button>
              </Link>

              <Link href="/signup">
                <button className={`${ctaGradient} py-2 rounded-lg w-full text-black`}>Sign up</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
