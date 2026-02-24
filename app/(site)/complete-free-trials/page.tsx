"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import FAQ from "@/components/faq/FAQ";
import {
  CheckCircle,
  Gift,
  Sparkles,
  ShieldCheck,
  Star,
  Users,
  DollarSign,
} from "lucide-react";

/* ================= TRIAL TYPE ================= */
type Trial = {
  id: number;
  title: string;
  description: string;
  reward: string;
  duration: string;
  popular?: boolean;
};

/* ================= TRIAL DATA ================= */
const trials: Trial[] = [
  {
    id: 1,
    title: "Streaming Premium Trial",
    description: "Access full premium content with zero upfront payment.",
    reward: "$5.00",
    duration: "7 Days",
    popular: true,
  },
  {
    id: 2,
    title: "Finance App Signup Bonus",
    description: "Install, verify account and earn instant reward.",
    reward: "$8.00",
    duration: "Instant",
  },
  {
    id: 3,
    title: "AI Productivity Tool Trial",
    description: "Try advanced AI features and earn cashback reward.",
    reward: "$10.00",
    duration: "14 Days",
  },
  {
    id: 4,
    title: "Cloud Storage Premium",
    description: "Test secure storage with bonus reward.",
    reward: "$4.00",
    duration: "7 Days",
  },
  {
    id: 5,
    title: "Music Streaming Trial",
    description: "Enjoy unlimited music and earn rewards.",
    reward: "$3.50",
    duration: "5 Days",
  },
  {
    id: 6,
    title: "Online Learning Platform",
    description: "Access premium courses and earn cashback.",
    reward: "$6.00",
    duration: "10 Days",
  },
];

/* ================= STATS ================= */
const stats = [
  { label: "Active Trials", number: 3200, icon: <Gift className="w-6 h-6 text-green-400" /> },
  { label: "Users Earned", number: 18500, icon: <Users className="w-6 h-6 text-green-400" /> },
  { label: "Total Rewards Paid", number: 45000, icon: <DollarSign className="w-6 h-6 text-green-400" /> },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "Is it free to join?", a: "Yes. All free trials and offers on Cashog are free to start." },
  { q: "How fast are rewards paid?", a: "Most rewards are credited instantly after completion." },
  { q: "Do I need a credit card?", a: "Most trials do not require payment details, but some premium offers may." },
  { q: "Can I cancel after the trial?", a: "Yes. You can cancel before the trial period ends if required." },
  { q: "Are trials safe and verified?", a: "Yes. We only feature verified and legitimate partner offers." },
  { q: "How much can I earn?", a: "Earnings vary by trial, with premium offers paying higher rewards." },
  { q: "Can I use mobile?", a: "Yes. Our platform is fully optimized for mobile users." },
];

/* ================= PAGE ================= */
export default function FreeTrialsPage() {
  return (
    <>
      <SeoEngine
        title="Free Trials | Cashog"
        description="Complete premium free trials and earn rewards instantly."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Complete Free Trials & Earn Rewards
            </h1>

            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
              Try premium services for free and earn real rewards instantly.
            </p>

            <PrimaryCTA href="/signup">
              Start Free Trials
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* TRIAL CARDS */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Featured Free Trial Offers
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Secure and high-converting trial opportunities
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {trials.map((trial) => (
              <Reveal key={trial.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`relative bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md flex flex-col ${
                    trial.popular
                      ? "border-green-400"
                      : "border-gray-200 dark:border-gray-800"
                  }`}
                >
                  {trial.popular && (
                    <div className="absolute -top-3 right-4 bg-gradient-to-r from-yellow-400 to-green-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                      Most Popular
                    </div>
                  )}

                  <Sparkles className="w-8 h-8 text-yellow-500 mb-4 mx-auto" />

                  <h3 className="text-xl font-semibold mb-2">{trial.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {trial.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-green-500 font-bold">Reward: {trial.reward}</p>
                    <p className="text-sm text-gray-500">Duration: {trial.duration}</p>
                  </div>

                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05 }}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-green-400 text-black px-4 py-3 rounded-xl font-semibold shadow"
                  >
                    Start Trial <CheckCircle size={18} />
                  </motion.a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WHY TRUST */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Why Choose Cashog Free Trials?
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Verified offers with instant rewards
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Offers",
                desc: "All trials are manually verified for safety and real payouts."
              },
              {
                icon: Gift,
                title: "Instant Rewards",
                desc: "Receive your earnings immediately after successful completion."
              },
              {
                icon: Star,
                title: "Premium Experience",
                desc: "Clean UI, fast tracking and advanced payout system."
              }
            ].map((item) => (
              <Reveal key={item.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                >
                  <div className="flex justify-center mb-4">
                    <item.icon className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {item.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Frequently Asked Questions
              </h2>

              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Everything you need to know about free trials
              </p>
            </>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* STATS */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
          <Reveal>
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Free Trial Platform Stats
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Real numbers from our growing community
              </p>
            </>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <Reveal key={stat.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border shadow-md"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>

                  <h3 className="text-3xl font-extrabold text-green-500">
                    {stat.number.toLocaleString()}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 text-center py-28">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Turn Free Trials Into Real Rewards
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
              Join Cashog today and start earning with premium trial offers.
            </p>

            <PrimaryCTA href="/signup">
              Join Now
            </PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
