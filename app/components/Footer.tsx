"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface SubLinks {
  name: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: { name: string; href: string }[];
  sublinks?: SubLinks[][];
}

const footerData: FooterColumn[] = [
  {
    title: "Get Started",
    links: [
      { name: "How Cashog Works", href: "/how-it-works" },
      { name: "How to Start Earning", href: "/start-earning" },
      { name: "Cashout Methods", href: "/cashout" },
      { name: "Withdrawal Proofs", href: "/withdrawals" },
      { name: "Trust & Safety", href: "/trust-safety" },
    ],
  },
  {
    title: "Ways To Earn",
    links: [
      { name: "Surveys", href: "/surveys" },
      { name: "App Installs", href: "/app-installs" },
      { name: "Playing Games", href: "/play-games" },
      { name: "Watching Videos", href: "/watch-videos" },
      { name: "Mining Rewards", href: "/mining-rewards" },
      { name: "Completing Offers", href: "/complete-offers" },
      { name: "Offerwall", href: "/offerwall" },
      { name: "Surveywall", href: "/surveywall" },
    ],
    sublinks: [
      [
        { name: "Watching Ads", href: "/watch-ads" },
        { name: "Micro Tasks", href: "/micro-tasks" },
        { name: "Free Trials", href: "/complete-free-trials" },
        { name: "Testing Products", href: "/test-products" },
      ],
      [
        { name: "Reading Emails", href: "/read-emails" },
        { name: "Visiting Websites", href: "/visit-websites" },
        { name: "Review Tasks", href: "/review-tasks" },
        { name: "Spinning Wheel", href: "/spinning-wheel" },
      ],
    ],
  },
  {
    title: "Guides & Tips",
    links: [
      { name: "Make Money Online", href: "/make-money-online" },
      { name: "Earn Money from Home", href: "/earn-money-from-home" },
      { name: "Earn Without Investment", href: "/earn-without-investment" },
      { name: "Get Paid to Play Games", href: "/get-paid-to-play-games" },
    ],
    sublinks: [
      [
        { name: "Install Apps for Cash", href: "/install-apps-for-cash" },
        { name: "Watch Videos for Money", href: "/watch-videos-for-money" },
        { name: "Complete Offers Online", href: "/complete-offers-online" },
        { name: "Work from Home Jobs", href: "/work-from-home-jobs" },
      ],
      [
        { name: "Online Earning Methods", href: "/online-earning-methods" },
        { name: "Earn Money Online Fast", href: "/earn-money-online-fast" },
        { name: "Earn Passive Income Online", href: "/passive-income-online" },
        { name: "Online Jobs for Beginners", href: "/online-jobs-for-beginners" },
      ],
    ],
  },
  {
    title: "Rewards & Payments",
    links: [
      { name: "Earn PayPal Money", href: "/earn-paypal-money" },
      { name: "Earn Gift Cards", href: "/earn-gift-cards-online" },
      { name: "Earn Crypto", href: "/earn-crypto-online" },
      { name: "Earn Gaming Gift Cards", href: "/earn-gaming-gift-cards" },
      { name: "Earn Spotify Premium", href: "/earn-spotify-premium" },
    ],
    sublinks: [
      [
        { name: "Earn Amazon Gift Card", href: "/earn-amazon-gift-card" },
        { name: "Earn Apple Gift Card", href: "/earn-apple-gift-card" },
        { name: "Earn Google Play Gift Card", href: "/earn-google-play-gift-card" },
      ],
      [
        { name: "Earn Bitcoin", href: "/earn-bitcoin-online" },
        { name: "Earn Litecoin", href: "/earn-litecoin-online" },
        { name: "Earn Ethereum", href: "/earn-ethereum-online" },
        { name: "Earn Dogecoin", href: "/earn-dogecoin-online" },
      ],
    ],
  },
  {
    title: "Cashback & Deals",
    links: [
      { name: "Cashback Offers", href: "/cashback-offers" },
      { name: "Shopping Rewards", href: "/shopping-rewards" },
      { name: "Promo Codes & Coupons", href: "/promo-codes" },
      { name: "Daily Deals", href: "/daily-deals" },
    ],
    sublinks: [
      [
        { name: "Electronics Cashback", href: "/shopping-rewards/electronics" },
        { name: "Fashion Cashback", href: "/shopping-rewards/fashion" },
        { name: "Home & Garden Cashback", href: "/shopping-rewards/home-garden" },
        { name: "Grocery Cashback", href: "/shopping-rewards/grocery" },
      ],
      [
        { name: "Travel Cashback", href: "/shopping-rewards/travel" },
        { name: "Finance Cashback", href: "/shopping-rewards/finance" },
        { name: "Hotels", href: "/shopping-rewards/travel/hotels" },
        { name: "Flights", href: "/shopping-rewards/travel/flights" },
      ],
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Help Center", href: "/help" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact", href: "/contact" },
      { name: "About Cashog", href: "/about" },
    ],
  },
  {
    title: "Business",
    links: [
      { name: "Affiliate Program", href: "/affiliate" },
      { name: "Partners", href: "/partners" },
      { name: "Advertise with Cashog", href: "/advertise" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms & Conditions", href: "/terms-and-conditions" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [openSubsection, setOpenSubsection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    if (openSection === index) {
      setOpenSection(null);
      setOpenSubsection(null);
    } else {
      setOpenSection(index);
      setOpenSubsection(null);
    }
  };

  const toggleSubsection = (index: number) => {
    setOpenSubsection(openSubsection === index ? null : index);
  };

  return (
    <footer className="bg-gray-900 text-white py-8 px-4 md:px-16">
      {footerData.map((col, colIndex) => (
        <div key={colIndex} className="mb-4">
          <button
            className="flex justify-between items-center w-full font-bold text-lg"
            onClick={() => toggleSection(colIndex)}
          >
            {col.title}
            {openSection === colIndex ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>

          {/* Main links (first expansion) */}
          {openSection === colIndex && (
            <ul className="mt-2 space-y-1">
              {col.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href} className="block hover:text-blue-400">
                    {link.name}
                  </a>
                </li>
              ))}

              {/* If two-level sublinks exist */}
              {col.sublinks && (
                <>
                  <hr className="my-2 border-gray-700" />

                  {col.sublinks.map((group, subIndex) => (
                    <div key={subIndex}>
                      <button
                        className="flex justify-between items-center w-full font-medium text-base"
                        onClick={() => toggleSubsection(subIndex)}
                      >
                        More {col.title}
                        {openSubsection === subIndex ? (
                          <ChevronUpIcon className="w-4 h-4" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4" />
                        )}
                      </button>

                      {openSubsection === subIndex && (
                        <ul className="mt-1 space-y-1">
                          {group.map((sublink, gIndex) => (
                            <li key={gIndex}>
                              <a
                                href={sublink.href}
                                className="block hover:text-blue-400"
                              >
                                {sublink.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </>
              )}
            </ul>
          )}
        </div>
      ))}

      <div className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Cashog. All rights reserved.
      </div>
    </footer>
  );
}
