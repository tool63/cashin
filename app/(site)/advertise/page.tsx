"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  Megaphone,
  RadioTower,
  Wifi,
  Activity,
  Crosshair,
  MousePointer,
  MousePointerClick,
  Pointer,
  Hand,
  QrCode,
  Newspaper,
  BookOpen,
  FileText,
  FileSpreadsheet,
  FileBarChart,
  FilePieChart,
  FileLineChart,
  FileCog,
  FileCheck,
  FileWarning,
  FileX,
  FileMinus,
  FilePlus,
  FileSearch,
  FileScan,
  FileVideo,
  FileAudio,
  FileImage,
  FileCode,
  FileJson,
  FileType,
  FileDigit,
  LayoutGrid,
} from "lucide-react";

/* ================= CUSTOM ICONS ================= */
const Code = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const Code2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Package = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const Terminal = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AreaChart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8" />
  </svg>
);

const CandlestickChart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20V4M7 8h4M7 12h4M7 16h4M13 20V4M13 8h4M13 12h4M13 16h4" />
  </svg>
);

const BarChart4 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 20h18M5 16h2M9 12h2M13 8h2M17 4h2" />
  </svg>
);

const FileSliders = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    <circle cx="8" cy="6" r="2" fill="currentColor" />
    <circle cx="16" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="18" r="2" fill="currentColor" />
  </svg>
);

