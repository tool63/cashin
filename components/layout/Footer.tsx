"use client";

import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import Link from "next/link";

export default function Footer() {
  const { getTranslation } = useLanguage();
  const { country } = useCountry();

  const t = (key: string, fallback: string): string => {
    return getTranslation("footer", key, fallback);
  };

  return (
    <footer className="border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ===============================
            GRID SECTION FOR FOOTER LINKS
        =============================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* =========================
              COMPANY
          ========================= */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t("company", "Company")}
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${country}/about`}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none no-underline"
                >
                  {t("about", "About Us")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/blog`}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none no-underline"
                >
                  {t("blog", "Blog")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/careers`}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none no-underline"
                >
                  {t("careers", "Careers")}
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================
              LEGAL
          ========================= */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t("legal", "Legal")}
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${country}/terms`}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none no-underline"
                >
                  {t("terms", "Terms of Service")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/privacy`}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none no-underline"
                >
                  {t("privacy", "Privacy Policy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/cookies`}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none no-underline"
                >
                  {t("cookies", "Cookie Policy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================
              SUPPORT
          ========================= */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t("support", "Support")}
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${country}/help`}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none no-underline"
                >
                  {t("help", "Help Center")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/contact`}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none no-underline"
                >
                  {t("contact", "Contact Us")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${country}/faq`}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none no-underline"
                >
                  {t("faq", "FAQ")}
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================
              FOLLOW US
          ========================= */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t("follow_us", "Follow Us")}
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none no-underline"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-400 focus:outline-none no-underline"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="text-gray-800 dark:text-gray-200 hover:text-pink-500 focus:outline-none no-underline"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ===============================
            SOCIAL + COPYRIGHT
        =============================== */}
        <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Social Links */}
          <div className="flex gap-5 text-sm">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none no-underline"
            >
              Facebook
            </Link>

            <Link
              href="https://twitter.com"
              target="_blank"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-400 focus:outline-none no-underline"
            >
              Twitter
            </Link>

            <Link
              href="https://instagram.com"
              target="_blank"
              className="text-gray-800 dark:text-gray-200 hover:text-pink-500 focus:outline-none no-underline"
            >
              Instagram
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-center md:text-right">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold">Cashog</span>.{" "}
              {t("rights", "All rights reserved.")}{" "}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {t("serving", "Serving users in")} {country.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
