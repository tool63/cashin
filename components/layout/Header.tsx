"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

import DarkLightToggle from "@/components/switch/DarkLightToggle";
import LanguageSwitcher from "@/components/switch/LanguageSwitcher";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";

// ===============================
// 🧩 TYPES
// ===============================
interface HeaderProps {
  className?: string;
}

// ===============================
// 🚀 COMPONENT
// ===============================
export default function Header({ className }: HeaderProps) {
  // ------------------------------
  // STATE
  // ------------------------------
  const [mobileOpen, setMobileOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const [mobileEarnOpen, setMobileEarnOpen] = useState(false);

  // ------------------------------
  // SAFE CONTEXT (prevents crash)
  // ------------------------------
  let language = "en";
  let country = "us";

  try {
    const langCtx = useLanguage();
    const countryCtx = useCountry();

    language = langCtx?.language || "en";
    country = countryCtx?.country || "us";
  } catch (err) {
    console.error("Header context error:", err);
  }

  // ------------------------------
  // SAFE RTL FIX
  // ------------------------------
  const dir = ["ar", "he", "ur", "fa"].includes(language)
    ? "rtl"
    : "ltr";

  // ------------------------------
  // REFS
  // ------------------------------
  const headerRef = useRef<HTMLDivElement>(null);
  const earnDropdownRef = useRef<HTMLDivElement>(null);

  // ------------------------------
  // CONSTANTS
  // ------------------------------
  const borderColor = "border-gray-300 dark:border-gray-700";

  // ------------------------------
  // CLICK OUTSIDE
  // ------------------------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!headerRef.current) return;

      if (!headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
        setMobileEarnOpen(false);
      }

      if (
        earnDropdownRef.current &&
        !earnDropdownRef.current.contains(e.target as Node)
      ) {
        setEarnOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------------------
  // ESC KEY
  // ------------------------------
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setEarnOpen(false);
        setMobileEarnOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () =>
      document.removeEventListener("keydown", handleEscape);
  }, []);

  // ------------------------------
  // LOCK BODY SCROLL
  // ------------------------------
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // ------------------------------
  // EARN ITEMS
  // ------------------------------
  const earnItems = [
    { key: "surveys", label: "Surveys" },
    { key: "app-installs", label: "App Installs" },
    { key: "play-games", label: "Play Games" },
    { key: "watch-videos", label: "Watch Videos" },
    { key: "offerwall", label: "Offerwall" },
  ];

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-40 border-b ${borderColor} bg-bg-primary ${className || ""}`}
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between text-black dark:text-white">
        {/* LOGO */}
        <Link
          href={`/${country}`}
          className="bg-gradient-to-r from-yellow-400 to-green-500 text-2xl font-bold px-3 py-1 rounded-lg text-black hover:opacity-90 transition-opacity"
        >
          Cashog
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link href={`/${country}/how-it-works`}>
            How it works
          </Link>

          {/* DROPDOWN */}
          <div
            ref={earnDropdownRef}
            className="relative"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <button className="flex items-center gap-1">
              Earn
              <ChevronDown
                size={14}
                className={earnOpen ? "rotate-180" : ""}
              />
            </button>

            <AnimatePresence>
              {earnOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className={`absolute top-full ${
                    dir === "rtl" ? "right-0" : "left-0"
                  } mt-3 w-52 p-4 rounded-xl shadow-xl border ${borderColor} bg-white dark:bg-gray-900`}
                >
                  {earnItems.map((item) => (
                    <Link
                      key={item.key}
                      href={`/${country}/${item.key}`}
                      onClick={() => setEarnOpen(false)}
                      className="block py-1"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href={`/${country}/cashout`}>Cashout</Link>
          <Link href={`/${country}/blog`}>Blog</Link>
          <Link href={`/${country}/help`}>Help</Link>
        </nav>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <DarkLightToggle />

          <Link href={`/${country}/login`}>
            <button className={`px-4 py-2 border ${borderColor} rounded-lg`}>
              Login
            </button>
          </Link>

          <Link href={`/${country}/signup`}>
            <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-green-500 text-black">
              Sign up
            </button>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
