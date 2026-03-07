"use client";

import { CheckCircle } from "lucide-react";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";

export default function TrustSection() {
  const features = [
    { 
      title: "Secure Payments", 
      description: "All transactions are encrypted and safe", 
      icon: "💳" 
    },
    { 
      title: "Trusted by Millions", 
      description: "Millions of users trust our platform globally", 
      icon: "🌍" 
    },
    { 
      title: "Fast Payouts", 
      description: "Get your earnings instantly with multiple methods", 
      icon: "⚡" 
    },
    { 
      title: "24/7 Support", 
      description: "Our support team is always here to help", 
      icon: "🕒" 
    },
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-[#0f111b] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Section Heading */}
        <SectionTitle icon="🔒" text="Why You Can Trust Us" />

        <p className="text-gray-600 dark:text-gray-400 mb-14 max-w-2xl mx-auto text-lg">
          Our platform ensures security, reliability, and instant payouts so you can focus on earning without worries.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
            >
              {/* Icon */}
              <span className="text-6xl mb-4">{feature.icon}</span>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white text-center">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                {feature.description}
              </p>

              {/* Check Icon */}
              <CheckCircle className="text-green-400 mt-4" size={24} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
