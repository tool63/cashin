"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";
import Container, { Card, CardIcon, CardTitle, CardDescription, CardCTA, CardGrid } from "@/components/animations/container";

export default function FeaturesSection() {
  const features = [
    {
      icon: "⚡",
      title: "Instant Withdrawals",
      description:
        "Lightning-fast payouts to your preferred payment method. No waiting, no delays.",
    },
    {
      icon: "🛡️",
      title: "Secure & Trusted",
      description:
        "Enterprise-grade security with 256-bit encryption. Your earnings are always protected.",
    },
    {
      icon: "💳",
      title: "Multiple Payment Options",
      description:
        "Flexible payouts via PayPal, cryptocurrency, bank transfers, and gift cards.",
    },
  ];

  return (
    <OpeningStyle delay={0.12}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Heading */}
        <div className="mb-12">
          <SectionTitle icon="✨" text="Why Choose Cashog" />
        </div>

        {/* Features Grid - Using Container Card components */}
        <CardGrid cols={{ default: 1, md: 3 }}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Card>
                <CardIcon>{feature.icon}</CardIcon>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
                <CardCTA>
                  Learn more <span className="text-lg">→</span>
                </CardCTA>
              </Card>
            </motion.div>
          ))}
        </CardGrid>
      </section>
    </OpeningStyle>
  );
}
