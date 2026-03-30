"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";
import { Card, CardIcon, CardTitle, CardDescription, CardGrid } from "@/components/animations/container";
import { useTranslations } from "@/components/providers/LanguageProvider";

/* ================= TYPES ================= */

interface PaymentMethod {
  key: string;
  emoji: string;
}

/* ================= DATA ================= */

const methods: PaymentMethod[] = [
  { key: "paypal", emoji: "💸" },
  { key: "usdt", emoji: "🪙" },
  { key: "bitcoin", emoji: "₿" },
  { key: "giftcards", emoji: "🎁" },
  { key: "litecoin", emoji: "Ł" },
  { key: "ethereum", emoji: "Ξ" },
  { key: "dogecoin", emoji: "Ð" },
  { key: "bnb", emoji: "🟡" },
];

/* ================= COMPONENT ================= */

export default function PaymentSection() {
  const t = useTranslations("homepage");

  return (
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">

          {/* Heading */}
          <div className="mb-6">
            <SectionTitle
              icon="💰"
              text={t("payments.title")}
            />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t("payments.description")}
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
                  <CardTitle>{t(`payments.methods.${method.key}`)}</CardTitle>
                  <CardDescription>
                    {t("payments.instant")}
                  </CardDescription>
                </Card>
              </motion.div>
            ))}
          </CardGrid>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">

            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              {t("payments.trust.instant")}
            </span>

            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              {t("payments.trust.noFees")}
            </span>

            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              {t("payments.trust.processing")}
            </span>

            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              {t("payments.trust.global")}
            </span>

          </div>

        </div>
      </section>
    </OpeningStyle>
  );
}
