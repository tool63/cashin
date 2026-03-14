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

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-40 border-b ${borderColor} bg-bg-primary ${className || ""}`}
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
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">

          <Link href="/how-it-works" className="hover:opacity-80 transition">
            How it works
          </Link>

          {/* EARN DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <button
              className="flex items-center gap-1 hover:opacity-80 transition"
              aria-expanded={earnOpen}
            >
              Earn
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  earnOpen ? "rotate-180" : ""
                }`}
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
                  <Link href="/surveys" className="hover:opacity-80">
                    Surveys
                  </Link>

                  <Link href="/app-installs" className="hover:opacity-80">
                    App Installs
                  </Link>

                  <Link href="/play-games" className="hover:opacity-80">
                    Play Games
                  </Link>

                  <Link href="/watch-videos" className="hover:opacity-80">
                    Watch Videos
                  </Link>

                  <Link href="/offerwall" className="hover:opacity-80">
                    Offerwall
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/cashout" className="hover:opacity-80 transition">
            Cashout
          </Link>

          <Link href="/blog" className="hover:opacity-80 transition">
            Blog
          </Link>

          <Link href="/help" className="hover:opacity-80 transition">
            Help
          </Link>

        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">

          <LanguageSwitcher />

          <DarkLightToggle />

          <Link href="/login">
            <button
              className={`px-4 py-2 rounded-lg text-sm border ${borderColor} hover:bg-gray-100 dark:hover:bg-gray-800 transition`}
            >
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button
              className="px-5 py-2 rounded-lg text-sm bg-gradient-to-r from-yellow-400 to-green-500 text-black font-medium hover:opacity-90 transition"
            >
              Sign up
            </button>
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden hover:opacity-80"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
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
            className={`md:hidden w-full px-6 pt-4 pb-6 border-t ${borderColor} bg-white dark:bg-gray-900`}
          >
            <div className="flex flex-col gap-4 text-black dark:text-white">

              <Link href="/how-it-works" className="hover:opacity-80">
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
                  className={`transition-transform ${
                    mobileEarnOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileEarnOpen && (
                <div className="flex flex-col gap-3 pl-4 text-sm">
                  <Link href="/surveys">Surveys</Link>
                  <Link href="/app-installs">App Installs</Link>
                  <Link href="/play-games">Play Games</Link>
                  <Link href="/watch-videos">Watch Videos</Link>
                  <Link href="/offerwall">Offerwall</Link>
                </div>
              )}

              <Link href="/cashout">Cashout</Link>

              <Link href="/blog">Blog</Link>

              <Link href="/help">Help</Link>

              <div className="flex items-center justify-between pt-4">
                <LanguageSwitcher />
                <DarkLightToggle />
              </div>

              <div className="pt-3 flex flex-col gap-3">
                <Link href="/login">
                  <button
                    className={`border ${borderColor} py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition`}
                  >
                    Login
                  </button>
                </Link>

                <Link href="/signup">
                  <button className="bg-gradient-to-r from-yellow-400 to-green-500 py-2 rounded-lg w-full text-black font-medium hover:opacity-90">
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
