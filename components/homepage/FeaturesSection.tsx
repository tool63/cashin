"use client";

import { Zap, ShieldCheck, Wallet } from "lucide-react";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="text-green-400 mb-4" size={40} />,
      title: "Instant Withdrawals",
      description:
        "Get your earnings instantly with zero delays. Fast, secure, and reliable withdrawals.",
    },
    {
      icon: <ShieldCheck className="text-blue-400 mb-4" size={40} />,
      title: "Secure & Trusted",
      description:
        "Trusted by millions worldwide. Your data and earnings are fully protected.",
    },
    {
      icon: <Wallet className="text-purple-400 mb-4" size={40} />,
      title: "Multiple Payment Options",
      description:
        "Choose from PayPal, crypto, or gift cards. Flexible payouts that suit your lifestyle.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-[#0f111b] transition-colors duration-300">
      {/* Section Title */}
      <SectionTitle icon="🌟" text="Why Choose Cashog" />

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="flex flex-col items-center bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
          >
            {feature.icon}
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white text-center">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
