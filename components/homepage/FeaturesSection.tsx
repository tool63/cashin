"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";

export default function FeaturesSection() {
  const features = [
    {
      icon: "⚡",
      title: "Instant Withdrawals",
      description:
        "Lightning-fast payouts to your preferred payment method. No waiting, no delays.",
      gradient: "from-yellow-400 to-yellow-500",
    },
    {
      icon: "🛡️",
      title: "Secure & Trusted",
      description:
        "Enterprise-grade security with 256-bit encryption. Your earnings are always protected.",
      gradient: "from-green-400 to-green-500",
    },
    {
      icon: "💳",
      title: "Multiple Payment Options",
      description:
        "Flexible payouts via PayPal, cryptocurrency, bank transfers, and gift cards.",
      gradient: "from-purple-400 to-purple-500",
    },
  ];

  return (
    <OpeningStyle delay={0.12}>
      <section className="relative py-28 px-4 text-center bg-white dark:bg-[#070A14] transition-colors duration-300 overflow-hidden rounded-b-[50px] shadow-xl">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="mb-16">
            <SectionTitle icon="✨" text="Why Choose Cashog" />
          </div>

          {/* Features Grid - Only icons, no cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon with gradient background */}
                <div className={`relative mb-4 p-6 rounded-2xl bg-gradient-to-r ${feature.gradient} bg-opacity-10`}>
                  <span className="text-5xl">{feature.icon}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </section>
    </OpeningStyle>
  );
}
