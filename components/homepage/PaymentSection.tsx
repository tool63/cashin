"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";

export default function PaymentSection() {
  const methods = [
    { name: "PayPal", emoji: "💸" },
    { name: "Tether (USDT)", emoji: "🪙" },
    { name: "Bitcoin", emoji: "₿" },
    { name: "Gift Cards", emoji: "🎁" },
    { name: "Litecoin", emoji: "Ł" },
    { name: "Ethereum", emoji: "Ξ" },
    { name: "Dogecoin", emoji: "Ð" },
    { name: "Binance Coin (BNB)", emoji: "🟡" },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0B0E1A]">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Section Heading */}
        <SectionTitle icon="💰" text="Payment Methods" />

        <p className="text-gray-600 dark:text-gray-400 mb-14 max-w-2xl mx-auto text-lg">
          Fast, secure, and trusted payout options. Withdraw your earnings instantly via your favorite method.
        </p>

        {/* Payment Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-center">
          {methods.map((method) => (
            <div
              key={method.name}
              className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111827] px-6 py-10 flex flex-col items-center justify-center shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              {/* Icon */}
              <span className="text-6xl mb-4">{method.emoji}</span>

              {/* Name */}
              <span className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                {method.name}
              </span>

              {/* Subtitle */}
              <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Instant payout
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
