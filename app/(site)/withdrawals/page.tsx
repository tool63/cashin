"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wallet,
  CreditCard,
  Gift,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import Meta from "@/components/seo/SeoEngine";

interface Withdrawal {
  id: number;
  method: string;
  amount: string;
  date: string;
  status: "Pending" | "Completed" | "Failed";
  icon: JSX.Element;
}

export default function WithdrawalsRootPage() {
  // Example withdrawal history
  const withdrawals: Withdrawal[] = [
    { id: 1, method: "PayPal", amount: "$25.00", date: "Feb 12, 2026", status: "Completed", icon: <Wallet size={28} /> },
    { id: 2, method: "Amazon Gift Card", amount: "$10.00", date: "Feb 10, 2026", status: "Completed", icon: <Gift size={28} /> },
    { id: 3, method: "Bank Transfer", amount: "$50.00", date: "Feb 9, 2026", status: "Pending", icon: <CreditCard size={28} /> },
    { id: 4, method: "Mobile Top-Up", amount: "$15.00", date: "Feb 8, 2026", status: "Completed", icon: <DollarSign size={28} /> },
  ];

  const cashoutMethods = [
    { icon: <Wallet size={36} />, title: "PayPal", description: "Instant withdrawals worldwide." },
    { icon: <Gift size={36} />, title: "Gift Cards", description: "Amazon, Google Play, Apple, and more." },
    { icon: <Smartphone size={36} />, title: "Mobile Top-Up", description: "Recharge your mobile balance." },
    { icon: <CreditCard size={36} />, title: "Bank Transfer", description: "Direct transfer to your bank." },
  ];

  const faqs = [
    { question: "How do I withdraw my Cashog earnings?", answer: "You can withdraw via PayPal, gift cards, bank transfer, or mobile top-up once you reach the minimum payout threshold." },
    { question: "How fast are withdrawals processed?", answer: "Most withdrawals are processed instantly or within a few hours." },
    { question: "Is Cashog secure?", answer: "Yes, all transactions are encrypted and verified for safety." },
    { question: "Are withdrawals available worldwide?", answer: "Yes! Cashog supports users from around the world." },
  ];

  return (
    <>
      {/* ================= META ================= */}
      <Meta
        title="Withdrawals | Cashog"
        description="Track your Cashog withdrawals, view payout methods, amounts, and statuses instantly. Secure and fast withdrawals worldwide."
      />

      {/* JSON-LD FAQ for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">

        {/* ================= HERO SECTION ================= */}
        <section className="relative py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
            >
              Track and Withdraw Your Earnings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              View your withdrawal history, track payout methods, amounts, and statuses instantly. Cashog makes earning and withdrawing fast, secure, and reliable.
            </motion.p>
            <Link href="/signup" className="inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-xl text-lg"
              >
                Create Free Account <ArrowRight />
              </motion.span>
            </Link>
          </div>
        </section>

        {/* ================= CASHOUT METHODS ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {cashoutMethods.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 text-yellow-500">{method.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{method.description}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= WITHDRAWAL HISTORY ================= */}
        <section className="max-w-6xl mx-auto px-4 py-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {withdrawals.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4 text-yellow-500">{w.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{w.method}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{w.amount}</p>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{w.date}</p>
              <div
                className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  w.status === "Completed"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : w.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {w.status}
              </div>
            </motion.div>
          ))}
        </section>

        {/* ================= TRUST INFO ================= */}
        <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow">
            <Clock size={32} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
            <p className="text-gray-600 dark:text-gray-400">Most withdrawals are processed instantly or within a few hours.</p>
          </div>
          <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow">
            <ShieldCheck size={32} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600 dark:text-gray-400">All transactions are encrypted and processed safely.</p>
          </div>
          <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow">
            <DollarSign size={32} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Multiple Methods</h3>
            <p className="text-gray-600 dark:text-gray-400">Withdraw via PayPal, gift cards, mobile top-up, or bank transfer.</p>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-4 cursor-pointer">
                <summary className="font-semibold text-lg">{faq.question}</summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Ready to Withdraw Your Earnings?
          </h2>
          <Link href="/signup" className="inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Create Free Account <CheckCircle />
            </motion.span>
          </Link>
          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto">
            Join Cashog today and start tracking and withdrawing your earnings instantly.
          </p>
        </section>

      </main>
    </>
  );
}
