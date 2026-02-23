"use client";

import React from "react";
import SeoEngine from "@/components/seo/SeoEngine";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import FAQ from "@/components/faq/FAQ";

/* PRODUCT DATA */
const products = [
  { id: 1, title: "Smartphone Beta Test", description: "Early access test.", reward: "$15", duration: "7 Days" },
  { id: 2, title: "Headphones Trial", description: "Test and review.", reward: "$8", duration: "3 Days" },
  { id: 3, title: "Fitness Tracker", description: "Share feedback.", reward: "$12", duration: "5 Days" },
];

/* FAQ */
const faqs = [
  { q: "How does it work?", a: "Complete tasks and earn rewards." },
  { q: "When do I get paid?", a: "Rewards are credited instantly." },
  { q: "Is it free?", a: "Yes." },
];

export default function TestProductsPage() {
  return (
    <>
      <SeoEngine
        title="Test Products"
        description="Join product testing and earn rewards."
      />

      <main className="min-h-screen text-center">
        <Background />

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold mb-4">
            Test Products & Earn Rewards
          </h1>
          <p className="text-gray-600 mb-6">
            Join trials, give feedback, and get paid.
          </p>

          <PrimaryCTA href="/signup">Start Now</PrimaryCTA>
        </section>

        {/* PRODUCT GRID */}
        <section className="max-w-7xl mx-auto px-4 pb-24">
          <h2 className="text-2xl font-bold mb-4">Product Offers</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {product.description}
                </p>
                <p className="text-green-600 font-bold mt-2">{product.reward}</p>
                <p className="text-xs text-gray-500">Duration: {product.duration}</p>

                <a
                  href="/signup"
                  className="inline-block mt-4 px-4 py-2 text-sm rounded bg-green-500 text-white"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              "Sign Up",
              "Choose Offer",
              "Complete Tasks",
              "Get Paid",
            ].map((step) => (
              <div
                key={step}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <h3 className="font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <h2 className="text-2xl font-bold mb-4">FAQ</h2>
          <FAQ faqs={faqs} />
        </section>

        {/* FINAL CTA */}
        <section className="text-center py-24">
          <h2 className="text-4xl font-bold mb-4">Ready to Start?</h2>
          <PrimaryCTA href="/signup">Join Now</PrimaryCTA>
        </section>
      </main>
    </>
  );
}
