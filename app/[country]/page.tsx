"use client";

import React from "react";
import { motion } from "framer-motion";

import Meta from "@/components/SEO/seoEngine";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";

import Reveal from "@/components/animations/openingstyle";
import Container from "@/components/animations/container";
import CircleBorder from "@/components/animations/CircleBorder";

import FAQ from "@/components/faq/FAQ";

import {
  Users, Gift, DollarSign, Trophy, Star, User, Target, Zap,
  CheckCircle, Globe, Shield, Clock, Wallet, BarChart3,
  Rocket, Crown, Infinity, ClipboardList, Smartphone,
  Gamepad2, Film, Hammer, CheckSquare, LayoutGrid,
  Eye, Sparkles, Timer, FlaskConical, Mail, PenTool,
  Puzzle, Ticket
} from "lucide-react";

/* ================= DATA ================= */

const affiliateStats = [
  { label: "Commission Rate", value: "15%", icon: <DollarSign />, trend: "+25%" },
  { label: "Active Affiliates", value: "50K+", icon: <Users />, trend: "Growing" },
  { label: "Trustpilot Rating", value: "4.7", icon: <Star />, trend: "Top rated" },
];

const steps = [
  { title: "Invite", icon: <User /> },
  { title: "They Earn", icon: <Gift /> },
  { title: "You Earn", icon: <DollarSign /> },
];

const faqs = [
  { q: "How does commission work?", a: "You earn 15% from referrals." },
  { q: "Is it free?", a: "Yes, 100% free." },
];

/* ================= PAGE ================= */

export default function AffiliatePage() {
  return (
    <>
      <Meta
        title="Affiliate Program - Earn 15% Commission"
        description="Earn money by referring users."
      />

      <main className="relative min-h-screen overflow-hidden">
        <Background />

        {/* ================= HERO ================= */}
        <Container className="relative">
          <CircleBorder />

          <Reveal>
            <div className="text-center py-20">
              <h1 className="text-5xl font-bold mb-6">
                Earn 15% Commission
              </h1>

              <p className="mb-6 text-lg">
                Join thousands earning daily
              </p>

              <PrimaryCTA href="/signup">
                Become Affiliate
              </PrimaryCTA>
            </div>
          </Reveal>
        </Container>

        {/* ================= STATS ================= */}
        <Container className="relative">
          <CircleBorder />

          <Reveal>
            <div className="flex justify-center gap-10 py-10">
              {affiliateStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl">{stat.icon}</div>
                  <div className="font-bold text-2xl">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>

        {/* ================= HOW IT WORKS ================= */}
        <Container className="relative">
          <CircleBorder />

          <Reveal>
            <div className="text-center py-10">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>

              <div className="flex justify-center gap-8">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {step.icon}
                    <span>{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>

        {/* ================= FAQ ================= */}
        <Container className="relative max-w-3xl">
          <CircleBorder />

          <Reveal>
            <div className="py-10">
              <h2 className="text-2xl font-bold text-center mb-6">
                FAQ
              </h2>

              <FAQ faqs={faqs} />
            </div>
          </Reveal>
        </Container>

        {/* ================= CTA ================= */}
        <Container className="relative">
          <CircleBorder />

          <Reveal>
            <div className="text-center py-20">
              <h2 className="text-4xl font-bold mb-6">
                Start Earning Today
              </h2>

              <PrimaryCTA href="/signup">
                Join Now
              </PrimaryCTA>
            </div>
          </Reveal>
        </Container>

      </main>
    </>
  );
}
