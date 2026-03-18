"use client";

import { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

import DarkLightToggle from "@/components/switch/DarkLightToggle";
import LanguageSwitcher from "@/components/switch/LanguageSwitcher";
import { LanguageContext } from "@/app/[country]/providers/LanguageProvider";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  // ------------------------------
  // State
  // ------------------------------
  const [mobileOpen, setMobileOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const [mobileEarnOpen, setMobileEarnOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ------------------------------
  // Context
  // ------------------------------
  const { country, language, isRtl } = useContext(LanguageContext);

  // ------------------------------
  // Refs
  // ------------------------------
  const headerRef = useRef<HTMLDivElement>(null);
  const earnDropdownRef = useRef<HTMLDivElement>(null);

  // ------------------------------
  // Constants
  // ------------------------------
  const borderColor = "border-gray-300 dark:border-gray-700";

  // ------------------------------
  // Handle hydration
  // ------------------------------
  useEffect(() => {
    setMounted(true);
  }, []);

  // ------------------------------
  // Handle click outside
  // ------------------------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
        setMobileEarnOpen(false);
      }
      
      // Close desktop dropdown if clicking outside
      if (earnDropdownRef.current && !earnDropdownRef.current.contains(e.target as Node)) {
        setEarnOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------------------
  // Handle escape key
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
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // ------------------------------
  // Prevent body scroll when mobile menu open
  // ------------------------------
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // ------------------------------
  // Don't render until mounted (prevents hydration mismatch)
  // ------------------------------
  if (!mounted) {
    return (
      <header className={`fixed top-0 left-0 w-full z-40 border-b ${borderColor} bg-bg-primary ${className || ""}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="bg-gradient-to-r from-yellow-400 to-green-500 text-2xl font-bold px-3 py-1 rounded-lg text-black">
            Cashog
          </div>
          <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
      </header>
    );
  }

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
          aria-label="Cashog Home"
        >
          Cashog
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium" aria-label="Main navigation">
          <Link 
            href={`/${country}/how-it-works`} 
            className="hover:opacity-80 transition-opacity"
            aria-label="How it works"
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
            <button 
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              aria-expanded={earnOpen}
              aria-haspopup="true"
              aria-label="Earn menu"
            >
              Earn
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${earnOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {earnOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className={`absolute top-full ${isRtl ? 'right-0' : 'left-0'} mt-3 w-52 flex flex-col gap-2 p-4 rounded-xl shadow-xl border ${borderColor} bg-white dark:bg-gray-900`}
                  role="menu"
                  aria-label="Earn options"
                >
                  <Link 
                    href={`/${country}/surveys`} 
                    className="hover:opacity-80 transition-opacity py-1"
                    role="menuitem"
                  >
                    Surveys
                  </Link>
                  <Link 
                    href={`/${country}/app-installs`} 
                    className="hover:opacity-80 transition-opacity py-1"
                    role="menuitem"
                  >
                    App Installs
                  </Link>
                  <Link 
                    href={`/${country}/play-games`} 
                    className="hover:opacity-80 transition-opacity py-1"
                    role="menuitem"
                  >
                    Play Games
                  </Link>
                  <Link 
                    href={`/${country}/watch-videos`} 
                    className="hover:opacity-80 transition-opacity py-1"
                    role="menuitem"
                  >
                    Watch Videos
                  </Link>
                  <Link 
                    href={`/${country}/offerwall`} 
                    className="hover:opacity-80 transition-opacity py-1"
                    role="menuitem"
                  >
                    Offerwall
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href={`/${country}/cashout`} 
            className="hover:opacity-80 transition-opacity"
            aria-label="Cashout"
          >
            Cashout
          </Link>
          <Link 
            href={`/${country}/blog`} 
            className="hover:opacity-80 transition-opacity"
            aria-label="Blog"
          >
            Blog
          </Link>
          <Link 
            href={`/${country}/help`} 
            className="hover:opacity-80 transition-opacity"
            aria-label="Help"
          >
            Help
          </Link>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />

          <DarkLightToggle />

          <Link href={`/${country}/login`} aria-label="Login">
            <button 
              className={`px-4 py-2 rounded-lg text-sm border ${borderColor} hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
              aria-label="Login button"
            >
              Login
            </button>
          </Link>

          <Link href={`/${country}/signup`} aria-label="Sign up">
            <button 
              className="px-5 py-2 rounded-lg text-sm bg-gradient-to-r from-yellow-400 to-green-500 text-black font-medium hover:opacity-90 transition-opacity"
              aria-label="Sign up button"
            >
              Sign up
            </button>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
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
            className={`md:hidden fixed left-0 right-0 top-20 px-6 pt-4 pb-6 border-t ${borderColor} bg-white dark:bg-gray-900 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto`}
            role="menu"
            aria-label="Mobile menu"
            dir={isRtl ? "rtl" : "ltr"}
          >
            <div className="flex flex-col gap-4">
              <Link 
                href={`/${country}/how-it-works`} 
                className="py-2 hover:opacity-80 transition-opacity"
                role="menuitem"
                onClick={() => setMobileOpen(false)}
              >
                How it works
              </Link>

              <div className="border-b border-gray-200 dark:border-gray-700" />

              <button
                onClick={() => setMobileEarnOpen(!mobileEarnOpen)}
                className="flex items-center justify-between py-2 w-full hover:opacity-80 transition-opacity"
                aria-expanded={mobileEarnOpen}
                aria-label="Earn menu"
              >
                Earn
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    mobileEarnOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {mobileEarnOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col gap-3 pl-4 text-sm overflow-hidden"
                  >
                    <Link 
                      href={`/${country}/surveys`} 
                      className="py-1 hover:opacity-80 transition-opacity"
                      role="menuitem"
                      onClick={() => setMobileOpen(false)}
                    >
                      Surveys
                    </Link>
                    <Link 
                      href={`/${country}/app-installs`} 
                      className="py-1 hover:opacity-80 transition-opacity"
                      role="menuitem"
                      onClick={() => setMobileOpen(false)}
                    >
                      App Installs
                    </Link>
                    <Link 
                      href={`/${country}/play-games`} 
                      className="py-1 hover:opacity-80 transition-opacity"
                      role="menuitem"
                      onClick={() => setMobileOpen(false)}
                    >
                      Play Games
                    </Link>
                    <Link 
                      href={`/${country}/watch-videos`} 
                      className="py-1 hover:opacity-80 transition-opacity"
                      role="menuitem"
                      onClick={() => setMobileOpen(false)}
                    >
                      Watch Videos
                    </Link>
                    <Link 
                      href={`/${country}/offerwall`} 
                      className="py-1 hover:opacity-80 transition-opacity"
                      role="menuitem"
                      onClick={() => setMobileOpen(false)}
                    >
                      Offerwall
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="border-b border-gray-200 dark:border-gray-700" />

              <Link 
                href={`/${country}/cashout`} 
                className="py-2 hover:opacity-80 transition-opacity"
                role="menuitem"
                onClick={() => setMobileOpen(false)}
              >
                Cashout
              </Link>
              <Link 
                href={`/${country}/blog`} 
                className="py-2 hover:opacity-80 transition-opacity"
                role="menuitem"
                onClick={() => setMobileOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href={`/${country}/help`} 
                className="py-2 hover:opacity-80 transition-opacity"
                role="menuitem"
                onClick={() => setMobileOpen(false)}
              >
                Help
              </Link>

              <div className="border-b border-gray-200 dark:border-gray-700" />

              <div className="flex items-center justify-between pt-2">
                <LanguageSwitcher />
                <DarkLightToggle />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Link href={`/${country}/login`} onClick={() => setMobileOpen(false)}>
                  <button className={`border ${borderColor} py-3 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}>
                    Login
                  </button>
                </Link>

                <Link href={`/${country}/signup`} onClick={() => setMobileOpen(false)}>
                  <button className="bg-gradient-to-r from-yellow-400 to-green-500 py-3 rounded-lg w-full text-black font-medium hover:opacity-90 transition-opacity">
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
