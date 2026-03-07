"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
          <path d="M13 5L20 12L13 19M4 5L11 12L4 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="2" fill="currentColor" className="text-yellow-400"/>
          <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
        </svg>
      ),
      title: "Instant Withdrawals",
      description:
        "Lightning-fast payouts to your preferred payment method. No waiting, no delays.",
      gradient: "from-yellow-400 to-yellow-500",
      accent: "yellow",
    },
    {
      icon: (
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400">
          <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
          <path d="M8 10L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      ),
      title: "Secure & Trusted",
      description:
        "Enterprise-grade security with 256-bit encryption. Your earnings are always protected.",
      gradient: "from-green-400 to-green-500",
      accent: "green",
    },
    {
      icon: (
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-400">
          <rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="8" cy="13" r="1.5" fill="currentColor" className="text-purple-400"/>
          <circle cx="16" cy="13" r="1.5" fill="currentColor" className="text-purple-400"/>
          <path d="M6 10L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M22 9H20M22 15H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 9H2M4 15H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: "Multiple Payment Options",
      description:
        "Flexible payouts via PayPal, cryptocurrency, bank transfers, and gift cards.",
      gradient: "from-purple-400 to-purple-500",
      accent: "purple",
    },
  ];

  return (
    <OpeningStyle delay={0.12}>
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-[#070A14] dark:to-[#0A0D19] transition-colors duration-300 overflow-hidden">
        {/* Premium background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/3 rounded-full blur-3xl"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.02"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>

        {/* Section Title with premium styling */}
        <div className="relative z-10 mb-16">
          <SectionTitle icon="✨" text="Why Choose Cashog" />
          <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
            Experience the premium features that make us the #1 choice for earning online
          </p>
        </div>

        {/* Features Grid */}
        <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 z-10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative bg-white/80 dark:bg-[#111827]/90 backdrop-blur-xl border border-gray-200/50 dark:border-white/5 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center"
            >
              {/* Premium gradient orb background */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r ${feature.gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r ${feature.gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Animated gradient border on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Premium icon container with glass morphism */}
              <div className={`relative mb-8 p-5 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 ring-1 ring-white/20 shadow-inner`}>
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
                <div className="relative text-gray-900 dark:text-white transform group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
              </div>
              
              {/* Title with gradient underline */}
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white relative">
                {feature.title}
                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r ${feature.gradient} rounded-full opacity-50 group-hover:w-20 transition-all duration-500`}></span>
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                {feature.description}
              </p>

              {/* Premium floating decorative elements */}
              <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>
              <div className={`absolute bottom-2 left-2 w-3 h-3 rounded-full bg-gradient-to-r ${feature.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="relative max-w-5xl mx-auto mt-20 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </section>
    </OpeningStyle>
  );
}
