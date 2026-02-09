"use client";

import { Zap, ShieldCheck, Wallet } from "lucide-react";
import { SectionTitle } from "@/components/homepage/SmallComponents";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="text-green-500 mb-4" size={36} />,
      title: "Instant Withdrawals",
      description:
        "Get your earnings instantly with zero delays. Fast, secure, and reliable withdrawals.",
    },
    {
      icon: <ShieldCheck className="text-blue-500 mb-4" size={36} />,
      title: "Secure & Trusted",
      description:
        "Trusted by millions worldwide. Your data and earnings are fully protected.",
    },
    {
      icon: <Wallet className="text-purple-500 mb-4" size={36} />,
      title: "Multiple Payment Options",
      description:
        "Choose from PayPal, crypto, or gift cards. Flexible payouts that suit your lifestyle.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-white/5">
      <SectionTitle icon="🌟" text="Why Choose Us" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center bg-white dark:bg-[#0f111b] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            {feature.icon}
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
