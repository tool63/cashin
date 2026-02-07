"use client"

import { useState, useEffect, ReactNode } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react"
import { useLang } from "@/app/providers/LanguageProvider"

type Toggle = Record<string, boolean>

export default function Footer() {
  const { t, lang, setLang } = useLang()

  const [open, setOpen] = useState<Toggle>({})
  const [sub, setSub] = useState<Toggle>({})
  const [sub2, setSub2] = useState<Toggle>({})
  const [isDesktop, setIsDesktop] = useState(false)

  /* Detect desktop */
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  /* Auto-set language by browser */
  useEffect(() => {
    if (!lang) {
      const browserLang = navigator.language.slice(0, 2)
      if (["en", "bn", "es"].includes(browserLang)) setLang(browserLang as "en" | "bn" | "es")
      else setLang("en")
    }
  }, [lang, setLang])

  const toggle = (k: string) => { if (!isDesktop) setOpen(p => ({ ...p, [k]: !p[k] })) }
  const toggleSub = (k: string) => { if (!isDesktop) setSub(p => ({ ...p, [k]: !p[k] })) }
  const toggleSub2 = (k: string) => { if (!isDesktop) setSub2(p => ({ ...p, [k]: !p[k] })) }

  const A = ({ href, children }: { href: string; children: ReactNode }) => (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
      <Link
        href={href}
        className="block transition text-black dark:text-gray-300 hover:text-black dark:hover:text-white"
      >
        {children}
      </Link>
    </motion.div>
  )

  const Section = ({
    id,
    title,
    children,
  }: {
    id: string
    title: string
    children: ReactNode
  }) => (
    <div>
      <button
        onClick={() => toggle(id)}
        className="w-full flex justify-between items-center font-semibold mb-3 text-black dark:text-white"
      >
        {title}
        {!isDesktop && <span>{open[id] ? "−" : "+"}</span>}
      </button>

      <AnimatePresence>
        {(isDesktop || open[id]) && (
          <motion.div
            initial={!isDesktop ? { height: 0, opacity: 0 } : false}
            animate={{ height: "auto", opacity: 1 }}
            exit={!isDesktop ? { height: 0, opacity: 0 } : undefined}
            transition={{ duration: 0.25 }}
            className="space-y-2 text-sm text-black dark:text-gray-400"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const Sub = ({
    id,
    title,
    children,
    level = 1,
  }: {
    id: string
    title: string
    children: ReactNode
    level?: number
  }) => {
    const state = level === 1 ? sub[id] : sub2[id]

    return (
      <div className="mt-2" style={{ paddingLeft: `${level * 8}px` }}>
        <button
          onClick={() => (level === 1 ? toggleSub(id) : toggleSub2(id))}
          className="w-full flex justify-between font-medium text-black dark:text-gray-300"
        >
          {title}
          {!isDesktop && <span>{state ? "−" : "+"}</span>}
        </button>

        <AnimatePresence>
          {(isDesktop || state) && (
            <motion.div
              initial={!isDesktop ? { height: 0, opacity: 0 } : false}
              animate={{ height: "auto", opacity: 1 }}
              exit={!isDesktop ? { height: 0, opacity: 0 } : undefined}
              transition={{ duration: 0.25 }}
              className="mt-2 space-y-2 pl-3"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  /* Column names only (translated) */
  const footerColumns = {
    getStarted: t("footer.getStarted"),
    waysToEarn: t("footer.waysToEarn"),
    guides: t("footer.guides"),
    rewards: t("footer.rewards"),
    resources: t("footer.resources"),
    business: t("footer.business"),
    cashback: t("footer.cashback"),
    legal: t("footer.legal"),
  }

  const footerSocial = {
    twitter: "https://twitter.com/",
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  }

  const copyright = t("footer.copyright")

  /* Link texts */
  const links = t("footer.links") || {}

  return (
    <footer className="bg-gray-100 text-gray-700 dark:bg-[#070A14] dark:text-gray-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">

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

        {/* COLUMN 4 */}
        <Section id="payments" title={footerColumns.rewards}>
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

        {/* COLUMN 5 */}
        <Section id="resources" title={footerColumns.resources}>
          <A href="/blog">{links.blog}</A>
          <A href="/help">{links.helpCenter}</A>
          <A href="/faq">{links.faq}</A>
          <A href="/contact">{links.contactSupport}</A>
          <A href="/about">{links.about}</A>
        </Section>

        {/* COLUMN 6 */}
        <Section id="business" title={footerColumns.business}>
          <A href="/affiliate">{links.affiliate}</A>
          <A href="/partners">{links.partners}</A>
          <A href="/advertise">{links.advertise}</A>
        </Section>

        {/* COLUMN 7 */}
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

        {/* COLUMN 8 */}
        <Section id="legal" title={footerColumns.legal}>
          <A href="https://cashog.com/terms-and-conditions">{links.terms}</A>
          <A href="https://cashog.com/privacy-policy">{links.privacy}</A>
          <A href="https://cashog.com/cookie-policy">{links.cookies}</A>
        </Section>
      </div>

      {/* SOCIAL */}
      <div className="border-t border-white/10 py-6 flex justify-center gap-6">
        <a href={footerSocial.twitter} target="_blank" rel="noopener noreferrer"><Twitter /></a>
        <a href={footerSocial.facebook} target="_blank" rel="noopener noreferrer"><Facebook /></a>
        <a href={footerSocial.instagram} target="_blank" rel="noopener noreferrer"><Instagram /></a>
        <a href={footerSocial.youtube} target="_blank" rel="noopener noreferrer"><Youtube /></a>
      </div>

      <div className="text-center text-sm text-gray-500 pb-6">
        {copyright}
      </div>
    </footer>
  )
}
