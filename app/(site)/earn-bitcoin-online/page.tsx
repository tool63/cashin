import React from "react";
import { ArrowRight, User, CreditCard, Gift, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import TypingText from "@/components/typing/TypingText";

/* ================= SEO METADATA ================= */
export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
      route: "/earn-bitcoin-online",
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
      title: "Earn Bitcoin Online - Cashog",
      description:
        "Learn how to earn Bitcoin online by completing tasks, surveys, and offers with Cashog.",
    };
  }
}

/* ================= STEPS ================= */
const steps = [
  {
    icon: <User size={32} className="text-yellow-500 dark:text-yellow-400" />,
    title: "Sign Up for Free",
    description: "Create your account and start earning Bitcoin instantly.",
  },
  {
    icon: <CreditCard size={32} className="text-green-500 dark:text-green-400" />,
    title: "Complete Tasks & Offers",
    description:
      "Play games, watch videos, install apps, or complete surveys to earn points that convert to Bitcoin.",
  },
  {
    icon: <Gift size={32} className="text-yellow-500 dark:text-yellow-400" />,
    title: "Convert Points to Bitcoin",
    description:
      "Redeem your points for Bitcoin safely and instantly through secure wallets.",
  },
  {
    icon: <CheckCircle size={32} className="text-green-500 dark:text-green-400" />,
    title: "Withdraw Instantly",
    description:
      "Bitcoin is delivered directly to your wallet once the redemption threshold is reached.",
  },
];

/* ================= FEATURES ================= */
const features = [
  { title: "Instant Bitcoin Payouts", description: "Receive Bitcoin instantly after redeeming points." },
  { title: "High-Paying Offers", description: "Maximize your earnings with top-performing offers." },
  { title: "Global Access", description: "Available worldwide on any device." },
  { title: "Mobile-Friendly", description: "Earn Bitcoin on mobile, tablet, or desktop." },
  { title: "Trusted & Secure", description: "Safe and verified Bitcoin payouts." },
  { title: "24/7 Support", description: "Support team ready to help anytime." },
];

const faqs = [
  { q: "How do I withdraw Bitcoin?", a: "Collect points from tasks and redeem them directly to your wallet instantly." },
  { q: "Can I earn from mobile?", a: "Yes! The platform works on all mobile devices." },
  { q: "Is signing up free?", a: "Yes, creating an account is completely free." },
  { q: "Is Bitcoin safe?", a: "All withdrawals are processed securely to verified wallets." },
  { q: "How long does delivery take?", a: "Bitcoin payouts are delivered instantly after redemption." },
];

/* ================= STATS ================= */
const stats = [
  { label: "Users Worldwide", value: "50K+" },
  { label: "Tasks Completed", value: "120K+" },
  { label: "Bitcoin Paid", value: "85K+" },
];

/* ================= PAGE COMPONENT ================= */
export default function EarnBitcoinOnline() {
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="py-24 px-4 text-center bg-gray-50 dark:bg-[#0F172A] rounded-b-3xl">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
              Earn Bitcoin Online
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              <TypingText />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Complete simple tasks, offers, and surveys to earn Bitcoin instantly from anywhere in the world.
            </p>

            <Link href="/signup">
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
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Choose Cashog for Bitcoin
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 shadow hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
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
                className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-5 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#2A2F43] transition-colors duration-300"
              >
                <summary className="font-semibold text-lg">{faq.q}</summary>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-gray-50 dark:bg-[#0F172A] rounded-t-3xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Start Earning Bitcoin Today!
          </h2>

          <Link href="/signup">
            <span className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-3xl font-bold shadow-2xl text-xl hover:opacity-90 transition-opacity">
              Redeem Bitcoin <ArrowRight size={20} />
            </span>
          </Link>

          <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog and start earning Bitcoin instantly from any device, anywhere.
          </p>
        </section>

      </main>
    </>
  );
}
