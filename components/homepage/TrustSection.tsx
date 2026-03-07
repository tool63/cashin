"use client";

import { SectionTitle } from "@/components/homepage/SmallComponents";
import { motion } from "framer-motion";
import OpeningStyle from "@/components/animations/openingstyle";
import Container, { Card, CardIcon, CardTitle, CardDescription, CardGrid } from "@/components/animations/container";

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
    <OpeningStyle delay={0.15}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* Section Heading */}
          <div className="mb-6">
            <SectionTitle icon="🔒" text="Why You Can Trust Us" />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Our platform ensures security, reliability, and instant payouts so you can focus on earning without worries.
          </p>

          {/* Feature Cards Grid */}
          <CardGrid cols={{ default: 1, sm: 2, lg: 4 }}>
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
                </Card>
              </motion.div>
            ))}
          </CardGrid>

          {/* Optional: Additional trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> 256-bit Encryption
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> GDPR Compliant
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> SSL Secure
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Verified Company
            </div>
          </div>
        </div>
      </section>
    </OpeningStyle>
  );
}
