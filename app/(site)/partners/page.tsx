"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Meta from "@/components/seo/SeoEngine";

// SEO imports (only addition)
import { buildSEO, SEOOutput } from "@/components/SEO/seoEngine";
import { SEO_CONFIG } from "@/components/SEO/seoConfig";
import SeoRenderer from "@/components/SEO/SeoRenderer";

import TypingText from "@/components/typing/TypingText";
import Background from "@/components/Background";
import PrimaryCTA from "@/components/cta/PrimaryCTA";
import Reveal from "@/components/animations/Reveal";
import RevealWithBorder from "@/components/animations/RevealWithBorder";
import {
  Users,
  Gift,
  DollarSign,
  Trophy,
  Star,
  User,
  Target,
  Zap,
  CheckCircle,
  Globe,
  Shield,
  Clock,
  Wallet,
  BarChart3,
  Rocket,
  Crown,
  Infinity,
  Briefcase,
  Building2,
  Award,
  Gem,
  Diamond,
  Medal,
  TrendingUp,
  Heart,
  Network,
  Sparkles,
  PartyPopper,
  CreditCard,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  BadgeCheck,
  Verified,
  ThumbsUp,
  Headphones,
  Mail,
  MessageCircle,
  Phone,
  Video,
  Calendar,
  Timer,
  Watch,
  AlarmClock,
  Hourglass,
  Coffee,
  Moon,
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Cloudy,
  Wind,
  Compass,
  Map,
  MapPin,
  Navigation,
  Eye,
  EyeOff,
  Scan,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Move,
  RotateCw,
  RotateCcw,
  Repeat,
  Shuffle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Volume1,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Radio,
  Music,
  Gamepad2,
  Puzzle,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Keyboard,
  Mouse,
  Printer,
  Camera,
  Webcam,
  Film,
  Tv,
  Bot,
  Brain,
  Fingerprint,
  Key,
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Hammer,
  Wrench,
  Building,
  Home,
  Factory,
  Warehouse,
  Store,
  ShoppingBag,
  ShoppingCart,
  Banknote,
  Coins,
  PiggyBank,
  Beer,
  Wine,
  Utensils,
} from "lucide-react";

/* ================= SEO METADATA ================= */
export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
      route: "/partners",
      locale: SEO_CONFIG.defaultLocale,
    });

    return {
      ...seo.metadata,
      alternates: {
        canonical: seo.canonical,
        languages: seo.hreflang,
      },
      robots: seo.metadata?.robots,
    };
  } catch (error) {
    console.error("Metadata generation failed:", error);

    return {
      title: "Partner Program - Join Our Global Network | Cashog",
      description:
        "Become a Cashog partner and earn revenue share. Join thousands of partners worldwide.",
    };
  }
}

/* ================= SEO METRICS HOOK ================= */
function useSEOMetrics(seo: SEOOutput | null) {
  useEffect(() => {
    if (!seo?.metrics) return;

    console.log("[SEO Metrics]", {
      score: seo.metrics.seoScore ?? "n/a",
      pageType: seo.pageType?.type,
      generationTime: seo.metrics.generationTime,
    });
  }, [seo]);
}

/* ================= PARTNER STATS ================= */
const partnerStats = [
  {
    label: "Global Partners",
    value: "10K+",
    icon: <Building2 className="w-5 h-5" />,
    trend: "+35%",
    gradient: "from-emerald-400 to-teal-400",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Revenue Share",
    value: "30%",
    icon: <Percent className="w-5 h-5" />,
    trend: "Top-tier",
    gradient: "from-blue-400 to-indigo-400",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Avg. Payout",
    value: "$5K",
    icon: <DollarSign className="w-5 h-5" />,
    trend: "+45%",
    gradient: "from-amber-400 to-orange-400",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

/* ================= PAGE ================= */
export default function PartnerPage() {
  const [seo, setSeo] = useState<SEOOutput | null>(null);

  useSEOMetrics(seo);

  useEffect(() => {
    let mounted = true;

    buildSEO({ route: "/partners", locale: SEO_CONFIG.defaultLocale })
      .then((result) => {
        if (mounted) setSeo(result);
      })
      .catch((err) => console.error("SEO hydration failed:", err));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {seo && <SeoRenderer seo={seo} />}

      <main className="relative min-h-screen text-gray-900 dark:text-white overflow-hidden">
        <Background />

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">

          {/* HERO SECTION */}
          <Reveal>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl mb-20"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 180],
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 opacity-90"
              />
              <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-16 m-1">
                <div className="relative text-center">
                  <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-8 leading-tight">
                    Partner With Us
                  </h1>
                  <div className="flex justify-center">
                    <PrimaryCTA href="/partner/apply">
                      Become a Partner
                    </PrimaryCTA>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* STATS SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
            <RevealWithBorder>
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  Program Performance
                </h2>
                <div className="flex items-center justify-center gap-12">
                  {partnerStats.map((stat) => (
                    <Reveal key={stat.label}>
                      <motion.div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                          <div className={stat.iconColor}>{stat.icon}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">{stat.label}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold">{stat.value}</span>
                            <span className="text-xs text-green-400">{stat.trend}</span>
                          </div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

        </section>
      </main>
    </>
  );
}
