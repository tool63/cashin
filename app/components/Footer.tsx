"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Youtube,
  Pinterest,
  Linkedin,
  Instagram,
} from "lucide-react";

/* 🔗 CHANGE BASE URL ONLY HERE IN FUTURE */
const BASE_URL = "https://payup-pi.vercel.app";

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
    <div className="footer-box">
      <button onClick={() => toggle(id)} className="footer-title">
        {title}
        <span className={`caret ${open[id] ? "open" : ""}`}>^</span>
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
    <div className="mt-3">
      <button onClick={() => toggleSub(id)} className="footer-subtitle">
        {title}
        <span className={`caret small ${subOpen[id] ? "open" : ""}`}>^</span>
      </button>
      {subOpen[id] && <div className="footer-sublist">{children}</div>}
    </div>
  );

  const A = ({ href, label }: { href: string; label: string }) => (
    <Link href={`${BASE_URL}${href}`}>{label}</Link>
  );

  return (
    <footer className="footer-bg">
      <div className="footer-wrap">
        {/* GRID */}
        <div className="footer-grid">
          {/* COLUMN 1 */}
          <Section id="start" title="Get Started">
            <A href="/how-it-works" label="How Cashog Works" />
            <A href="/start-earning" label="How to Start Earning" />
            <A href="/cashout" label="Cashout Methods" />
            <A href="/withdrawals" label="Withdrawal Proofs" />
            <A href="/trust-safety" label="Trust & Safety" />
          </Section>

          {/* COLUMN 2 */}
          <Section id="earn" title="Ways To Earn">
            <A href="/surveys" label="Surveys" />
            <A href="/app-installs" label="App Installs" />
            <A href="/play-games" label="Playing Games" />
            <A href="/watch-videos" label="Watching Videos" />
            <A href="/offerwall" label="Offerwall" />
            <A href="/surveywall" label="Surveywall" />

            <SubSection id="extra" title="Extra Earning">
              <A href="/watch-ads" label="Watching Ads" />
              <A href="/micro-tasks" label="Micro Tasks" />
              <A href="/free-trials" label="Free Trials" />
              <A href="/read-emails" label="Reading Emails" />
              <A href="/visit-websites" label="Visiting Websites" />
              <A href="/spinning-wheel" label="Spinning Wheel" />
              <A href="/loyalty" label="Loyalty" />
              <A href="/vouchers" label="Vouchers" />
            </SubSection>
          </Section>

          {/* COLUMN 3 */}
          <Section id="resources" title="Resources">
            <A href="/blog" label="Blog" />
            <A href="/faq" label="FAQ" />
            <A href="/help" label="Help Center" />
            <A href="/contact" label="Contact Support" />
            <A href="/about" label="About Cashog" />
          </Section>

          {/* COLUMN 4 */}
          <Section id="legal" title="Legal">
            <A href="/terms-and-conditions" label="Terms & Conditions" />
            <A href="/privacy-policy" label="Privacy Policy" />
            <A href="/cookie-policy" label="Cookie Policy" />
          </Section>
        </div>

        {/* SOCIAL ICONS */}
        <div className="footer-social">
          <Facebook />
          <Twitter />
          <Youtube />
          <Pinterest />
          <Linkedin />
          <Instagram />
        </div>

        {/* COPYRIGHT */}
        <div className="footer-copy">
          © {new Date().getFullYear()} Cashog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
