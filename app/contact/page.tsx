"use client";

import HeroSection from "@/components/hero/HeroSection";
import { motion } from "framer-motion";
import Link from "next/link";
import Meta from "@/components/seo/SeoEngine";

export default function ContactPage() {
  return (
    <>
      <Meta title="Contact Us - Cashog" description="Get in touch with the Cashog team for support, inquiries, or feedback." />

      <main className="transition-colors duration-300 bg-white text-gray-900 dark:bg-[#070A14] dark:text-white">

        {/* HERO HEADER */}
        <HeroSection />

        {/* CONTACT CONTENT */}
        <section className="w-full px-6 py-20">
          <div className="w-full mx-auto flex flex-col items-center">

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Contact Us
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-center mb-10 max-w-2xl">
              Have questions, feedback, or need support? Fill out the form below or reach us through email.
            </p>

            {/* Example Contact Form */}
            <form className="w-full bg-gray-100 dark:bg-white/5 p-8 rounded-2xl shadow-lg max-w-3xl space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#11121f] text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#11121f] text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  placeholder="Your message..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#11121f] text-gray-900 dark:text-white"
                  rows={6}
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Send Message
              </button>
            </form>

          </div>
        </section>

      </main>
    </>
  );
}
