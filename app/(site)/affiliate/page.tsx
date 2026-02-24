"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  User,
  Share,
  ClipboardList,
  TrendingUp,
  Star,
  Trophy,
  CheckCircle,
  BarChart,
} from "lucide-react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import { Line } from "react-chartjs-2"; // To create referral tracking graph
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

/* ================= AFFILIATE SUCCESS STORIES ================= */
const successStories = [
  {
    name: "John Doe",
    earnings: "$5000",
    story: "I earned over $5000 by sharing Cashog with my followers. The platform is amazing and easy to promote!",
  },
  {
    name: "Emily Clark",
    earnings: "$3500",
    story: "Using Cashog's marketing resources helped me reach new audiences and hit my first big milestone.",
  },
  {
    name: "Michael Scott",
    earnings: "$4200",
    story: "With consistent efforts and Cashog's generous commission structure, I've made a steady income every month.",
  },
];

/* ================= REFERRAL PROGRESS ================= */
const calculateProgress = (referrals: number, target: number) => {
  return (referrals / target) * 100;
};

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
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    // Example of generating a unique referral link based on user
    setReferralLink(`${window.location.origin}/?ref=affiliate123`);
  }, []);

  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const referralCount = Number(e.target.value);
    setReferrals(referralCount);
    setEarnings(calculateCommission(referralCount * 50)); // Assuming $50 per referral
  };

  // Referral tracking data for the graph
  const referralData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Referrals",
        data: [10, 50, 90, 120, 150, 200], // Example data, this should be dynamic
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  const referralOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
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
                    className="mt-1 px-4 py-2 w-full border border-gray-300 dark:border-gray-700
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

          {/* REFERRAL PROGRESS TRACKER */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Referral Progress
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Track how close you are to earning bonuses and rewards
            </p>
          </Reveal>

          <div className="mb-12">
            <div className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md">
              <h3 className="text-xl font-semibold mb-2">Referral Milestones</h3>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  You have referred {referrals} users. You are {calculateProgress(referrals, 100)}% of the way to your next bonus!
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    style={{ width: `${calculateProgress(referrals, 100)}%` }}
                    className="bg-gradient-to-r from-yellow-400 to-green-400 h-2 rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* REFERRAL TRACKING GRAPH */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Your Referral Growth
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Visualize your referral growth over the months
            </p>
          </Reveal>

          <div className="mb-12">
            <div className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md">
              <Line data={referralData} options={referralOptions} />
            </div>
          </div>

          {/* AFFILIATE SUCCESS STORIES */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Success Stories
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Hear from our top affiliates about their journey and success with Cashog.
            </p>
          </Reveal>

          <div className="mb-12">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-800 shadow-md">
                <h3 className="text-xl font-semibold">{story.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{story.story}</p>
                <p className="text-lg text-green-500 mt-4 font-semibold">Earnings: {story.earnings}</p>
              </div>
            ))}
          </div>

          {/* AFFILIATE RESOURCES */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Affiliate Resources
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Get all the tools you need to promote Cashog and succeed in our affiliate program.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md">
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{resource.description}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Frequently Asked Questions
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Everything you need to know about Play & Earn
            </p>
          </Reveal>

          <div className="mb-24">
            <FAQ faqs={affiliateFAQs} />
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
