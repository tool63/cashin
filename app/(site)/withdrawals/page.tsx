"use client";

import { motion } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";
import { DollarSign, CreditCard, Gift, Wallet, Clock, CheckCircle } from "lucide-react";

interface Withdrawal {
  id: number;
  method: string;
  amount: string;
  date: string;
  status: "Pending" | "Completed" | "Failed";
  icon: JSX.Element;
}

export default function WithdrawalsPage() {
  // Example withdrawal history data
  const withdrawals: Withdrawal[] = [
    {
      id: 1,
      method: "PayPal",
      amount: "$25.00",
      date: "Feb 12, 2026",
      status: "Completed",
      icon: <Wallet size={28} />,
    },
    {
      id: 2,
      method: "Amazon Gift Card",
      amount: "$10.00",
      date: "Feb 10, 2026",
      status: "Completed",
      icon: <Gift size={28} />,
    },
    {
      id: 3,
      method: "Bank Transfer",
      amount: "$50.00",
      date: "Feb 9, 2026",
      status: "Pending",
      icon: <CreditCard size={28} />,
    },
    {
      id: 4,
      method: "Mobile Top-Up",
      amount: "$15.00",
      date: "Feb 8, 2026",
      status: "Completed",
      icon: <DollarSign size={28} />,
    },
  ];

  return (
    <>
      <Meta
        title="Withdrawals | Cashog"
        description="View your Cashog withdrawal history. Track recent payments, payout methods, amounts, and status."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">

        {/* ================= HERO ================= */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Your Withdrawals
            </h1>

            <div className="text-2xl md:text-3xl mb-6 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Track your recent withdrawals, see payout methods, amounts, and status in real time.
            </div>
          </div>
        </section>

        {/* ================= WITHDRAWAL HISTORY CARDS ================= */}
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

        {/* ================= INFORMATION / TRUST ================= */}
        <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow">
            <Clock size={32} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Most withdrawals are processed instantly or within a few hours.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow">
            <ShieldCheck size={32} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600 dark:text-gray-400">
              All transactions are encrypted and processed safely.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow">
            <DollarSign size={32} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Multiple Methods</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Withdraw via PayPal, gift cards, mobile top-up, or bank transfer.
            </p>
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
