import React from "react";
import {
  ArrowRight,
  User,
  CreditCard,
  Gift,
  CheckCircle,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import TypingText from "@/components/typing/TypingText";

/* ================= SEO METADATA ================= */
export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
      route: "/earn-dogecoin-online",
      locale: SEO_CONFIG.defaultLocale,
    });

    return {
      ...seo.metadata,
      alternates: {
        canonical: seo.canonical,
        languages: seo.hreflang,
      },
      robots: seo.metadata?.robots,
    };
  } catch (error) {
    console.error("Metadata generation failed:", error);
    return {
      title: "Earn Dogecoin Online - Cashog",
      description:
        "Learn how to earn Dogecoin online by completing tasks, surveys, and offers with Cashog.",
    };
  }
}

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={32} className="text-yellow-500 dark:text-yellow-400" />,
    title: "Sign Up for Free",
    description:
      "Create your Cashog account and start earning Dogecoin instantly with our platform.",
  },
  {
    icon: <CreditCard size={32} className="text-green-500 dark:text-green-400" />,
    title: "Complete Tasks & Offers",
    description:
      "Play games, watch videos, install apps, or complete surveys to earn points that convert to Dogecoin.",
  },
  {
    icon: <Gift size={32} className="text-yellow-500 dark:text-yellow-400" />,
    title: "Convert Points to Dogecoin",
    description:
      "Redeem your points safely and instantly for Dogecoin through secure wallets.",
  },
  {
    icon: <CheckCircle size={32} className="text-green-500 dark:text-green-400" />,
    title: "Withdraw Instantly",
    description:
      "Dogecoin is delivered directly to your wallet once the redemption threshold is reached.",
  },
];

/* ================= FEATURES ================= */
const features = [
  {
    title: "Instant Dogecoin Payouts",
    description: "Receive Dogecoin immediately after redeeming points.",
  },
  {
    title: "High-Paying Offers",
    description: "Earn maximum points from top offers for faster rewards.",
  },
  {
    title: "Global Access",
    description: "Available for users worldwide on any device.",
  },
  {
    title: "Mobile-Friendly",
    description: "Earn Dogecoin on mobile, tablet, or desktop anywhere.",
  },
  {
    title: "Trusted & Secure",
    description: "Millions of users trust Cashog for safe, verified Dogecoin payouts.",
  },
  {
    title: "24/7 Support",
    description: "Our support team is always ready to help with any questions.",
  },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "How do I withdraw Dogecoin?",
    a: "After collecting points from tasks, redeem them for Dogecoin directly to your wallet instantly.",
  },
  {
    q: "Can I earn from mobile?",
    a: "Yes! The platform is fully responsive and works on any mobile device.",
  },
  {
    q: "Is signing up free?",
    a: "Absolutely! Creating an account and earning is 100% free.",
  },
  {
    q: "Is Dogecoin safe?",
    a: "Yes, all withdrawals are processed securely and instantly to verified wallets.",
  },
  {
    q: "How long does delivery take?",
    a: "Dogecoin payouts are delivered instantly after redemption.",
  },
];

/* ================= STATS ================= */
const stats = [
  { label: "Users Worldwide", value: "50K+" },
  { label: "Tasks Completed", value: "120K+" },
  { label: "Dogecoin Paid", value: "85K+" },
];

/* ================= PAGE COMPONENT ================= */
export default function EarnDogecoinOnline() {
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300">
        {/* ================= HERO ================= */}
        <section className="relative py-24 px-4 text-center bg-gray-50 dark:bg-[#0F172A] rounded-b-3xl">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
              Earn Dogecoin Online
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
              Complete tasks, offers, and surveys to earn Dogecoin instantly from anywhere, on any device.
            </p>

            <Link href="/signup" className="cta-observer inline-block">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-3xl font-bold shadow-xl text-lg hover:opacity-90 transition-opacity">
                Start Earning Now <ArrowRight size={20} />
              </span>
            </Link>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-3 gap-4 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-[#1A1F2B]/90 border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl md:text-4xl font-extrabold text-green-500">
                  {stat.value}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= STEPS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 flex flex-col items-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Choose Cashog for Dogecoin
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4 text-yellow-500">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#2A2F43] transition-colors duration-300"
              >
                <summary className="font-semibold text-lg">{faq.q}</summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-gray-50 dark:bg-[#0F172A] rounded-t-3xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Start Earning Dogecoin Today!
          </h2>

          <Link href="/signup" className="cta-observer inline-block">
            <span className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl hover:opacity-90 transition-opacity">
              Redeem Dogecoin <ArrowRight size={20} />
            </span>
          </Link>

          <p className="mt-6 text-lg max-w-md mx-auto text-gray-600 dark:text-gray-300">
            Join Cashog and start earning Dogecoin instantly from any device, anywhere.
          </p>
        </section>
      </main>
    </>
  );
}
