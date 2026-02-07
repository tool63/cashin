"use client";

import { useState } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <header className="bg-white dark:bg-black text-black dark:text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          PayUp
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Sign Up / Sign In */}
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Sign Up
          </Link>
          <Link
            href="/signin"
            className="bg-gray-200 dark:bg-gray-800 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Sign In
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMobile}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-black text-black dark:text-white p-4 space-y-4">
          <Link href="/" onClick={toggleMobile}>
            Home
          </Link>
          <Link href="/about" onClick={toggleMobile}>
            About
          </Link>
          <Link href="/contact" onClick={toggleMobile}>
            Contact
          </Link>

          <button
            onClick={toggleTheme}
            className="w-full p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          <Link
            href="/signup"
            className="block w-full text-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Sign Up
          </Link>
          <Link
            href="/signin"
            className="block w-full text-center bg-gray-200 dark:bg-gray-800 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
