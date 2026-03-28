"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

import DarkLightToggle from "@/components/switch/DarkLightToggle";
import LanguageSwitcher from "@/components/switch/LanguageSwitcher";

import { useCountry } from "@/app/[country]/providers/CountryProvider";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const [mobileEarnOpen, setMobileEarnOpen] = useState(false);

  const { country } = useCountry();
  const { getTranslation } = useLanguage();

  const t = (key: string, fallback: string): string => {
    return getTranslation("header", key, fallback);
  };

  const headerRef = useRef<HTMLDivElement>(null);
  const borderColor = "border-gray-300 dark:border-gray-700";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!headerRef.current) return;

      if (!headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
        setEarnOpen(false);
        setMobileEarnOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ SAME GRADIENT AS FOOTER
  const gradientBg = `
    bg-gradient-to-br from-yellow-400/20 via-green-400/30 to-green-500/20
    dark:from-yellow-500/10 dark:via-green-700/20 dark:to-green-800/20
  `;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-40 border-b ${borderColor} ${gradientBg} backdrop-blur-md ${className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between text-black dark:text-white">

        {/* LOGO */}
        <Link
          href={`/${country}`}
          className="bg-gradient-to-r from-yellow-400 to-green-500 text-2xl font-bold px-3 py-1 rounded-lg text-black"
          onClick={() => setMobileOpen(false)}
        >
          Cashog
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">

          <Link href={`/${country}/how-it-works`} className="hover:opacity-80">
            {t("how_it_works", "How it works")}
          </Link>

          {/* EARN DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <button className="flex items-center gap-1">
              {t("earn", "Earn")}
              <ChevronDown
                size={14}
                className={`transition-transform ${earnOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {earnOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className={`absolute top-full left-0 mt-3 w-52 flex flex-col gap-2 p-4 rounded-xl shadow-xl border ${borderColor} ${gradientBg} backdrop-blur-md`}
                >
                  <Link href={`/${country}/surveys`}>{t("surveys", "Surveys")}</Link>
                  <Link href={`/${country}/app-installs`}>{t("app_installs", "App Installs")}</Link>
                  <Link href={`/${country}/play-games`}>{t("play_games", "Play Games")}</Link>
                  <Link href={`/${country}/watch-videos`}>{t("watch_videos", "Watch Videos")}</Link>
                  <Link href={`/${country}/offerwall`}>{t("offerwall", "Offerwall")}</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href={`/${country}/cashout`}>{t("cashout", "Cashout")}</Link>
          <Link href={`/${country}/blog`}>{t("blog", "Blog")}</Link>
          <Link href={`/${country}/help`}>{t("help", "Help")}</Link>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <DarkLightToggle />

          <Link href={`/${country}/login`}>
            <button className={`px-4 py-2 rounded-lg text-sm border ${borderColor}`}>
              {t("login", "Login")}
            </button>
          </Link>

          <Link href={`/${country}/signup`}>
            <button className="px-5 py-2 rounded-lg text-sm bg-gradient-to-r from-yellow-400 to-green-500 text-black font-medium">
              {t("signup", "Sign up")}
            </button>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className={`md:hidden w-full px-6 pt-4 pb-6 border-t ${borderColor} ${gradientBg} backdrop-blur-md`}
          >
            <div className="flex flex-col gap-4">

              <Link href={`/${country}/how-it-works`} onClick={() => setMobileOpen(false)}>
                {t("how_it_works", "How it works")}
              </Link>

              <button
                onClick={() => setMobileEarnOpen(!mobileEarnOpen)}
                className="flex items-center justify-between"
              >
                {t("earn", "Earn")}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    mobileEarnOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileEarnOpen && (
                <div className="flex flex-col gap-3 pl-4 text-sm">
                  <Link href={`/${country}/surveys`} onClick={() => setMobileOpen(false)}>Surveys</Link>
                  <Link href={`/${country}/app-installs`} onClick={() => setMobileOpen(false)}>App Installs</Link>
                  <Link href={`/${country}/play-games`} onClick={() => setMobileOpen(false)}>Play Games</Link>
                  <Link href={`/${country}/watch-videos`} onClick={() => setMobileOpen(false)}>Watch Videos</Link>
                  <Link href={`/${country}/offerwall`} onClick={() => setMobileOpen(false)}>Offerwall</Link>
                </div>
              )}

              <Link href={`/${country}/cashout`} onClick={() => setMobileOpen(false)}>Cashout</Link>
              <Link href={`/${country}/blog`} onClick={() => setMobileOpen(false)}>Blog</Link>
              <Link href={`/${country}/help`} onClick={() => setMobileOpen(false)}>Help</Link>

              <div className="flex items-center justify-between pt-4">
                <LanguageSwitcher />
                <DarkLightToggle />
              </div>

              <Link href={`/${country}/login`}>
                <button className={`border ${borderColor} py-2 rounded-lg w-full`}>
                  {t("login", "Login")}
                </button>
              </Link>

              <Link href={`/${country}/signup`}>
                <button className="bg-gradient-to-r from-yellow-400 to-green-500 py-2 rounded-lg w-full text-black font-medium">
                  {t("signup", "Sign up")}
                </button>
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
