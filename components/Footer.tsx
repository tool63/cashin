"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Twitter, Facebook, Instagram, Youtube, ChevronDown } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa"; // Play Store icon

type Toggle = Record<string, boolean>;

// Fallback translations
const t = (key: string) => {
  const translations: Record<string, any> = {
    "footer.getStarted": "Get Started",
    "footer.waysToEarn": "Ways to Earn",
    "footer.guides": "Guides",
    "footer.rewards": "Rewards",
    "footer.resources": "Resources",
    "footer.business": "Business",
    "footer.cashback": "Cashback",
    "footer.legal": "Legal",
    "footer.contact": "Contact Us",
    "footer.copyright": "© 2026 Cashog. All rights reserved.",
    "footer.links": {
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
  return translations[key] || key;
};

export default function Footer() {
  const [open, setOpen] = useState<Toggle>({});
  const [sub, setSub] = useState<Toggle>({});
  const [sub2, setSub2] = useState<Toggle>({});

  const toggle = (k: string) => setOpen((p) => ({ ...p, [k]: !p[k] }));
  const toggleSub = (k: string) => setSub((p) => ({ ...p, [k]: !p[k] }));
  const toggleSub2 = (k: string) => setSub2((p) => ({ ...p, [k]: !p[k] }));

  const A = ({ href, children }: { href: string; children: ReactNode }) => (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
      <Link
        href={href}
        className="block text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition"
      >
        {children}
      </Link>
    </motion.div>
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
        className="w-full flex justify-between items-center font-semibold mb-3 text-black dark:text-white"
      >
        {title}
        <ChevronDown size={16} className={`transition ${open[id] ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open[id] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-2 text-sm text-black dark:text-gray-400"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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
          className="w-full flex justify-between font-medium text-black dark:text-gray-300"
        >
          {title}
          <ChevronDown size={14} className={`transition ${state ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {state && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-2 space-y-2 pl-3"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const footerColumns = {
    getStarted: t("footer.getStarted"),
    waysToEarn: t("footer.waysToEarn"),
    guides: t("footer.guides"),
    rewards: t("footer.rewards"),
    resources: t("footer.resources"),
    business: t("footer.business"),
    cashback: t("footer.cashback"),
    legal: t("footer.legal"),
    // contact removed
  };

  const footerSocial = {
    twitter: "https://twitter.com/",
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  };

  const links = t("footer.links");

  return (
    <footer className="bg-gray-100 text-gray-700 dark:bg-[#070A14] dark:text-gray-300 transition-colors duration-300">
      {/* Columns Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

        {/* COLUMN 1 */}
        <Section id="start" title={footerColumns.getStarted}>
          <A href="/how-it-works">{links.howItWorks}</A>
          <A href="/start-earning">{links.startEarning}</A>
          <A href="/cashout">{links.cashoutMethods}</A>
          <A href="/withdrawals">{links.withdrawalProofs}</A>
          <A href="/trust-safety">{links.trustSafety}</A>
        </Section>

        {/* COLUMN 2 */}
        <Section id="earn" title={footerColumns.waysToEarn}>
          <A href="/surveys">{links.surveys}</A>
          <A href="/app-installs">{links.appInstalls}</A>
          <A href="/play-games">{links.playGames}</A>
          <A href="/watch-videos">{links.watchVideos}</A>
          <A href="/mining-rewards">{links.miningRewards}</A>
          <A href="/complete-offers">{links.completeOffers}</A>
          <A href="/offerwall">{links.offerwall}</A>
          <A href="/surveywall">{links.surveywall}</A>

          <Sub id="extra" title={links.extraEarning}>
            <A href="/watch-ads">{links.watchAds}</A>
            <A href="/micro-tasks">{links.microTasks}</A>
            <A href="/complete-free-trials">{links.freeTrials}</A>
            <A href="/test-products">{links.testProducts}</A>
            <A href="/read-emails">{links.readEmails}</A>
            <A href="/visit-websites">{links.visitWebsites}</A>
            <A href="/review-tasks">{links.reviewTasks}</A>
            <A href="/spinning-wheel">{links.spinningWheel}</A>
            <A href="/loyalty">{links.loyalty}</A>
            <A href="/vouchers">{links.vouchers}</A>
          </Sub>
        </Section>

        {/* COLUMN 3 */}
        <Section id="guides" title={footerColumns.guides}>
          <A href="/make-money-online">{links.makeMoneyOnline}</A>
          <A href="/earn-money-from-home">{links.earnFromHome}</A>
          <A href="/earn-without-investment">{links.earnWithoutInvestment}</A>
          <A href="/get-paid-to-play-games">{links.getPaidToPlayGames}</A>
          <A href="/install-apps-for-cash">{links.installApps}</A>
          <A href="/watch-videos-for-money">{links.watchVideosForMoney}</A>
          <A href="/complete-offers-online">{links.completeOffersOnline}</A>
          <A href="/work-from-home-jobs">{links.workFromHomeJobs}</A>
          <A href="/online-earning-methods">{links.onlineEarningMethods}</A>
          <A href="/earn-money-online-fast">{links.earnFast}</A>

          <Sub id="allGuides" title={links.allGuides}>
            <A href="/passive-income-online">{links.passiveIncome}</A>
            <A href="/online-jobs-for-beginners">{links.onlineJobs}</A>
            <A href="/earn-money-as-a-student">{links.studentEarnings}</A>
            <A href="/earn-money-without-skills">{links.earnWithoutSkills}</A>
            <A href="/earn-money-using-mobile">{links.earnUsingMobile}</A>
            <A href="/earn-money-online-worldwide">{links.earnWorldwide}</A>
            <A href="/cashback-rewards">{links.cashbackRewards}</A>
            <A href="/legit-ways-to-make-money-online">{links.legitWays}</A>
            <A href="/free-ways-to-make-money-online">{links.freeWays}</A>
          </Sub>
        </Section>

        {/* COLUMN 4: Rewards */}
        <Section id="rewards" title={footerColumns.rewards}>
          <A href="/earn-paypal-money">{links.earnPayPal}</A>

          <Sub id="giftcards" title={links.earnGiftCards}>
            <A href="/earn-amazon-gift-card">{links.amazonGiftCard}</A>
            <A href="/earn-apple-gift-card">{links.appleGiftCard}</A>
            <A href="/earn-google-play-gift-card">{links.googleGiftCard}</A>
          </Sub>

          <Sub id="crypto" title={links.earnCrypto}>
            <A href="/earn-bitcoin-online">{links.bitcoin}</A>
            <A href="/earn-litecoin-online">{links.litecoin}</A>
            <A href="/earn-ethereum-online">{links.ethereum}</A>
            <A href="/earn-dogecoin-online">{links.dogecoin}</A>
          </Sub>

          <Sub id="gaming" title={links.earnGaming}>
            <A href="/earn-free-robux">{links.robux}</A>
            <A href="/earn-steam-gift-cards">{links.steam}</A>
            <A href="/earn-xbox-gift-cards">{links.xbox}</A>
            <A href="/earn-psn-gift-cards">{links.psn}</A>
          </Sub>

          <A href="/earn-spotify-premium">{links.spotify}</A>
        </Section>

        {/* COLUMN 5: Resources */}
        <Section id="resources" title={footerColumns.resources}>
          <A href="/blog">{links.blog}</A>
          <A href="/help">{links.helpCenter}</A>
          <A href="/faq">{links.faq}</A>
          <A href="/contact">{links.contactSupport}</A>
          <A href="/about">{links.about}</A>
        </Section>

        {/* COLUMN 6: Business */}
        <Section id="business" title={footerColumns.business}>
          <A href="/affiliate">{links.affiliate}</A>
          <A href="/partners">{links.partners}</A>
          <A href="/advertise">{links.advertise}</A>
        </Section>

        {/* COLUMN 7: Cashback */}
        <Section id="cashback" title={footerColumns.cashback}>
          <A href="/cashback-offers">{links.cashbackOffers}</A>

          <Sub id="shopping" title={links.shoppingRewards}>
            <A href="/shopping-rewards/electronics">{links.electronics}</A>
            <A href="/shopping-rewards/fashion">{links.fashion}</A>
            <A href="/shopping-rewards/home-garden">{links.homeGarden}</A>
            <A href="/shopping-rewards/grocery">{links.grocery}</A>
            <A href="/shopping-rewards/beauty">{links.beauty}</A>
            <A href="/shopping-rewards/mobile">{links.mobile}</A>

            <Sub id="travel" title={links.travel} level={2}>
              <A href="/shopping-rewards/travel/hotels">{links.hotels}</A>
              <A href="/shopping-rewards/travel/flights">{links.flights}</A>
            </Sub>

            <A href="/shopping-rewards/finance">{links.finance}</A>
          </Sub>

          <A href="/promo-codes">{links.promoCodes}</A>
          <A href="/daily-deals">{links.dailyDeals}</A>
          <A href="/banking-finance-offers">{links.banking}</A>
        </Section>

        {/* COLUMN 8: Legal */}
        <Section id="legal" title={footerColumns.legal}>
          <A href="https://cashog.com/terms-and-conditions">{links.terms}</A>
          <A href="https://cashog.com/privacy-policy">{links.privacy}</A>
          <A href="https://cashog.com/cookie-policy">{links.cookies}</A>
        </Section>

        {/* COLUMN 9: Play Store */}
        <Section id="playstore" title="Get Our App">
          <a
            href="#"
            className="flex items-center text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition space-x-2"
          >
            <FaGooglePlay size={24} />
            <span>Play Store</span>
          </a>
        </Section>
      </div>

      {/* SOCIAL */}
      <div className="border-t border-white/10 py-6 flex justify-center gap-6">
        <a href={footerSocial.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter />
        </a>
        <a href={footerSocial.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook />
        </a>
        <a href={footerSocial.instagram} target="_blank" rel="noopener noreferrer">
          <Instagram />
        </a>
        <a href={footerSocial.youtube} target="_blank" rel="noopener noreferrer">
          <Youtube />
        </a>
      </div>

      <div className="text-center text-sm text-gray-500 pb-6">
        {t("footer.copyright")}
      </div>
    </footer>
  );
}
