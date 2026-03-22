"use client";

import { useState, ReactNode, useCallback, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import { getTextDirection } from "@/app/core/i18n/formatters";

type Toggle = Record<string, boolean>;

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const { language, translations } = useLanguage();
  const { country } = useCountry();

  const isRtl = getTextDirection(language);

  const [open, setOpen] = useState<Toggle>({});

  // ===============================
  // ✅ UPDATED TRANSLATION LOGIC
  // ===============================
  const t = useMemo(() => {
    return (key: string, fallback: string): string => {
      return translations?.footer?.[key] || fallback;
    };
  }, [translations]);

  const toggle = useCallback((k: string) => {
    setOpen((p) => ({ ...p, [k]: !p[k] }));
  }, []);

  const A = ({ href, children }: { href: string; children: ReactNode }) => (
    <Link
      href={`/${country}${href}`}
      className="block text-primary hover:opacity-80 hover:translate-x-1 transition-all duration-150"
    >
      {children}
    </Link>
  );

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
          className={`transition-transform duration-200 ${
            open[id] ? "rotate-180" : ""
          }`}
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
      text-primary transition-colors duration-300 border-t border-theme ${
        className || ""
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <Section id="start" title={t("getStarted", "Get Started")}>
            <A href="/how-it-works">{t("howItWorks", "How it works")}</A>
            <A href="/start-earning">{t("startEarning", "Start earning")}</A>
          </Section>

          <Section id="earn" title={t("waysToEarn", "Ways to Earn")}>
            <A href="/surveys">{t("surveys", "Surveys")}</A>
            <A href="/app-installs">{t("appInstalls", "App Installs")}</A>
            <A href="/play-games">{t("playGames", "Play games")}</A>
            <A href="/watch-videos">{t("watchVideos", "Watch videos")}</A>
            <A href="/offerwall">{t("offerwall", "Offerwall")}</A>
          </Section>

          <Section id="guides" title={t("guides", "Guides")}>
            <A href="/make-money-online">{t("makeMoney", "Make money")}</A>
          </Section>

          <Section id="resources" title={t("resources", "Resources")}>
            <A href="/blog">{t("blog", "Blog")}</A>
            <A href="/help">{t("help", "Help")}</A>
          </Section>
        </div>
      </div>

      <div className="border-t border-theme py-6 flex justify-center gap-6">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity hover:scale-110 transform duration-200"
          >
            <social.icon size={20} />
          </a>
        ))}
      </div>

      <div className="text-center text-sm text-primary pb-6">
        © {new Date().getFullYear()} Cashog.{" "}
        {t("copyright", "All rights reserved")}
      </div>
    </footer>
  );
}
