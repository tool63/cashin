"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useLang } from "@/app/providers/LanguageProvider";
import LanguageSwitcher from "@/components/toggle/LanguageSwitcher";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const [mobileEarnOpen, setMobileEarnOpen] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLang();

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur transition-colors duration-300 border-b
        ${
          isDark
            ? "bg-[#070A14]/90 border-white/10 text-white"
            : "bg-white/90 border-gray-200 text-gray-900"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          Cashog
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/how-it-works">{t("header.howItWorks")}</Link>

          {/* EARN DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <button className="flex items-center gap-1">
              {t("header.earn")}
              <ChevronDown size={14} />
            </button>

            <AnimatePresence>
              {earnOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className={`absolute top-8 left-0 w-56 p-4 rounded-xl shadow-xl grid grid-cols-2 gap-3
                    ${
                      isDark
                        ? "bg-[#0B1020] border border-white/10"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                >
                  <Link href="/surveys">{t("header.earnOptions.surveys")}</Link>
                  <Link href="/app-installs">
                    {t("header.earnOptions.appInstalls")}
                  </Link>
                  <Link href="/play-games">
                    {t("header.earnOptions.playGames")}
                  </Link>
                  <Link href="/watch-videos">
                    {t("header.earnOptions.watchVideos")}
                  </Link>
                  <Link href="/offerwall">
                    {t("header.earnOptions.offerwall")}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/cashout">{t("header.cashout")}</Link>
          <Link href="/blog">{t("header.blog")}</Link>
          <Link href="/help">{t("header.help")}</Link>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-2 rounded-lg border transition
              ${isDark ? "border-white/20" : "border-gray-300"}`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link href="/login" className="text-sm font-medium">
            {t("header.login")}
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
          >
            {t("header.signUp")}
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
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
            className={`md:hidden px-6 py-6 space-y-4 border-t
              ${
                isDark
                  ? "bg-[#070A14] border-white/10"
                  : "bg-white border-gray-200"
              }`}
          >
            <Link href="/how-it-works" className="block">
              {t("header.howItWorks")}
            </Link>

            {/* MOBILE EARN */}
            <button
              onClick={() => setMobileEarnOpen(!mobileEarnOpen)}
              className="flex w-full items-center justify-between font-medium"
            >
              {t("header.earn")}
              <ChevronDown
                size={16}
                className={`transition ${
                  mobileEarnOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileEarnOpen && (
              <div className="flex flex-col gap-3 pl-4 text-sm">
                <Link href="/surveys">
                  {t("header.earnOptions.surveys")}
                </Link>
                <Link href="/app-installs">
                  {t("header.earnOptions.appInstalls")}
                </Link>
                <Link href="/play-games">
                  {t("header.earnOptions.playGames")}
                </Link>
                <Link href="/watch-videos">
                  {t("header.earnOptions.watchVideos")}
                </Link>
                <Link href="/offerwall">
                  {t("header.earnOptions.offerwall")}
                </Link>
              </div>
            )}

            <Link href="/cashout">{t("header.cashout")}</Link>
            <Link href="/blog">{t("header.blog")}</Link>
            <Link href="/help">{t("header.help")}</Link>

            {/* MOBILE SETTINGS */}
            <div className="flex items-center justify-between pt-3">
              <LanguageSwitcher />
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`flex items-center gap-2 p-3 rounded-lg border
                  ${isDark ? "border-white/20" : "border-gray-300"}`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                {isDark
                  ? t("header.lightMode")
                  : t("header.darkMode")}
              </button>
            </div>

            {/* MOBILE CTA */}
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/login"
                className="text-center py-2 border rounded-lg"
              >
                {t("header.login")}
              </Link>
              <Link
                href="/register"
                className="text-center py-2 rounded-lg bg-indigo-600 text-white"
              >
                {t("header.signUp")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
