"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";

type Toggle = Record<string, boolean>;

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const { getTranslation } = useLanguage();
  const { country } = useCountry();

  // ✅ SAME TRANSLATION STYLE AS HEADER
  const t = (key: string, fallback: string): string => {
    return getTranslation("footer", key, fallback);
  };

  const [open, setOpen] = useState<Toggle>({});
  const [sub, setSub] = useState<Toggle>({});
  const [sub2, setSub2] = useState<Toggle>({});

  const toggle = (k: string) => {
    setOpen((p) => ({ ...p, [k]: !p[k] }));
  };

  const toggleSub = (k: string) => {
    setSub((p) => ({ ...p, [k]: !p[k] }));
  };

  const toggleSub2 = (k: string) => {
    setSub2((p) => ({ ...p, [k]: !p[k] }));
  };

  /* ---------- LINK COMPONENT (FIXED MULTI-COUNTRY) ---------- */
  const A = ({ href, children }: { href: string; children: ReactNode }) => {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-primary hover:opacity-80 hover:translate-x-1 transition-all duration-150"
        >
          {children}
        </a>
      );
    }

    // ✅ MATCH HEADER LOGIC
    const path = href.startsWith("/") ? href.slice(1) : href;

    return (
      <Link
        href={`/${country}/${path}`}
        className="block text-primary hover:opacity-80 hover:translate-x-1 transition-all duration-150"
      >
        {children}
      </Link>
    );
  };

  /* ---------- SECTION ---------- */
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
          className={`transition-transform ${open[id] ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open[id] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="space-y-2 text-sm text-muted overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  /* ---------- SUB SECTION ---------- */
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
    const toggleFn = level === 1 ? toggleSub : toggleSub2;

    return (
      <div className="mt-2" style={{ paddingLeft: `${level * 12}px` }}>
        <button
          onClick={() => toggleFn(id)}
          className="w-full flex justify-between font-medium text-primary hover:opacity-80 transition-opacity"
        >
          {title}
          <ChevronDown
            size={14}
            className={`transition-transform ${state ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {state && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="mt-2 space-y-2 pl-3 overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <footer
      className={`bg-gradient-to-br from-yellow-400/20 via-green-400/30 to-green-500/20
      dark:from-yellow-500/10 dark:via-green-700/20 dark:to-green-800/20
      text-primary transition-colors duration-300 border-t border-theme ${className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">

  {/* GET STARTED */}
  <Section id="start" title={t("getStarted", "Get Started")}>
    <A href="/how-it-works">{t("howItWorks", "How it works")}</A>
    <A href="/start-earning">{t("startEarning", "Start Earning")}</A>
    <A href="/cashout">{t("cashoutMethods", "Cashout Methods")}</A>
    <A href="/withdrawals">{t("withdrawalProofs", "Withdrawal Proofs")}</A>
    <A href="/trust-safety">{t("trustSafety", "Trust & Safety")}</A>
  </Section>

  {/* WAYS TO EARN */}
  <Section id="earn" title={t("waysToEarn", "Ways to Earn")}>
    <A href="/earn/surveys">{t("surveys", "Surveys")}</A>
    <A href="/earn/app-installs">{t("appInstalls", "App Installs")}</A>
    <A href="/earn/play-games">{t("playGames", "Play Games")}</A>
    <A href="/earn/watch-videos">{t("watchVideos", "Watch Videos")}</A>
    <A href="/earn/mining-rewards">{t("miningRewards", "Mining Rewards")}</A>
    <A href="/earn/complete-offers">{t("completeOffers", "Complete Offers")}</A>
    <A href="/earn/offerwall">{t("offerwall", "Offerwall")}</A>
    <A href="/earn/surveywall">{t("surveywall", "Surveywall")}</A>

    <Sub id="extra" title={t("extraEarning", "Extra Earning")}>
      <A href="/earn/watch-ads">{t("watchAds", "Watch Ads")}</A>
      <A href="/earn/micro-tasks">{t("microTasks", "Micro Tasks")}</A>
      <A href="/earn/complete-free-trials">{t("freeTrials", "Free Trials")}</A>
      <A href="/earn/test-products">{t("testProducts", "Test Products")}</A>
      <A href="/earn/read-emails">{t("readEmails", "Read Emails")}</A>
      <A href="/earn/visit-websites">{t("visitWebsites", "Visit Websites")}</A>
      <A href="/earn/review-tasks">{t("reviewTasks", "Review Tasks")}</A>
      <A href="/earn/spinning-wheel">{t("spinningWheel", "Spinning Wheel")}</A>
      <A href="/earn/loyalty">{t("loyalty", "Loyalty")}</A>
      <A href="/earn/vouchers">{t("vouchers", "Vouchers")}</A>
    </Sub>
  </Section>

  {/* GUIDES */}
  <Section id="guides" title={t("guides", "Guides")}>
    <A href="/make-money/make-money-online">{t("makeMoneyOnline", "Make Money Online")}</A>
    <A href="/make-money/earn-money-from-home">{t("earnFromHome", "Earn from Home")}</A>
    <A href="/make-money/earn-without-investment">{t("earnWithoutInvestment", "Earn without Investment")}</A>
    <A href="/make-money/get-paid-to-play-games">{t("getPaidToPlayGames", "Get Paid to Play Games")}</A>
    <A href="/make-money/install-apps-for-cash">{t("installApps", "Install Apps")}</A>
    <A href="/make-money/watch-videos-for-money">{t("watchVideosForMoney", "Watch Videos for Money")}</A>
    <A href="/make-money/complete-offers-online">{t("completeOffersOnline", "Complete Offers Online")}</A>
    <A href="/make-money/work-from-home-jobs">{t("workFromHomeJobs", "Work from Home Jobs")}</A>
    <A href="/make-money/online-earning-methods">{t("onlineEarningMethods", "Online Earning Methods")}</A>
    <A href="/make-money/earn-money-online-fast">{t("earnFast", "Earn Fast")}</A>

    <Sub id="allGuides" title={t("allGuides", "All Guides")}>
      <A href="/make-money/passive-income-online">{t("passiveIncome", "Passive Income")}</A>
      <A href="/make-money/online-jobs-for-beginners">{t("onlineJobs", "Online Jobs")}</A>
      <A href="/make-money/earn-money-as-a-student">{t("studentEarnings", "Student Earnings")}</A>
      <A href="/make-money/earn-money-without-skills">{t("earnWithoutSkills", "Earn without Skills")}</A>
      <A href="/make-money/earn-money-using-mobile">{t("earnUsingMobile", "Earn Using Mobile")}</A>
      <A href="/make-money/earn-money-online-worldwide">{t("earnWorldwide", "Earn Worldwide")}</A>
      <A href="/make-money/cashback-rewards">{t("cashbackRewards", "Cashback Rewards")}</A>
      <A href="/make-money/legit-ways-to-make-money-online">{t("legitWays", "Legit Ways")}</A>
      <A href="/make-money/free-ways-to-make-money-online">{t("freeWays", "Free Ways")}</A>
    </Sub>
  </Section>

  {/* REWARDS */}
  <Section id="rewards" title={t("rewards", "Rewards")}>
    <A href="/earn-paypal-money">{t("earnPayPal", "Earn PayPal Money")}</A>

    <Sub id="giftcards" title={t("earnGiftCards", "Earn Gift Cards")}>
      <A href="/earn-amazon-gift-card">{t("amazonGiftCard", "Amazon Gift Card")}</A>
      <A href="/earn-apple-gift-card">{t("appleGiftCard", "Apple Gift Card")}</A>
      <A href="/earn-google-play-gift-card">{t("googleGiftCard", "Google Play Gift Card")}</A>
    </Sub>

    <Sub id="crypto" title={t("earnCrypto", "Earn Crypto")}>
      <A href="/earn-bitcoin-online">{t("bitcoin", "Bitcoin")}</A>
      <A href="/earn-litecoin-online">{t("litecoin", "Litecoin")}</A>
      <A href="/earn-ethereum-online">{t("ethereum", "Ethereum")}</A>
      <A href="/earn-dogecoin-online">{t("dogecoin", "Dogecoin")}</A>
    </Sub>

    <Sub id="gaming" title={t("earnGaming", "Earn Gaming")}>
      <A href="/earn-free-robux">{t("robux", "Free Robux")}</A>
      <A href="/earn-steam-gift-cards">{t("steam", "Steam Gift Cards")}</A>
      <A href="/earn-xbox-gift-cards">{t("xbox", "Xbox Gift Cards")}</A>
      <A href="/earn-psn-gift-cards">{t("psn", "PSN Gift Cards")}</A>
    </Sub>

    <A href="/earn-spotify-premium">{t("spotify", "Spotify Premium")}</A>
  </Section>

  {/* RESOURCES */}
  <Section id="resources" title={t("resources", "Resources")}>
    <A href="/blog">{t("blog", "Blog")}</A>
    <A href="/help">{t("helpCenter", "Help Center")}</A>
    <A href="/faq">{t("faq", "FAQ")}</A>
    <A href="/contact">{t("contactSupport", "Contact Support")}</A>
    <A href="/about">{t("about", "About")}</A>
  </Section>

  {/* BUSINESS */}
  <Section id="business" title={t("business", "Business")}>
    <A href="/affiliate">{t("affiliate", "Affiliate")}</A>
    <A href="/partners">{t("partners", "Partners")}</A>
    <A href="/advertise">{t("advertise", "Advertise")}</A>
  </Section>

  {/* CASHBACK */}
  <Section id="cashback" title={t("cashback", "Cashback")}>
    <A href="/cashback-offers">{t("cashbackOffers", "Cashback Offers")}</A>

    <Sub id="shopping" title={t("shoppingRewards", "Shopping Rewards")}>
      <A href="/shopping-rewards/electronics">{t("electronics", "Electronics")}</A>
      <A href="/shopping-rewards/fashion">{t("fashion", "Fashion")}</A>
      <A href="/shopping-rewards/home-garden">{t("homeGarden", "Home & Garden")}</A>
      <A href="/shopping-rewards/grocery">{t("grocery", "Grocery")}</A>
      <A href="/shopping-rewards/beauty">{t("beauty", "Beauty")}</A>
      <A href="/shopping-rewards/mobile">{t("mobile", "Mobile")}</A>

      <Sub id="travel" title={t("travel", "Travel")} level={2}>
        <A href="/shopping-rewards/travel/hotels">{t("hotels", "Hotels")}</A>
        <A href="/shopping-rewards/travel/flights">{t("flights", "Flights")}</A>
      </Sub>

      <A href="/shopping-rewards/finance">{t("finance", "Finance")}</A>
    </Sub>

    <A href="/promo-codes">{t("promoCodes", "Promo Codes")}</A>
    <A href="/daily-deals">{t("dailyDeals", "Daily Deals")}</A>
    <A href="/banking-finance-offers">{t("banking", "Banking & Finance")}</A>
  </Section>

  {/* LEGAL */}
  <Section id="legal" title={t("legal", "Legal")}>
    <A href="/terms-and-conditions">{t("terms", "Terms & Conditions")}</A>
    <A href="/privacy-policy">{t("privacy", "Privacy Policy")}</A>
    <A href="/cookie-policy">{t("cookies", "Cookie Policy")}</A>
  </Section>

</div>

        {/* SOCIAL */}
        <div className="border-t border-theme mt-12 pt-8 flex justify-center gap-6">
          <a href="https://twitter.com/cashog" target="_blank" rel="noopener noreferrer">
            <Twitter size={20} />
          </a>
          <a href="https://facebook.com/cashog" target="_blank" rel="noopener noreferrer">
            <Facebook size={20} />
          </a>
          <a href="https://instagram.com/cashog" target="_blank" rel="noopener noreferrer">
            <Instagram size={20} />
          </a>
          <a href="https://youtube.com/cashog" target="_blank" rel="noopener noreferrer">
            <Youtube size={20} />
          </a>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-sm text-primary mt-8 pb-4">
          {t("copyright", "© 2026 Cashog. All rights reserved.")}
        </div>

      </div>
    </footer>
  );
}
