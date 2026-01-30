"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface FooterSection {
  title: string;
  links: { name: string; href: string }[];
}

const footerSections: FooterSection[] = [
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
    title: "Ways to Earn",
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
  },
  {
    title: "Extra Earning",
    links: [
      { name: "Watching Ads", href: "/watch-ads" },
      { name: "Micro Tasks", href: "/micro-tasks" },
      { name: "Free Trials", href: "/complete-free-trials" },
      { name: "Testing Products", href: "/test-products" },
      { name: "Reading Emails", href: "/read-emails" },
      { name: "Visiting Websites", href: "/visit-websites" },
      { name: "Review Tasks", href: "/review-tasks" },
      { name: "Spinning Wheel", href: "/spinning-wheel" },
      { name: "Loyalty", href: "/loyalty" },
      { name: "Vouchers", href: "/vouchers" },
    ],
  },
  {
    title: "Guides & Tips",
    links: [
      { name: "Make Money Online", href: "/make-money-online" },
      { name: "Earn Money from Home", href: "/earn-money-from-home" },
      { name: "Earn Without Investment", href: "/earn-without-investment" },
      { name: "Get Paid to Play Games", href: "/get-paid-to-play-games" },
      { name: "Install Apps for Cash", href: "/install-apps-for-cash" },
      { name: "Watch Videos for Money", href: "/watch-videos-for-money" },
      { name: "Complete Offers Online", href: "/complete-offers-online" },
      { name: "Work from Home Jobs", href: "/work-from-home-jobs" },
      { name: "Online Earning Methods", href: "/online-earning-methods" },
      { name: "Earn Money Online Fast", href: "/earn-money-online-fast" },
      { name: "Earn Passive Income Online", href: "/passive-income-online" },
      { name: "Online Jobs for Beginners", href: "/online-jobs-for-beginners" },
      { name: "Earn Money as a Student", href: "/earn-money-as-a-student" },
      { name: "Earn Money Without Skills", href: "/earn-money-without-skills" },
      { name: "Earn Money Using Mobile", href: "/earn-money-using-mobile" },
      { name: "Earn Money Online Worldwide", href: "/earn-money-online-worldwide" },
      { name: "Cashback Rewards", href: "/cashback-rewards" },
      { name: "Legit Ways to Make Money Online", href: "/legit-ways-to-make-money-online" },
      { name: "Free Ways to Make Money Online", href: "/free-ways-to-make-money-online" },
    ],
  },
  {
    title: "Rewards & Payments",
    links: [
      { name: "Earn PayPal Money", href: "/earn-paypal-money" },
      { name: "Earn Amazon Gift Card", href: "/earn-amazon-gift-card" },
      { name: "Earn Apple Gift Card", href: "/earn-apple-gift-card" },
      { name: "Earn Google Play Gift Card", href: "/earn-google-play-gift-card" },
      { name: "Earn Bitcoin", href: "/earn-bitcoin-online" },
      { name: "Earn Litecoin", href: "/earn-litecoin-online" },
      { name: "Earn Ethereum", href: "/earn-ethereum-online" },
      { name: "Earn Dogecoin", href: "/earn-dogecoin-online" },
      { name: "Earn Robux", href: "/earn-free-robux" },
      { name: "Earn Steam Gift Cards", href: "/earn-steam-gift-cards" },
      { name: "Earn Xbox Gift Cards", href: "/earn-xbox-gift-cards" },
      { name: "Earn PlayStation Gift Cards", href: "/earn-psn-gift-cards" },
      { name: "Earn Spotify Premium", href: "/earn-spotify-premium" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Help Center", href: "/help" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact Support", href: "/contact" },
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
      { name: "Terms & Conditions", href: "https://cashooz.com/terms-and-conditions" },
      { name: "Privacy Policy", href: "https://cashooz.com/privacy-policy" },
      { name: "Cookie Policy", href: "https://cashooz.com/cookie-policy" },
    ],
  },
];

export default function Footer() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer className="bg-gray-900 text-white py-8 px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {footerSections.map((section, index) => (
          <div key={index}>
            <button
              className="flex items-center justify-between w-full font-semibold mb-2 text-lg md:text-base focus:outline-none"
              onClick={() => toggleSection(index)}
            >
              {section.title}
              {openIndex === index ? (
                <ChevronUpIcon className="w-5 h-5 ml-2" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 ml-2" />
              )}
            </button>
            <ul
              className={`transition-all duration-300 overflow-hidden ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              {section.links.map((link, idx) => (
                <li key={idx} className="py-1">
                  <a href={link.href} className="hover:text-blue-400">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Cashog. All rights reserved.
      </div>
    </footer>
  );
}
