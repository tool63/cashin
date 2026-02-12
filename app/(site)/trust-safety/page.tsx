// app/trust-safety/page.tsx
"use client";

import { ShieldCheck, Lock, Eye, Server, BadgeCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: "Advanced Platform Security",
    description:
      "We use enterprise-grade security systems to protect your account, rewards, and personal data.",
  },
  {
    icon: <Lock size={32} />,
    title: "Encrypted Data Protection",
    description:
      "All sensitive data is encrypted using industry-standard SSL encryption and secure storage protocols.",
  },
  {
    icon: <Eye size={32} />,
    title: "Privacy First Policy",
    description:
      "Your information is never sold. We maintain strict privacy compliance and transparent policies.",
  },
  {
    icon: <Server size={32} />,
    title: "Secure Infrastructure",
    description:
      "Hosted on reliable cloud infrastructure with continuous monitoring and DDoS protection.",
  },
  {
    icon: <BadgeCheck size={32} />,
    title: "Verified Offers Only",
    description:
      "Every task and survey partner is reviewed and verified before being listed on our platform.",
  },
  {
    icon: <Users size={32} />,
    title: "Fraud Prevention System",
    description:
      "Smart detection systems ensure fair rewards and prevent abuse or fraudulent activities.",
  },
];

export default function TrustSafetyPage() {
  return (
    <>
      <Meta
        title="Trust & Safety - Cashog"
        description="Learn how Cashog protects your data, secures your earnings, and ensures safe online rewards."
      />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300">

        {/* HERO SECTION */}
        <section className="relative py-28 px-6 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500"
            >
              Your Security Is Our Priority
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              At Cashog, we are committed to maintaining a secure, transparent,
              and trusted environment for our global community of earners.
            </motion.p>

          </div>
        </section>

        {/* SECURITY GRID */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-[#111827] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800"
            >
              <div className="mb-5 text-yellow-500">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </section>

        {/* CORPORATE COMPLIANCE SECTION */}
        <section className="py-24 px-6 bg-gray-100 dark:bg-[#0F111B] text-center transition-colors duration-300">
          <div className="max-w-4xl mx-auto">

            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Compliance & Transparency
            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              We follow strict compliance standards and operate with full transparency.
              Our policies are designed to ensure fairness, user safety, and long-term trust.
              We continuously monitor platform activities to maintain a secure and ethical environment.
            </p>

          </div>
        </section>

        {/* FINAL TRUST CTA */}
        <section className="py-28 px-6 text-center bg-white dark:bg-[#070A14]">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Earn with Confidence
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Join a platform built on trust, security, and reliability.
            Start earning safely today.
          </p>

          <a
            href="/signup"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Create Free Account
          </a>
        </section>

      </main>
    </>
  );
}
