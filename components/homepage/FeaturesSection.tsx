"use client";

import { Zap, ShieldCheck, Wallet } from "lucide-react";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="text-yellow-400 mb-4" size={40} />,
      title: "Instant Withdrawals",
      description:
        "Get your earnings instantly with zero delays. Fast, secure, and reliable withdrawals.",
      gradient: "from-yellow-400 to-yellow-500",
    },
    {
      icon: <ShieldCheck className="text-green-400 mb-4" size={40} />,
      title: "Secure & Trusted",
      description:
        "Trusted by millions worldwide. Your data and earnings are fully protected.",
      gradient: "from-green-400 to-green-500",
    },
    {
      icon: <Wallet className="text-purple-400 mb-4" size={40} />,
      title: "Multiple Payment Options",
      description:
        "Choose from PayPal, crypto, or gift cards. Flexible payouts that suit your lifestyle.",
      gradient: "from-purple-400 to-purple-500",
    },
  ];

  return (
    <section className="relative py-20 bg-white dark:bg-[#070A14] transition-colors duration-300 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Section Title */}
      <SectionTitle icon="✨" text="Why Choose Cashog" />

      {/* Features Grid */}
      <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 z-10">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="group relative bg-white dark:bg-[#111827]/80 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Animated gradient border on hover */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            {/* Icon with gradient background */}
            <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 mb-4`}>
              <div className="text-gray-900 dark:text-white">
                {feature.icon}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>

            {/* Decorative line on hover */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${feature.gradient} group-hover:w-1/2 transition-all duration-300`}></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
