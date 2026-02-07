"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#0A0C16] text-gray-600 dark:text-gray-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            Cashog
          </h2>
          <p>Cashog is a trusted platform to earn rewards online safely and fast.</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/earn" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Earn
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Email: <a href="mailto:support@cashog.com" className="hover:text-indigo-600 dark:hover:text-indigo-400">support@cashog.com</a></p>
          <p>Phone: +1 234 567 890</p>
          <p className="mt-4 text-sm">© 2026 Cashog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
