"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
          <path d="M13 10L18 5M13 10L18 15M13 10H21M7 14L3 18M7 14L3 10M7 14H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Instant Withdrawals",
      description:
        "Get your earnings instantly with zero delays. Fast, secure, and reliable withdrawals.",
      gradient: "from-yellow-400 to-yellow-500",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400">
          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Secure & Trusted",
      description:
        "Trusted by millions worldwide. Your data and earnings are fully protected.",
      gradient: "from-green-400 to-green-500",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-400">
          <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 15H9M15 15H17M7 9H9M15 9H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
          <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Multiple Payment Options",
      description:
        "Choose from PayPal, crypto, or gift cards. Flexible payouts that suit your lifestyle.",
      gradient: "from-purple-400 to-purple-500",
    },
  ];

  return (
    <OpeningStyle delay={0.12}>
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
              className="group relative bg-white dark:bg-[#111827]/80 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Animated gradient border on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon with gradient background - Centered */}
              <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 mb-6 mx-auto`}>
                <div className="text-gray-900 dark:text-white">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
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
    </OpeningStyle>
  );
}
