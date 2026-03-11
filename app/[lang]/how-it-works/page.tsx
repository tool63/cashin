/* app/[lang]/how-it-works/page.tsx */
import { ReactNode } from "react";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { buildSEO } from "@/components/SEO/seoEngine";

export default async function HowItWorksPage() {
  const seo = await buildSEO({
    route: "/how-it-works",
    title: "How It Works | Easy Steps to Earn Rewards",
    description:
      "Learn how Cashog works to help you earn rewards easily — step by step guide for tasks, games, surveys & payouts.",
  });

  const steps = [
    {
      title: "1. Sign Up Instantly",
      desc: "Create your Cashog account in seconds and start earning right away.",
      icon: "📲",
    },
    {
      title: "2. Explore Offers",
      desc: "Browse high‑value tasks, surveys, and games curated for your interests.",
      icon: "🎯",
    },
    {
      title: "3. Complete & Earn",
      desc: "Finish tasks and offers to accumulate your balance fast.",
      icon: "💰",
    },
    {
      title: "4. Withdraw Easily",
      desc: "Choose your payout method and get paid securely.",
      icon: "💳",
    },
  ];

  return (
    <>
      {seo && <SeoRenderer seo={seo} />}

      <section className="w-full bg-gradient-to-tr from-indigo-900 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto text-center space-y-6 px-6">
          <h1 className="text-5xl font-extrabold tracking-tight">
            How It Works
          </h1>
          <p className="text-xl opacity-90">
            Simple, transparent & rewarding — here’s how you earn with Cashog
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white shadow‑2xl rounded‑2xl p‑8 border border‑gray‑100 transform hover:scale‑105 transition‑ease duration‑300"
            >
              <div className="text‑6xl mb‑4">{step.icon}</div>
              <h3 className="text‑2xl font‑bold mb‑2 text‑gray‑900">
                {step.title}
              </h3>
              <p className="text‑gray‑700">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Sign up now and start earning rewards instantly — no fees, no delays.
          </p>
          <a
            href="/signup"
            className="inline-block bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition"
          >
            Create Free Account
          </a>
        </div>
      </section>
    </>
  );
}
