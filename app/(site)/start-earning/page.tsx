"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Gift,
  Gamepad2,
  Smartphone,
  Star,
  ShieldCheck,
  Zap,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import Meta from "@/components/seo/SeoEngine";

export default function StartEarningPage() {
  return (
    <>
      <Meta
        title="Start Earning | Cashog"
        description="Start earning real money with Cashog. Complete offers, play games, take surveys, and withdraw instantly."
      />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white min-h-screen">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Earn Real Money
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
              Instantly with Cashog
            </div>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Turn your free time into real income by completing simple tasks,
              playing games, and answering surveys.
            </p>

            <Link href="/signup" className="cta-observer inline-block">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-12 py-5 rounded-2xl font-bold shadow-xl text-lg"
              >
                Start Earning Now <ArrowRight />
              </motion.span>
            </Link>

          </div>
        </section>

        {/* ================= WAYS YOU CAN EARN ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-3">
          {[
            {
              icon: <Gift size={40} />,
              title: "Complete Offers",
              desc: "Install apps, sign up, or try new services and get rewarded instantly.",
            },
            {
              icon: <Gamepad2 size={40} />,
              title: "Play Games",
              desc: "Earn money by reaching levels or completing missions in games.",
            },
            {
              icon: <Smartphone size={40} />,
              title: "Take Surveys",
              desc: "Share your opinion and earn cash from trusted survey partners.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-100 dark:bg-[#1A1F2B] rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 text-yellow-500">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* ================= WHY CHOOSE CASHOG ================= */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Cashog
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <DollarSign size={32} />,
                title: "High Rewards",
                desc: "Competitive payouts for every completed task.",
              },
              {
                icon: <Zap size={32} />,
                title: "Instant Tracking",
                desc: "Your earnings are tracked in real-time.",
              },
              {
                icon: <ShieldCheck size={32} />,
                title: "Secure & Trusted",
                desc: "Safe withdrawals and verified offer partners.",
              },
              {
                icon: <Star size={32} />,
                title: "Top Rated Platform",
                desc: "Thousands of satisfied users worldwide.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 text-center shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4 text-yellow-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-28 bg-white dark:bg-[#070A14] w-full transition-colors duration-300">
          
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-500">
            Ready to Start Earning Today?
          </h2>

          <Link href="/signup" className="cta-observer inline-block">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-16 py-6 rounded-2xl font-bold shadow-2xl text-xl"
            >
              Create Free Account <ArrowRight />
            </motion.span>
          </Link>

          <p className="mt-6 text-gray-900 dark:text-gray-300 text-lg max-w-md mx-auto transition-colors duration-300">
            Join Cashog today and start turning your spare time into daily earnings.
          </p>
        </section>

      </main>
    </>
  );
}
