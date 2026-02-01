"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  Pinterest,
} from "lucide-react";

type ToggleMap = Record<string, boolean>;

export default function Footer() {
  const [open, setOpen] = useState<ToggleMap>({});
  const [subOpen, setSubOpen] = useState<ToggleMap>({});

  const toggle = (k: string) =>
    setOpen((p) => ({ ...p, [k]: !p[k] }));

  const toggleSub = (k: string) =>
    setSubOpen((p) => ({ ...p, [k]: !p[k] }));

  const Section = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="footer-box">
      <button className="footer-title" onClick={() => toggle(id)}>
        {title}
        <span className={`caret ${open[id] ? "open" : ""}`}>^</span>
      </button>
      {open[id] && <div className="footer-list">{children}</div>}
    </div>
  );

  const Sub = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="footer-sub">
      <button className="footer-subtitle" onClick={() => toggleSub(id)}>
        {title}
        <span className={`caret small ${subOpen[id] ? "open" : ""}`}>^</span>
      </button>
      {subOpen[id] && <div className="footer-sublist">{children}</div>}
    </div>
  );

  const A = ({ href, label }: { href: string; label: string }) => (
    <Link href={href}>{label}</Link>
  );

  return (
    <footer className="footer-bg">
      <div className="footer-wrap">

        {/* ================= GRID ================= */}
        <div className="footer-grid">

          {/* COLUMN 1 */}
          <Section id="get-started" title="Get Started">
            <A href="/how-it-works" label="How Cashog Works" />
            <A href="/start-earning" label="How to Start Earning" />
            <A href="/cashout" label="Cashout Methods" />
            <A href="/withdrawals" label="Withdrawal Proofs" />
            <A href="/trust-safety" label="Trust & Safety" />
          </Section>

          {/* COLUMN 2 */}
          <Section id="ways" title="Ways To Earn">
            <A href="/surveys" label="Surveys" />
            <A href="/app-installs" label="App Installs" />
            <A href="/play-games" label="Playing Games" />
            <A href="/watch-videos" label="Watching Videos" />
            <A href="/mining-rewards" label="Mining Rewards" />
            <A href="/complete-offers" label="Completing Offers" />
            <A href="/offerwall" label="Offerwall" />
            <A href="/surveywall" label="Surveywall" />

            <Sub id="extra-earning" title="Extra Earning">
              <A href="/watch-ads" label="Watching Ads" />
              <A href="/micro-tasks" label="Micro Tasks" />
              <A href="/complete-free-trials" label="Free Trials" />
              <A href="/test-products" label="Testing Products" />
              <A href="/read-emails" label="Reading Emails" />
              <A href="/visit-websites" label="Visiting Websites" />
              <A href="/review-tasks" label="Review Tasks" />
              <A href="/spinning-wheel" label="Spinning Wheel" />
              <A href="/loyalty" label="Loyalty" />
              <A href="/vouchers" label="Vouchers" />
            </Sub>
          </Section>

          {/* COLUMN 3 */}
          <Section id="guides" title="Guides & Tips">
            <A href="/make-money-online" label="Make Money Online" />
            <A href="/earn-money-from-home" label="Earn Money from Home" />
            <A href="/earn-without-investment" label="Earn Without Investment" />
            <A href="/get-paid-to-play-games" label="Get Paid to Play Games" />
            <A href="/install-apps-for-cash" label="Install Apps for Cash" />
            <A href="/watch-videos-for-money" label="Watch Videos for Money" />
            <A href="/complete-offers-online" label="Complete Offers Online" />
            <A href="/work-from-home-jobs" label="Work from Home Jobs" />
            <A href="/online-earning-methods" label="Online Earning Methods" />
            <A href="/earn-money-online-fast" label="Earn Money Online Fast" />

            <Sub id="all-guides" title="All Guides">
              <A href="/passive-income-online" label="Passive Income Online" />
              <A href="/online-jobs-for-beginners" label="Online Jobs for Beginners" />
              <A href="/earn-money-as-a-student" label="Earn as a Student" />
              <A href="/earn-money-without-skills" label="Without Skills" />
              <A href="/earn-money-using-mobile" label="Using Mobile" />
              <A href="/earn-money-online-worldwide" label="Worldwide" />
              <A href="/cashback-rewards" label="Cashback Rewards" />
              <A href="/legit-ways-to-make-money-online" label="Legit Ways" />
              <A href="/free-ways-to-make-money-online" label="Free Ways" />
            </Sub>
          </Section>

          {/* COLUMN 4 */}
          <Section id="rewards" title="Rewards & Payments">
            <A href="/earn-paypal-money" label="Earn PayPal Money" />

            <Sub id="gift-cards" title="Earn Gift Cards">
              <A href="/earn-amazon-gift-card" label="Amazon" />
              <A href="/earn-apple-gift-card" label="Apple" />
              <A href="/earn-google-play-gift-card" label="Google Play" />
            </Sub>

            <Sub id="crypto" title="Earn Crypto">
              <A href="/earn-bitcoin-online" label="Bitcoin" />
              <A href="/earn-litecoin-online" label="Litecoin" />
              <A href="/earn-ethereum-online" label="Ethereum" />
              <A href="/earn-dogecoin-online" label="Dogecoin" />
            </Sub>

            <Sub id="gaming" title="Gaming Gift Cards">
              <A href="/earn-free-robux" label="Robux" />
              <A href="/earn-steam-gift-cards" label="Steam" />
              <A href="/earn-xbox-gift-cards" label="Xbox" />
              <A href="/earn-psn-gift-cards" label="PlayStation" />
            </Sub>

            <A href="/earn-spotify-premium" label="Spotify Premium" />
          </Section>

          {/* COLUMN 5 */}
          <Section id="resources" title="Resources">
            <A href="/blog" label="Blog" />
            <A href="/help" label="Help Center" />
            <A href="/faq" label="FAQ" />
            <A href="/contact" label="Contact Support" />
            <A href="/about" label="About Cashog" />
          </Section>

          {/* COLUMN 6 */}
          <Section id="business" title="Business">
            <A href="/affiliate" label="Affiliate Program" />
            <A href="/partners" label="Partners" />
            <A href="/advertise" label="Advertise with Cashog" />
          </Section>

          {/* COLUMN 7 */}
          <Section id="cashback" title="Cashback & Deals">
            <A href="/cashback-offers" label="Cashback Offers" />
            <A href="/shopping-rewards" label="Shopping Rewards" />
            <A href="/promo-codes" label="Promo Codes & Coupons" />
            <A href="/daily-deals" label="Daily Deals" />
            <A href="/travel-deals" label="Travel Cashback" />
            <A href="/banking-finance-offers" label="Banking & Finance Offers" />
          </Section>

          {/* COLUMN 8 */}
          <Section id="legal" title="Legal">
            <A href="https://cashog.com/terms-and-conditions" label="Terms & Conditions" />
            <A href="https://cashog.com/privacy-policy" label="Privacy Policy" />
            <A href="https://cashog.com/cookie-policy" label="Cookie Policy" />
          </Section>

        </div>

        {/* ================= SOCIAL ================= */}
        <div className="footer-social">
          <Facebook />
          <Twitter />
          <Youtube />
          <Instagram />
          <Linkedin />
          <Pinterest />
        </div>

        {/* ================= COPYRIGHT ================= */}
        <div className="footer-copy">
          © {new Date().getFullYear()} Cashog. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
