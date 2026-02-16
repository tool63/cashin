"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* ================= LOGO ================= */}
          <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 bg-clip-text text-transparent">
            Cashog
          </Link>

          {/* ================= NAVIGATION ================= */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

            <Link href="/" className="text-white/80 hover:text-white transition">
              Home
            </Link>

            <Link href="/affiliate" className="text-white/80 hover:text-white transition">
              Affiliate
            </Link>

            <Link href="/about" className="text-white/80 hover:text-white transition">
              About
            </Link>

            <Link href="/contact" className="text-white/80 hover:text-white transition">
              Contact
            </Link>

          </nav>

          {/* ================= CTA BUTTON ================= */}
          <div className="hidden md:block">
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-6 py-2.5 rounded-xl font-semibold shadow-md"
              >
                Get Started
              </motion.span>
            </Link>
          </div>

          {/* ================= MOBILE MENU ICON ================= */}
          <div className="md:hidden text-white">
            <Menu size={24} />
          </div>

        </div>
      </div>
    </header>
  );
}
