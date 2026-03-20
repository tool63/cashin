"use client";

import { useState, ReactNode, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";
import { getTextDirection } from "@/app/core/i18n/config";

type Toggle = Record<string, boolean>;

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  // ------------------------------
  // Context
  // ------------------------------
  const { language } = useLanguage();
  const { country } = useCountry();
  const isRtl = getTextDirection(language);

  // ------------------------------
  // State
  // ------------------------------
  const [open, setOpen] = useState<Toggle>({});
  const [sub, setSub] = useState<Toggle>({});
  const [sub2, setSub2] = useState<Toggle>({});

  // ------------------------------
  // Toggle functions
  // ------------------------------
  const toggle = useCallback((k: string) => {
    setOpen((p) => ({ ...p, [k]: !p[k] }));
  }, []);

  const toggleSub = useCallback((k: string) => {
    setSub((p) => ({ ...p, [k]: !p[k] }));
  }, []);

  const toggleSub2 = useCallback((k: string) => {
    setSub2((p) => ({ ...p, [k]: !p[k] }));
  }, []);

  // ------------------------------
  // Link Component with country
  // ------------------------------
  const A = ({ href, children }: { href: string; children: ReactNode }) => (
    <Link
      href={`/${country}${href}`}
      className="block text-primary hover:opacity-80 hover:translate-x-1 transition-all duration-150"
    >
      {children}
    </Link>
  );

  // ------------------------------
  // Section Component
  // ------------------------------
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

  // ------------------------------
  // Sub Section Component
  // ------------------------------
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

  // ------------------------------
  // Social Links
  // ------------------------------
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
        {/* Footer Grid - Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* COLUMN 1 - Get Started */}
          <Section id="start" title="Get Started">
            <A href="/how-it-works">How it works</A>
            <A href="/start-earning">Start Earning</A>
            <A href="/cashout">Cashout Methods</A>
            <A href="/withdrawals">Withdrawal Proofs</A>
            <A href="/trust-safety">Trust & Safety</A>
          </Section>

          {/* COLUMN 2 - Ways to Earn */}
          <Section id="earn" title="Ways to Earn">
            <A href="/surveys">Surveys</A>
            <A href="/app-installs">App Installs</A>
            <A href="/play-games">Play Games</A>
            <A href="/watch-videos">Watch Videos</A>
            <A href="/mining-rewards">Mining Rewards</A>
            <A href="/complete-offers">Complete Offers</A>
            <A href="/offerwall">Offerwall</A>
            <A href="/surveywall">Surveywall</A>

            <Sub id="extra" title="Extra Earning">
              <A href="/watch-ads">Watch Ads</A>
              <A href="/micro-tasks">Micro Tasks</A>
              <A href="/complete-free-trials">Free Trials</A>
              <A href="/test-products">Test Products</A>
              <A href="/read-emails">Read Emails</A>
              <A href="/visit-websites">Visit Websites</A>
              <A href="/review-tasks">Review Tasks</A>
              <A href="/spinning-wheel">Spinning Wheel</A>
              <A href="/loyalty">Loyalty</A>
              <A href="/vouchers">Vouchers</A>
            </Sub>
          </Section>

          {/* COLUMN 3 - Guides */}
          <Section id="guides" title="Guides">
            <A href="/make-money-online">Make Money Online</A>
            <A href="/earn-money-from-home">Earn from Home</A>
            <A href="/earn-without-investment">Earn without Investment</A>
            <A href="/get-paid-to-play-games">Get Paid to Play Games</A>
            <A href="/install-apps-for-cash">Install Apps</A>
            <A href="/watch-videos-for-money">Watch Videos for Money</A>
            <A href="/complete-offers-online">Complete Offers Online</A>
            <A href="/work-from-home-jobs">Work from Home Jobs</A>
            <A href="/online-earning-methods">Online Earning Methods</A>
            <A href="/earn-money-online-fast">Earn Fast</A>

            <Sub id="allGuides" title="All Guides">
              <A href="/passive-income-online">Passive Income</A>
              <A href="/online-jobs-for-beginners">Online Jobs</A>
              <A href="/earn-money-as-a-student">Student Earnings</A>
              <A href="/earn-money-without-skills">Earn without Skills</A>
              <A href="/earn-money-using-mobile">Earn Using Mobile</A>
              <A href="/earn-money-online-worldwide">Earn Worldwide</A>
              <A href="/cashback-rewards">Cashback Rewards</A>
              <A href="/legit-ways-to-make-money-online">Legit Ways</A>
              <A href="/free-ways-to-make-money-online">Free Ways</A>
            </Sub>
          </Section>

          {/* COLUMN 4 - Rewards */}
          <Section id="rewards" title="Rewards">
            <A href="/earn-paypal-money">Earn PayPal Money</A>

            <Sub id="giftcards" title="Earn Gift Cards">
              <A href="/earn-amazon-gift-card">Amazon Gift Card</A>
              <A href="/earn-apple-gift-card">Apple Gift Card</A>
              <A href="/earn-google-play-gift-card">Google Play Gift Card</A>
            </Sub>

            <Sub id="crypto" title="Earn Crypto">
              <A href="/earn-bitcoin-online">Bitcoin</A>
              <A href="/earn-litecoin-online">Litecoin</A>
              <A href="/earn-ethereum-online">Ethereum</A>
              <A href="/earn-dogecoin-online">Dogecoin</A>
            </Sub>

            <Sub id="gaming" title="Earn Gaming">
              <A href="/earn-free-robux">Free Robux</A>
              <A href="/earn-steam-gift-cards">Steam Gift Cards</A>
              <A href="/earn-xbox-gift-cards">Xbox Gift Cards</A>
              <A href="/earn-psn-gift-cards">PSN Gift Cards</A>
            </Sub>

            <A href="/earn-spotify-premium">Spotify Premium</A>
          </Section>

          {/* COLUMN 5 - Resources */}
          <Section id="resources" title="Resources">
            <A href="/blog">Blog</A>
            <A href="/help">Help Center</A>
            <A href="/faq">FAQ</A>
            <A href="/contact">Contact Support</A>
            <A href="/about">About</A>
          </Section>

          {/* COLUMN 6 - Business */}
          <Section id="business" title="Business">
            <A href="/affiliate">Affiliate</A>
            <A href="/partners">Partners</A>
            <A href="/advertise">Advertise</A>
          </Section>

          {/* COLUMN 7 - Cashback */}
          <Section id="cashback" title="Cashback">
            <A href="/cashback-offers">Cashback Offers</A>

            <Sub id="shopping" title="Shopping Rewards">
              <A href="/shopping-rewards/electronics">Electronics</A>
              <A href="/shopping-rewards/fashion">Fashion</A>
              <A href="/shopping-rewards/home-garden">Home & Garden</A>
              <A href="/shopping-rewards/grocery">Grocery</A>
              <A href="/shopping-rewards/beauty">Beauty</A>
              <A href="/shopping-rewards/mobile">Mobile</A>

              <Sub id="travel" title="Travel" level={2}>
                <A href="/shopping-rewards/travel/hotels">Hotels</A>
                <A href="/shopping-rewards/travel/flights">Flights</A>
              </Sub>

              <A href="/shopping-rewards/finance">Finance</A>
            </Sub>

            <A href="/promo-codes">Promo Codes</A>
            <A href="/daily-deals">Daily Deals</A>
            <A href="/banking-finance-offers">Banking & Finance</A>
          </Section>

          {/* COLUMN 8 - Legal */}
          <Section id="legal" title="Legal">
            <A href="/terms">Terms & Conditions</A>
            <A href="/privacy">Privacy Policy</A>
            <A href="/cookies">Cookie Policy</A>
          </Section>
        </div>
      </div>

      {/* SOCIAL ICONS */}
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

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-primary pb-6">
        © {new Date().getFullYear()} Cashog. All rights reserved.
      </div>
    </footer>
  );
}
