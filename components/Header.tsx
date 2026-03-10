"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/switch/LanguageSwitcher";
import DarkLightToggle from "@/components/switch/DarkLightToggle";
import { useTheme } from "next-themes"; // optional if using next-themes

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const [mobileEarnOpen, setMobileEarnOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<"none" | "signup" | "login">("none");

  const headerRef = useRef<HTMLDivElement>(null);
  const ctaGradient = "bg-gradient-to-r from-yellow-400 to-green-500 text-black";

  // Optional: get current theme
  const { theme } = useTheme();

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

  // Backgrounds: use gradient similar to Background.tsx
  // For "opposite" effect: dark mode header gets light gradient, light mode header gets dark gradient
  const headerGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
      : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900";

  const menuGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
      : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900";

  const textColor = theme === "dark" ? "text-black" : "text-white"; // adaptive text
  const borderColor = theme === "dark" ? "border-gray-300" : "border-gray-700";

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-30 transition-colors duration-300 border-b ${borderColor} ${headerGradient} ${className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className={`${ctaGradient} text-2xl font-bold px-3 py-1 rounded-lg`}>
          Cashog
        </Link>

        {/* DESKTOP NAV */}
        <nav className={`hidden md:flex items-center gap-6 text-sm font-medium ${textColor}`}>
          <Link href="/how-it-works" className="hover:opacity-80 transition">How it works</Link>

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
                  className={`absolute top-full left-0 mt-2 w-48 flex flex-col gap-1 p-3 rounded-xl shadow-xl border ${borderColor} ${menuGradient}`}
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

          <Link href="/cashout" className="hover:opacity-80 transition">Cashout</Link>
          <Link href="/blog" className="hover:opacity-80 transition">Blog</Link>
          <Link href="/help" className="hover:opacity-80 transition">Help</Link>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className={`hidden md:flex items-center gap-4 ${textColor}`}>
          <LanguageSwitcher />
          <DarkLightToggle />

          <Link href="/?auth=login">
            <button
              onClick={() => setActiveButton("login")}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeButton === "login" ? ctaGradient : `border ${borderColor}`
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
                  : `border ${borderColor}`
              }`}
            >
              Sign up
            </button>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button className={`${textColor} md:hidden`} onClick={() => setMobileOpen(!mobileOpen)}>
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
            className={`md:hidden w-full px-6 pt-0 pb-6 space-y-4 border-t ${borderColor} shadow-xl ${menuGradient} ${textColor}`}
          >
            <Link href="/how-it-works" className="hover:opacity-80 transition">How it works</Link>

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

            <div className="flex flex-col gap-3 pt-2">
              <Link href="/cashout" className="hover:opacity-80 transition">Cashout</Link>
              <Link href="/blog" className="hover:opacity-80 transition">Blog</Link>
              <Link href="/help" className="hover:opacity-80 transition">Help</Link>
            </div>

            <div className={`flex items-center justify-between pt-3 ${textColor}`}>
              <LanguageSwitcher />
              <DarkLightToggle />
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Link href="/login">
                <button className={`border ${borderColor} py-2 rounded-lg w-full ${textColor}`}>Login</button>
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
