import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

import DarkLightToggle from "@/components/switch/DarkLightToggle";
import LanguageSwitcher from "@/components/switch/LanguageSwitcher";

import { useCountry } from "@/app/[country]/providers/CountryProvider";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useTranslation } from "react-i18next";  // Import the translation hook

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const [mobileEarnOpen, setMobileEarnOpen] = useState(false);

  // ===============================
  // 🌍 CONTEXTS
  // ===============================
  const { country } = useCountry();
  const { language } = useLanguage();
  const { t } = useTranslation(); // Access the translation function

  const headerRef = useRef<HTMLDivElement>(null);
  const borderColor = "border-gray-300 dark:border-gray-700";

  // ===============================
  // ❌ CLOSE ON OUTSIDE CLICK
  // ===============================
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

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-40 border-b ${borderColor} bg-bg-primary ${className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between text-black dark:text-white">

        {/* =========================
            LOGO
        ========================= */}
        <Link
          href={`/${country}`}
          className="bg-gradient-to-r from-yellow-400 to-green-500 text-2xl font-bold px-3 py-1 rounded-lg text-black"
          onClick={() => setMobileOpen(false)}
        >
          {t('logo')}
        </Link>

        {/* =========================
            DESKTOP NAV
        ========================= */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">

          <Link href={`/${country}/how-it-works`} className="hover:opacity-80">
            {t('how_it_works')}
          </Link>

          {/* =========================
              EARN DROPDOWN
          ========================= */}
          <div
            className="relative"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <button className="flex items-center gap-1">
              {t('earn')}
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
                  className={`absolute top-full left-0 mt-3 w-52 flex flex-col gap-2 p-4 rounded-xl shadow-xl border ${borderColor} bg-white dark:bg-gray-900`}
                >
                  <Link href={`/${country}/surveys`}>{t('surveys')}</Link>
                  <Link href={`/${country}/app-installs`}>{t('app_installs')}</Link>
                  <Link href={`/${country}/play-games`}>{t('play_games')}</Link>
                  <Link href={`/${country}/watch-videos`}>{t('watch_videos')}</Link>
                  <Link href={`/${country}/offerwall`}>{t('offerwall')}</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href={`/${country}/cashout`}>{t('cashout')}</Link>
          <Link href={`/${country}/blog`}>{t('blog')}</Link>
          <Link href={`/${country}/help`}>{t('help')}</Link>
        </nav>

        {/* =========================
            DESKTOP ACTIONS
        ========================= */}
        <div className="hidden md:flex items-center gap-4">

          <LanguageSwitcher />

          <DarkLightToggle />

          <Link href={`/${country}/login`}>
            <button className={`px-4 py-2 rounded-lg text-sm border ${borderColor}`}>
              {t('login')}
            </button>
          </Link>

          <Link href={`/${country}/signup`}>
            <button className="px-5 py-2 rounded-lg text-sm bg-gradient-to-r from-yellow-400 to-green-500 text-black font-medium">
              {t('signup')}
            </button>
          </Link>
        </div>

        {/* =========================
            MOBILE BUTTON
        ========================= */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* =========================
          MOBILE MENU
      ========================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className={`md:hidden w-full px-6 pt-4 pb-6 border-t ${borderColor} bg-white dark:bg-gray-900`}
          >
            <div className="flex flex-col gap-4">

              <Link
                href={`/${country}/how-it-works`}
                onClick={() => setMobileOpen(false)}
              >
                {t('how_it_works')}
              </Link>

              <button
                onClick={() => setMobileEarnOpen(!mobileEarnOpen)}
                className="flex items-center justify-between"
              >
                {t('earn')}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    mobileEarnOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileEarnOpen && (
                <div className="flex flex-col gap-3 pl-4 text-sm">
                  <Link href={`/${country}/surveys`} onClick={() => setMobileOpen(false)}>{t('surveys')}</Link>
                  <Link href={`/${country}/app-installs`} onClick={() => setMobileOpen(false)}>{t('app_installs')}</Link>
                  <Link href={`/${country}/play-games`} onClick={() => setMobileOpen(false)}>{t('play_games')}</Link>
                  <Link href={`/${country}/watch-videos`} onClick={() => setMobileOpen(false)}>{t('watch_videos')}</Link>
                  <Link href={`/${country}/offerwall`} onClick={() => setMobileOpen(false)}>{t('offerwall')}</Link>
                </div>
              )}

              <Link href={`/${country}/cashout`} onClick={() => setMobileOpen(false)}>{t('cashout')}</Link>
              <Link href={`/${country}/blog`} onClick={() => setMobileOpen(false)}>{t('blog')}</Link>
              <Link href={`/${country}/help`} onClick={() => setMobileOpen(false)}>{t('help')}</Link>

              <div className="flex items-center justify-between pt-4">
                <LanguageSwitcher />
                <DarkLightToggle />
              </div>

              <Link href={`/${country}/login`}>
                <button className={`border ${borderColor} py-2 rounded-lg w-full`}>
                  {t('login')}
                </button>
              </Link>

              <Link href={`/${country}/signup`}>
                <button className="bg-gradient-to-r from-yellow-400 to-green-500 py-2 rounded-lg w-full text-black font-medium">
                  {t('signup')}
                </button>
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
