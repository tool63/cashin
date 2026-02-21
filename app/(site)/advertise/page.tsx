"use client";

import React from "react";
import {
  User,
  CreditCard,
  Target,
  Globe,
  BarChart,
  DollarSign,
  ShieldCheck,
  Headphones,
  CheckCircle,
  Users,
} from "lucide-react";
import Meta from "@/components/seo/SeoEngine";
import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import Reveal from "@/components/animations/Reveal";
import PrimaryCTA from "@/components/cta/PrimaryCTA";

/* ================= DATA ================= */

const steps = [
  {
    icon: <User size={28} className="text-yellow-400" />,
    title: "Sign Up as Advertiser",
    description:
      "Create an advertiser account and access our platform to promote your brand or products.",
  },
  {
    icon: <CreditCard size={28} className="text-green-400" />,
    title: "Set Up Campaigns",
    description:
      "Design campaigns, choose target audience, and set your budget easily.",
  },
  {
    icon: <Target size={28} className="text-yellow-400" />,
    title: "Reach Millions",
    description:
      "Your ads are displayed to millions of active users completing offers.",
  },
  {
    icon: <BarChart size={28} className="text-green-400" />,
    title: "Monitor & Optimize",
    description:
      "Track clicks, conversions, and ROI in real-time with our dashboard.",
  },
];

const features = [
  {
    icon: <Target size={22} className="text-yellow-500" />,
    title: "High Engagement",
    description: "Reach an active audience ready to interact.",
  },
  {
    icon: <BarChart size={22} className="text-green-500" />,
    title: "Real-Time Analytics",
    description: "Monitor performance metrics instantly.",
  },
  {
    icon: <Globe size={22} className="text-yellow-500" />,
    title: "Global Reach",
    description: "Promote to users worldwide.",
  },
  {
    icon: <DollarSign size={22} className="text-green-500" />,
    title: "Flexible Budgets",
    description: "Set daily or total campaign budgets easily.",
  },
  {
    icon: <ShieldCheck size={22} className="text-yellow-500" />,
    title: "Trusted Platform",
    description: "Advertise on a trusted platform.",
  },
  {
    icon: <Headphones size={22} className="text-green-500" />,
    title: "Dedicated Support",
    description: "24/7 campaign optimization support.",
  },
];

const stats = [
  { value: "50M+", label: "Active Users", icon: <Users size={18} /> },
  { value: "150+", label: "Countries", icon: <Globe size={18} /> },
  { value: "2.5B+", label: "Impressions/mo", icon: <BarChart size={18} /> },
  { value: "99.9%", label: "Uptime", icon: <CheckCircle size={18} /> },
];

const faqs = [
  {
    q: "How do I start advertising?",
    a: "Sign up for a free advertiser account and create your first campaign instantly.",
  },
  {
    q: "Can I target specific users?",
    a: "Yes, you can target by demographics, location, and interests.",
  },
  {
    q: "Is there a minimum budget?",
    a: "Start with any budget that fits your goals.",
  },
  {
    q: "How is performance tracked?",
    a: "Real-time dashboards show clicks, conversions, and ROI.",
  },
];

/* ================= PAGE ================= */

export default function AdvertisePage() {
  return (
    <>
      <Meta
        title="Cashog - Advertise with Us"
        description="Reach millions of active users with Cashog advertising platform."
      />

      <main className="relative min-h-screen bg-primary text-white overflow-hidden">
        <Background />

        <section className="relative isolate max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <Reveal>
            <div className="text-center mb-24">
              <h1 className="text-5xl font-extrabold mb-6">
                Advertise with <span className="gradient-text">Cashog</span>
              </h1>

              <div className="text-4xl font-extrabold mb-8 gradient-text">
                <TypingText />
              </div>

              <p className="text-lg text-muted max-w-3xl mx-auto mb-10">
                Reach millions of active users and scale your business with
                performance-driven advertising.
              </p>

              <PrimaryCTA href="/signup?type=advertiser">
                Start Advertising
              </PrimaryCTA>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                {stats.map((stat, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full text-sm">
                      <span className="text-green-400">{stat.icon}</span>
                      <span className="font-semibold">{stat.value}</span>
                      <span className="text-muted">{stat.label}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* STEPS */}
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-12">
              How It <span className="gradient-text">Works</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-24">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="bg-card rounded-2xl p-6 text-center border border-theme">
                  <div className="mb-4 flex justify-center">{step.icon}</div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* FEATURES */}
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Advertise with <span className="gradient-text">Cashog</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-24">
            {features.map((feature, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-card rounded-2xl p-6 text-center border border-theme">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* FAQ */}
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="space-y-4 mb-24">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <details className="bg-card rounded-xl border border-theme p-4">
                  <summary className="font-semibold cursor-pointer">{faq.q}</summary>
                  <p className="mt-3 text-sm text-muted">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          {/* FINAL CTA */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-4xl font-extrabold mb-6 gradient-text">
                Ready to Scale?
              </h2>

              <PrimaryCTA href="/signup?type=advertiser">
                Launch Your Campaign
              </PrimaryCTA>
            </div>
          </Reveal>

        </section>
      </main>
    </>
  );
}