/* ================= SEO METADATA ================= */
export async function generateMetadata() {
  try {
    const seo: SEOOutput = await buildSEO({
      route: "/advertise",
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
      title: "Advertise - Reach Millions of Users | Cashog",
      description:
        "Scale your brand with premium advertising and reach millions of engaged users across web and mobile.",
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

/* ================= SKELETON ================= */
const SectionSkeleton = () => (
  <div className="h-32 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
);

/* ================= LAZY SECTION WRAPPER ================= */
function LazySection({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
    rootMargin: "200px",
  });

  return <div ref={ref}>{inView ? children : <SectionSkeleton />}</div>;
}

/* ================= DATA (UNCHANGED) ================= */
const adStats = [
  {
    label: "Daily Impressions",
    value: "10M+",
    icon: <Eye className="w-5 h-5" />,
    trend: "+25%",
    gradient: "from-emerald-400 to-teal-400",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Click-Through Rate",
    value: "3.2%",
    icon: <MousePointerClick className="w-5 h-5" />,
    trend: "+0.5%",
    gradient: "from-blue-400 to-indigo-400",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Active Campaigns",
    value: "1,250+",
    icon: <Megaphone className="w-5 h-5" />,
    trend: "+18%",
    gradient: "from-amber-400 to-orange-400",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

const adFormats = [
  { name: "Banner Ads", icon: <LayoutGrid className="w-4 h-4" />, ctr: "0.8%", gradient: "from-blue-400 to-cyan-400", color: "blue" },
  { name: "Native Ads", icon: <Newspaper className="w-4 h-4" />, ctr: "1.2%", gradient: "from-green-400 to-emerald-400", color: "green" },
  { name: "Video Ads", icon: <Film className="w-4 h-4" />, ctr: "2.5%", gradient: "from-purple-400 to-pink-400", color: "purple" },
  { name: "Interstitial", icon: <Maximize2 className="w-4 h-4" />, ctr: "1.8%", gradient: "from-red-400 to-rose-400", color: "red" },
  { name: "Rewarded Video", icon: <Gift className="w-4 h-4" />, ctr: "4.2%", gradient: "from-amber-400 to-orange-400", color: "amber" },
  { name: "Playable Ads", icon: <Gamepad2 className="w-4 h-4" />, ctr: "3.5%", gradient: "from-indigo-400 to-purple-400", color: "indigo" },
  { name: "Offerwall", icon: <LayoutGrid className="w-4 h-4" />, ctr: "2.8%", gradient: "from-pink-400 to-rose-400", color: "pink" },
  { name: "Native Video", icon: <Video className="w-4 h-4" />, ctr: "3.1%", gradient: "from-cyan-400 to-blue-400", color: "cyan" },
  { name: "Rich Media", icon: <Sparkles className="w-4 h-4" />, ctr: "2.2%", gradient: "from-lime-400 to-green-400", color: "lime" },
  { name: "Display Ads", icon: <Monitor className="w-4 h-4" />, ctr: "0.9%", gradient: "from-teal-400 to-cyan-400", color: "teal" },
  { name: "Mobile Ads", icon: <Smartphone className="w-4 h-4" />, ctr: "2.7%", gradient: "from-orange-400 to-amber-400", color: "orange" },
  { name: "Desktop Ads", icon: <Laptop className="w-4 h-4" />, ctr: "1.4%", gradient: "from-rose-400 to-pink-400", color: "rose" },
];

/* ================= PAGE ================= */
export default function AdvertisePage() {
  const [seo, setSeo] = useState<SEOOutput | null>(null);

  useSEOMetrics(seo);

  useEffect(() => {
    let mounted = true;

    buildSEO({ route: "/advertise", locale: SEO_CONFIG.defaultLocale })
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

          {/* HERO SECTION - unchanged */}
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
                    <span className="bg-gradient-to-r from-yellow-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                      Reach Millions
                    </span>
                    <br />
                    <span className="text-4xl sm:text-5xl md:text-6xl text-gray-600 dark:text-gray-400">
                      of Engaged Users
                    </span>
                  </h1>

                  <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                        10M+
                      </div>
                      <div className="text-sm text-gray-500">Daily Impressions</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                    {[
                      { icon: <Target className="w-4 h-4" />, text: "Precise Targeting" },
                      { icon: <BarChart3 className="w-4 h-4" />, text: "Real-time Analytics" },
                      { icon: <Shield className="w-4 h-4" />, text: "Brand Safe" },
                      { icon: <Rocket className="w-4 h-4" />, text: "Fast Delivery" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-full border"
                      >
                        <div className="text-yellow-400">{item.icon}</div>
                        <span className="text-sm font-medium">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <PrimaryCTA href="/advertise/start">Start Campaign</PrimaryCTA>
                    <motion.a
                      href="/contact-sales"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-8 py-4 text-lg font-semibold rounded-xl bg-white dark:bg-[#0a0d16] border text-gray-900 dark:text-white"
                    >
                      Contact Sales
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* STATS SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
            <RevealWithBorder
              gradientFrom="from-emerald-400"
              gradientVia="via-teal-400"
              gradientTo="to-cyan-400"
              borderColor="border-emerald-400/20"
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  Network Performance
                </h2>
                <div className="flex items-center justify-center gap-12">
                  {adStats.map((stat) => (
                    <Reveal key={stat.label}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                          <div className={stat.iconColor}>{stat.icon}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">{stat.label}</div>
                          <div className="text-xl font-bold">{stat.value}</div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* AD FORMATS */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <RevealWithBorder
              gradientFrom="from-blue-400"
              gradientVia="via-cyan-400"
              gradientTo="to-sky-400"
              borderColor="border-blue-400/20"
            >
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8">
                  Ad Formats
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {adFormats.map((format) => (
                    <Reveal key={format.name}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#0a0d16] rounded-full border"
                      >
                        <div className={`text-${format.color}-600 dark:text-${format.color}-400`}>
                          {format.icon}
                        </div>
                        <span className="text-xs font-medium">{format.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded-full">
                          {format.ctr}
                        </span>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </RevealWithBorder>
          </section>

          {/* FINAL CTA */}
          <section className="relative z-10 text-center">
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-3xl"
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
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4">
                    Ready to Launch?
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    Start reaching millions of engaged users today
                  </p>
                  <PrimaryCTA href="/advertise/start">Start Campaign</PrimaryCTA>
                </div>
              </motion.div>
            </Reveal>
          </section>

        </section>
      </main>
    </>
  );
}
