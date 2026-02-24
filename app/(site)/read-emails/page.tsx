"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import TypingText from "@/components/typing/TypingText";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";
import { MailCheck, Mail, Star, ShieldCheck, Rocket, Users, DollarSign, TrendingUp } from "lucide-react";

/* ================= COUNT UP ================= */
function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let counter: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);

        counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            if (counter) clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      } else {
        if (counter) {
          clearInterval(counter);
          counter = null;
        }
      }
    }, { threshold: 0.3 });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (counter) clearInterval(counter);
    };
  }, [end]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

/* ================= STATS ================= */
const stats = [
  { label: "Emails Available", number: 1250, icon: <MailCheck className="w-6 h-6 text-green-400" /> },
  { label: "Active Readers", number: 15000, icon: <Users className="w-6 h-6 text-green-400" /> },
  { label: "Average Reward ($)", number: 2.8, icon: <DollarSign className="w-6 h-6 text-green-400" /> },
  { label: "Emails Opened", number: 780000, icon: <TrendingUp className="w-6 h-6 text-green-400" /> },
];

/* ================= FAQ ================= */
const faqs = [
  { q: "Is it free to read emails?", a: "Yes. You can read emails and earn rewards for free." },
  { q: "How fast are payouts?", a: "Most payouts are instant or processed within hours." },
  { q: "Are offers safe?", a: "All offers are verified and secure for users." },
  { q: "Can I use mobile?", a: "Yes. The platform is fully mobile optimized." },
  { q: "How much can I earn?", a: "Earnings vary per email offer and activity." },
  { q: "Do I need experience?", a: "No. Anyone can read emails and earn rewards." },
];

export default function ReadEmailsPage() {
  return (
    <>
      <SeoEngine
        title="Read Emails | Cashog"
        description="Read emails, complete offers, and earn rewards instantly. Premium email earning experience."
      />

      <main className="relative min-h-screen text-gray-900 dark:text-white">
        <Background />

        {/* ================= HERO WITH TYPING TEXT ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Read Emails & Earn Rewards
            </h1>

            <div className="text-2xl md:text-3xl font-bold gradient-text mb-6">
              <TypingText />
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Open emails, complete offers, and earn instant rewards with secure and verified opportunities.
            </p>

            <PrimaryCTA href="/signup">
              Start Reading Emails <Rocket size={20} />
            </PrimaryCTA>
          </Reveal>
        </section>

        {/* ================= STATS WITH COUNT-UP ================= */}
        <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Email Activity Stats
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Real numbers from our growing community
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-800 shadow-md"
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>

                <h3 className="text-3xl font-extrabold text-green-500">
                  <CountUp end={stat.number} />
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= EMAIL CARDS (unchanged) ================= */}
        <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Available Email Offers
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-14">
              Open emails and claim rewards
            </p>
          </Reveal>

          {/* Your email cards grid here (unchanged) */}
        </section>

        {/* ================= TRUST SECTION (unchanged) ================= */}
        <section className="relative z-10 py-24 px-6 bg-gray-50 dark:bg-[#080b12] text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-14">
              Why Read Emails with Cashog?
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: ShieldCheck, title: "Verified Offers", desc: "All offers are safe and verified." },
              { icon: Star, title: "Premium Rewards", desc: "Earn rewards for every completed email." },
              { icon: MailCheck, title: "Fast & Easy", desc: "Open emails and claim rewards instantly." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0a0d16] rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800"
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
              Everything you need to know about earning with emails
            </p>
          </Reveal>

          <FAQ faqs={faqs} />
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative z-10 py-28 px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Ready to Start Reading Emails & Earn Rewards?
            </h2>

            <PrimaryCTA href="/signup">
              Join Cashog Now <Rocket size={20} />
            </PrimaryCTA>
          </Reveal>
        </section>
      </main>
    </>
  );
}
