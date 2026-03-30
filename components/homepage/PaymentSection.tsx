"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";
import { Card, CardIcon, CardTitle, CardDescription, CardGrid } from "@/components/animations/container";

/* ================= TYPES ================= */

interface PaymentMethod {
  name: string;
  emoji: string;
}

/* ================= DATA ================= */

const methods: PaymentMethod[] = [
  { name: "PayPal", emoji: "💸" },
  { name: "Tether (USDT)", emoji: "🪙" },
  { name: "Bitcoin", emoji: "₿" },
  { name: "Gift Cards", emoji: "🎁" },
  { name: "Litecoin", emoji: "Ł" },
  { name: "Ethereum", emoji: "Ξ" },
  { name: "Dogecoin", emoji: "Ð" },
  { name: "Binance Coin (BNB)", emoji: "🟡" },
];

/* ================= COMPONENT ================= */

export default function PaymentSection() {
  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">

          {/* Heading */}
          <div className="mb-6">
            <SectionTitle icon="💰" text="Payment Methods" />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Fast, secure, and trusted payout options. Withdraw your earnings instantly via your favorite method.
          </p>

          {/* Grid */}
          <CardGrid cols={{ default: 2, sm: 3, md: 4 }}>
            {methods.map((method, i) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
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
            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Instant Withdrawals
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span> No Hidden Fees
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span> 24/7 Processing
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Global Payments
            </span>
          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
