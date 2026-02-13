"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { MailCheck, Mail, Star, ShieldCheck, Rocket } from "lucide-react";

type Email = {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  reward: string;
  received: string;
  important?: boolean;
};

const emails: Email[] = [
  {
    id: 1,
    sender: "Marketing Pro",
    subject: "Exclusive Offer Inside!",
    preview: "Check out this amazing deal and earn rewards instantly...",
    reward: "$1.50",
    received: "Today",
    important: true,
  },
  {
    id: 2,
    sender: "Survey Hub",
    subject: "Your Feedback Matters",
    preview: "Complete this short email survey to earn cashback...",
    reward: "$1.00",
    received: "Yesterday",
  },
  {
    id: 3,
    sender: "Promo Deals",
    subject: "Limited Time Trial",
    preview: "Sign up for a free trial and get instant rewards...",
    reward: "$2.00",
    received: "2 days ago",
  },
];

export default function ReadEmailsPage() {
  return (
    <>
      <SeoEngine
        title="Read Emails | Cashog"
        description="Read emails, complete offers, and earn rewards instantly. Premium and modern email earning experience."
      />

      <main className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white transition-colors duration-300">

        {/* ================= HERO ================= */}
        <section className="relative py-28 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-green-200/30 to-yellow-300/40 dark:from-yellow-900/20 dark:via-green-900/10 dark:to-green-800/20 blur-3xl" />

          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Read Emails & Earn Rewards
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Open emails, complete offers inside, and get instant rewards. Secure, verified and high-converting earning experience.
            </p>

            <motion.a
              href="/signup"
              className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Reading Emails <Rocket size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= EMAIL CARDS ================= */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Available Email Offers
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {emails.map((email, i) => (
              <motion.div
                key={email.id}
                className={`relative bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border ${
                  email.important
                    ? "border-green-400 scale-105"
                    : "border-gray-200 dark:border-zinc-800"
                } hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                {email.important && (
                  <div className="absolute -top-4 right-6 bg-gradient-to-r from-yellow-400 to-green-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    Important
                  </div>
                )}

                <MailCheck className="w-8 h-8 text-yellow-500 mb-4" />

                <h3 className="text-xl font-semibold mb-2">{email.subject}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  From: {email.sender}
                </p>
                <p className="text-gray-500 mb-4 text-sm">{email.preview}</p>

                <div className="mb-6">
                  <p className="text-green-600 font-bold text-lg">
                    Reward: {email.reward}
                  </p>
                  <p className="text-sm text-gray-500">Received: {email.received}</p>
                </div>

                <motion.a
                  href="/signup"
                  className="cta-observer inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-4 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Read Email <Mail size={18} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-900 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Why Read Emails with Cashog?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Offers",
                desc: "All email offers are safe and verified for instant payout."
              },
              {
                icon: Star,
                title: "Premium Rewards",
                desc: "Earn high-value rewards for each completed email."
              },
              {
                icon: MailCheck,
                title: "Easy & Fast",
                desc: "Open emails and claim rewards in seconds."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Start Reading Emails & Earn Rewards?
          </h2>

          <motion.a
            href="/signup"
            className="cta-observer inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Join Cashog Now <Rocket size={20} />
          </motion.a>
        </section>

      </main>
    </>
  );
}
