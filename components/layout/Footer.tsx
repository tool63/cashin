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

/* ---------- HELPER: DEEP GET ---------- */
const getDeep = (obj: any, path: string): any =>
  path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);

export default function Footer({ className }: FooterProps) {
  const { getTranslation, translations, language, isLoading } = useLanguage();
  const { country } = useCountry();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[Footer]", { language, isLoading, translations });
    }
  }, [language, isLoading, translations]);

  /* ---------- FINAL TRANSLATION FUNCTION ---------- */
  const t = useCallback((key: string, fallback?: string): string => {
    const dynamic = getDeep(translations?.footer, key);
    if (dynamic && typeof dynamic === "string") return dynamic;

    const staticVal = getDeep(STATIC_FALLBACKS, key);
    if (staticVal && typeof staticVal === "string") return staticVal;

    const legacy = getTranslation("footer", key, "");
    if (legacy) return legacy;

    return fallback || key;
  }, [translations, getTranslation]);

  /* ---------- TITLES ---------- */
  const columnTitles = useMemo(() => ({
    getStarted: t("getStarted"),
    waysToEarn: t("waysToEarn"),
    guides: t("guides"),
    rewards: t("rewards"),
    resources: t("resources"),
    business: t("business"),
    cashback: t("cashback"),
    legal: t("legal"),
  }), [t]);

  /* ---------- LINKS (FIXED) ---------- */
  const linkTexts = useMemo(() => ({
    howItWorks: t("links.howItWorks"),
    startEarning: t("links.startEarning"),
    cashoutMethods: t("links.cashoutMethods"),
    withdrawalProofs: t("links.withdrawalProofs"),
    trustSafety: t("links.trustSafety"),
    surveys: t("links.surveys"),
    appInstalls: t("links.appInstalls"),
    playGames: t("links.playGames"),
    watchVideos: t("links.watchVideos"),
    miningRewards: t("links.miningRewards"),
    completeOffers: t("links.completeOffers"),
    offerwall: t("links.offerwall"),
    surveywall: t("links.surveywall"),
    extraEarning: t("links.extraEarning"),
    watchAds: t("links.watchAds"),
    microTasks: t("links.microTasks"),
    freeTrials: t("links.freeTrials"),
    testProducts: t("links.testProducts"),
    readEmails: t("links.readEmails"),
    visitWebsites: t("links.visitWebsites"),
    reviewTasks: t("links.reviewTasks"),
    spinningWheel: t("links.spinningWheel"),
    loyalty: t("links.loyalty"),
    vouchers: t("links.vouchers"),
    makeMoneyOnline: t("links.makeMoneyOnline"),
    earnFromHome: t("links.earnFromHome"),
    earnWithoutInvestment: t("links.earnWithoutInvestment"),
    getPaidToPlayGames: t("links.getPaidToPlayGames"),
    installApps: t("links.installApps"),
    watchVideosForMoney: t("links.watchVideosForMoney"),
    completeOffersOnline: t("links.completeOffersOnline"),
    workFromHomeJobs: t("links.workFromHomeJobs"),
    onlineEarningMethods: t("links.onlineEarningMethods"),
    earnFast: t("links.earnFast"),
    allGuides: t("links.allGuides"),
    passiveIncome: t("links.passiveIncome"),
    onlineJobs: t("links.onlineJobs"),
    studentEarnings: t("links.studentEarnings"),
    earnWithoutSkills: t("links.earnWithoutSkills"),
    earnUsingMobile: t("links.earnUsingMobile"),
    earnWorldwide: t("links.earnWorldwide"),
    cashbackRewards: t("links.cashbackRewards"),
    legitWays: t("links.legitWays"),
    freeWays: t("links.freeWays"),
    earnPayPal: t("links.earnPayPal"),
    earnGiftCards: t("links.earnGiftCards"),
    amazonGiftCard: t("links.amazonGiftCard"),
    appleGiftCard: t("links.appleGiftCard"),
    googleGiftCard: t("links.googleGiftCard"),
    earnCrypto: t("links.earnCrypto"),
    bitcoin: t("links.bitcoin"),
    litecoin: t("links.litecoin"),
    ethereum: t("links.ethereum"),
    dogecoin: t("links.dogecoin"),
    earnGaming: t("links.earnGaming"),
    robux: t("links.robux"),
    steam: t("links.steam"),
    xbox: t("links.xbox"),
    psn: t("links.psn"),
    spotify: t("links.spotify"),
    blog: t("links.blog"),
    helpCenter: t("links.helpCenter"),
    faq: t("links.faq"),
    contactSupport: t("links.contactSupport"),
    about: t("links.about"),
    affiliate: t("links.affiliate"),
    partners: t("links.partners"),
    advertise: t("links.advertise"),
    cashbackOffers: t("links.cashbackOffers"),
    shoppingRewards: t("links.shoppingRewards"),
    electronics: t("links.electronics"),
    fashion: t("links.fashion"),
    homeGarden: t("links.homeGarden"),
    grocery: t("links.grocery"),
    beauty: t("links.beauty"),
    mobile: t("links.mobile"),
    travel: t("links.travel"),
    hotels: t("links.hotels"),
    flights: t("links.flights"),
    finance: t("links.finance"),
    promoCodes: t("links.promoCodes"),
    dailyDeals: t("links.dailyDeals"),
    banking: t("links.banking"),
    terms: t("links.terms"),
    privacy: t("links.privacy"),
    cookies: t("links.cookies"),
  }), [t]);

  const [open, setOpen] = useState<Toggle>({});

  const toggle = useCallback((k: string) => {
    setOpen((p) => ({ ...p, [k]: !p[k] }));
  }, []);

  const A = ({ href, children }: { href: string; children: ReactNode }) => {
    const isExternal = href.startsWith("http");
    if (isExternal) return <a href={href} target="_blank">{children}</a>;
    return <Link href={`/${country}${href}`}>{children}</Link>;
  };

  const Section = ({ id, title, children }: any) => (
    <div>
      <button onClick={() => toggle(id)} className="flex justify-between w-full font-semibold mb-3">
        {title}
        <ChevronDown size={16} />
      </button>
      {open[id] && <div className="space-y-2 text-sm">{children}</div>}
    </div>
  );

  return (
    <footer className={`p-10 ${className || ""}`}>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">

  {/* GET STARTED */}
  <Section id="start" title={columnTitles.getStarted}>
    <A href="/how-it-works">{linkTexts.howItWorks}</A>
    <A href="/start-earning">{linkTexts.startEarning}</A>
    <A href="/cashout">{linkTexts.cashoutMethods}</A>
    <A href="/withdrawals">{linkTexts.withdrawalProofs}</A>
    <A href="/trust-safety">{linkTexts.trustSafety}</A>
  </Section>

  {/* WAYS TO EARN */}
  <Section id="earn" title={columnTitles.waysToEarn}>
    <A href="/surveys">{linkTexts.surveys}</A>
    <A href="/app-installs">{linkTexts.appInstalls}</A>
    <A href="/play-games">{linkTexts.playGames}</A>
    <A href="/watch-videos">{linkTexts.watchVideos}</A>
    <A href="/mining-rewards">{linkTexts.miningRewards}</A>
    <A href="/complete-offers">{linkTexts.completeOffers}</A>
    <A href="/offerwall">{linkTexts.offerwall}</A>
    <A href="/surveywall">{linkTexts.surveywall}</A>

    <Sub id="extra" title={linkTexts.extraEarning}>
      <A href="/watch-ads">{linkTexts.watchAds}</A>
      <A href="/micro-tasks">{linkTexts.microTasks}</A>
      <A href="/complete-free-trials">{linkTexts.freeTrials}</A>
      <A href="/test-products">{linkTexts.testProducts}</A>
      <A href="/read-emails">{linkTexts.readEmails}</A>
      <A href="/visit-websites">{linkTexts.visitWebsites}</A>
      <A href="/review-tasks">{linkTexts.reviewTasks}</A>
      <A href="/spinning-wheel">{linkTexts.spinningWheel}</A>
      <A href="/loyalty">{linkTexts.loyalty}</A>
      <A href="/vouchers">{linkTexts.vouchers}</A>
    </Sub>
  </Section>

  {/* GUIDES */}
  <Section id="guides" title={columnTitles.guides}>
    <A href="/make-money-online">{linkTexts.makeMoneyOnline}</A>
    <A href="/earn-money-from-home">{linkTexts.earnFromHome}</A>
    <A href="/earn-without-investment">{linkTexts.earnWithoutInvestment}</A>
    <A href="/get-paid-to-play-games">{linkTexts.getPaidToPlayGames}</A>
    <A href="/install-apps-for-cash">{linkTexts.installApps}</A>
    <A href="/watch-videos-for-money">{linkTexts.watchVideosForMoney}</A>
    <A href="/complete-offers-online">{linkTexts.completeOffersOnline}</A>
    <A href="/work-from-home-jobs">{linkTexts.workFromHomeJobs}</A>
    <A href="/online-earning-methods">{linkTexts.onlineEarningMethods}</A>
    <A href="/earn-money-online-fast">{linkTexts.earnFast}</A>

    <Sub id="allGuides" title={linkTexts.allGuides}>
      <A href="/passive-income-online">{linkTexts.passiveIncome}</A>
      <A href="/online-jobs-for-beginners">{linkTexts.onlineJobs}</A>
      <A href="/earn-money-as-a-student">{linkTexts.studentEarnings}</A>
      <A href="/earn-money-without-skills">{linkTexts.earnWithoutSkills}</A>
      <A href="/earn-money-using-mobile">{linkTexts.earnUsingMobile}</A>
      <A href="/earn-money-online-worldwide">{linkTexts.earnWorldwide}</A>
      <A href="/cashback-rewards">{linkTexts.cashbackRewards}</A>
      <A href="/legit-ways-to-make-money-online">{linkTexts.legitWays}</A>
      <A href="/free-ways-to-make-money-online">{linkTexts.freeWays}</A>
    </Sub>
  </Section>

  {/* REWARDS */}
  <Section id="rewards" title={columnTitles.rewards}>
    <A href="/earn-paypal-money">{linkTexts.earnPayPal}</A>

    <Sub id="giftcards" title={linkTexts.earnGiftCards}>
      <A href="/earn-amazon-gift-card">{linkTexts.amazonGiftCard}</A>
      <A href="/earn-apple-gift-card">{linkTexts.appleGiftCard}</A>
      <A href="/earn-google-play-gift-card">{linkTexts.googleGiftCard}</A>
    </Sub>

    <Sub id="crypto" title={linkTexts.earnCrypto}>
      <A href="/earn-bitcoin-online">{linkTexts.bitcoin}</A>
      <A href="/earn-litecoin-online">{linkTexts.litecoin}</A>
      <A href="/earn-ethereum-online">{linkTexts.ethereum}</A>
      <A href="/earn-dogecoin-online">{linkTexts.dogecoin}</A>
    </Sub>

    <Sub id="gaming" title={linkTexts.earnGaming}>
      <A href="/earn-free-robux">{linkTexts.robux}</A>
      <A href="/earn-steam-gift-cards">{linkTexts.steam}</A>
      <A href="/earn-xbox-gift-cards">{linkTexts.xbox}</A>
      <A href="/earn-psn-gift-cards">{linkTexts.psn}</A>
    </Sub>

    <A href="/earn-spotify-premium">{linkTexts.spotify}</A>
  </Section>

  {/* RESOURCES */}
  <Section id="resources" title={columnTitles.resources}>
    <A href="/blog">{linkTexts.blog}</A>
    <A href="/help">{linkTexts.helpCenter}</A>
    <A href="/faq">{linkTexts.faq}</A>
    <A href="/contact">{linkTexts.contactSupport}</A>
    <A href="/about">{linkTexts.about}</A>
  </Section>

  {/* BUSINESS */}
  <Section id="business" title={columnTitles.business}>
    <A href="/affiliate">{linkTexts.affiliate}</A>
    <A href="/partners">{linkTexts.partners}</A>
    <A href="/advertise">{linkTexts.advertise}</A>
  </Section>

  {/* CASHBACK */}
  <Section id="cashback" title={columnTitles.cashback}>
    <A href="/cashback-offers">{linkTexts.cashbackOffers}</A>

    <Sub id="shopping" title={linkTexts.shoppingRewards}>
      <A href="/shopping-rewards/electronics">{linkTexts.electronics}</A>
      <A href="/shopping-rewards/fashion">{linkTexts.fashion}</A>
      <A href="/shopping-rewards/home-garden">{linkTexts.homeGarden}</A>
      <A href="/shopping-rewards/grocery">{linkTexts.grocery}</A>
      <A href="/shopping-rewards/beauty">{linkTexts.beauty}</A>
      <A href="/shopping-rewards/mobile">{linkTexts.mobile}</A>

      <Sub id="travel" title={linkTexts.travel} level={2}>
        <A href="/shopping-rewards/travel/hotels">{linkTexts.hotels}</A>
        <A href="/shopping-rewards/travel/flights">{linkTexts.flights}</A>
      </Sub>

      <A href="/shopping-rewards/finance">{linkTexts.finance}</A>
    </Sub>

    <A href="/promo-codes">{linkTexts.promoCodes}</A>
    <A href="/daily-deals">{linkTexts.dailyDeals}</A>
    <A href="/banking-finance-offers">{linkTexts.banking}</A>
  </Section>

  {/* LEGAL */}
  <Section id="legal" title={columnTitles.legal}>
    <A href="/terms-and-conditions">{linkTexts.terms}</A>
    <A href="/privacy-policy">{linkTexts.privacy}</A>
    <A href="/cookie-policy">{linkTexts.cookies}</A>
  </Section>

</div>

{/* SOCIAL */}
<div className="border-t border-theme mt-12 pt-8 flex justify-center gap-6">
  <a href="https://twitter.com/cashog" target="_blank"><Twitter size={20} /></a>
  <a href="https://facebook.com/cashog" target="_blank"><Facebook size={20} /></a>
  <a href="https://instagram.com/cashog" target="_blank"><Instagram size={20} /></a>
  <a href="https://youtube.com/cashog" target="_blank"><Youtube size={20} /></a>
</div>

{/* COPYRIGHT */}
<div className="text-center text-sm text-primary mt-8 pb-4">
  {t("copyright")}
</div>
  );
}
