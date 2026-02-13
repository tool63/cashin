"use client";

import { motion } from "framer-motion";
import SeoEngine from "@/components/seo/SeoEngine";
import { Mail, CheckCircle2, Clock, Sparkles } from "lucide-react";

/* ================= EMAIL TYPE ================= */
type Email = {
  id: number;
  subject: string;
  company: string;
  reward: string;
  status: "Unread" | "Completed";
};

/* ================= SAMPLE DATA ================= */
const emails: Email[] = [
  { id: 1, subject: "New Product Launch Offer", company: "TechNova", reward: "$0.50", status: "Unread" },
  { id: 2, subject: "Survey Invitation", company: "Insight Corp", reward: "$0.75", status: "Unread" },
  { id: 3, subject: "Exclusive App Install Reward", company: "AppWorld", reward: "$1.00", status: "Completed" },
  { id: 4, subject: "Limited Time Cashback", company: "PayPlus", reward: "$0.40", status: "Unread" },
  { id: 5, subject: "Daily Bonus Email", company: "Cashog", reward: "$0.30", status: "Completed" },
];

/* ================= PAGE ================= */
export default function ReadEmailsPage() {
  return (
    <>
      <SeoEngine
        title="Read Emails | Cashog"
        description="Earn rewards by reading promotional emails and completing simple actions on Cashog."
      />

      <main className="bg-white dark:bg-[#070A14] text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">

        {/* ================= HERO ================= */}
        <section className="relative py-28 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-green-200/30 to-yellow-300/40 dark:from-yellow-900/20 dark:via-green-900/10 dark:to-yellow-800/20 blur-3xl" />

          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Get Paid to Read Emails
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Open promotional emails, complete quick actions, and earn instant rewards effortlessly.
            </p>

            <motion.a
              href="#emails"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Start Reading <Mail size={20} />
            </motion.a>
          </motion.div>
        </section>

        {/* ================= EMAIL LIST ================= */}
        <section id="emails" className="py-24 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Available Emails
          </h2>

          <div className="space-y-6">
            {emails.map((email) => (
              <motion.div
                key={email.id}
                className="group relative bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 opacity-0 group-hover:opacity-10 transition duration-500" />

                <div className="relative z-10 flex items-center gap-5">
                  <div className="bg-gray-100 dark:bg-zinc-700 p-4 rounded-xl">
                    <Mail className="w-6 h-6 text-yellow-500" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{email.subject}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      From: {email.company}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-6">
                  <span className="text-green-600 font-bold text-lg">
                    {email.reward}
                  </span>

                  {email.status === "Unread" ? (
                    <motion.button
                      className="px-5 py-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
                      whileTap={{ scale: 0.95 }}
                    >
                      Read Now
                    </motion.button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-500 font-medium">
                      <CheckCircle2 size={18} />
                      Completed
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="py-28 px-6 bg-gray-50 dark:bg-zinc-900">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
            <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-zinc-800 p-10 rounded-3xl shadow-lg">
              <Mail className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-3">Open Email</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Click and read promotional emails from trusted partners.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-zinc-800 p-10 rounded-3xl shadow-lg">
              <Clock className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-3">Stay Active</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Spend a few seconds reviewing the content to qualify.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-zinc-800 p-10 rounded-3xl shadow-lg">
              <Sparkles className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-3">Earn Instantly</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rewards are credited directly to your Cashog balance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Ready to Earn by Reading Emails?
          </h2>

          <motion.a
            href="/signup"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-20 py-6 rounded-2xl font-bold shadow-2xl text-xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Join Cashog Now
          </motion.a>
        </section>

      </main>
    </>
  );
}
