"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import { Users, DollarSign, Share, Package, BarChart2, Award, Clock, Star } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

// ================= TESTIMONIAL TYPE =================
type Testimonial = {
  name: string;
  title: string;
  quote: string;
  image: string;
};

// ================= TESTIMONIALS =================
const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    title: "Top Affiliate",
    quote: "I’ve been with Cashog for 6 months, and it’s been the best decision. Easy to use and great commissions!",
    image: "/images/testimonial1.jpg",
  },
  {
    name: "Jane Smith",
    title: "Affiliate Marketer",
    quote: "Cashog has helped me scale my online business. The affiliate program is transparent and very rewarding.",
    image: "/images/testimonial2.jpg",
  },
  {
    name: "Michael Johnson",
    title: "Business Owner",
    quote: "Since joining Cashog, I've been able to grow my revenue by 150%. The tools and support are amazing!",
    image: "/images/testimonial3.jpg",
  },
  {
    name: "Sarah Lee",
    title: "Freelancer",
    quote: "The commissions are great and I love the easy-to-use dashboard. Highly recommend!",
    image: "/images/testimonial4.jpg",
  },
  {
    name: "Chris Williams",
    title: "Entrepreneur",
    quote: "Cashog helped me take my marketing strategy to the next level. The affiliate program is incredibly rewarding.",
    image: "/images/testimonial5.jpg",
  },
  {
    name: "Rachel Adams",
    title: "Digital Marketer",
    quote: "The variety of campaigns available to promote has been a game-changer. I’m now earning passive income effortlessly.",
    image: "/images/testimonial6.jpg",
  },
  {
    name: "David Kim",
    title: "Content Creator",
    quote: "Cashog’s affiliate program is top-tier. I appreciate the transparency and quick payouts.",
    image: "/images/testimonial7.jpg",
  },
];

// ================= REAL-TIME EARNINGS CHART =================
const earningsChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Earnings ($)",
      data: [500, 600, 700, 850, 900, 1100, 1200],
      borderColor: "#4CAF50",
      backgroundColor: "rgba(76, 175, 80, 0.2)",
      fill: true,
    },
  ],
};

const earningsChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Earnings Over Time",
    },
  },
};

export default function AffiliatePage() {
  return (
    <>
      <SeoEngine
        title="Affiliate Program | Cashog"
        description="Join our affiliate program and earn commissions by promoting premium offers."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 text-gradient">
                Start Earning with Our Affiliate Program
              </h1>

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
                <TypingText />
              </div>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
                Promote premium products and earn commissions on every sale.
              </p>

              <PrimaryCTA href="/signup">Become an Affiliate</PrimaryCTA>
            </>
          </Reveal>
        </section>

        {/* AFFILIATE DASHBOARD */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mt-12">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Affiliate Dashboard Overview
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Track your earnings, referrals, and campaign performance in real-time.
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: <DollarSign className="w-6 h-6 text-green-500" />, label: "Earnings", value: "$1200", color: "green" },
              { icon: <Users className="w-6 h-6 text-blue-500" />, label: "Referrals", value: "36", color: "blue" },
              { icon: <Package className="w-6 h-6 text-purple-500" />, label: "Active Campaigns", value: "5", color: "purple" },
            ].map((stat) => (
              <Reveal key={stat.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md flex flex-col border-${stat.color}-500`}
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>

                  <h3 className="text-3xl font-extrabold text-{stat.color}-500">{stat.value}</h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EARNINGS OVER TIME CHART */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Earnings Over Time
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Monitor your earnings growth with real-time data.
              </p>
            </>
          </Reveal>

          <div className="max-w-xl mx-auto">
            <Line data={earningsChartData} options={earningsChartOptions} />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                What Our Affiliates Say
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Hear directly from our top affiliates about their experience.
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                >
                                    <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-xl">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.title}</p>
                  <blockquote className="mt-4 italic text-gray-600 dark:text-gray-300">
                    "{testimonial.quote}"
                  </blockquote>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* REFERRAL BONUS PROGRESS */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg mt-12">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Referral Bonus Tracker
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Track your progress towards your next referral bonus!
              </p>
            </>
          </Reveal>

          <div className="relative z-10 max-w-md mx-auto text-center">
            <div className="flex justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Referral Goal</span>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Earn $200</span>
            </div>

            <div className="w-full bg-gray-300 dark:bg-gray-600 h-2 rounded-full">
              <div
                className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full"
                style={{ width: '60%' }}
              />
            </div>

            <div className="mt-4">
              <span className="text-xs text-gray-500 dark:text-gray-400">You are 60% to your goal!</span>
            </div>
          </div>
        </section>

        {/* AFFILIATE TOOLS */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24 mt-12">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Affiliate Marketing Tools
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Download banners, landing pages, and promotional assets to grow your earnings.
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Banners", description: "Customizable banners for your website", link: "/assets/banners" },
              { name: "Landing Pages", description: "Pre-built landing pages for higher conversions", link: "/assets/landing-pages" },
              { name: "Email Templates", description: "Ready-to-use email marketing templates", link: "/assets/email-templates" },
            ].map((tool) => (
              <Reveal key={tool.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-4">{tool.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
                  <a
                    href={tool.link}
                    className="text-blue-500 hover:underline text-sm font-semibold"
                  >
                    Download Now
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* LEADERBOARD */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24 mt-12">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Top Affiliates Leaderboard
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                See who’s on top! Track the most successful affiliates of the month.
              </p>
            </>
          </Reveal>

          <div className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 shadow-md">
            <table className="min-w-full table-auto text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Rank</th>
                  <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Affiliate</th>
                  <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, name: "John Doe", earnings: "$3500" },
                  { rank: 2, name: "Jane Smith", earnings: "$3200" },
                  { rank: 3, name: "Michael Johnson", earnings: "$2900" },
                ].map((affiliate) => (
                  <tr key={affiliate.rank} className="border-b">
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{affiliate.rank}</td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{affiliate.name}</td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{affiliate.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SIGN UP CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                Join the Affiliate Program Today!
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
                Sign up today and start earning instantly by promoting premium products.
              </p>

              <PrimaryCTA href="/signup">Become an Affiliate</PrimaryCTA>
            </>
          </Reveal>
        </section>
      </main>
    </>
  );
}
