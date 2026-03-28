"use client";

import { useState, ReactNode, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";

type Toggle = Record<string, boolean>;

interface FooterProps {
  className?: string;
}

/* ---------- STATIC FALLBACKS ---------- */
const STATIC_FALLBACKS: Record<string, any> = {
  getStarted: "Get Started",
  waysToEarn: "Ways to Earn",
  guides: "Guides",
  rewards: "Rewards",
  resources: "Resources",
  business: "Business",
  cashback: "Cashback",
  legal: "Legal",
  copyright: "© 2026 Cashog. All rights reserved.",
  links: {
    howItWorks: "How it works",
    startEarning: "Start Earning",
    cashoutMethods: "Cashout Methods",
    withdrawalProofs: "Withdrawal Proofs",
    trustSafety: "Trust & Safety",
    surveys: "Surveys",
    appInstalls: "App Installs",
    playGames: "Play Games",
    watchVideos: "Watch Videos",
    miningRewards: "Mining Rewards",
    completeOffers: "Complete Offers",
    offerwall: "Offerwall",
    surveywall: "Surveywall",
    extraEarning: "Extra Earning",
    watchAds: "Watch Ads",
    microTasks: "Micro Tasks",
    freeTrials: "Free Trials",
    testProducts: "Test Products",
    readEmails: "Read Emails",
    visitWebsites: "Visit Websites",
    reviewTasks: "Review Tasks",
    spinningWheel: "Spinning Wheel",
    loyalty: "Loyalty",
    vouchers: "Vouchers",
    makeMoneyOnline: "Make Money Online",
    earnFromHome: "Earn from Home",
    earnWithoutInvestment: "Earn without Investment",
    getPaidToPlayGames: "Get Paid to Play Games",
    installApps: "Install Apps",
    watchVideosForMoney: "Watch Videos for Money",
    completeOffersOnline: "Complete Offers Online",
    workFromHomeJobs: "Work from Home Jobs",
    onlineEarningMethods: "Online Earning Methods",
    earnFast: "Earn Fast",
    allGuides: "All Guides",
    passiveIncome: "Passive Income",
    onlineJobs: "Online Jobs",
    studentEarnings: "Student Earnings",
    earnWithoutSkills: "Earn without Skills",
    earnUsingMobile: "Earn Using Mobile",
    earnWorldwide: "Earn Worldwide",
    cashbackRewards: "Cashback Rewards",
    legitWays: "Legit Ways",
    freeWays: "Free Ways",
    earnPayPal: "Earn PayPal Money",
    earnGiftCards: "Earn Gift Cards",
    amazonGiftCard: "Amazon Gift Card",
    appleGiftCard: "Apple Gift Card",
    googleGiftCard: "Google Play Gift Card",
    earnCrypto: "Earn Crypto",
    bitcoin: "Bitcoin",
    litecoin: "Litecoin",
    ethereum: "Ethereum",
    dogecoin: "Dogecoin",
    earnGaming: "Earn Gaming",
    robux: "Free Robux",
    steam: "Steam Gift Cards",
    xbox: "Xbox Gift Cards",
    psn: "PSN Gift Cards",
    spotify: "Spotify Premium",
    blog: "Blog",
    helpCenter: "Help Center",
    faq: "FAQ",
    contactSupport: "Contact Support",
    about: "About",
    affiliate: "Affiliate",
    partners: "Partners",
    advertise: "Advertise",
    cashbackOffers: "Cashback Offers",
    shoppingRewards: "Shopping Rewards",
    electronics: "Electronics",
    fashion: "Fashion",
    homeGarden: "Home & Garden",
    grocery: "Grocery",
    beauty: "Beauty",
    mobile: "Mobile",
    travel: "Travel",
    hotels: "Hotels",
    flights: "Flights",
    finance: "Finance",
    promoCodes: "Promo Codes",
    dailyDeals: "Daily Deals",
    banking: "Banking & Finance",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
  },
};

export default function Footer({ className }: FooterProps) {
  const { getTranslation } = useLanguage();
  const { country } = useCountry();

  // ✅ SAME STYLE AS HEADER
  const t = (key: string, fallback: string): string => {
    const val = getTranslation("footer", key, "");
    if (val) return val;

    if (STATIC_FALLBACKS[key]) return STATIC_FALLBACKS[key];
    if (STATIC_FALLBACKS.links?.[key]) return STATIC_FALLBACKS.links[key];

    return fallback;
  };

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

  const A = ({ href, children }: { href: string; children: ReactNode }) => {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block text-primary hover:opacity-80 hover:translate-x-1 transition-all duration-150">
          {children}
        </a>
      );
    }

    const cleanHref = href.startsWith("/") ? href : `/${href}`;

    return (
      <Link href={`/${country}${cleanHref}`} className="block text-primary hover:opacity-80 hover:translate-x-1 transition-all duration-150">
        {children}
      </Link>
    );
  };

  const Section = ({ id, title, children }: any) => (
    <div>
      <button onClick={() => toggle(id)} className="w-full flex justify-between items-center font-semibold mb-3 text-primary">
        {title}
        <ChevronDown size={16} className={`transition-transform ${open[id] ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open[id] && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-2 text-sm overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const Sub = ({ id, title, children, level = 1 }: any) => {
    const state = level === 1 ? sub[id] : sub2[id];
    const toggleFn = level === 1 ? toggleSub : toggleSub2;

    return (
      <div className="mt-2" style={{ paddingLeft: `${level * 12}px` }}>
        <button onClick={() => toggleFn(id)} className="w-full flex justify-between text-primary">
          {title}
          <ChevronDown size={14} className={`transition-transform ${state ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {state && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="mt-2 space-y-2 pl-3 overflow-hidden">
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const footerColumns = [
  {
    id: "start",
    title: columnTitles.getStarted,
    links: [
      { href: "/how-it-works", text: linkTexts.howItWorks },
      { href: "/start-earning", text: linkTexts.startEarning },
      { href: "/cashout", text: linkTexts.cashoutMethods },
      { href: "/withdrawals", text: linkTexts.withdrawalProofs },
      { href: "/trust-safety", text: linkTexts.trustSafety },
    ],
  },
  {
    id: "earn",
    title: columnTitles.waysToEarn,
    links: [
      { href: "/surveys", text: linkTexts.surveys },
      { href: "/app-installs", text: linkTexts.appInstalls },
      { href: "/play-games", text: linkTexts.playGames },
      { href: "/watch-videos", text: linkTexts.watchVideos },
      { href: "/mining-rewards", text: linkTexts.miningRewards },
      { href: "/complete-offers", text: linkTexts.completeOffers },
      { href: "/offerwall", text: linkTexts.offerwall },
      { href: "/surveywall", text: linkTexts.surveywall },
    ],
    subSections: [
      {
        id: "extra",
        title: linkTexts.extraEarning,
        links: [
          { href: "/watch-ads", text: linkTexts.watchAds },
          { href: "/micro-tasks", text: linkTexts.microTasks },
          { href: "/complete-free-trials", text: linkTexts.freeTrials },
          { href: "/test-products", text: linkTexts.testProducts },
          { href: "/read-emails", text: linkTexts.readEmails },
          { href: "/visit-websites", text: linkTexts.visitWebsites },
          { href: "/review-tasks", text: linkTexts.reviewTasks },
          { href: "/spinning-wheel", text: linkTexts.spinningWheel },
          { href: "/loyalty", text: linkTexts.loyalty },
          { href: "/vouchers", text: linkTexts.vouchers },
        ],
      },
    ],
  },
  {
    id: "guides",
    title: columnTitles.guides,
    links: [
      { href: "/make-money-online", text: linkTexts.makeMoneyOnline },
      { href: "/earn-money-from-home", text: linkTexts.earnFromHome },
      { href: "/earn-without-investment", text: linkTexts.earnWithoutInvestment },
      { href: "/get-paid-to-play-games", text: linkTexts.getPaidToPlayGames },
      { href: "/install-apps-for-cash", text: linkTexts.installApps },
      { href: "/watch-videos-for-money", text: linkTexts.watchVideosForMoney },
      { href: "/complete-offers-online", text: linkTexts.completeOffersOnline },
      { href: "/work-from-home-jobs", text: linkTexts.workFromHomeJobs },
      { href: "/online-earning-methods", text: linkTexts.onlineEarningMethods },
      { href: "/earn-money-online-fast", text: linkTexts.earnFast },
    ],
    subSections: [
      {
        id: "allGuides",
        title: linkTexts.allGuides,
        links: [
          { href: "/passive-income-online", text: linkTexts.passiveIncome },
          { href: "/online-jobs-for-beginners", text: linkTexts.onlineJobs },
          { href: "/earn-money-as-a-student", text: linkTexts.studentEarnings },
          { href: "/earn-money-without-skills", text: linkTexts.earnWithoutSkills },
          { href: "/earn-money-using-mobile", text: linkTexts.earnUsingMobile },
          { href: "/earn-money-online-worldwide", text: linkTexts.earnWorldwide },
          { href: "/cashback-rewards", text: linkTexts.cashbackRewards },
          { href: "/legit-ways-to-make-money-online", text: linkTexts.legitWays },
          { href: "/free-ways-to-make-money-online", text: linkTexts.freeWays },
        ],
      },
    ],
  },
  {
    id: "rewards",
    title: columnTitles.rewards,
    links: [
      { href: "/earn-paypal-money", text: linkTexts.earnPayPal },
    ],
    subSections: [
      {
        id: "giftcards",
        title: linkTexts.earnGiftCards,
        links: [
          { href: "/earn-amazon-gift-card", text: linkTexts.amazonGiftCard },
          { href: "/earn-apple-gift-card", text: linkTexts.appleGiftCard },
          { href: "/earn-google-play-gift-card", text: linkTexts.googleGiftCard },
        ],
      },
      {
        id: "crypto",
        title: linkTexts.earnCrypto,
        links: [
          { href: "/earn-bitcoin-online", text: linkTexts.bitcoin },
          { href: "/earn-litecoin-online", text: linkTexts.litecoin },
          { href: "/earn-ethereum-online", text: linkTexts.ethereum },
          { href: "/earn-dogecoin-online", text: linkTexts.dogecoin },
        ],
      },
      {
        id: "gaming",
        title: linkTexts.earnGaming,
        links: [
          { href: "/earn-free-robux", text: linkTexts.robux },
          { href: "/earn-steam-gift-cards", text: linkTexts.steam },
          { href: "/earn-xbox-gift-cards", text: linkTexts.xbox },
          { href: "/earn-psn-gift-cards", text: linkTexts.psn },
        ],
      },
    ],
    extraLink: { href: "/earn-spotify-premium", text: linkTexts.spotify },
  },
  {
    id: "resources",
    title: columnTitles.resources,
    links: [
      { href: "/blog", text: linkTexts.blog },
      { href: "/help", text: linkTexts.helpCenter },
      { href: "/faq", text: linkTexts.faq },
      { href: "/contact", text: linkTexts.contactSupport },
      { href: "/about", text: linkTexts.about },
    ],
  },
  {
    id: "business",
    title: columnTitles.business,
    links: [
      { href: "/affiliate", text: linkTexts.affiliate },
      { href: "/partners", text: linkTexts.partners },
      { href: "/advertise", text: linkTexts.advertise },
    ],
  },
  {
    id: "cashback",
    title: columnTitles.cashback,
    links: [
      { href: "/cashback-offers", text: linkTexts.cashbackOffers },
    ],
    subSections: [
      {
        id: "shopping",
        title: linkTexts.shoppingRewards,
        links: [
          { href: "/shopping-rewards/electronics", text: linkTexts.electronics },
          { href: "/shopping-rewards/fashion", text: linkTexts.fashion },
          { href: "/shopping-rewards/home-garden", text: linkTexts.homeGarden },
          { href: "/shopping-rewards/grocery", text: linkTexts.grocery },
          { href: "/shopping-rewards/beauty", text: linkTexts.beauty },
          { href: "/shopping-rewards/mobile", text: linkTexts.mobile },
        ],
        nestedSubSections: [
          {
            id: "travel",
            title: linkTexts.travel,
            links: [
              { href: "/shopping-rewards/travel/hotels", text: linkTexts.hotels },
              { href: "/shopping-rewards/travel/flights", text: linkTexts.flights },
            ],
          },
        ],
        extraLink: { href: "/shopping-rewards/finance", text: linkTexts.finance },
      },
    ],
    extraLinks: [
      { href: "/promo-codes", text: linkTexts.promoCodes },
      { href: "/daily-deals", text: linkTexts.dailyDeals },
      { href: "/banking-finance-offers", text: linkTexts.banking },
    ],
  },
  {
    id: "legal",
    title: columnTitles.legal,
    links: [
      { href: "/terms-and-conditions", text: linkTexts.terms },
      { href: "/privacy-policy", text: linkTexts.privacy },
      { href: "/cookie-policy", text: linkTexts.cookies },
    ],
  },
];

  return (
    <footer className={`bg-gradient-to-br from-yellow-400/20 via-green-400/30 to-green-500/20 dark:from-yellow-500/10 dark:via-green-700/20 dark:to-green-800/20 text-primary border-t border-theme ${className || ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {footerColumns.map((column) => (
            <Section key={column.id} id={column.id} title={column.title}>
              {column.links?.map((link) => (
                <A key={link.href} href={link.href}>{link.text}</A>
              ))}

              {column.subSections?.map((subSection) => (
                <Sub key={subSection.id} id={subSection.id} title={subSection.title}>
                  {subSection.links?.map((link) => (
                    <A key={link.href} href={link.href}>{link.text}</A>
                  ))}

                  {subSection.nestedSubSections?.map((nestedSub) => (
                    <Sub key={nestedSub.id} id={nestedSub.id} title={nestedSub.title} level={2}>
                      {nestedSub.links?.map((link) => (
                        <A key={link.href} href={link.href}>{link.text}</A>
                      ))}
                    </Sub>
                  ))}

                  {subSection.extraLink && (
                    <A href={subSection.extraLink.href}>{subSection.extraLink.text}</A>
                  )}
                </Sub>
              ))}

              {column.extraLink && <A href={column.extraLink.href}>{column.extraLink.text}</A>}

              {column.extraLinks?.map((link) => (
                <A key={link.href} href={link.href}>{link.text}</A>
              ))}
            </Section>
          ))}
        </div>

        {/* SOCIAL */}
        <div className="border-t border-theme mt-12 pt-8 flex justify-center gap-6">
          <a href="https://twitter.com/cashog" target="_blank"><Twitter size={20} /></a>
          <a href="https://facebook.com/cashog" target="_blank"><Facebook size={20} /></a>
          <a href="https://instagram.com/cashog" target="_blank"><Instagram size={20} /></a>
          <a href="https://youtube.com/cashog" target="_blank"><Youtube size={20} /></a>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-sm mt-8 pb-4">
          {t("copyright", "© 2026 Cashog. All rights reserved.")}
        </div>

      </div>
    </footer>
  );
}
