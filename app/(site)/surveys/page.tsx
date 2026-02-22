"use client";

import Meta from "@/components/seo/SeoEngine";
import { motion } from "framer-motion";
import { Eye, ClipboardList, Gift } from "lucide-react";

export default function SurveysPage() {
  return (
    <>
      <Meta
        title="Surveys | Cashog"
        description="Complete surveys and earn rewards."
      />

      <main className="min-h-screen w-full bg-white text-black flex flex-col items-center">

        {/* HERO */}
        <section className="w-full max-w-4xl text-center py-24">
          <h1 className="text-4xl font-bold mb-4">
            Earn Rewards by Completing Surveys
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Share your opinion and earn real rewards instantly.
          </p>

          <motion.a
            href="/signup"
            className="px-10 py-4 bg-green-500 text-white rounded-xl font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.a>
        </section>

        {/* SURVEYS */}
        <section className="w-full max-w-6xl px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Surveys
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
              <motion.div
                key={id}
                className="p-6 bg-gray-100 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <ClipboardList className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-semibold mt-3">
                  Survey #{id}
                </h3>
                <p className="text-gray-600 mt-2">
                  Estimated time: 5 min
                </p>

                <motion.a
                  href="/signup"
                  className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Start Survey
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="w-full text-center py-24">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Earn?
          </h2>

          <motion.a
            href="/signup"
            className="px-12 py-4 bg-green-600 text-white rounded-xl font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Start Now
          </motion.a>
        </section>

      </main>
    </>
  );
}
