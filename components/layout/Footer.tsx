"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";

// ===============================
// 🦶 FOOTER
// ===============================
export default function Footer() {
  const { language, getTranslation } = useLanguage();
  const { country } = useCountry();

  // ===============================
  // 📝 TRANSLATION HELPER FOR FOOTER NAMESPACE
  // ===============================
  const t = useMemo(() => {
    return (key: string, fallback: string): string => {
      return getTranslation("footer", key, fallback);
    };
  }, [getTranslation]);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* ===============================
            📋 FOOTER GRID
        =============================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
              Cashog
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t(
                "tagline",
                "Earn money online safely and quickly with Cashog."
              )}
            </p>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              {t("company", "Company")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${country}/about`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {t("about_us", "About Us")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/blog`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {t("blog", "Blog")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/how-it-works`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {t("how_it_works", "How It Works")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              {t("support", "Support")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${country}/help`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {t("help_center", "Help Center")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/contact`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {t("contact", "Contact Us")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/faq`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {t("faq", "FAQ")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              {t("legal", "Legal")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${country}/terms`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {t("terms", "Terms of Service")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/privacy`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {t("privacy", "Privacy Policy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/cookies`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {t("cookies", "Cookie Policy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ===============================
            🔗 SOCIAL LINKS
        =============================== */}
        <div className="flex justify-center space-x-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </Link>

          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            aria-label="Twitter"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>

          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </Link>
        </div>

        {/* ===============================
            📄 COPYRIGHT
        =============================== */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} Cashog.{" "}
            {t("rights_reserved", "All rights reserved.")}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
            {t("serving", "Serving users in")}{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {country.toUpperCase()}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
