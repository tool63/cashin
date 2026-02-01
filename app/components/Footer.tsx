"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Send,
} from "lucide-react";

type LinkItem = {
  label: string;
  href: string;
};

type Section = {
  title: string;
  links?: LinkItem[];
  children?: {
    title: string;
    links: LinkItem[];
  }[];
};

const footerSections: Section[] = [
  {
    title: "Get Started",
    links: [
      { label: "How Cashog Works", href: "/how-it-works" },
      { label: "How to Start Earning", href: "/start-earning" },
      { label: "Cashout Methods", href: "/cashout" },
      { label: "Withdrawal Proofs", href: "/withdrawals" },
      { label: "Trust & Safety", href: "/trust-safety" },
    ],
  },

  {
    title: "Ways To Earn",
    links: [
      { label: "Surveys", href: "/surveys" },
      { label: "App Installs", href: "/app-installs" },
      { label: "Playing Games", href: "/play-games" },
      { label: "Watching Videos", href: "/watch-videos" },
      { label: "Mining Rewards", href: "/mining-rewards" },
      { label: "Completing Offers", href: "/complete-offers" },
      { label: "Offerwall", href: "/offerwall" },
      { label: "Surveywall", href: "/surveywall" },
    ],
    children: [
      {
        title: "Extra Earning",
        links: [
          { label: "Watching Ads", href: "/watch-ads" },
          { label: "Micro Tasks", href: "/micro-tasks" },
          { label: "Free Trials", href: "/complete-free-trials" },
          { label: "Testing Products", href: "/test-products" },
          { label: "Reading Emails", href: "/read-emails" },
          { label: "Visiting Websites", href: "/visit-websites" },
          { label: "Review Tasks", href: "/review-tasks" },
          { label: "Spinning Wheel", href: "/spinning-wheel" },
          { label: "Loyalty", href: "/loyalty" },
          { label: "Vouchers", href: "/vouchers" },
        ],
      },
    ],
  },

  {
    title: "Guides & Tips",
    links: [
      { label: "Make Money Online", href: "/make-money-online" },
      { label: "Earn Money from Home", href: "/earn-money-from-home" },
      { label: "Earn Without Investment", href: "/earn-without-investment" },
      { label: "Get Paid to Play Games", href: "/get-paid-to-play-games" },
      { label: "Install Apps for Cash", href: "/install-apps-for-cash" },
      { label: "Watch Videos for Money", href: "/watch-videos-for-money" },
      { label: "Complete Offers Online", href: "/complete-offers-online" },
      { label: "Work from Home Jobs", href: "/work-from-home-jobs" },
      { label: "Online Earning Methods", href: "/online-earning-methods" },
      { label: "Earn Money Online Fast", href: "/earn-money-online-fast" },
    ],
    children: [
      {
        title: "All Guides",
        links: [
          { label: "Passive Income Online", href: "/passive-income-online" },
          { label: "Online Jobs for Beginners", href: "/online-jobs-for-beginners" },
          { label: "Earn Money as a Student", href: "/earn-money-as-a-student" },
          { label: "Earn Money Without Skills", href: "/earn-money-without-skills" },
          { label: "Earn Money Using Mobile", href: "/earn-money-using-mobile" },
          { label: "Earn Money Worldwide", href: "/earn-money-online-worldwide" },
          { label: "Cashback Rewards", href: "/cashback-rewards" },
          { label: "Legit Ways to Make Money", href: "/legit-ways-to-make-money-online" },
          { label: "Free Ways to Make Money", href: "/free-ways-to-make-money-online" },
        ],
      },
    ],
  },

  {
    title: "Rewards & Payments",
    links: [
      { label: "Earn PayPal Money", href: "/earn-paypal-money" },
      { label: "Earn Spotify Premium", href: "/earn-spotify-premium" },
    ],
    children: [
      {
        title: "Gift Cards",
        links: [
          { label: "Amazon", href: "/earn-amazon-gift-card" },
          { label: "Apple", href: "/earn-apple-gift-card" },
          { label: "Google Play", href: "/earn-google-play-gift-card" },
        ],
      },
      {
        title: "Crypto",
        links: [
          { label: "Bitcoin", href: "/earn-bitcoin-online" },
          { label: "Litecoin", href: "/earn-litecoin-online" },
          { label: "Ethereum", href: "/earn-ethereum-online" },
          { label: "Dogecoin", href: "/earn-dogecoin-online" },
        ],
      },
      {
        title: "Gaming",
        links: [
          { label: "Robux", href: "/earn-free-robux" },
          { label: "Steam", href: "/earn-steam-gift-cards" },
          { label: "Xbox", href: "/earn-xbox-gift-cards" },
          { label: "PlayStation", href: "/earn-psn-gift-cards" },
        ],
      },
    ],
  },

  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Support", href: "/contact" },
      { label: "About Cashooz", href: "/about" },
    ],
  },

  {
    title: "Business",
    links: [
      { label: "Affiliate Program", href: "/affiliate" },
      { label: "Partners", href: "/partners" },
      { label: "Advertise with Cashooz", href: "/advertise" },
    ],
  },

  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "https://cashog.com/terms-and-conditions" },
      { label: "Privacy Policy", href: "https://cashog.com/privacy-policy" },
      { label: "Cookie Policy", href: "https://cashog.com/cookie-policy" },
    ],
  },
];

export default function Footer() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <footer className="bg-[#0b0f1a] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {footerSections.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggle(section.title)}
              className="flex w-full items-center justify-between text-white font-semibold mb-3"
            >
              {section.title}
              <ChevronDown
                className={`w-4 h-4 transition ${
                  open[section.title] ? "rotate-180" : ""
                }`}
              />
            </button>

            {open[section.title] && (
              <ul className="space-y-2 text-sm">
                {section.links?.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}

                {section.children?.map((child) => (
                  <li key={child.title} className="mt-3">
                    <button
                      onClick={() => toggle(section.title + child.title)}
                      className="flex w-full items-center justify-between font-medium"
                    >
                      {child.title}
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {open[section.title + child.title] && (
                      <ul className="ml-3 mt-2 space-y-1">
                        {child.links.map((cl) => (
                          <li key={cl.label}>
                            <Link href={cl.href} className="hover:text-white">
                              {cl.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* SOCIAL + COPYRIGHT */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-4 text-gray-400">
            <Facebook />
            <Twitter />
            <Instagram />
            <Youtube />
            <Linkedin />
            <Send />
          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Cashooz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
