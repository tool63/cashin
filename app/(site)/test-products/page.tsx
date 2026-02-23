"use client";

import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";
import {
  CheckCircle,
  PackageCheck,
  Star,
  Gift,
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
} from "lucide-react";

/* PRODUCT DATA */
type ProductTest = {
  id: number;
  title: string;
  description: string;
  reward: string;
  duration: string;
};

const products: ProductTest[] = [
  {
    id: 1,
    title: "Smartphone Beta Test",
    description: "Get early access and earn rewards by reviewing it.",
    reward: "$15.00",
    duration: "7 Days",
  },
  {
    id: 2,
    title: "Headphones Trial",
    description: "Test premium headphones and submit feedback.",
    reward: "$8.00",
    duration: "3 Days",
  },
  {
    id: 3,
    title: "Fitness Tracker Test",
    description: "Try new features and report experience.",
    reward: "$12.00",
    duration: "5 Days",
  },
  {
    id: 4,
    title: "Gaming Survey",
    description: "Share gaming habits and earn rewards.",
    reward: "$4.00",
    duration: "10 Min",
  },
  {
    id: 5,
    title: "App Usability Test",
    description: "Test app and provide feedback.",
    reward: "$6.00",
    duration: "15 Min",
  },
  {
    id: 6,
    title: "Video Feedback",
    description: "Watch and review videos.",
    reward: "$2.00",
    duration: "5 Min",
  },
];

/* STATS */
const stats = [
  { icon: Users, title: "Active Users", value: "1M+" },
  { icon: TrendingUp, title: "Daily Earnings", value: "$25K+" },
  { icon: DollarSign, title: "Payouts", value: "$5M+" },
  { icon: BarChart3, title: "Surveys Completed", value: "8M+" },
];

/* FAQ */
const faqs = [
  { q: "How does it work?", a: "Complete tasks and earn rewards." },
  { q: "When do I get paid?", a: "Rewards are credited instantly." },
  { q: "Is it free?", a: "Yes, there are no fees." },
];

export default function TestProductsPage() {
  return (
    <>
      <SeoEngine
        title="Test Products | Cashog"
        description="Join product testing and earn rewards."
      />

      <main className="min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            Test Products & Earn Rewards
          </h1>

          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
            <TypingText />
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
            Join trials, give feedback, and get paid instantly.
          </p>

          <PrimaryCTA href="/signup">Start Now</PrimaryCTA>
        </section>

        {/* STATS */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Platform Statistics
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-4 text-center border shadow-md"
              >
                <stat.icon className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <h3 className="text-sm uppercase text-gray-600 dark:text-gray-400">
                  {stat.title}
                </h3>
                <div className="text-2xl font-bold mt-2">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* OFFER GRID (WORKING 3 COLUMNS) */}
        <section className="max-w-7xl mx-auto px-4 pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Product Offers
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
            Complete tasks and earn rewards
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-2xl p-5 bg-white dark:bg-[#0a0d16] shadow-md"
              >
                <div className="flex justify-center mb-3">
                  <PackageCheck className="w-8 h-8 text-green-400" />
                </div>

                <h3 className="text-lg font-semibold text-center">
                  {product.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
                  {product.description}
                </p>

                <div className="flex justify-center mt-3">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <Star key={index} className="w-4 h-4 text-yellow-400" />
                    ))}
                </div>

                <p className="text-xs text-center text-gray-600 dark:text-gray-300 mt-2">
                  Duration: {product.duration}
                </p>

                <div className="flex justify-between items-center mt-5">
                  <span className="text-green-500 font-bold">
                    {product.reward}
                  </span>

                  <a
                    href="/signup"
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-green-400 text-black shadow-sm"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            How It Works
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Sign Up",
                description: "Create account in minutes.",
              },
              {
                title: "Choose Offer",
                description: "Select tasks that fit you.",
              },
              {
                title: "Complete Tasks",
                description: "Follow instructions and submit.",
              },
              {
                title: "Get Paid",
                description: "Receive rewards instantly.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-4 text-center border shadow-md"
              >
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <FAQ faqs={faqs} />
        </section>

        {/* FINAL CTA */}
        <section className="text-center py-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            Ready to Start?
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
            Join today and start earning.
          </p>

          <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
        </section>
      </main>
    </>
  );
}
