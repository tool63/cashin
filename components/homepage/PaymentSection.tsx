"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";
import Container, { Card, CardIcon, CardTitle, CardDescription, CardGrid } from "@/components/animations/container";

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
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* Section Heading */}
          <div className="mb-6">
            <SectionTitle icon="💰" text="Payment Methods" />
          </div>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Fast, secure, and trusted payout options. Withdraw your earnings instantly via your favorite method.
          </p>

          {/* Payment Grid */}
          <CardGrid cols={{ default: 2, sm: 3, md: 4 }}>
            {methods.map((method, i) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card>
                  <CardIcon>{method.emoji}</CardIcon>
                  <CardTitle>{method.name}</CardTitle>
                  <CardDescription>Instant payout</CardDescription>
                </Card>
              </motion.div>
            ))}
          </CardGrid>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Instant Withdrawals
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> No Hidden Fees
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> 24/7 Processing
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Global Payments
            </div>
          </div>
        </div>
      </section>
    </OpeningStyle>
  );
}
