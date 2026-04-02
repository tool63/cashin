"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";
import {
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  CardGrid,
} from "@/components/animations/container";

/* ================= TYPES ================= */

interface PaymentMethod {
  key: string;
  emoji: string;
}

/* ================= STATIC METHODS ================= */

const methods: PaymentMethod[] = [
  { key: "paypal", emoji: "💸" },
  { key: "usdt", emoji: "💰" },
  { key: "bitcoin", emoji: "₿" },
  { key: "giftcards", emoji: "🎁" },
  { key: "litecoin", emoji: "Ł" },
  { key: "ethereum", emoji: "Ξ" },
  { key: "dogecoin", emoji: "Ð" },
  { key: "bnb", emoji: "🟡" },
];

/* ================= COMPONENT ================= */

export default function PaymentSection({
  data,
  countryName,
}: {
  data: any;
  countryName?: string;
}) {
  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* Heading */}
          <div className="mb-6">
            <SectionTitle
              icon={data?.icon || "💳"}
              text={
                data?.title?.replace(/\{country\}/g, countryName || "") ||
                "Payment Methods"
              }
            />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {data?.description?.replace(/\{country\}/g, countryName || "")}
          </p>

          {/* Grid */}
          <CardGrid cols={{ default: 2, sm: 3, md: 4 }}>
            {methods.map((method, i) => (
              <motion.div
                key={method.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card>
                  <CardIcon>{method.emoji}</CardIcon>

                  <CardTitle>
                    {data?.methods?.[method.key]?.title?.replace(
                      /\{country\}/g,
                      countryName || ""
                    ) || method.key}
                  </CardTitle>

                  <CardDescription>
                    {data?.methods?.[method.key]?.description?.replace(
                      /\{country\}/g,
                      countryName || ""
                    ) || "Instant payments available"}
                  </CardDescription>
                </Card>
              </motion.div>
            ))}
          </CardGrid>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            {data?.trust?.map((item: string, i: number) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {item.replace(/\{country\}/g, countryName || "")}
              </span>
            ))}
          </div>
        </div>
      </section>
    </OpeningStyle>
  );
}
