"use client";

import React, { useState } from "react";
import {
  DollarSign,
  User,
  Share,
  ClipboardList,
  TrendingUp,
  Star,
  Trophy,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import ProgressBar from "@/components/ProgressBar"; // Custom component for progress bar

/* ================= AFFILIATE PROGRAM DETAILS ================= */
const affiliateStats = [
  { label: "Affiliates", number: 3000, icon: <User className="w-6 h-6 text-blue-400" /> },
  { label: "Total Commissions", number: 120000, icon: <DollarSign className="w-6 h-6 text-green-400" /> },
  { label: "Average Earnings", number: 50, icon: <TrendingUp className="w-6 h-6 text-yellow-400" /> },
];

/* ================= AFFILIATE LEADERBOARD ================= */
const leaderboard = [
  { name: "John Doe", commissions: "$5000", rank: 1 },
  { name: "Jane Smith", commissions: "$4500", rank: 2 },
  { name: "Mike Johnson", commissions: "$4000", rank: 3 },
];

/* ================= COMMISSION PAYING SYSTEM ================= */
const calculateCommission = (amount: number) => {
  return amount * 0.15; // 15% commission
};

/* ================= HOW AFFILIATE PROGRAM WORKS ================= */
const affiliateSteps = [
  { icon: <User className="w-8 h-8 text-yellow-400" />, title: "Sign Up", desc: "Join our affiliate program in minutes." },
  { icon: <Share className="w-8 h-8 text-green-400" />, title: "Promote", desc: "Share your unique affiliate link." },
  { icon: <DollarSign className="w-8 h-8 text-blue-400" />, title: "Earn", desc: "Earn commissions for each successful referral." },
];

/* ================= AFFILIATE RESOURCES ================= */
const resources = [
  { title: "Banners", description: "Download promotional banners for your website." },
  { title: "Social Media Posts", description: "Access pre-written social media posts for quick sharing." },
  { title: "Email Templates", description: "Use our email templates to engage your audience effectively." },
];

/* ================= FAQ DATA ================= */
const affiliateFAQs = [
  { q: "How do I join the affiliate program?", a: "Sign up on the affiliate page and get your unique referral link." },
  { q: "How do I earn commissions?", a: "Promote Cashog through your link, and earn commissions on successful sign-ups and activities." },
  { q: "Is there a minimum payout?", a: "Yes, you can withdraw once you reach a minimum payout of $20." },
  { q: "Can I track my earnings?", a: "Yes, you can track your earnings and performance through your affiliate dashboard." },
  { q: "Is it free to join?", a: "Yes, it is completely free to join the affiliate program." },
];

export default function AffiliatePage() {
  const [referrals, setReferrals] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const referralCount = Number(e.target.value);
    setReferrals(referralCount);
    setEarnings(calculateCommission(referralCount * 50)); // Assuming $50 per referral
  };

  return (
    <>
      <Meta
        title="Affiliate Program | Cashog"
        description="Join the Cashog Affiliate Program. Promote, earn, and track your commissions."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <Reveal>
            <div className="text-center mb-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Join the Cashog Affiliate Program
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 gradient-text">
                <TypingText />
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Promote Cashog, earn commissions, and track your performance.
              </p>

              <PrimaryCTA href="/signup">
                Join Now
              </PrimaryCTA>
            </div>
          </Reveal>

          {/* AFFILIATE LEADERBOARD */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Top Affiliates This Month
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              See the top performers in our affiliate network
            </p>
          </Reveal>

          <div className="mb-12">
            <div className="grid gap-6 md:grid-cols-3">
              {leaderboard.map((affiliate) => (
                <Reveal key={affiliate.rank}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
                  >
                    <h3 className="text-xl font-semibold mb-2">{affiliate.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Commissions: {affiliate.commissions}
                    </p>
                    <div className="mt-4 text-2xl text-yellow-400">
                      <Trophy />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Rank #{affiliate.rank}</span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* COMMISSION CALCULATOR */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Commission Calculator
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Estimate your potential earnings based on your referrals
            </p>
          </Reveal>

          <div className="mb-12">
            <div className="flex justify-center items-center bg-white dark:bg-[#0a0d16] rounded-lg shadow-md p-6">
              <form className="space-y-4">
                <div>
                  <label htmlFor="referrals" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Number of Referrals
                  </label>
                  <input
                    type="number"
                    id="referrals"
                    name="referrals"
                    value={referrals}
                    onChange={handleReferralChange}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of successful referrals"
                  />
                </div>

                <div>
                  <label htmlFor="earnings" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Estimated Earnings
                  </label>
                  <input
                    type="text"
                    id="earnings"
                    name="earnings"
                    value={`$${earnings.toFixed(2)}`}
                    readOnly
                    className="mt-1 px-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-yellow-400 to-green-400 text-white rounded-lg hover:opacity-90"
                >
                  Calculate
                </button>
              </form>
            </div>
          </div>

          {/* BONUS PROGRAM */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Bonus Program for Top Affiliates
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Earn extra bonuses when you hit certain referral milestones!
            </p>
          </Reveal>

          <div className="mb-12">
            <div className="bg-white dark:bg-[#0a0d16] rounded
                        <div className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md">
              <h3 className="text-xl font-semibold mb-2">Bonus Structure</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Earn a 10% bonus when you refer over 100 new users in a month!
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                Earn a 20% bonus when you refer over 500 new users in a month!
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                The bonuses will be added to your regular commissions and can be withdrawn once the payout threshold is reached.
              </p>
            </div>
          </div>

          {/* AFFILIATE PAYOUT HISTORY */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Payout History
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              View your past payouts and keep track of your earnings.
            </p>
          </Reveal>

          <div className="mb-12">
            <div className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md">
              <h3 className="text-xl font-semibold mb-2">Recent Payouts</h3>
              <table className="min-w-full table-auto text-sm text-left">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-gray-600 dark:text-gray-300">Date</th>
                    <th className="px-4 py-2 text-gray-600 dark:text-gray-300">Amount</th>
                    <th className="px-4 py-2 text-gray-600 dark:text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">January 25, 2026</td>
                    <td className="px-4 py-2 text-green-500">$150</td>
                    <td className="px-4 py-2 text-green-500">Paid</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">December 10, 2025</td>
                    <td className="px-4 py-2 text-green-500">$200</td>
                    <td className="px-4 py-2 text-green-500">Paid</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">November 20, 2025</td>
                    <td className="px-4 py-2 text-red-500">$100</td>
                    <td className="px-4 py-2 text-red-500">Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Ready to Start Earning?
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
                Join our affiliate program today, share Cashog with your audience, and start earning 15% commissions on every referral!
              </p>

              <PrimaryCTA href="/signup">
                Join Now
              </PrimaryCTA>
            </div>
          </Reveal>

        </section>
      </main>
    </>
  );
}
            
