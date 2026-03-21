"use client";

import { useState, ReactNode, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import { getTextDirection } from "@/app/core/i18n/formatters";
import { buildUrl } from "@/app/core/detector"; // ✅ NEW

type Toggle = Record<string, boolean>;

interface FooterProps {
  className?: string;
}

// ===============================
// 🚀 FOOTER
// ===============================
export default function Footer({ className }: FooterProps) {
  const { language } = useLanguage();
  const { country } = useCountry();

  const isRtl = getTextDirection(language);

  const [open, setOpen] = useState<Toggle>({});
  const [sub, setSub] = useState<Toggle>({});
  const [sub2, setSub2] = useState<Toggle>({});

  const toggle = useCallback((k: string) => {
    setOpen((p) => ({ ...p, [k]: !p[k] }));
  }, []);

  const toggleSub = useCallback((k: string) => {
    setSub((p) => ({ ...p, [k]: !p[k] }));
  }, []);

  const toggleSub2 = useCallback((k: string) => {
    setSub2((p) => ({ ...p, [k]: !p[k] }));
  }, []);

  // ===============================
  // 🔗 LINK COMPONENT (FIXED)
  // ===============================
  const A = ({ href, children }: { href: string; children: ReactNode }) => (
    <Link
      href={buildUrl(href, country)} // ✅ AUTO SAFE URL
      className="block text-primary hover:opacity-80 hover:translate-x-1 transition-all duration-150"
    >
      {children}
    </Link>
  );

  // ===============================
  // SECTION COMPONENT
  // ===============================
  const Section = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: ReactNode;
  }) => (
    <div>
      <button
        onClick={() => toggle(id)}
        className="w-full flex justify-between items-center font-semibold mb-3 text-primary hover:opacity-80 transition-opacity"
      >
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open[id] ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open[id] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="space-y-2 text-sm text-muted overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // ===============================
  // SUB COMPONENT
  // ===============================
  const Sub = ({
    id,
    title,
    children,
    level = 1,
  }: {
    id: string;
    title: string;
    children: ReactNode;
    level?: number;
  }) => {
    const state = level === 1 ? sub[id] : sub2[id];

    return (
      <div className="mt-2" style={{ paddingLeft: `${level * 12}px` }}>
        <button
          onClick={() => (level === 1 ? toggleSub(id) : toggleSub2(id))}
          className="w-full flex justify-between font-medium text-primary hover:opacity-80 transition-opacity"
        >
          {title}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${state ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {state && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="mt-2 space-y-2 pl-3 overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // ===============================
  // SOCIAL
  // ===============================
  const socialLinks = [
    { href: "https://twitter.com/cashog", icon: Twitter, label: "Twitter" },
    { href: "https://facebook.com/cashog", icon: Facebook, label: "Facebook" },
    { href: "https://instagram.com/cashog", icon: Instagram, label: "Instagram" },
    { href: "https://youtube.com/cashog", icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer
      className={`bg-gradient-to-br from-yellow-400/20 via-green-400/30 to-green-500/20
      dark:from-yellow-500/10 dark:via-green-700/20 dark:to-green-800/20
      text-primary transition-colors duration-300 border-t border-theme ${className || ""}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Keep all your sections EXACTLY SAME */}
          {/* No logic changes needed here */}
          {/* Only A links are fixed via buildUrl */}

          <Section id="start" title="Get Started">
            <A href="/how-it-works">How it works</A>
            <A href="/start-earning">Start Earning</A>
          </Section>

          <Section id="earn" title="Ways to Earn">
            <A href="/surveys">Surveys</A>
            <A href="/app-installs">App Installs</A>
          </Section>

          <Section id="guides" title="Guides">
            <A href="/make-money-online">Make Money Online</A>
          </Section>

          <Section id="resources" title="Resources">
            <A href="/blog">Blog</A>
            <A href="/help">Help Center</A>
          </Section>
        </div>
      </div>

      {/* SOCIAL */}
      <div className="border-t border-theme py-6 flex justify-center gap-6">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity hover:scale-110 transform duration-200"
            aria-label={social.label}
          >
            <social.icon size={20} />
          </a>
        ))}
      </div>

      <div className="text-center text-sm text-primary pb-6">
        © {new Date().getFullYear()} Cashog. All rights reserved.
      </div>
    </footer>
  );
}
