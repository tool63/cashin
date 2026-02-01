// components/Footer.js
import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterColumn = ({ title, links }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6">
      <h3
        className="font-semibold text-lg cursor-pointer flex justify-between items-center hover:text-white transition-colors"
        onClick={() => setOpen(!open)}
      >
        {title} <span className="text-gray-400">{open ? "▼" : "▲"}</span>
      </h3>
      <ul
        className={`mt-3 space-y-2 text-gray-300 transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0 overflow-hidden"
        }`}
      >
        {links.map((link) =>
          link.subLinks ? (
            <li key={link.title}>
              <h4 className="font-medium mt-2">{link.title}</h4>
              <ul className="ml-4 space-y-1">
                {link.subLinks.map((sub) => (
                  <li key={sub.title}>
                    <a
                      href={sub.href}
                      className="hover:text-white transition-colors"
                    >
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={link.title}>
              <a href={link.href} className="hover:text-white transition-colors">
                {link.title}
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

const Footer = () => {
  const columns = [
    {
      title: "Get Started",
      links: [
        { title: "How Cashog Works", href: "/how-it-works" },
        { title: "How to Start Earning", href: "/start-earning" },
        { title: "Cashout Methods", href: "/cashout" },
        { title: "Withdrawal Proofs", href: "/withdrawals" },
        { title: "Trust & Safety", href: "/trust-safety" },
      ],
    },
    {
      title: "Ways To Earn",
      links: [
        { title: "Surveys", href: "/surveys" },
        { title: "App Installs", href: "/app-installs" },
        { title: "Playing Games", href: "/play-games" },
        { title: "Watching Videos", href: "/watch-videos" },
        { title: "Mining Rewards", href: "/mining-rewards" },
        { title: "Completing Offers", href: "/complete-offers" },
        { title: "Offerwall", href: "/offerwall" },
        { title: "Surveywall", href: "/surveywall" },
        {
          title: "Extra Earning",
          subLinks: [
            { title: "Watching Ads", href: "/watch-ads" },
            { title: "Micro Tasks", href: "/micro-tasks" },
            { title: "Free Trials", href: "/complete-free-trials" },
            { title: "Testing Products", href: "/test-products" },
            { title: "Reading Emails", href: "/read-emails" },
            { title: "Visiting Websites", href: "/visit-websites" },
            { title: "Review Tasks", href: "/review-tasks" },
            { title: "Spinning Wheel", href: "/spinning-wheel" },
            { title: "Loyalty", href: "/loyalty" },
            { title: "Vouchers", href: "/vouchers" },
          ],
        },
      ],
    },
    {
      title: "Guides & Tips",
      links: [
        { title: "Make Money Online", href: "/make-money-online" },
        { title: "Earn Money from Home", href: "/earn-money-from-home" },
        { title: "Earn Without Investment", href: "/earn-without-investment" },
        { title: "Get Paid to Play Games", href: "/get-paid-to-play-games" },
        { title: "Install Apps for Cash", href: "/install-apps-for-cash" },
        { title: "Watch Videos for Money", href: "/watch-videos-for-money" },
        { title: "Complete Offers Online", href: "/complete-offers-online" },
        { title: "Work from Home Jobs", href: "/work-from-home-jobs" },
        {
          title: "All Guides",
          subLinks: [
            { title: "Earn Passive Income Online", href: "/passive-income-online" },
            { title: "Online Jobs for Beginners", href: "/online-jobs-for-beginners" },
            { title: "Earn Money as a Student", href: "/earn-money-as-a-student" },
            { title: "Earn Money Without Skills", href: "/earn-money-without-skills" },
            { title: "Earn Money Using Mobile", href: "/earn-money-using-mobile" },
            { title: "Earn Money Online Worldwide", href: "/earn-money-online-worldwide" },
            { title: "Cashback Rewards", href: "/cashback-rewards" },
            { title: "Legit Ways to Make Money Online", href: "/legit-ways-to-make-money-online" },
            { title: "Free Ways to Make Money Online", href: "/free-ways-to-make-money-online" },
          ],
        },
      ],
    },
    {
      title: "Rewards & Payments",
      links: [
        { title: "Earn PayPal Money", href: "/earn-paypal-money" },
        {
          title: "Earn Gift Cards",
          subLinks: [
            { title: "Amazon", href: "/earn-amazon-gift-card" },
            { title: "Apple", href: "/earn-apple-gift-card" },
            { title: "Google Play", href: "/earn-google-play-gift-card" },
          ],
        },
        {
          title: "Earn Crypto",
          subLinks: [
            { title: "Bitcoin", href: "/earn-bitcoin-online" },
            { title: "Litecoin", href: "/earn-litecoin-online" },
            { title: "Ethereum", href: "/earn-ethereum-online" },
            { title: "Dogecoin", href: "/earn-dogecoin-online" },
          ],
        },
        {
          title: "Earn Gaming Gift Cards",
          subLinks: [
            { title: "Robux", href: "/earn-free-robux" },
            { title: "Steam", href: "/earn-steam-gift-cards" },
            { title: "Xbox", href: "/earn-xbox-gift-cards" },
            { title: "PlayStation", href: "/earn-psn-gift-cards" },
          ],
        },
        { title: "Earn Spotify Premium", href: "/earn-spotify-premium" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Blog", href: "/blog" },
        { title: "Help Center", href: "/help" },
        { title: "FAQ", href: "/faq" },
        { title: "Contact Support", href: "/contact" },
        { title: "About Cashooz", href: "/about" },
      ],
    },
    {
      title: "Business",
      links: [
        { title: "Affiliate Program", href: "/affiliate" },
        { title: "Partners", href: "/partners" },
        { title: "Advertise with Cashooz", href: "/advertise" },
      ],
    },
    {
      title: "Legal",
      links: [
        { title: "Terms & Conditions", href: "https://cashog.com/terms-and-conditions" },
        { title: "Privacy Policy", href: "https://cashog.com/privacy-policy" },
        { title: "Cookie Policy", href: "https://cashog.com/cookie-policy" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {columns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-6 mt-10 text-gray-400">
          <a href="#" className="hover:text-white transition-colors"><FaFacebookF /></a>
          <a href="#" className="hover:text-white transition-colors"><FaTwitter /></a>
          <a href="#" className="hover:text-white transition-colors"><FaInstagram /></a>
          <a href="#" className="hover:text-white transition-colors"><FaLinkedin /></a>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          © 2026 Cashog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
