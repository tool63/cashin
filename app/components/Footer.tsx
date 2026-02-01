"use client";

import { useState } from "react";
import Link from "next/link";

type ToggleMap = Record<string, boolean>;

export default function Footer() {
  const [open, setOpen] = useState<ToggleMap>({});
  const [subOpen, setSubOpen] = useState<ToggleMap>({});

  const toggle = (key: string) =>
    setOpen((p) => ({ ...p, [key]: !p[key] }));

  const toggleSub = (key: string) =>
    setSubOpen((p) => ({ ...p, [key]: !p[key] }));

  const Section = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <button
        onClick={() => toggle(id)}
        className="footer-title"
      >
        {title}
        <span>{open[id] ? "−" : "+"}</span>
      </button>

      {open[id] && <div className="footer-list">{children}</div>}
    </div>
  );

  const SubSection = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <button
        onClick={() => toggleSub(id)}
        className="footer-subtitle"
      >
        {title}
        <span>{subOpen[id] ? "−" : "+"}</span>
      </button>

      {subOpen[id] && <div className="footer-sublist">{children}</div>}
    </div>
  );

  return (
    <footer className="footer-bg">
      <div className="footer-wrap">

        {/* GRID */}
        <div className="footer-grid">

          {/* COLUMN 1 */}
          <Section id="start" title="Get Started">
            <Link href="/how-it-works">How Cashooz Works</Link>
            <Link href="/start-earning">How to Start Earning</Link>
            <Link href="/cashout">Cashout Methods</Link>
            <Link href="/withdrawals">Withdrawal Proofs</Link>
            <Link href="/trust-safety">Trust & Safety</Link>
          </Section>

          {/* COLUMN 2 */}
          <Section id="earn" title="Ways To Earn">
            <Link href="/surveys">Surveys</Link>
            <Link href="/app-installs">App Installs</Link>
            <Link href="/play-games">Playing Games</Link>
            <Link href="/watch-videos">Watching Videos</Link>
            <Link href="/mining-rewards">Mining Rewards</Link>
            <Link href="/complete-offers">Completing Offers</Link>
            <Link href="/offerwall">Offerwall</Link>
            <Link href="/surveywall">Surveywall</Link>

            <SubSection id="extraEarn" title="Extra Earning">
              <Link href="/watch-ads">Watching Ads</Link>
              <Link href="/micro-tasks">Micro Tasks</Link>
              <Link href="/complete-free-trials">Free Trials</Link>
              <Link href="/test-products">Testing Products</Link>
              <Link href="/read-emails">Reading Emails</Link>
              <Link href="/visit-websites">Visiting Websites</Link>
              <Link href="/review-tasks">Review Tasks</Link>
              <Link href="/spinning-wheel">Spinning Wheel</Link>
              <Link href="/loyalty">Loyalty</Link>
              <Link href="/vouchers">Vouchers</Link>
            </SubSection>
          </Section>

          {/* COLUMN 3 */}
          <Section id="guides" title="Guides & Tips">
            <Link href="/make-money-online">Make Money Online</Link>
            <Link href="/earn-money-from-home">Earn Money from Home</Link>
            <Link href="/earn-without-investment">Earn Without Investment</Link>
            <Link href="/get-paid-to-play-games">Get Paid to Play Games</Link>
            <Link href="/install-apps-for-cash">Install Apps for Cash</Link>
            <Link href="/watch-videos-for-money">Watch Videos for Money</Link>
            <Link href="/complete-offers-online">Complete Offers Online</Link>
            <Link href="/work-from-home-jobs">Work from Home Jobs</Link>
            <Link href="/online-earning-methods">Online Earning Methods</Link>
            <Link href="/earn-money-online-fast">Earn Money Online Fast</Link>

            <SubSection id="allGuides" title="All Guides">
              <Link href="/passive-income-online">Passive Income Online</Link>
              <Link href="/online-jobs-for-beginners">Online Jobs for Beginners</Link>
              <Link href="/earn-money-as-a-student">Earn Money as a Student</Link>
              <Link href="/earn-money-without-skills">Earn Without Skills</Link>
              <Link href="/earn-money-using-mobile">Earn Using Mobile</Link>
              <Link href="/earn-money-online-worldwide">Earn Worldwide</Link>
              <Link href="/cashback-rewards">Cashback Rewards</Link>
              <Link href="/legit-ways-to-make-money-online">Legit Ways</Link>
              <Link href="/free-ways-to-make-money-online">Free Ways</Link>
            </SubSection>
          </Section>

          {/* COLUMN 4 */}
          <Section id="rewards" title="Rewards & Payments">
            <Link href="/earn-paypal-money">Earn PayPal Money</Link>

            <SubSection id="giftcards" title="Earn Gift Cards">
              <Link href="/earn-amazon-gift-card">Amazon</Link>
              <Link href="/earn-apple-gift-card">Apple</Link>
              <Link href="/earn-google-play-gift-card">Google Play</Link>
            </SubSection>

            <SubSection id="crypto" title="Earn Crypto">
              <Link href="/earn-bitcoin-online">Bitcoin</Link>
              <Link href="/earn-litecoin-online">Litecoin</Link>
              <Link href="/earn-ethereum-online">Ethereum</Link>
              <Link href="/earn-dogecoin-online">Dogecoin</Link>
            </SubSection>

            <SubSection id="gaming" title="Gaming Gift Cards">
              <Link href="/earn-free-robux">Robux</Link>
              <Link href="/earn-steam-gift-cards">Steam</Link>
              <Link href="/earn-xbox-gift-cards">Xbox</Link>
              <Link href="/earn-psn-gift-cards">PlayStation</Link>
            </SubSection>

            <Link href="/earn-spotify-premium">Spotify Premium</Link>
          </Section>

          {/* COLUMN 5 */}
          <Section id="resources" title="Resources">
            <Link href="/blog">Blog</Link>
            <Link href="/help">Help Center</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact Support</Link>
            <Link href="/about">About Cashooz</Link>
          </Section>

          {/* COLUMN 6 */}
          <Section id="business" title="Business">
            <Link href="/affiliate">Affiliate Program</Link>
            <Link href="/partners">Partners</Link>
            <Link href="/advertise">Advertise with Cashooz</Link>
          </Section>

          {/* COLUMN 7 */}
          <Section id="cashback" title="Cashback & Deals">
            <Link href="/cashback-offers">Cashback Offers</Link>
            <Link href="/shopping-rewards">Shopping Rewards</Link>
            <Link href="/promo-codes">Promo Codes</Link>
            <Link href="/daily-deals">Daily Deals</Link>
            <Link href="/travel-deals">Travel Cashback</Link>
            <Link href="/banking-finance-offers">Finance Offers</Link>
          </Section>

          {/* COLUMN 8 */}
          <Section id="legal" title="Legal">
            <a href="https://cashooz.com/terms-and-conditions">Terms & Conditions</a>
            <a href="https://cashooz.com/privacy-policy">Privacy Policy</a>
            <a href="https://cashooz.com/cookie-policy">Cookie Policy</a>
          </Section>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <span>f</span><span>x</span><span>y</span><span>p</span><span>l</span><span>i</span>
        </div>

        {/* COPYRIGHT */}
        <div className="footer-copy">
          © {new Date().getFullYear()} Cashooz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
