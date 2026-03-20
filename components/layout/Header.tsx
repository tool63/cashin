"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

import DarkLightToggle from "@/components/switch/DarkLightToggle";
import LanguageSwitcher from "@/components/switch/LanguageSwitcher";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import { getTextDirection } from "@/app/core/i18n/config";

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
  // CONTEXT
  // ------------------------------
  const { language } = useLanguage();
  const { country } = useCountry();
  const isRtl = getTextDirection(language);

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
  // LOCK BODY SCROLL (MOBILE)
  // ------------------------------
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // ------------------------------
  // FORMAT EARN ITEMS
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
      dir={isRtl ? "rtl" : "ltr"}
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
          <Link 
            href={`/${country}/how-it-works`} 
            className="hover:opacity-80 transition-opacity"
          >
            How it works
          </Link>

          {/* EARN DROPDOWN */}
          <div
            ref={earnDropdownRef}
            className="relative"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              Earn
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${earnOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {earnOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className={`absolute top-full ${
                    isRtl ? "right-0" : "left-0"
                  } mt-3 w-52 flex flex-col gap-2 p-4 rounded-xl shadow-xl border ${borderColor} bg-white dark:bg-gray-900`}
                >
                  {earnItems.map((item) => (
                    <Link
                      key={item.key}
                      href={`/${country}/${item.key}`}
                      className="hover:opacity-80 py-1 transition-opacity"
                      onClick={() => setEarnOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href={`/${country}/cashout`} 
            className="hover:opacity-80 transition-opacity"
          >
            Cashout
          </Link>
          <Link 
            href={`/${country}/blog`} 
            className="hover:opacity-80 transition-opacity"
          >
            Blog
          </Link>
          <Link 
            href={`/${country}/help`} 
            className="hover:opacity-80 transition-opacity"
          >
            Help
          </Link>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <DarkLightToggle />

          <Link href={`/${country}/login`}>
            <button className={`px-4 py-2 rounded-lg border ${borderColor} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}>
              Login
            </button>
          </Link>

          <Link href={`/${country}/signup`}>
            <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-green-500 text-black font-medium hover:opacity-90 transition-opacity">
              Sign up
            </button>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
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
            transition={{ duration: 0.2 }}
            className={`md:hidden fixed top-20 left-0 right-0 px-6 pt-4 pb-6 border-t ${borderColor} bg-white dark:bg-gray-900 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto`}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <div className="flex flex-col gap-4">
              <Link 
                href={`/${country}/how-it-works`}
                onClick={() => setMobileOpen(false)}
                className="hover:opacity-80 transition-opacity"
              >
                How it works
              </Link>

              <div>
                <button
                  onClick={() => setMobileEarnOpen(!mobileEarnOpen)}
                  className="flex justify-between w-full hover:opacity-80 transition-opacity"
                >
                  Earn 
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-200 ${mobileEarnOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileEarnOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col pl-4 mt-2 gap-2 overflow-hidden"
                    >
                      {earnItems.map((item) => (
                        <Link
                          key={item.key}
                          href={`/${country}/${item.key}`}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileEarnOpen(false);
                          }}
                          className="py-1 hover:opacity-80 transition-opacity"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                href={`/${country}/cashout`}
                onClick={() => setMobileOpen(false)}
                className="hover:opacity-80 transition-opacity"
              >
                Cashout
              </Link>
              <Link 
                href={`/${country}/blog`}
                onClick={() => setMobileOpen(false)}
                className="hover:opacity-80 transition-opacity"
              >
                Blog
              </Link>
              <Link 
                href={`/${country}/help`}
                onClick={() => setMobileOpen(false)}
                className="hover:opacity-80 transition-opacity"
              >
                Help
              </Link>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <LanguageSwitcher />
                <DarkLightToggle />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Link href={`/${country}/login`} onClick={() => setMobileOpen(false)}>
                  <button className={`border ${borderColor} py-3 w-full rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}>
                    Login
                  </button>
                </Link>

                <Link href={`/${country}/signup`} onClick={() => setMobileOpen(false)}>
                  <button className="bg-gradient-to-r from-yellow-400 to-green-500 py-3 w-full rounded-lg text-black font-medium hover:opacity-90 transition-opacity">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
