"use client";

import { motion } from "framer-motion";
import TypingText from "@/components/typing/TypingText";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserIcon, CubeIcon, CurrencyDollarIcon, BanknotesIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  // Animated number state
  const [usersCount, setUsersCount] = useState(0);
  const [offersCount, setOffersCount] = useState(0);
  const [paidMonth, setPaidMonth] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const frameRate = 30;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;

    const usersTarget = 366727;
    const offersTarget = 87412;
    const paidMonthTarget = 54233;
    const totalPaidTarget = 1234567;

    const interval = setInterval(() => {
      frame++;
      setUsersCount(Math.round((usersTarget * frame) / totalFrames));
      setOffersCount(Math.round((offersTarget * frame) / totalFrames));
      setPaidMonth(Math.round((paidMonthTarget * frame) / totalFrames));
      setTotalPaid(Math.round((totalPaidTarget * frame) / totalFrames));

      if (frame === totalFrames) clearInterval(interval);
    }, duration / totalFrames);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

          {/* HEADLINE */}
          <h1 className="font-extrabold text-[20px] sm:text-[22px] md:text-[24px] mb-4 text-white">
            Earn Real Money Online
          </h1>

          {/* TYPING TEXT */}
          <div className="text-[20px] sm:text-[20px] md:text-[20px] mb-6 font-semibold text-green-400">
            <TypingText />
          </div>

          {/* SUBTEXT */}
          <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-xl mx-auto">
            Join millions of users worldwide and start earning rewards instantly.
          </p>

          {/* CTA */}
          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="
                inline-flex items-center justify-center
                bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
                text-black
                px-8 py-3
                rounded-xl
                font-semibold
                shadow-lg
                text-sm sm:text-base
              "
            >
              Get Started Now
            </motion.span>
          </Link>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Platform Statistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Total Users */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform shadow-xl"
            >
              <UserIcon className="w-12 h-12 text-yellow-400 mb-4" />
              <span className="text-4xl sm:text-5xl font-extrabold text-yellow-400">
                {usersCount.toLocaleString()}
              </span>
              <span className="mt-2 text-sm sm:text-base text-gray-300 font-medium text-center">
                Total Users
              </span>
              <div className="w-full h-1 bg-yellow-500 rounded-full mt-4">
                <div
                  className="h-1 bg-green-400 rounded-full"
                  style={{ width: `${Math.min((usersCount / 366727) * 100, 100)}%` }}
                />
              </div>
            </motion.div>

            {/* Total Offers */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform shadow-xl"
            >
              <CubeIcon className="w-12 h-12 text-yellow-400 mb-4" />
              <span className="text-4xl sm:text-5xl font-extrabold text-yellow-400">
                {offersCount.toLocaleString()}
              </span>
              <span className="mt-2 text-sm sm:text-base text-gray-300 font-medium text-center">
                Total Offers
              </span>
              <div className="w-full h-1 bg-yellow-500 rounded-full mt-4">
                <div
                  className="h-1 bg-green-400 rounded-full"
                  style={{ width: `${Math.min((offersCount / 87412) * 100, 100)}%` }}
                />
              </div>
            </motion.div>

            {/* Amount Paid This Month */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform shadow-xl"
            >
              <CurrencyDollarIcon className="w-12 h-12 text-yellow-400 mb-4" />
              <span className="text-4xl sm:text-5xl font-extrabold text-yellow-400">
                ${paidMonth.toLocaleString()}
              </span>
              <span className="mt-2 text-sm sm:text-base text-gray-300 font-medium text-center">
                Paid This Month
              </span>
              <div className="w-full h-1 bg-yellow-500 rounded-full mt-4">
                <div
                  className="h-1 bg-green-400 rounded-full"
                  style={{ width: `${Math.min((paidMonth / 54233) * 100, 100)}%` }}
                />
              </div>
            </motion.div>

            {/* Total Paid */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform shadow-xl"
            >
              <BanknotesIcon className="w-12 h-12 text-yellow-400 mb-4" />
              <span className="text-4xl sm:text-5xl font-extrabold text-yellow-400">
                ${totalPaid.toLocaleString()}
              </span>
              <span className="mt-2 text-sm sm:text-base text-gray-300 font-medium text-center">
                Total Paid
              </span>
              <div className="w-full h-1 bg-yellow-500 rounded-full mt-4">
                <div
                  className="h-1 bg-green-400 rounded-full"
                  style={{ width: `${Math.min((totalPaid / 1234567) * 100, 100)}%` }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
