"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

import DarkLightToggle from "@/components/switch/DarkLightToggle";
import LanguageSwitcher from "@/components/switch/LanguageSwitcher";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);

  // ✅ SAFE CONTEXT
  let language = "en";
  let country = "us";

  try {
    const langCtx = useLanguage();
    const countryCtx = useCountry();

    language = langCtx?.language || "en";
    country = countryCtx?.country || "us";
  } catch {}

  const dir = ["ar", "he", "ur", "fa"].includes(language)
    ? "rtl"
    : "ltr";

  const earnItems = [
    { key: "surveys", label: "Surveys" },
    { key: "app-installs", label: "App Installs" },
    { key: "play-games", label: "Play Games" },
    { key: "watch-videos", label: "Watch Videos" },
    { key: "offerwall", label: "Offerwall" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 border-b bg-bg-primary ${className || ""}`}
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          href={`/${country}`}
          className="font-bold text-xl"
        >
          Cashog
        </Link>

        {/* DESKTOP */}
        <nav className="hidden md:flex gap-6">
          <Link href={`/${country}/how-it-works`}>How it works</Link>

          {/* EARN */}
          <div className="relative">
            <button onClick={() => setEarnOpen(!earnOpen)}>
              Earn <ChevronDown size={14} />
            </button>

            <AnimatePresence>
              {earnOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bg-white dark:bg-gray-900 p-3 rounded shadow"
                >
                  {earnItems.map((item) => (
                    <Link
                      key={item.key}
                      href={`/${country}/${item.key}`}
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
        <div className="hidden md:flex gap-3">
          <LanguageSwitcher />
          <DarkLightToggle />

          <Link href={`/${country}/login`}>Login</Link>
          <Link href={`/${country}/signup`}>Signup</Link>
        </div>

        {/* MOBILE */}
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
