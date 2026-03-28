"use client";

import { useState, ReactNode, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/app/[country]/providers/LanguageProvider";
import { useCountry } from "@/app/[country]/providers/CountryProvider";

type Toggle = Record<string, boolean>;

interface FooterProps {
  className?: string;
}

/* ---------- STATIC FALLBACK TRANSLATIONS (only as last resort) ---------- */
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
  const { getTranslation, translations, language, isLoading } = useLanguage();
  const { country } = useCountry();

  // Debug: Log translation status (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Footer] Language: ${language}, isLoading: ${isLoading}`);
      console.log(`[Footer] Translations available:`, Object.keys(translations || {}));
    }
  }, [language, isLoading, translations]);

  // Enhanced translation helper with proper fallback chain
  const t = useCallback((key: string, fallback?: string): string => {
    // Try to get from dynamic translations first
    const dynamicTranslation = getTranslation("footer", key, "");
    
    if (dynamicTranslation && dynamicTranslation !== "") {
      return dynamicTranslation;
    }
    
    // Try static fallbacks
    if (STATIC_FALLBACKS[key]) {
      const value = STATIC_FALLBACKS[key];
      if (typeof value === "string") return value;
    }
    
    // Try nested static fallbacks (for links)
    if (STATIC_FALLBACKS.links && STATIC_FALLBACKS.links[key]) {
      return STATIC_FALLBACKS.links[key];
    }
    
    // Return provided fallback or key
    return fallback || key;
  }, [getTranslation]);

  // Memoized column titles to prevent recalculation
  const columnTitles = useMemo(() => ({
    getStarted: t("getStarted", "Get Started"),
    waysToEarn: t("waysToEarn", "Ways to Earn"),
    guides: t("guides", "Guides"),
    rewards: t("rewards", "Rewards"),
    resources: t("resources", "Resources"),
    business: t("business", "Business"),
    cashback: t("cashback", "Cashback"),
    legal: t("legal", "Legal"),
  }), [t]);

  // Memoized link texts
  const linkTexts = useMemo(() => ({
    howItWorks: t("howItWorks", "How it works"),
    startEarning: t("startEarning", "Start Earning"),
    cashoutMethods: t("cashoutMethods", "Cashout Methods"),
    withdrawalProofs: t("withdrawalProofs", "Withdrawal Proofs"),
    trustSafety: t("trustSafety", "Trust & Safety"),
    surveys: t("surveys", "Surveys"),
    appInstalls: t("appInstalls", "App Installs"),
    playGames: t("playGames", "Play Games"),
    watchVideos: t("watchVideos", "Watch Videos"),
    miningRewards: t("miningRewards", "Mining Rewards"),
    completeOffers: t("completeOffers", "Complete Offers"),
    offerwall: t("offerwall", "Offerwall"),
    surveywall: t("surveywall", "Surveywall"),
    extraEarning: t("extraEarning", "Extra Earning"),
    watchAds: t("watchAds", "Watch Ads"),
    microTasks: t("microTasks", "Micro Tasks"),
    freeTrials: t("freeTrials", "Free Trials"),
    testProducts: t("testProducts", "Test Products"),
    readEmails: t("readEmails", "Read Emails"),
    visitWebsites: t("visitWebsites", "Visit Websites"),
    reviewTasks: t("reviewTasks", "Review Tasks"),
    spinningWheel: t("spinningWheel", "Spinning Wheel"),
    loyalty: t("loyalty", "Loyalty"),
    vouchers: t("vouchers", "Vouchers"),
    makeMoneyOnline: t("makeMoneyOnline", "Make Money Online"),
    earnFromHome: t("earnFromHome", "Earn from Home"),
    earnWithoutInvestment: t("earnWithoutInvestment", "Earn without Investment"),
    getPaidToPlayGames: t("getPaidToPlayGames", "Get Paid to Play Games"),
    installApps: t("installApps", "Install Apps"),
    watchVideosForMoney: t("watchVideosForMoney", "Watch Videos for Money"),
    completeOffersOnline: t("completeOffersOnline", "Complete Offers Online"),
    workFromHomeJobs: t("workFromHomeJobs", "Work from Home Jobs"),
    onlineEarningMethods: t("onlineEarningMethods", "Online Earning Methods"),
    earnFast: t("earnFast", "Earn Fast"),
    allGuides: t("allGuides", "All Guides"),
    passiveIncome: t("passiveIncome", "Passive Income"),
    onlineJobs: t("onlineJobs", "Online Jobs"),
    studentEarnings: t("studentEarnings", "Student Earnings"),
    earnWithoutSkills: t("earnWithoutSkills", "Earn without Skills"),
    earnUsingMobile: t("earnUsingMobile", "Earn Using Mobile"),
    earnWorldwide: t("earnWorldwide", "Earn Worldwide"),
    cashbackRewards: t("cashbackRewards", "Cashback Rewards"),
    legitWays: t("legitWays", "Legit Ways"),
    freeWays: t("freeWays", "Free Ways"),
    earnPayPal: t("earnPayPal", "Earn PayPal Money"),
    earnGiftCards: t("earnGiftCards", "Earn Gift Cards"),
    amazonGiftCard: t("amazonGiftCard", "Amazon Gift Card"),
    appleGiftCard: t("appleGiftCard", "Apple Gift Card"),
    googleGiftCard: t("googleGiftCard", "Google Play Gift Card"),
    earnCrypto: t("earnCrypto", "Earn Crypto"),
    bitcoin: t("bitcoin", "Bitcoin"),
    litecoin: t("litecoin", "Litecoin"),
    ethereum: t("ethereum", "Ethereum"),
    dogecoin: t("dogecoin", "Dogecoin"),
    earnGaming: t("earnGaming", "Earn Gaming"),
    robux: t("robux", "Free Robux"),
    steam: t("steam", "Steam Gift Cards"),
    xbox: t("xbox", "Xbox Gift Cards"),
    psn: t("psn", "PSN Gift Cards"),
    spotify: t("spotify", "Spotify Premium"),
    blog: t("blog", "Blog"),
    helpCenter: t("helpCenter", "Help Center"),
    faq: t("faq", "FAQ"),
    contactSupport: t("contactSupport", "Contact Support"),
    about: t("about", "About"),
    affiliate: t("affiliate", "Affiliate"),
    partners: t("partners", "Partners"),
    advertise: t("advertise", "Advertise"),
    cashbackOffers: t("cashbackOffers", "Cashback Offers"),
    shoppingRewards: t("shoppingRewards", "Shopping Rewards"),
    electronics: t("electronics", "Electronics"),
    fashion: t("fashion", "Fashion"),
    homeGarden: t("homeGarden", "Home & Garden"),
    grocery: t("grocery", "Grocery"),
    beauty: t("beauty", "Beauty"),
    mobile: t("mobile", "Mobile"),
    travel: t("travel", "Travel"),
    hotels: t("hotels", "Hotels"),
    flights: t("flights", "Flights"),
    finance: t("finance", "Finance"),
    promoCodes: t("promoCodes", "Promo Codes"),
    dailyDeals: t("dailyDeals", "Daily Deals"),
    banking: t("banking", "Banking & Finance"),
    terms: t("terms", "Terms & Conditions"),
    privacy: t("privacy", "Privacy Policy"),
    cookies: t("cookies", "Cookie Policy"),
  }), [t]);

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

  /* ---------- LINK COMPONENT WITH COUNTRY PREFIX ---------- */
  const A = ({ href, children }: { href: string; children: ReactNode }) => {
    // Check if it's an external link (starts with http)
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
    
    // Internal link - add country prefix
    const cleanHref = href.startsWith("/") ? href : `/${href}`;
    return (
      <Link
        href={`/${country}${cleanHref}`}
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
        aria-expanded={open[id]}
        aria-label={`Toggle ${title} section`}
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
          aria-expanded={state}
          aria-label={`Toggle ${title} submenu`}
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

  // Define footer columns for responsive layout
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
    <footer
      className={`bg-gradient-to-br from-yellow-400/20 via-green-400/30 to-green-500/20
      dark:from-yellow-500/10 dark:via-green-700/20 dark:to-green-800/20
      text-primary transition-colors duration-300 border-t border-theme ${className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Responsive Grid: 2 columns (mobile) → 3 columns (tablet) → 4 columns (desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {footerColumns.map((column) => (
            <Section key={column.id} id={column.id} title={column.title}>
              {/* Render direct links */}
              {column.links?.map((link) => (
                <A key={link.href} href={link.href}>
                  {link.text}
                </A>
              ))}

              {/* Render sub-sections */}
              {column.subSections?.map((subSection) => (
                <Sub key={subSection.id} id={subSection.id} title={subSection.title}>
                  {subSection.links?.map((link) => (
                    <A key={link.href} href={link.href}>
                      {link.text}
                    </A>
                  ))}
                  
                  {/* Render nested sub-sections */}
                  {subSection.nestedSubSections?.map((nestedSub) => (
                    <Sub key={nestedSub.id} id={nestedSub.id} title={nestedSub.title} level={2}>
                      {nestedSub.links?.map((link) => (
                        <A key={link.href} href={link.href}>
                          {link.text}
                        </A>
                      ))}
                    </Sub>
                  ))}
                  
                  {/* Render extra link in sub-section */}
                  {subSection.extraLink && (
                    <A href={subSection.extraLink.href}>
                      {subSection.extraLink.text}
                    </A>
                  )}
                </Sub>
              ))}

              {/* Render extra link */}
              {column.extraLink && (
                <A href={column.extraLink.href}>
                  {column.extraLink.text}
                </A>
              )}

              {/* Render extra links */}
              {column.extraLinks?.map((link) => (
                <A key={link.href} href={link.href}>
                  {link.text}
                </A>
              ))}
            </Section>
          ))}
        </div>

        {/* SOCIAL ICONS */}
        <div className="border-t border-theme mt-12 pt-8 flex justify-center gap-6">
          <a 
            href="https://twitter.com/cashog" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-80 transition-opacity"
            aria-label="Follow us on Twitter"
          >
            <Twitter size={20} />
          </a>
          <a 
            href="https://facebook.com/cashog" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-80 transition-opacity"
            aria-label="Follow us on Facebook"
          >
            <Facebook size={20} />
          </a>
          <a 
            href="https://instagram.com/cashog" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-80 transition-opacity"
            aria-label="Follow us on Instagram"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://youtube.com/cashog" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-80 transition-opacity"
            aria-label="Subscribe to our YouTube channel"
          >
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
