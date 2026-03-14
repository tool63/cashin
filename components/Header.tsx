"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/switch/LanguageSwitcher";
import DarkLightToggle from "@/components/switch/DarkLightToggle";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const [mobileEarnOpen, setMobileEarnOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<"none" | "signup" | "login">("none");

  const headerRef = useRef<HTMLDivElement>(null);

  const borderColor = "border-gray-300 dark:border-gray-700";

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

  // Gradient background logic
  const gradientBg = "bg-gradient-to-br from-yellow-400/20 via-green-400/30 to-green-500/20 dark:from-yellow-500/10 dark:via-green-700/20 dark:to-green-800/20";

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-30 border-b ${borderColor} ${gradientBg} ${className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between text-black dark:text-white">

        {/* LOGO */}
        <Link
          href="/"
          className="bg-gradient-to-r from-yellow-400 to-green-500 text-2xl font-bold px-3 py-1 rounded-lg text-black"
        >
          Cashog
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">

          <Link href="/how-it-works" className="block hover:opacity-80">
            How it works
          </Link>

          {/* EARN */}
          <div
            className="relative"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <button className="flex items-center gap-1 hover:opacity-80">
              Earn
              <ChevronDown
                size={14}
                className={`transition-transform ${earnOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {earnOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className={`absolute top-full left-0 mt-2 w-48 flex flex-col gap-2 p-3 rounded-xl shadow-xl border ${borderColor} ${gradientBg}`}
                >
                  <Link href="/surveys" className="block hover:opacity-80">Surveys</Link>
                  <Link href="/app-installs" className="block hover:opacity-80">App Installs</Link>
                  <Link href="/play-games" className="block hover:opacity-80">Play Games</Link>
                  <Link href="/watch-videos" className="block hover:opacity-80">Watch Videos</Link>
                  <Link href="/offerwall" className="block hover:opacity-80">Offerwall</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/cashout" className="block hover:opacity-80">
            Cashout
          </Link>

          <Link href="/blog" className="block hover:opacity-80">
            Blog
          </Link>

          <Link href="/help" className="block hover:opacity-80">
            Help
          </Link>

        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">

          <LanguageSwitcher />
          <DarkLightToggle />

          <Link href="/?auth=login">
            <button
              onClick={() => setActiveButton("login")}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeButton === "login"
                  ? "bg-gradient-to-r from-yellow-400 to-green-500 text-black"
                  : `border ${borderColor} bg-transparent hover:bg-gray-100/50 dark:hover:bg-gray-800/50`
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
                  ? "bg-gradient-to-r from-yellow-400 to-green-500 text-black"
                  : `border ${borderColor} bg-transparent hover:bg-gray-100/50 dark:hover:bg-gray-800/50`
              }`}
            >
              Sign up
            </button>
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-black dark:text-white hover:opacity-80"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden w-full px-6 pt-4 pb-6 border-t ${borderColor} shadow-xl text-black dark:text-white ${gradientBg}`}
          >
            <div className="flex flex-col gap-4">

              <Link href="/how-it-works" className="block hover:opacity-80">
                How it works
              </Link>

              {/* MOBILE EARN */}
              <button
                onClick={() => setMobileEarnOpen(!mobileEarnOpen)}
                className="flex items-center justify-between w-full hover:opacity-80"
              >
                Earn
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileEarnOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileEarnOpen && (
                <div className="flex flex-col gap-3 pl-4 text-sm">
                  <Link href="/surveys" className="block hover:opacity-80">Surveys</Link>
                  <Link href="/app-installs" className="block hover:opacity-80">App Installs</Link>
                  <Link href="/play-games" className="block hover:opacity-80">Play Games</Link>
                  <Link href="/watch-videos" className="block hover:opacity-80">Watch Videos</Link>
                  <Link href="/offerwall" className="block hover:opacity-80">Offerwall</Link>
                </div>
              )}

              <Link href="/cashout" className="block hover:opacity-80">
                Cashout
              </Link>

              <Link href="/blog" className="block hover:opacity-80">
                Blog
              </Link>

              <Link href="/help" className="block hover:opacity-80">
                Help
              </Link>

              <div className="flex items-center justify-between pt-3">
                <LanguageSwitcher />
                <DarkLightToggle />
              </div>

              <div className="pt-3 flex flex-col gap-3">
                <Link href="/login">
                  <button className={`border ${borderColor} bg-transparent py-2 rounded-lg w-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition`}>
                    Login
                  </button>
                </Link>

                <Link href="/signup">
                  <button className="bg-gradient-to-r from-yellow-400 to-green-500 py-2 rounded-lg w-full text-black font-medium hover:opacity-90 transition-opacity">
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
