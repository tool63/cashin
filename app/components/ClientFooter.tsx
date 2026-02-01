"use client";

import React, { useState } from "react";
import Link from "next/link";

type ToggleMap = Record<string, boolean>;

const BASE_URL = "";

const ClientFooter = () => {
  const [open, setOpen] = useState<ToggleMap>({});
  const [subOpen, setSubOpen] = useState<ToggleMap>({});

  const toggle = (key: string) => setOpen((p) => ({ ...p, [key]: !p[key] }));
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
    <div className="footer-col">
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
    <footer className="footer-bg text-gray-300">
      <div className="footer-wrap">
        <div className="footer-grid">

          {/* COLUMN 1 – GET STARTED */}
          <Section id="start" title="Get Started">
            <Link href={`${BASE_URL}/how-it-works`}>How Cashooz Works</Link>
            <Link href={`${BASE_URL}/start-earning`}>Start Earning</Link>
            <Link href={`${BASE_URL}/cashout`}>Cashout Methods</Link>
            <Link href={`${BASE_URL}/withdrawals`}>Withdrawal Proofs</Link>
            <Link href={`${BASE_URL}/trust-safety`}>Trust & Safety</Link>
          </Section>

          {/* COLUMN 2 – COMPANY */}
          <Section id="company" title="Company">
            <Link href={`${BASE_URL}/about`}>About</Link>
            <Link href={`${BASE_URL}/careers`}>Careers</Link>
            <Link href={`${BASE_URL}/blog`}>Blog</Link>
          </Section>

          {/* COLUMN 3 – SUPPORT */}
          <Section id="support" title="Support">
            <Link href={`${BASE_URL}/help`}>Help Center</Link>
            <Link href={`${BASE_URL}/contact`}>Contact</Link>
            <Link href={`${BASE_URL}/privacy-policy`}>Privacy Policy</Link>
          </Section>

          {/* COLUMN 4 – FOLLOW US */}
          <Section id="social" title="Follow Us">
            <div className="footer-social flex space-x-2 mt-2">
              <a href="#" className="hover:text-blue-400">F</a>
              <a href="#" className="hover:text-blue-400">T</a>
              <a href="#" className="hover:text-blue-400">I</a>
            </div>
          </Section>

        </div>

        {/* COPYRIGHT */}
        <p className="footer-copy mt-6 text-center text-gray-500">
          © {new Date().getFullYear()} Cashooz. All rights reserved.
        </p>
      </div>

      {/* RESPONSIVE GRID */}
      <style jsx>{`
        .footer-grid {
          display: grid;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 769px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </footer>
  );
};

export default ClientFooter;
