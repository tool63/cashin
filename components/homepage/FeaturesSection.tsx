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

        {/* Features Grid - Matching TasksSection grid style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-3xl p-6 flex flex-col items-center text-center
                bg-gray-100 dark:bg-white/5
                border border-gray-200 dark:border-white/10
                hover:border-blue-500/40
                hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1"
            >
              {/* Icon - Matching TasksSection icon style */}
              <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              {/* Title - Matching TasksSection title style */}
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>

              {/* Description - Matching TasksSection description style */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* CTA indicator - Matching TasksSection style */}
              <div className="mt-4 flex items-center gap-1 text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                Learn more <span className="text-lg">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </OpeningStyle>
  );
}
