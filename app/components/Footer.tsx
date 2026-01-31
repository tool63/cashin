"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Youtube, Linkedin, Instagram } from "lucide-react";

// Inline Pinterest icon
const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 0C5.372 0 0 5.372 0 12c0 4.99 3.657 9.128 8.438 10.234-.117-.868-.223-2.2.047-3.15.243-.828 1.563-5.268 1.563-5.268s-.398-.797-.398-1.976c0-1.85 1.073-3.234 2.407-3.234 1.136 0 1.686.852 1.686 1.874 0 1.142-.728 2.85-1.103 4.434-.315 1.314.666 2.384 1.976 2.384 2.37 0 3.957-3.063 3.957-6.667 0-2.727-1.83-4.762-5.354-4.762-3.925 0-6.366 2.94-6.366 5.966 0 1.182.454 2.448 1.021 3.14.113.137.129.256.097.395-.107.437-.347 1.382-.393 1.577-.062.265-.2.322-.465.194-1.74-.814-2.827-3.338-2.827-5.378 0-4.375 3.179-8.394 9.169-8.394 4.811 0 8.544 3.438 8.544 8.044 0 4.794-3.02 8.657-7.21 8.657-1.405 0-2.725-.73-3.174-1.587l-.864 3.286c-.312 1.19-1.157 2.673-1.72 3.583 1.291.397 2.654.612 4.073.612 6.628 0 12-5.372 12-12S18.628 0 12 0z" />
  </svg>
);

const BASE_URL = "https://payup-pi.vercel.app";

type ToggleMap = Record<string, boolean>;

export default function Footer() {
  const [open, setOpen] = useState<ToggleMap>({});
  const [subOpen, setSubOpen] = useState<ToggleMap>({});

  const toggle = (key: string) => setOpen((p) => ({ ...p, [key]: !p[key] }));
  const toggleSub = (key: string) => setSubOpen((p) => ({ ...p, [key]: !p[key] }));

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
      <div className={`footer-list ${open[id] ? "show" : ""}`}>{children}</div>
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
    <div className="footer-sub">
      <button className="footer-subtitle" onClick={() => toggleSub(id)}>
        {title}
        <span className={`caret small ${subOpen[id] ? "open" : ""}`}>^</span>
      </button>
      <div className={`footer-sublist ${subOpen[id] ? "show" : ""}`}>{children}</div>
    </div>
  );

  const A = ({ href, label }: { href: string; label: string }) => (
    <Link href={`${BASE_URL}${href}`} className="footer-link">
      {label}
    </Link>
  );

  return (
    <footer className="footer-bg">
      <div className="footer-wrap">
        <div className="footer-grid">
          <Section id="start" title="Get Started">
            <A href="/how-it-works" label="How Cashog Works" />
            <A href="/start-earning" label="How to Start Earning" />
            <A href="/cashout" label="Cashout Methods" />
            <A href="/withdrawals" label="Withdrawal Proofs" />
            <A href="/trust-safety" label="Trust & Safety" />
          </Section>

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

          <Section id="resources" title="Resources">
            <A href="/blog" label="Blog" />
            <A href="/faq" label="FAQ" />
            <A href="/help" label="Help Center" />
            <A href="/contact" label="Contact Support" />
            <A href="/about" label="About Cashog" />
          </Section>

          <Section id="legal" title="Legal">
            <A href="/terms-and-conditions" label="Terms & Conditions" />
            <A href="/privacy-policy" label="Privacy Policy" />
            <A href="/cookie-policy" label="Cookie Policy" />
          </Section>
        </div>

        <div className="footer-social flex gap-4 mt-6">
          <Facebook className="h-6 w-6" />
          <Twitter className="h-6 w-6" />
          <Youtube className="h-6 w-6" />
          <PinterestIcon className="h-6 w-6" />
          <Linkedin className="h-6 w-6" />
          <Instagram className="h-6 w-6" />
        </div>

        <div className="footer-copy mt-4 text-gray-400">
          © {new Date().getFullYear()} Cashog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
