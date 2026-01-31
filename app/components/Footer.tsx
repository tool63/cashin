"use client";

import { useState } from "react";
import Link from "next/link";

type ToggleMap = Record<string, boolean>;

// 🔑 CHANGE THIS IN FUTURE ONLY
const BASE_URL = "https://payup-pi.vercel.app";

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
      <button onClick={() => toggle(id)} className="footer-title">
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
      <button onClick={() => toggleSub(id)} className="footer-subtitle">
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
            <Link href={`${BASE_URL}/how-it-works`}>How Cashog Works</Link>
            <Link href={`${BASE_URL}/start-earning`}>How to Start Earning</Link>
            <Link href={`${BASE_URL}/cashout`}>Cashout Methods</Link>
            <Link href={`${BASE_URL}/withdrawals`}>Withdrawal Proofs</Link>
            <Link href={`${BASE_URL}/trust-safety`}>Trust & Safety</Link>
          </Section>

          {/* COLUMN 2 */}
          <Section id="earn" title="Ways To Earn">
            <Link href={`${BASE_URL}/surveys`}>Surveys</Link>
            <Link href={`${BASE_URL}/app-installs`}>App Installs</Link>
            <Link href={`${BASE_URL}/play-games`}>Playing Games</Link>
            <Link href={`${BASE_URL}/watch-videos`}>Watching Videos</Link>
            <Link href={`${BASE_URL}/mining-rewards`}>Mining Rewards</Link>
            <Link href={`${BASE_URL}/complete-offers`}>Completing Offers</Link>
            <Link href={`${BASE_URL}/offerwall`}>Offerwall</Link>
            <Link href={`${BASE_URL}/surveywall`}>Surveywall</Link>

            <SubSection id="extraEarn" title="Extra Earning">
              <Link href={`${BASE_URL}/watch-ads`}>Watching Ads</Link>
              <Link href={`${BASE_URL}/micro-tasks`}>Micro Tasks</Link>
              <Link href={`${BASE_URL}/complete-free-trials`}>Free Trials</Link>
              <Link href={`${BASE_URL}/test-products`}>Testing Products</Link>
              <Link href={`${BASE_URL}/read-emails`}>Reading Emails</Link>
              <Link href={`${BASE_URL}/visit-websites`}>Visiting Websites</Link>
              <Link href={`${BASE_URL}/review-tasks`}>Review Tasks</Link>
              <Link href={`${BASE_URL}/spinning-wheel`}>Spinning Wheel</Link>
              <Link href={`${BASE_URL}/loyalty`}>Loyalty</Link>
              <Link href={`${BASE_URL}/vouchers`}>Vouchers</Link>
            </SubSection>
          </Section>

          {/* COLUMN 3 */}
          <Section id="guides" title="Guides & Tips">
            <Link href={`${BASE_URL}/make-money-online`}>Make Money Online</Link>
            <Link href={`${BASE_URL}/earn-money-from-home`}>Earn Money from Home</Link>
            <Link href={`${BASE_URL}/earn-without-investment`}>Earn Without Investment</Link>
            <Link href={`${BASE_URL}/get-paid-to-play-games`}>Get Paid to Play Games</Link>
            <Link href={`${BASE_URL}/install-apps-for-cash`}>Install Apps for Cash</Link>
            <Link href={`${BASE_URL}/watch-videos-for-money`}>Watch Videos for Money</Link>
            <Link href={`${BASE_URL}/complete-offers-online`}>Complete Offers Online</Link>
            <Link href={`${BASE_URL}/work-from-home-jobs`}>Work from Home Jobs</Link>
            <Link href={`${BASE_URL}/online-earning-methods`}>Online Earning Methods</Link>

            <SubSection id="allGuides" title="All Guides">
              <Link href={`${BASE_URL}/passive-income-online`}>Passive Income Online</Link>
              <Link href={`${BASE_URL}/online-jobs-for-beginners`}>Online Jobs for Beginners</Link>
              <Link href={`${BASE_URL}/earn-money-as-a-student`}>Earn Money as a Student</Link>
              <Link href={`${BASE_URL}/earn-money-without-skills`}>Earn Without Skills</Link>
              <Link href={`${BASE_URL}/earn-money-using-mobile`}>Earn Using Mobile</Link>
              <Link href={`${BASE_URL}/earn-money-online-worldwide`}>Earn Worldwide</Link>
            </SubSection>
          </Section>

          {/* COLUMN 4 */}
          <Section id="rewards" title="Rewards & Payments">
            <Link href={`${BASE_URL}/earn-paypal-money`}>Earn PayPal Money</Link>

            <SubSection id="giftcards" title="Earn Gift Cards">
              <Link href={`${BASE_URL}/earn-amazon-gift-card`}>Amazon</Link>
              <Link href={`${BASE_URL}/earn-apple-gift-card`}>Apple</Link>
              <Link href={`${BASE_URL}/earn-google-play-gift-card`}>Google Play</Link>
            </SubSection>

            <SubSection id="crypto" title="Earn Crypto">
              <Link href={`${BASE_URL}/earn-bitcoin-online`}>Bitcoin</Link>
              <Link href={`${BASE_URL}/earn-litecoin-online`}>Litecoin</Link>
              <Link href={`${BASE_URL}/earn-ethereum-online`}>Ethereum</Link>
            </SubSection>
          </Section>

          {/* COLUMN 5 */}
          <Section id="resources" title="Resources">
            <Link href={`${BASE_URL}/blog`}>Blog</Link>
            <Link href={`${BASE_URL}/help`}>Help Center</Link>
            <Link href={`${BASE_URL}/faq`}>FAQ</Link>
            <Link href={`${BASE_URL}/contact`}>Contact Support</Link>
            <Link href={`${BASE_URL}/about`}>About Cashog</Link>
          </Section>

          {/* COLUMN 6 */}
          <Section id="business" title="Business">
            <Link href={`${BASE_URL}/affiliate`}>Affiliate Program</Link>
            <Link href={`${BASE_URL}/partners`}>Partners</Link>
            <Link href={`${BASE_URL}/advertise`}>Advertise with Cashog</Link>
          </Section>

          {/* COLUMN 7 */}
          <Section id="cashback" title="Cashback & Deals">
            <Link href={`${BASE_URL}/cashback-offers`}>Cashback Offers</Link>
            <Link href={`${BASE_URL}/shopping-rewards`}>Shopping Rewards</Link>
            <Link href={`${BASE_URL}/promo-codes`}>Promo Codes</Link>
            <Link href={`${BASE_URL}/daily-deals`}>Daily Deals</Link>
          </Section>

          {/* COLUMN 8 – LEGAL */}
          <Section id="legal" title="Legal">
            <a href={`${BASE_URL}/terms-and-conditions`}>Terms & Conditions</a>
            <a href={`${BASE_URL}/privacy-policy`}>Privacy Policy</a>
            <a href={`${BASE_URL}/cookie-policy`}>Cookie Policy</a>
          </Section>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <span>f</span><span>x</span><span>y</span><span>p</span><span>l</span><span>i</span>
        </div>

        {/* COPYRIGHT */}
        <div className="footer-copy">
          © {new Date().getFullYear()} Cashog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
