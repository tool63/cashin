"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (section: string) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        {/* Column 1: Company */}
        <div>
          <h4 className="font-bold mb-2 cursor-pointer" onClick={() => toggle("company")}>
            Company
          </h4>
          {open["company"] && (
            <ul className="space-y-1 mt-2">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          )}
        </div>

        {/* Column 2: Support */}
        <div>
          <h4 className="font-bold mb-2 cursor-pointer" onClick={() => toggle("support")}>
            Support
          </h4>
          {open["support"] && (
            <ul className="space-y-1 mt-2">
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          )}
        </div>

        {/* Column 3: Legal */}
        <div>
          <h4 className="font-bold mb-2 cursor-pointer" onClick={() => toggle("legal")}>
            Legal
          </h4>
          {open["legal"] && (
            <ul className="space-y-1 mt-2">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/cookies">Cookie Policy</Link></li>
            </ul>
          )}
        </div>

        {/* Column 4: Follow Us */}
        <div>
          <h4 className="font-bold mb-2">Follow Us</h4>
          <ul className="flex space-x-4 mt-2">
            <li><Link href="https://twitter.com" target="_blank">Twitter</Link></li>
            <li><Link href="https://facebook.com" target="_blank">Facebook</Link></li>
            <li><Link href="https://instagram.com" target="_blank">Instagram</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 mt-8 text-sm">
        &copy; {new Date().getFullYear()} PayUp. All rights reserved.
      </div>
    </footer>
  );
}
